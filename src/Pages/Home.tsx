import React from 'react';
import { AppState } from '../types'
import { useMedCopilot } from '../hooks/useMedCopilot';
import { Layout } from '../components/Layout';
import { StatusBar, ProcessingView, ErrorView } from '../components/StatusBar';
import { TranscriptionView } from '../components/TranscriptionView';
import { DiagnosisResult } from '../components/DiagnosisResult';
import { ActionButton } from '../components/ActionButton';

const Home: React.FC = () => {
 const { appState, transcription, editedTranscription, diagnosis, error, actions } = useMedCopilot();

    const renderContent = () => {
        switch (appState) {
            case AppState.IDLE:
            case AppState.RECORDING:
            case AppState.EDITING:
                return <TranscriptionView 
                    transcription={transcription}
                    editedTranscription={editedTranscription}
                    isEditing={appState === AppState.EDITING}
                    onToggleEdit={actions.switchToEdit}
                    onTextChange={actions.setEditedTranscription}
                />;
            case AppState.PROCESSING:
                return <ProcessingView />;
            case AppState.RESULT:
                return <DiagnosisResult report={diagnosis} />;
            case AppState.ERROR:
                return <ErrorView message={error} />;
            default:
                return null;
        }
    };

    return (
        <Layout>
            <StatusBar appState={appState} />
            {renderContent()}
            <ActionButton 
                appState={appState}
                onStart={actions.start}
                onStop={actions.stopAndProcess}
                onGenerate={actions.generateFromEdited}
                onReset={actions.reset}
            />
        </Layout>
    );
};

export default Home;
