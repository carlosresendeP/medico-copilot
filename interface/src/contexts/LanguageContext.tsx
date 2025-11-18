import React, { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    pt: {
        // Header
        'app.title': 'Painel de Diagnóstico',

        // Status
        'status.ready': 'Painel de Diagnóstico',
        'status.recording': 'Gravando',
        'status.inProgress': 'Consulta em Andamento',
        'status.editing': 'Editando Transcrição',
        'status.analyzing': 'Analisando Consulta',

        // Buttons
        'button.start': 'Iniciar Consulta',
        'button.stop': 'Finalizar Consulta',
        'button.generate': 'Gerar Diagnóstico',
        'button.new': 'Nova Consulta',
        'button.processing': 'Processando...',

        // Transcription
        'transcription.placeholder': 'Digite a transcrição da consulta aqui...',
        'transcription.empty': 'A transcrição da consulta aparecerá aqui em tempo real...',
        'transcription.editManually': 'Digitar manualmente',

        // Diagnosis
        'diagnosis.probable': 'Diagnóstico Provável',
        'diagnosis.diseases': 'Doenças Associadas',
        'diagnosis.exams': 'Exames Sugeridos',
        'diagnosis.medications': 'Medicamentos Comuns',
        'diagnosis.reasoning': 'Raciocínio da IA',
        'diagnosis.noinfo': 'Nenhuma informação disponível.',

        // Processing
        'processing.title': 'Analisando e gerando diagnóstico...',
        'processing.subtitle': 'Isso pode levar alguns segundos.',

        // History
        'history.title': 'Histórico de Consultas',
        'history.button': 'Histórico',
        'history.empty': 'Nenhuma consulta salva ainda.',
        'history.delete': 'Excluir',
        'history.open': 'Abrir',

        // Speakers
        'speaker.doctor': 'Médico',
        'speaker.patient': 'Paciente',

        // Prescription
        'prescription.generate': 'Gerar Receita PDF',
        'prescription.title': 'Receita Médica',
        'prescription.patientName': 'Nome do Paciente',
        'prescription.doctorName': 'Nome do Médico',
        'prescription.optional': '(opcional)',
    },
    en: {
        // Header
        'app.title': 'Diagnosis Panel',

        // Status
        'status.ready': 'Diagnosis Panel',
        'status.recording': 'Recording',
        'status.inProgress': 'Consultation in Progress',
        'status.editing': 'Editing Transcription',
        'status.analyzing': 'Analyzing Consultation',

        // Buttons
        'button.start': 'Start Consultation',
        'button.stop': 'End Consultation',
        'button.generate': 'Generate Diagnosis',
        'button.new': 'New Consultation',
        'button.processing': 'Processing...',

        // Transcription
        'transcription.placeholder': 'Type the consultation transcription here...',
        'transcription.empty': 'The consultation transcription will appear here in real time...',
        'transcription.editManually': 'Edit manually',

        // Diagnosis
        'diagnosis.probable': 'Probable Diagnosis',
        'diagnosis.diseases': 'Associated Diseases',
        'diagnosis.exams': 'Suggested Exams',
        'diagnosis.medications': 'Common Medications',
        'diagnosis.reasoning': 'AI Reasoning',
        'diagnosis.noinfo': 'No information available.',

        // Processing
        'processing.title': 'Analyzing and generating diagnosis...',
        'processing.subtitle': 'This may take a few seconds.',

        // History
        'history.title': 'Consultation History',
        'history.button': 'History',
        'history.empty': 'No saved consultations yet.',
        'history.delete': 'Delete',
        'history.open': 'Open',

        // Speakers
        'speaker.doctor': 'Doctor',
        'speaker.patient': 'Patient',

        // Prescription
        'prescription.generate': 'Generate PDF Prescription',
        'prescription.title': 'Medical Prescription',
        'prescription.patientName': 'Patient Name',
        'prescription.doctorName': 'Doctor Name',
        'prescription.optional': '(optional)',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('medcopilot_language');
        return (saved as Language) || 'pt';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('medcopilot_language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations['pt']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
