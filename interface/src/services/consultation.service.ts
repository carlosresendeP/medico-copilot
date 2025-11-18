import type { Consultation } from "../types/consultation";

const STORAGE_KEY = "medcopilot_consultations";

export const consultationService = {
    // Salvar nova consulta
    save(consultation: Consultation): void {
        const consultations = this.getAll();
        consultations.unshift(consultation);
        // Manter apenas as últimas 50 consultas
        const limited = consultations.slice(0, 50);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
    },

    // Obter todas as consultas
    getAll(): Consultation[] {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        try {
            return JSON.parse(data);
        } catch {
            return [];
        }
    },

    // Obter consulta por ID
    getById(id: string): Consultation | null {
        const consultations = this.getAll();
        return consultations.find(c => c.id === id) || null;
    },

    // Deletar consulta
    delete(id: string): void {
        const consultations = this.getAll();
        const filtered = consultations.filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    },

    // Atualizar consulta
    update(id: string, data: Partial<Consultation>): void {
        const consultations = this.getAll();
        const index = consultations.findIndex(c => c.id === id);
        if (index !== -1) {
            consultations[index] = { ...consultations[index], ...data };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(consultations));
        }
    },

    // Limpar todas
    clear(): void {
        localStorage.removeItem(STORAGE_KEY);
    }
};
