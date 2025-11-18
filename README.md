# ⚕️ Medico-copilot — Arquitetura Full Stack

O **Medico-copilot** é uma aplicação inovadora desenvolvida para otimizar e automatizar o fluxo de trabalho de profissionais da saúde. Combinando Inteligência Artificial (IA), processamento de linguagem natural e uma interface moderna, o sistema entrega precisão, eficiência e segurança durante a consulta médica.

---

## ✨ Funcionalidades Principais

O projeto é dividido em três componentes principais que trabalham em harmonia:

### Backend (IA e Processamento)

#### Processamento de Áudio Avançado
- Transcrição precisa de consultas médicas gravadas
- Conversão de áudio em texto estruturado
- Limpeza e formatação automática do conteúdo transcrito
- Suporte para múltiplos formatos de áudio

#### Análise Diagnóstica por IA
- Utilização de modelos de linguagem avançados (OpenAI e Gemini)
- Análise contextual da transcrição da consulta
- Geração de diagnósticos prováveis baseados em evidências
- Sugestões clínicas personalizadas
- Identificação de doenças associadas

#### Geração Automática de Prescrições
- Criação estruturada de receitas médicas
- Geração automatizada de requisições de exames
- Formatação profissional de documentos
- Validação de dosagens e interações medicamentosas

#### Integração de APIs de IA
- Conexão com OpenAI GPT-4 para análise profunda
- Integração com Google Gemini para processamento paralelo
- Sistema de fallback entre APIs para maior confiabilidade
- Cache de respostas para otimização de custos

### Frontend (Interface do Usuário)

#### Interface Intuitiva e Moderna
- Design responsivo e acessível
- Navegação fluida entre telas
- Feedback visual em tempo real
- Experiência otimizada para médicos e pacientes

#### Entrada de Dados Flexível
- **Upload de Áudio**: Gravação direta ou envio de arquivo
- **Entrada Manual**: Digitação direta da consulta
- **Edição em Tempo Real**: Correção da transcrição antes do processamento
- Suporte para múltiplos idiomas

#### Gerenciamento de Consultas
- Visualização de histórico completo
- Busca e filtros avançados
- Organização por paciente, data ou diagnóstico
- Exportação de dados em múltiplos formatos

#### Download e Compartilhamento
- Geração instantânea de PDF da receita médica
- Download automático após processamento
- Opções de impressão otimizadas
- Compartilhamento seguro com pacientes

### Interface (Definições de Tipos)

#### Camada de Tipagem Compartilhada
- Interfaces TypeScript para todos os dados
- Contratos de API bem definidos
- Validação em tempo de compilação
- Sincronização entre frontend e backend
- Documentação automática de tipos

---

## 🚀 Tecnologias Utilizadas

A arquitetura do projeto é construída com foco em performance, escalabilidade e segurança através de tipagem forte:

| Categoria | Tecnologia | Componente | Uso |
|-----------|-----------|------------|-----|
| **Backend** | Node.js, Express, TypeScript | `backend/` | Ambiente de execução e API RESTful |
| **Frontend** | React, TypeScript, Vite | Raiz (Public) | Construção da interface de usuário |
| **IA/NLP** | OpenAI API & Gemini API | `backend/` | Processamento de linguagem natural e geração de conteúdo médico |
| **PDF** | jsPDF | `backend/` | Geração de receitas médicas estruturadas em PDF |
| **Validação** | Zod, Express Validator | `backend/` | Validação de dados e segurança |
| **Estado** | Context API, React Hooks | `src/` | Gerenciamento de estado global |
| **Roteamento** | React Router | `src/` | Navegação e rotas da aplicação |

---

## 📐 Estrutura de Arquivos do Projeto

A estrutura do repositório reflete a divisão em componentes (Monorepo leve):

```
medico-copilot/
├── backend/                    # Servidor da API e Lógica de IA
│   ├── src/
│   │   ├── controllers/        # Controladores das rotas HTTP
│   │   │   ├── consultaController.ts
│   │   │   ├── audioController.ts
│   │   │   └── pdfController.ts
│   │   │
│   │   ├── services/           # Lógica de negócio e integrações
│   │   │   ├── audioService.ts
│   │   │   ├── aiService.ts
│   │   │   ├── pdfService.ts
│   │   │   └── transcriptionService.ts
│   │   │
│   │   ├── utils/              # Funções utilitárias
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   └── errorHandler.ts
│   │   │
│   │   ├── middleware/         # Middlewares Express
│   │   │   ├── auth.ts
│   │   │   ├── errorMiddleware.ts
│   │   │   └── upload.ts
│   │   │
│   │   ├── config/             # Configurações da aplicação
│   │   │   ├── database.ts
│   │   │   └── api.ts
│   │   │
│   │   ├── types/              # Tipos TypeScript do backend
│   │   │   └── index.ts
│   │   │
│   │   ├── app.ts              # Configuração do Express
│   │   └── server.ts           # Inicialização do servidor
│   │
│   ├── tests/                  # Testes unitários e integração
│   ├── .env.example            # Exemplo de variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
│
├── interface/                  # Tipos e Interfaces compartilhadas
│   ├── node_modules/
│   └── src/
│       └── types/              # Definições TypeScript globais
│           ├── consulta.ts
│           ├── paciente.ts
│           ├── prescricao.ts
│           └── index.ts
│
├── src/                        # Frontend (Aplicação React)
│   ├── assets/                 # Recursos estáticos (imagens, ícones)
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── AudioRecorder/
│   │   ├── TranscriptEditor/
│   │   ├── DiagnosisCard/
│   │   ├── PrescriptionForm/
│   │   └── PDFViewer/
│   │
│   ├── contexts/               # Gestão de estado global
│   │   ├── AuthContext.tsx
│   │   ├── ConsultaContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useAudio.ts
│   │   ├── useConsulta.ts
│   │   └── useDebounce.ts
│   │
│   ├── Pages/                  # Telas da aplicação
│   │   ├── Home/
│   │   ├── NovaConsulta/
│   │   ├── Historico/
│   │   └── Configuracoes/
│   │
│   ├── Routes/                 # Configuração de rotas
│   │   └── index.tsx
│   │
│   ├── services/               # Serviços de comunicação com API
│   │   ├── api.ts
│   │   ├── audioService.ts
│   │   └── consultaService.ts
│   │
│   ├── types/                  # Tipos TypeScript do frontend
│   │   └── index.ts
│   │
│   ├── utils/                  # Funções utilitárias
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   │
│   ├── App.tsx                 # Componente principal
│   ├── index.css               # Estilos globais
│   └── main.tsx                # Ponto de entrada
│
├── public/                     # Assets públicos estáticos
├── .env.example                # Exemplo de variáveis de ambiente (Frontend)
├── package.json                # Dependências do frontend
├── tsconfig.json               # Configuração TypeScript
├── vite.config.ts              # Configuração Vite
└── README.md                   # Documentação principal
```

---

## ⚙️ Fluxo de Trabalho do Medico-copilot

O diagrama a seguir ilustra o processo completo, desde a entrada dos dados da consulta até a geração final do documento, demonstrando a flexibilidade na origem da transcrição.

```mermaid
graph TD
    subgraph Frontend - Entrada de Dados
        A[Upload do Áudio da Consulta] --> B{AudioService: Transcrição}
        Z[Entrada Manual do Texto Digitação] --> D
    end
    B --> D[Transcrição Limpa e Estruturada]
    D --> E{AIService: Análise e Geração de Conteúdo}
    E --> F[Diagnóstico Provisório e Conteúdo Gerado]
    F --> G[Prescrição Médica e Exames Solicitados]
    G --> H[PDFService: Geração da Receita em PDF jsPDF]
    H --> I[Download Automático da Receita no Frontend]
    I --> J[Finalização da Consulta]
```

### Descrição Detalhada do Fluxo

#### 1. Entrada de Dados (Frontend)
O médico tem duas opções para iniciar o processo:
- **Opção A**: Gravar ou fazer upload de áudio da consulta
- **Opção B**: Digitar manualmente o texto da consulta

#### 2. Processamento de Áudio (Backend)
Se a opção A foi escolhida:
- O arquivo de áudio é enviado para o `audioService`
- Serviço de transcrição (Whisper API) converte áudio em texto
- Texto é limpo e formatado para análise

#### 3. Transcrição Estruturada
Independente da origem (áudio ou texto):
- Conteúdo é normalizado e validado
- Informações são estruturadas em formato padrão
- Dados estão prontos para análise por IA

#### 4. Análise por IA (AIService)
- Modelos OpenAI/Gemini processam a transcrição
- Sistema identifica sintomas, histórico e contexto
- IA gera diagnóstico provável baseado em evidências
- Sugestões terapêuticas são criadas

#### 5. Geração de Conteúdo Médico
- **Diagnóstico Provisório**: Conclusão da análise da IA
- **Prescrição**: Medicamentos com dosagens e instruções
- **Exames**: Lista de exames recomendados
- **Observações**: Doenças associadas e recomendações

#### 6. Criação do PDF (PDFService)
- Biblioteca jsPDF formata o documento profissionalmente
- Inclui cabeçalho, dados do paciente e médico
- Adiciona prescrição, exames e observações
- Gera rodapé com assinatura e disclaimer

#### 7. Download e Finalização
- PDF é retornado ao frontend
- Download automático é iniciado
- Consulta é salva no histórico
- Médico pode revisar ou imprimir o documento

---

## 📜 Funcionalidade de Geração de Receita Médica em PDF

A geração de receitas médicas em PDF é uma funcionalidade crucial, garantindo que o output da IA seja transformado em um documento legalmente utilizável e profissional.

### Estrutura do Documento

A receita médica gerada é cuidadosamente estruturada para atender aos requisitos profissionais e legais:

#### 1. Cabeçalho Institucional
```
┌────────────────────────────────────────┐
│  [LOGO]  CLÍNICA MÉDICA EXEMPLO        │
│          Endereço completo              │
│          Telefone e Email               │
├────────────────────────────────────────┤
│  Dr(a). Nome do Médico                 │
│  CRM: 123456 - Especialidade           │
└────────────────────────────────────────┘
```

**Elementos incluídos:**
- Nome da clínica ou hospital
- Logo institucional (opcional)
- Endereço completo e contatos
- Nome completo do médico
- Número do CRM e especialidade

#### 2. Informações do Paciente
```
Paciente: Nome Completo do Paciente
Idade: XX anos
Data: DD/MM/AAAA
```

**Dados coletados:**
- Nome completo do paciente
- Idade ou data de nascimento
- Data da consulta
- Identificação adicional (se necessário)

#### 3. Diagnóstico
```
DIAGNÓSTICO:
Descrição detalhada do diagnóstico provável
gerado pela análise da IA baseada nos sintomas
e histórico apresentados durante a consulta.
```

#### 4. Prescrição Médica Detalhada
```
PRESCRIÇÃO MÉDICA:

1. Medicamento A - 500mg
   Tomar 1 comprimido a cada 8 horas por 7 dias
   Administrar com alimento

2. Medicamento B - 20mg
   Tomar 1 comprimido pela manhã por 30 dias
   Em jejum, 30 minutos antes do café
```

**Informações incluídas para cada medicamento:**
- Nome do medicamento e dosagem
- Frequência de administração
- Duração do tratamento
- Instruções especiais de uso
- Via de administração (quando aplicável)

#### 5. Exames Solicitados
```
EXAMES SOLICITADOS:

□ Hemograma completo
□ Glicemia em jejum
□ Radiografia de tórax (PA e Perfil)
□ Ultrassonografia abdominal
```

**Características:**
- Lista clara e organizada
- Especificações técnicas quando necessário
- Prioridade ou urgência indicada
- Instruções de preparo (se aplicável)

#### 6. Observações Adicionais
```
OBSERVAÇÕES:

- Paciente apresenta histórico de hipertensão
- Manter dieta hipossódica
- Retornar em 15 dias para reavaliação
- Em caso de piora dos sintomas, procurar PS
```

**Conteúdo típico:**
- Doenças associadas identificadas
- Recomendações de estilo de vida
- Orientações para retorno
- Sinais de alerta para emergência

#### 7. Rodapé Legal
```
────────────────────────────────────────

________________________
Assinatura e Carimbo do Médico

IMPORTANTE: Esta prescrição foi gerada automaticamente
por sistema de IA e deve ser revisada e validada pelo
médico responsável antes de sua utilização.
```

**Elementos obrigatórios:**
- Linha para assinatura manual
- Espaço para carimbo profissional
- Disclaimer sobre geração automática
- Data e hora de emissão

### Implementação Técnica (PDFService)

#### Configuração do jsPDF

```typescript
import jsPDF from 'jspdf';

export class PDFService {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number = 20;
  private yPosition: number = 20;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  generatePrescription(data: PrescriptionData): Buffer {
    this.addHeader(data.clinic, data.doctor);
    this.addPatientInfo(data.patient);
    this.addDiagnosis(data.diagnosis);
    this.addPrescriptions(data.prescriptions);
    this.addExams(data.exams);
    this.addObservations(data.observations);
    this.addFooter();

    return Buffer.from(this.doc.output('arraybuffer'));
  }
}
```

#### Métodos Auxiliares

**Adição de Cabeçalho:**
```typescript
private addHeader(clinic: ClinicInfo, doctor: DoctorInfo): void {
  // Logo
  if (clinic.logo) {
    this.doc.addImage(clinic.logo, 'PNG', this.margin, this.yPosition, 30, 30);
  }

  // Nome da clínica
  this.doc.setFontSize(16);
  this.doc.setFont('helvetica', 'bold');
  this.doc.text(clinic.name, this.pageWidth / 2, this.yPosition, { align: 'center' });
  
  // Dados do médico
  this.yPosition += 10;
  this.doc.setFontSize(12);
  this.doc.text(`Dr(a). ${doctor.name}`, this.pageWidth / 2, this.yPosition, { align: 'center' });
  this.doc.text(`CRM: ${doctor.crm} - ${doctor.specialty}`, this.pageWidth / 2, this.yPosition + 5, { align: 'center' });
  
  this.yPosition += 15;
  this.addSeparator();
}
```

**Adição de Prescrições:**
```typescript
private addPrescriptions(prescriptions: Prescription[]): void {
  this.doc.setFontSize(14);
  this.doc.setFont('helvetica', 'bold');
  this.doc.text('PRESCRIÇÃO MÉDICA:', this.margin, this.yPosition);
  
  this.yPosition += 8;
  this.doc.setFontSize(11);
  this.doc.setFont('helvetica', 'normal');

  prescriptions.forEach((prescription, index) => {
    this.doc.text(
      `${index + 1}. ${prescription.medication} - ${prescription.dosage}`,
      this.margin + 5,
      this.yPosition
    );
    this.yPosition += 5;
    
    this.doc.setFontSize(10);
    this.doc.text(
      `   ${prescription.instructions}`,
      this.margin + 5,
      this.yPosition
    );
    this.yPosition += 7;
    
    this.checkPageBreak();
  });
}
```

**Controle de Quebra de Página:**
```typescript
private checkPageBreak(): void {
  if (this.yPosition > this.pageHeight - 40) {
    this.doc.addPage();
    this.yPosition = this.margin;
  }
}
```

### Exemplo de Uso

```typescript
// No controller
import { PDFService } from '../services/pdfService';

export const generatePrescriptionPDF = async (req: Request, res: Response) => {
  try {
    const { consultationId } = req.params;
    
    // Buscar dados da consulta
    const consultationData = await getConsultationData(consultationId);
    
    // Gerar PDF
    const pdfService = new PDFService();
    const pdfBuffer = pdfService.generatePrescription(consultationData);
    
    // Configurar headers para download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=receita_${consultationId}.pdf`);
    
    // Enviar PDF
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    res.status(500).json({ error: 'Erro ao gerar receita médica' });
  }
};
```

### Validações e Segurança

#### Validação de Dados
```typescript
import { z } from 'zod';

const PrescriptionSchema = z.object({
  medication: z.string().min(3).max(200),
  dosage: z.string().min(2).max(100),
  instructions: z.string().min(10).max(500),
  duration: z.string().optional()
});

const PrescriptionDataSchema = z.object({
  clinic: z.object({
    name: z.string(),
    logo: z.string().url().optional()
  }),
  doctor: z.object({
    name: z.string(),
    crm: z.string().regex(/^\d{4,6}$/),
    specialty: z.string()
  }),
  patient: z.object({
    name: z.string(),
    age: z.number().positive(),
    date: z.date()
  }),
  diagnosis: z.string().min(10),
  prescriptions: z.array(PrescriptionSchema),
  exams: z.array(z.string()),
  observations: z.string().optional()
});
```

#### Sanitização de Entrada
```typescript
private sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, '') // Remove caracteres HTML
    .trim()
    .substring(0, 1000); // Limita tamanho
}
```

### Personalização e Branding

O sistema permite personalização completa do PDF:

- **Cores institucionais**: Ajuste de cores de cabeçalho e rodapé
- **Fontes personalizadas**: Inclusão de fontes corporativas
- **Logotipos**: Inserção de logos em alta qualidade
- **Layout**: Adaptação do layout conforme necessidade
- **Idiomas**: Suporte para múltiplos idiomas

### Performance e Otimização

**Estratégias de otimização:**
- Cache de templates de PDF
- Geração assíncrona para não bloquear requisições
- Compressão de imagens antes da inclusão
- Reutilização de instâncias do jsPDF
- Processamento em background para consultas complexas

---

## 🔐 Segurança e Privacidade

### Proteção de Dados Médicos

O Medico-copilot implementa múltiplas camadas de segurança para proteger informações sensíveis:

#### 1. Criptografia
- Dados em trânsito: HTTPS/TLS 1.3
- Dados em repouso: AES-256
- Tokens: JWT com assinatura RSA

#### 2. Conformidade Legal
- LGPD (Lei Geral de Proteção de Dados)
- HIPAA compliance ready
- Anonimização de dados para IA
- Direito ao esquecimento implementado

#### 3. Controle de Acesso
- Autenticação multifator
- Permissões baseadas em função (RBAC)
- Logs de auditoria completos
- Sessões com timeout automático

---

## 🛠️ Instalação e Configuração

### Requisitos do Sistema

**Mínimos:**
- Node.js v16+
- npm v8+ ou yarn v1.22+
- 2GB RAM
- 1GB de espaço em disco

**Recomendados:**
- Node.js v18+
- npm v9+ ou yarn v3+
- 4GB RAM
- 5GB de espaço em disco
- SSD para melhor performance

### Instalação Passo a Passo

#### 1. Clone o Repositório

```bash
git clone https://github.com/carlosresendeP/medico-copilot.git
cd medico-copilot
```

#### 2. Instale Dependências da Raiz (Frontend)

```bash
npm install
# ou
yarn install
```

#### 3. Instale Dependências do Backend

```bash
cd backend
npm install
# ou
yarn install
cd ..
```

#### 4. Instale Dependências da Interface (Tipos)

```bash
cd interface
npm install
# ou
yarn install
cd ..
```

### Configuração de Variáveis de Ambiente

#### Frontend (.env na raiz)

```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_AUDIO_UPLOAD=true
VITE_ENABLE_TEXT_INPUT=true
VITE_MAX_AUDIO_SIZE_MB=50

# Environment
VITE_APP_ENV=development
```

#### Backend (backend/.env)

```env
# Server Configuration
PORT=3000
NODE_ENV=development
HOST=localhost

# OpenAI Configuration
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MAX_TOKENS=4000
OPENAI_TEMPERATURE=0.7

# Google Gemini Configuration
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GEMINI_MODEL=gemini-pro
GEMINI_TEMPERATURE=0.7

# Audio Processing
WHISPER_MODEL=whisper-1
MAX_AUDIO_DURATION_SECONDS=600
SUPPORTED_AUDIO_FORMATS=mp3,wav,m4a,ogg

# PDF Configuration
PDF_TEMP_DIR=./temp/pdf
PDF_MAX_SIZE_MB=10

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRATION=24h
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Database (se aplicável)
DATABASE_URL=postgresql://user:password@localhost:5432/medico_copilot
DATABASE_POOL_SIZE=10

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Feature Flags
ENABLE_AI_FALLBACK=true
ENABLE_CACHE=true
CACHE_TTL_SECONDS=3600
```

### Scripts de Desenvolvimento

#### Frontend

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Formatação
npm run format
```

#### Backend

```bash
cd backend

# Desenvolvimento com hot reload
npm run dev

# Build
npm run build

# Produção
npm start

# Testes
npm test

# Testes com coverage
npm run test:coverage

# Linting
npm run lint
```

---

## 📡 API Reference

### Endpoints Principais

#### POST /api/consulta/transcribe
Transcreve áudio de consulta médica

**Request:**
```http
POST /api/consulta/transcribe
Content-Type: multipart/form-data

{
  "audio": <arquivo de áudio>,
  "patientId": "string (opcional)"
}
```

**Response:**
```json
{
  "success": true,
  "transcription": "Texto transcrito da consulta...",
  "duration": 245,
  "confidence": 0.95
}
```

#### POST /api/consulta/analyze
Analisa transcrição e gera diagnóstico

**Request:**
```json
{
  "transcription": "Texto da consulta...",
  "patientHistory": "Histórico do paciente (opcional)",
  "symptoms": ["sintoma1", "sintoma2"]
}
```

**Response:**
```json
{
  "success": true,
  "diagnosis": {
    "primary": "Diagnóstico principal",
    "differential": ["Diagnóstico diferencial 1", "Diagnóstico diferencial 2"],
    "confidence": 0.87
  },
  "prescriptions": [
    {
      "medication": "Medicamento A",
      "dosage": "500mg",
      "frequency": "8/8h",
      "duration": "7 dias",
      "instructions": "Tomar com alimento"
    }
  ],
  "exams": [
    "Hemograma completo",
    "Glicemia em jejum"
  ],
  "observations": "Observações adicionais..."
}
```

#### POST /api/consulta/generate-pdf
Gera receita médica em PDF

**Request:**
```json
{
  "consultationId": "string",
  "clinic": {
    "name": "Clínica Exemplo",
    "logo": "url_opcional"
  },
  "doctor": {
    "name": "Dr. Fulano",
    "crm": "123456",
    "specialty": "Clínico Geral"
  },
  "patient": {
    "name": "Paciente Exemplo",
    "age": 45,
    "date": "2024-01-15"
  }
}
```

**Response:**
```http
Content-Type: application/pdf
Content-Disposition: attachment; filename=receita_xxxxx.pdf

<PDF Binary Data>
```

#### GET /api/consulta/history
Busca histórico de consultas

**Query Parameters:**
- `patientId`: ID do paciente (opcional)
- `startDate`: Data início (opcional)
- `endDate`: Data fim (opcional)
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "consulta_123",
      "patientName": "Paciente Exemplo",
      "date": "2024-01-15T10:30:00Z",
      "diagnosis": "Diagnóstico...",
      "status": "completed"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```
