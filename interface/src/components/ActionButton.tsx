
import { AppState } from "../types";

interface ActionButtonProps {
    appState: AppState;
    onStart: () => void;
    onStop: () => void;
    onGenerate: () => void;
    onReset: () => void;

    // 🔥 ADICIONADO
    isSendingAudio?: boolean;
}

export function ActionButton({
    appState,
    onStart,
    onStop,
    onGenerate,
    onReset,
    isSendingAudio = false // 🔥 default
}: ActionButtonProps) {
    
    // Define o rótulo do botão dependendo do estado
    let label = "";
    let handleClick = () => {};

    switch (appState) {
        case AppState.IDLE:
            label = "Iniciar Gravação";
            handleClick = onStart;
            break;
        case AppState.RECORDING:
            label = "Parar Gravação";
            handleClick = onStop;
            break;
        case AppState.EDITING:
            label = "Gerar Diagnóstico";
            handleClick = onGenerate;
            break;
        case AppState.RESULT:
            label = "Nova Consulta";
            handleClick = onReset;
            break;
        default:
            label = "";
    }

    return (
        <button
            onClick={handleClick}
            disabled={isSendingAudio}
            className={`
                w-full h-16 rounded-xl flex items-center justify-center gap-2 
                transition-all select-none
                ${isSendingAudio ? "opacity-50 cursor-not-allowed" : ""}
            `}
        >
            {isSendingAudio ? (
                <span className="animate-pulse text-sm">Enviando áudio...</span>
            ) : (
                label
            )}
        </button>
    );
}
