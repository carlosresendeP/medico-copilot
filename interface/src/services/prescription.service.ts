import { jsPDF } from 'jspdf';
import type { DiagnosisReport } from '../types';

export interface PrescriptionData {
    patientName?: string;
    doctorName?: string;
    diagnosis: DiagnosisReport;
    transcription?: string;
    date?: Date;
}

export class PrescriptionService {
    private static formatDate(date: Date): string {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    static generatePDF(data: PrescriptionData): void {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const margin = 20;
        const contentWidth = pageWidth - 2 * margin;
        let currentY = 20;

        // Header
        doc.setFillColor(59, 130, 246); // Blue-500
        doc.rect(0, 0, pageWidth, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('RECEITA MÉDICA', pageWidth / 2, 25, { align: 'center' });

        currentY = 55;

        // Date and Doctor Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const dateStr = this.formatDate(data.date || new Date());
        doc.text(`Data: ${dateStr}`, margin, currentY);
        currentY += 7;

        if (data.doctorName) {
            doc.setFont('helvetica', 'bold');
            doc.text(`Dr(a). ${data.doctorName}`, margin, currentY);
            doc.setFont('helvetica', 'normal');
            currentY += 10;
        }

        // Patient Name
        if (data.patientName) {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Paciente:', margin, currentY);
            doc.setFont('helvetica', 'normal');
            doc.text(data.patientName, margin + 25, currentY);
            currentY += 10;
        }

        // Divider
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 10;

        // Diagnosis
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(59, 130, 246);
        doc.text('DIAGNÓSTICO', margin, currentY);
        currentY += 8;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const diagnosisLines = doc.splitTextToSize(data.diagnosis.probable_diagnosis, contentWidth);
        diagnosisLines.forEach((line: string) => {
            doc.text(line, margin, currentY);
            currentY += 6;
        });
        currentY += 5;

        // Medications Section
        if (data.diagnosis.common_medications && data.diagnosis.common_medications.length > 0) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(59, 130, 246);
            doc.text('PRESCRIÇÃO MÉDICA', margin, currentY);
            currentY += 8;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);

            data.diagnosis.common_medications.forEach((medication, index) => {
                if (currentY > 270) {
                    doc.addPage();
                    currentY = 20;
                }

                const medicationLines = doc.splitTextToSize(`${index + 1}. ${medication}`, contentWidth);
                medicationLines.forEach((line: string) => {
                    doc.text(line, margin, currentY);
                    currentY += 6;
                });
                currentY += 3;
            });
            currentY += 5;
        }

        // Suggested Exams
        if (data.diagnosis.suggested_exams && data.diagnosis.suggested_exams.length > 0) {
            if (currentY > 250) {
                doc.addPage();
                currentY = 20;
            }

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(59, 130, 246);
            doc.text('EXAMES SOLICITADOS', margin, currentY);
            currentY += 8;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);

            data.diagnosis.suggested_exams.forEach((exam, index) => {
                if (currentY > 270) {
                    doc.addPage();
                    currentY = 20;
                }

                const examLines = doc.splitTextToSize(`${index + 1}. ${exam}`, contentWidth);
                examLines.forEach((line: string) => {
                    doc.text(line, margin, currentY);
                    currentY += 6;
                });
                currentY += 3;
            });
            currentY += 5;
        }

        // Recommendations
        if (data.diagnosis.associated_diseases && data.diagnosis.associated_diseases.length > 0) {
            if (currentY > 250) {
                doc.addPage();
                currentY = 20;
            }

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(59, 130, 246);
            doc.text('OBSERVAÇÕES', margin, currentY);
            currentY += 8;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);

            data.diagnosis.associated_diseases.forEach((disease) => {
                if (currentY > 270) {
                    doc.addPage();
                    currentY = 20;
                }

                const diseaseLines = doc.splitTextToSize(`• ${disease}`, contentWidth);
                diseaseLines.forEach((line: string) => {
                    doc.text(line, margin, currentY);
                    currentY += 6;
                });
                currentY += 3;
            });
        }

        // Footer with signature line
        const footerY = doc.internal.pageSize.height - 40;
        doc.setDrawColor(100, 100, 100);
        doc.line(pageWidth / 2 - 40, footerY, pageWidth / 2 + 40, footerY);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text('Assinatura e Carimbo do Médico', pageWidth / 2, footerY + 7, { align: 'center' });

        // Disclaimer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Este documento foi gerado automaticamente pelo sistema MedCopilot', pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });

        // Save PDF
        const fileName = `receita_medica_${new Date().getTime()}.pdf`;
        doc.save(fileName);
    }
}
