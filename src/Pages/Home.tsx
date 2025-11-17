import { useState } from "react";
import { Layout } from "../components/Layout";
import { StatusBar, ProcessingView, ErrorView } from "../components/StatusBar";
import { TranscriptionView } from "../components/TranscriptionView";
import { ActionButton } from "../components/ActionButton";
import { DiagnosisResult } from "../components/DiagnosisResult";

// Tipos
import { AppState } from "../types";

// Hooks
import { useMedCopilot } from "../hooks/useMedCopilot";

function Home() {
    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [editedTranscription, setEditedTranscription] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // Hook do Gemini Live
    const {
        transcript,
        diagnosis,
        error,
        start,
        stop,
        sendTextForDiagnosis
    } = useMedCopilot();

    // -----------------------------
    // START RECORDING
    // -----------------------------
    const handleStart = () => {
        setAppState(AppState.RECORDING);
        start();
    };

    // -----------------------------
    // STOP RECORDING
    // -----------------------------
    const handleStop = () => {
        stop();
        // Aguarda um pouco para garantir que o transcript foi atualizado
        setTimeout(() => {
            setAppState(AppState.EDITING);
        }, 500);
    };

    // -----------------------------
    // TOGGLE EDIT MODE
    // -----------------------------
    const handleToggleEdit = () => {
        setIsEditing(true);
        // Quando ativa edição, muda para modo EDITING
        if (appState === AppState.IDLE) {
            setAppState(AppState.EDITING);
        }
    };

    // -----------------------------
    // GENERATE DIAGNOSTICS
    // -----------------------------
    const handleGenerate = async () => {
        // Usa o transcript do hook diretamente se editedTranscription estiver vazio
        const textToAnalyze = editedTranscription.trim() || transcript.trim();

        console.log('🔍 Verificando texto:', {
            editedTranscription,
            transcript,
            textToAnalyze,
            length: textToAnalyze.length
        });

        if (!textToAnalyze) {
            console.log('❌ Texto vazio, não pode gerar diagnóstico');
            return;
        }

        console.log('🔄 Iniciando geração de diagnóstico...');
        setAppState(AppState.PROCESSING);

        try {
            await sendTextForDiagnosis(textToAnalyze);
            console.log('✅ Diagnóstico processado, mudando para RESULT');
            setAppState(AppState.RESULT);
        } catch (err) {
            console.error('❌ Erro ao gerar diagnóstico:', err);
            setAppState(AppState.ERROR);
        }
    };    // -----------------------------
    // RESET EVERYTHING
    // -----------------------------
    const handleReset = () => {
        setEditedTranscription("");
        setIsEditing(false);
        setAppState(AppState.IDLE);
    };

    return (
        <Layout>
            <StatusBar appState={appState} />

            {/* Caixa de transcrição sempre visível, exceto em estados específicos */}
            {appState !== AppState.PROCESSING && appState !== AppState.RESULT && appState !== AppState.ERROR && (
                <TranscriptionView
                    transcription={transcript}
                    editedTranscription={editedTranscription}
                    isEditing={isEditing}
                    onToggleEdit={handleToggleEdit}
                    onTextChange={setEditedTranscription}
                />
            )}

            {appState === AppState.PROCESSING && (
                <ProcessingView />
            )}

            {appState === AppState.ERROR && (
                <ErrorView message={error} />
            )}

            {appState === AppState.RESULT && diagnosis && (
                <DiagnosisResult report={diagnosis} />
            )}

            {/* Botão principal */}
            <ActionButton
                appState={appState}
                onStart={handleStart}
                onStop={handleStop}
                onGenerate={handleGenerate}
                onReset={handleReset}
            />
        </Layout>
    );
}

export default Home;
