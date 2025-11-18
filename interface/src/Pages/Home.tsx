import { useState } from "react";
import { Layout } from "../components/Layout";
import { StatusBar, ProcessingView, ErrorView } from "../components/StatusBar";
import { TranscriptionView } from "../components/TranscriptionView";
import { ActionButton } from "../components/ActionButton";
import { DiagnosisResult } from "../components/DiagnosisResult";
import { HistoryPanel } from "../components/HistoryPanel";
import { PrescriptionModal } from "../components/PrescriptionModal";

// Tipos
import { AppState } from "../types";
import type { Consultation } from "../types/consultation";

// Hooks
import { useMedCopilot } from "../hooks/useMedCopilot";

// Services
import { consultationService } from "../services/consultation.service";
import { PrescriptionService } from "../services/prescription.service";

function Home() {
    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [editedTranscription, setEditedTranscription] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [currentConsultationId, setCurrentConsultationId] = useState<string | null>(null);

    // Hook do Gemini Live
    const {
        transcript,
        speakers,
        hasSpeakers,
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

            // Salvar consulta no histórico
            const consultationId = currentConsultationId || Date.now().toString();
            consultationService.save({
                id: consultationId,
                date: new Date().toISOString(),
                transcript: textToAnalyze,
                speakers: hasSpeakers ? speakers : undefined,
                diagnosis: diagnosis || undefined
            });
            setCurrentConsultationId(consultationId);
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
        setCurrentConsultationId(null);
    };

    const handleOpenHistory = () => {
        setShowHistory(true);
    };

    const handleLoadConsultation = (consultation: Consultation) => {
        setEditedTranscription(consultation.transcript);
        setCurrentConsultationId(consultation.id);
        setShowHistory(false);

        if (consultation.diagnosis) {
            setAppState(AppState.RESULT);
        } else {
            setAppState(AppState.EDITING);
        }
    };

    const handleGeneratePrescription = (patientName: string, doctorName: string) => {
        if (!diagnosis) return;

        const textToAnalyze = editedTranscription.trim() || transcript.trim();

        PrescriptionService.generatePDF({
            patientName: patientName || undefined,
            doctorName: doctorName || undefined,
            diagnosis,
            transcription: textToAnalyze,
            date: new Date()
        });

        setShowPrescriptionModal(false);
    };

    return (
        <Layout>
            <StatusBar appState={appState} onOpenHistory={handleOpenHistory} />

            {/* Caixa de transcrição sempre visível, exceto em estados específicos */}
            {appState !== AppState.PROCESSING && appState !== AppState.RESULT && appState !== AppState.ERROR && (
                <TranscriptionView
                    transcription={transcript}
                    editedTranscription={editedTranscription}
                    isEditing={isEditing}
                    onToggleEdit={handleToggleEdit}
                    onTextChange={setEditedTranscription}
                    speakers={speakers}
                    hasSpeakers={hasSpeakers}
                />
            )}

            {appState === AppState.PROCESSING && (
                <ProcessingView />
            )}

            {appState === AppState.ERROR && (
                <ErrorView message={error} />
            )}

            {appState === AppState.RESULT && diagnosis && (
                <DiagnosisResult
                    report={diagnosis}
                    onGeneratePrescription={() => setShowPrescriptionModal(true)}
                />
            )}

            {/* Botão principal */}
            <ActionButton
                appState={appState}
                onStart={handleStart}
                onStop={handleStop}
                onGenerate={handleGenerate}
                onReset={handleReset}
            />

            {/* Painel de Histórico */}
            {showHistory && (
                <HistoryPanel
                    onOpen={handleLoadConsultation}
                    onClose={() => setShowHistory(false)}
                />
            )}

            {/* Modal de Receita */}
            {showPrescriptionModal && (
                <PrescriptionModal
                    onGenerate={handleGeneratePrescription}
                    onClose={() => setShowPrescriptionModal(false)}
                />
            )}
        </Layout>
    );
}

export default Home;
