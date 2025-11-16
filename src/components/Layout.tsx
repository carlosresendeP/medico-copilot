import React from 'react';

export const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <div className="min-h-screen bg-linear-to-r from-gray-900 via-cyan-800 to-gray-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
            <header className="w-full max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
                    MedNote.IA <span className="text-blue-500">Copilot</span>
                </h1>
                <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                    Grave a consulta, transcreva em tempo real e gere um diagnóstico com IA.
                </p>
            </header>
            
            <main className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700">
                {children}
            </main>
            
            <footer className="w-full max-w-4xl mx-auto text-center mt-8">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Aviso: Esta é uma ferramenta de demonstração tecnológica. Não deve ser usada para diagnósticos médicos reais.
                </p>
            </footer>
        </div>
    );
};
