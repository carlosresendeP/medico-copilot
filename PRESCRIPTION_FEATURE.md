# 📄 Geração de Receita Médica em PDF

## Visão Geral

A funcionalidade de geração de receita médica em PDF permite que os profissionais de saúde criem automaticamente documentos formais com base nos diagnósticos gerados pela IA.

## Características

### 🎨 Design Profissional
- **Cabeçalho com identidade visual**: Header azul com o título "RECEITA MÉDICA"
- **Layout limpo e organizado**: Seções bem definidas e hierarquia visual clara
- **Formatação automática**: Quebra de texto e paginação automática

### 📋 Conteúdo Incluído

A receita médica em PDF contém as seguintes informações:

1. **Cabeçalho**
   - Data e hora da geração
   - Nome do médico (opcional)

2. **Informações do Paciente**
   - Nome do paciente (opcional)

3. **Diagnóstico**
   - Diagnóstico provável gerado pela IA

4. **Prescrição Médica**
   - Lista de medicamentos comuns recomendados
   - Numeração automática

5. **Exames Solicitados**
   - Lista de exames sugeridos pela IA
   - Numeração automática

6. **Observações**
   - Doenças associadas identificadas

7. **Rodapé**
   - Linha para assinatura e carimbo do médico
   - Disclaimer sobre geração automática

## Como Usar

### Passo 1: Realizar a Consulta
1. Clique em "Iniciar Consulta"
2. Fale ou transcreva a consulta médica
3. Finalize a gravação

### Passo 2: Gerar Diagnóstico
1. Revise a transcrição (edite se necessário)
2. Clique em "Gerar Diagnóstico"
3. Aguarde a análise da IA

### Passo 3: Gerar Receita PDF
1. Após visualizar o diagnóstico, clique no botão **"Gerar Receita PDF"** (verde)
2. Um modal será exibido solicitando informações opcionais:
   - Nome do Paciente
   - Nome do Médico
3. Preencha os campos desejados (ambos são opcionais)
4. Clique em "Gerar Receita PDF"
5. O arquivo PDF será automaticamente baixado

## Tecnologias Utilizadas

- **jsPDF**: Biblioteca JavaScript para geração de PDFs
- **React**: Interface de usuário
- **TypeScript**: Tipagem estática

## Estrutura de Arquivos

```
interface/src/
├── services/
│   └── prescription.service.ts    # Serviço de geração de PDF
├── components/
│   ├── PrescriptionModal.tsx      # Modal para coletar dados do médico/paciente
│   └── DiagnosisResult.tsx        # Componente atualizado com botão de receita
└── Pages/
    └── Home.tsx                   # Integração da funcionalidade
```

## Código Principal

### PrescriptionService

```typescript
import { jsPDF } from 'jspdf';

export class PrescriptionService {
  static generatePDF(data: PrescriptionData): void {
    // Cria documento PDF
    const doc = new jsPDF();
    
    // Adiciona cabeçalho, conteúdo e rodapé
    // ...
    
    // Salva o arquivo
    doc.save(`receita_medica_${timestamp}.pdf`);
  }
}
```

### Integração no Componente

```tsx
const handleGeneratePrescription = (patientName: string, doctorName: string) => {
  PrescriptionService.generatePDF({
    patientName,
    doctorName,
    diagnosis,
    transcription: textToAnalyze,
    date: new Date()
  });
};
```

## Exemplo de Receita Gerada

```
┌──────────────────────────────────────────────────────┐
│                 RECEITA MÉDICA                       │
│                   (Cabeçalho Azul)                   │
├──────────────────────────────────────────────────────┤
│ Data: 17/11/2025 21:45                              │
│ Dr(a). Maria Santos                                  │
│                                                      │
│ Paciente: João Silva                                │
├──────────────────────────────────────────────────────┤
│ DIAGNÓSTICO                                         │
│ Gripe viral com sintomas respiratórios leves       │
│                                                      │
│ PRESCRIÇÃO MÉDICA                                   │
│ 1. Paracetamol 500mg - 1 comprimido de 8/8h       │
│ 2. Dipirona 500mg - 1 comprimido se necessário     │
│                                                      │
│ EXAMES SOLICITADOS                                  │
│ 1. Hemograma completo                              │
│ 2. Raio-X de tórax                                 │
│                                                      │
│ OBSERVAÇÕES                                         │
│ • Repouso por 3 dias                               │
│ • Hidratação adequada                              │
├──────────────────────────────────────────────────────┤
│           _____________________________              │
│        Assinatura e Carimbo do Médico              │
│                                                      │
│   Este documento foi gerado pelo MedCopilot         │
└──────────────────────────────────────────────────────┘
```

## Considerações Importantes

### ⚠️ Avisos Legais

1. **Documento Mock**: Esta é uma funcionalidade de demonstração
2. **Não substitui receita oficial**: Documentos gerados não têm validade legal
3. **Uso educacional**: Destinado apenas para fins de demonstração e aprendizado
4. **Revisão necessária**: Todo conteúdo deve ser revisado por profissional qualificado

### 🔒 Segurança

- Os dados são processados localmente no navegador
- Nenhuma informação é enviada para servidores externos durante a geração do PDF
- O PDF é gerado e baixado diretamente no dispositivo do usuário

### 📱 Compatibilidade

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Personalização

### Modificar Layout

Edite o arquivo `prescription.service.ts` para alterar:

- Cores do cabeçalho (linha 26): `doc.setFillColor(59, 130, 246)`
- Tamanhos de fonte: `doc.setFontSize(valor)`
- Margens: Variável `margin` (linha 22)
- Espaçamento: Variáveis `currentY`

### Adicionar Campos

Para adicionar novos campos ao PDF:

1. Atualize a interface `PrescriptionData`
2. Modifique `PrescriptionModal.tsx` para coletar os dados
3. Atualize `generatePDF()` para renderizar os novos campos

## Melhorias Futuras

- [ ] Suporte a múltiplas assinaturas
- [ ] Logo/timbre do hospital/clínica
- [ ] QR Code para validação
- [ ] Exportar em outros formatos (DOCX, HTML)
- [ ] Templates personalizáveis
- [ ] Impressão direta do navegador
- [ ] Integração com sistemas de prontuário eletrônico

## Dependências

```json
{
  "jspdf": "^2.5.2"
}
```

## Instalação

```bash
npm install jspdf
```

## Suporte

Para problemas ou sugestões relacionadas à geração de PDF:
- Verifique a documentação do jsPDF: https://github.com/parallax/jsPDF
- Consulte os logs do console do navegador
- Verifique se o bloqueador de pop-ups não está impedindo o download

---

**Desenvolvido com ❤️ para MedCopilot**
