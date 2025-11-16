import { useState, useRef, useCallback } from 'react';
import { LiveServerMessage } from '@google/genai';
import  { AppState,type DiagnosisReport } from '../types';
import { connectForTranscription, generateDiagnosisFromText } from '../services/geminiService';
import { createBlob } from '../utils/audioUtils';
import type { Blob } from '@google/genai';

type LiveSession = {
    close: () => void;
    sendRealtimeInput: (input: { media: Blob }) => void;
};

export const useMedCopilot = () => {
    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [transcription, setTranscription] = useState<string>('');
    const [diagnosis, setDiagnosis] = useState<DiagnosisReport | null>(null);
    const [error, setError] = useState<string | null>(null);

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const fullTranscriptionRef = useRef<string>('');

    // função para limpar recursos de áudio
    const cleanupAudio = useCallback(() => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }

        if (audioContextRef.current) {
            if (mediaStreamSourceRef.current && scriptProcessorRef.current) {
                mediaStreamSourceRef.current.disconnect(scriptProcessorRef.current);
                scriptProcessorRef.current.disconnect(audioContextRef.current.destination);
            }
            if (audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close().catch(console.error);
            }
        }
        scriptProcessorRef.current = null;
        mediaStreamSourceRef.current = null;
        audioContextRef.current = null;

        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close()).catch(console.error);
            sessionPromiseRef.current = null;
        }
    }, []);


    // função para parar a gravação
    const handleStopRecording = useCallback(async (isError = false) => {
        if (appState !== AppState.RECORDING) return;
        
        cleanupAudio();

        if (isError) {
            setAppState(AppState.ERROR);
            return;
        }

        if (fullTranscriptionRef.current.trim().length < 10) {
            setError('A transcrição é muito curta para gerar um diagnóstico. Fale um pouco mais.');
            setAppState(AppState.ERROR);
            return;
        }
        
        setAppState(AppState.PROCESSING);
        try {
            const result = await generateDiagnosisFromText(fullTranscriptionRef.current);
            setDiagnosis(result);
            setAppState(AppState.RESULT);
        } catch (err) {
            console.error('Failed to generate diagnosis:', err);
            setError('A IA não conseguiu gerar um diagnóstico. Por favor, tente novamente com uma transcrição mais clara.');
            setAppState(AppState.ERROR);
        }
    }, [appState, cleanupAudio]);
    

    // função para iniciar a gravação
    const handleStartRecording = useCallback(async () => {
        setAppState(AppState.RECORDING);
        setError(null);
        setTranscription('');
        fullTranscriptionRef.current = '';

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;

            sessionPromiseRef.current = connectForTranscription({
                onOpen: () => console.log('Live session opened.'),
                onMessage: (message: LiveServerMessage) => {
                    if (message.serverContent?.inputTranscription) {
                        const text = message.serverContent.inputTranscription.text;
                        if (text) {
                            fullTranscriptionRef.current += text;
                            setTranscription(fullTranscriptionRef.current);
                        }
                    }
                },
                onError: (e: ErrorEvent) => {
                    console.error('Live session error:', e);
                    setError('Ocorreu um erro durante a transcrição. Tente novamente.');
                    handleStopRecording(true);
                },
                onClose: () => console.log('Live session closed.'),
            });

            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            const context = new AudioContextClass({ sampleRate: 16000 });
            audioContextRef.current = context;
            
            const source = context.createMediaStreamSource(stream);
            mediaStreamSourceRef.current = source;

            const processor = context.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (audioProcessingEvent) => {
                const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                sessionPromiseRef.current?.then((session) => {
                   session.sendRealtimeInput({ media: pcmBlob });
                });
            };

            source.connect(processor);
            processor.connect(context.destination);

        } catch (err) {
            console.error('Failed to start recording:', err);
            setError('Não foi possível acessar o microfone. Verifique as permissões do seu navegador.');
            setAppState(AppState.IDLE);
        }
    }, [handleStopRecording]);

    const handleReset = () => {
        cleanupAudio();
        setAppState(AppState.IDLE);
        setTranscription('');
        setDiagnosis(null);
        setError(null);
        fullTranscriptionRef.current = '';
    };

    return {
        appState,
        transcription,
        diagnosis,
        error,
        actions: {
            start: handleStartRecording,
            stop: () => handleStopRecording(false),
            reset: handleReset,
        },
    };
};
