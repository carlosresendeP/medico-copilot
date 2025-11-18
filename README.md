⚕️ Medico-copilot: Arquitetura Full Stack

Este é o repositório completo do Medico-copilot, uma aplicação inovadora desenvolvida para otimizar e dar suporte ao fluxo de trabalho de profissionais médicos. Utilizando o poder da Inteligência Artificial (IA), o Medico-copilot visa aumentar a precisão, eficiência e segurança das consultas.

✨ Funcionalidades Principais

O projeto é dividido em três componentes principais:

Backend (IA e Processamento)

Processamento de Áudio Avançado: Transcrição precisa de consultas médicas gravadas, transformando a conversa em dados estruturados.

Análise Diagnóstica por IA: Utilização de modelos de linguagem (OpenAI e Gemini) para analisar a transcrição e gerar um diagnóstico provável e sugestões clínicas.

Geração Automática de Prescrições: Criação automatizada e estruturada de receitas médicas e requisições de exames.

Integração de APIs de IA: Conexão com serviços de ponta para garantir resultados sempre atualizados e aprimorados.

Frontend (Interface do Usuário)

Interface amigável para médicos e pacientes.

Entrada de Dados Flexível: Suporta tanto o upload de áudio (para transcrição) quanto a entrada manual de texto (para digitação direta da consulta).

Gerenciamento e visualização de consultas.

Download da receita médica gerada em PDF.

Interface (Definições de Tipos)

Camada de tipagem compartilhada entre frontend e backend para garantir integridade e comunicação consistente.

🚀 Tecnologias Utilizadas

A arquitetura do projeto é construída com foco em performance, escalabilidade e tipagem segura:

Categoria

Tecnologia

Componente

Uso

Backend

Node.js, Express, TypeScript

backend

Ambiente de execução e API RESTful.

Frontend

React, TypeScript, Vite

Raiz (Public)

Construção da interface de usuário.

IA/NLP

OpenAI API & Gemini API

backend

Processamento de linguagem natural e geração de conteúdo médico.

PDF

jsPDF

backend

Geração de receitas médicas estruturadas em PDF.

📐 Estrutura de Arquivos do Projeto

A estrutura do repositório reflete a divisão em componentes (Monorepo leve):

medico-copilot/
├── backend/          # Servidor da API e Lógica de IA
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   └── ... (configurações Node/TS)
├── interface/        # Tipos e Interfaces compartilhadas
│   ├── node_modules/
│   └── src/
├── src/              # Frontend (Aplicação React)
│   ├── public/       # Assets estáticos
│   ├── assets/
│   ├── components/   # Componentes reutilizáveis
│   ├── contexts/     # Gestão de estado global
│   ├── hooks/
│   ├── Pages/        # Telas da aplicação
│   ├── Routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
└── ... (configurações do Projeto Raiz: package.json, tsconfig, etc.)


⚙️ Fluxo de Trabalho do Medico-copilot

O diagrama a seguir ilustra o processo completo, desde a entrada dos dados da consulta até a geração final do documento, demonstrando a flexibilidade na origem da transcrição.

graph TD
    subgraph Frontend - Entrada de Dados
        A(Upload do Áudio da Consulta) --> B{AudioService: Transcrição};
        Z[Entrada Manual do Texto (Digitação)] --> D;
    end
    B --> D(Transcrição Limpa e Estruturada);
    D --> E{AIService: Análise e Geração de Conteúdo};
    E --> F[Diagnóstico Provisório e Conteúdo Gerado];
    F --> G[Prescrição Médica e Exames Solicitados];
    G --> H(PDFService: Geração da Receita em PDF [jsPDF]);
    H --> I[Download Automático da Receita no Frontend];
    I --> J(Finalização da Consulta);


📜 Funcionalidade de Geração de Receita Médica em PDF

A geração de receitas médicas em PDF é uma funcionalidade crucial, garantindo que o output da IA seja transformado em um documento legalmente utilizável, utilizando a biblioteca jsPDF.

Estrutura do Documento

A receita médica gerada é cuidadosamente estruturada para atender aos requisitos profissionais:

Cabeçalho Institucional: Nome da clínica/hospital, Logo (opcional) e Dados do Médico (Nome, CRM, Especialidade).

Informações do Paciente: Nome, Idade e Data da consulta.

Diagnóstico: O diagnóstico provável gerado pela IA.

Prescrição Médica Detalhada: Lista de medicamentos recomendados com Dosagem e Instruções de Uso.

Exames Solicitados: Lista de exames sugeridos pela IA para confirmação.

Observações: Informações adicionais, como doenças associadas identificadas.

Rodapé Legal: Linha para Assinatura e Carimbo do médico, e um Disclaimer sobre a natureza de geração automática da prescrição.

Exemplo de Geração (Demonstração Conceitual)

O código de exemplo da geração de PDF pode ser encontrado em src/services/pdfService.ts.

🛠️ Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto localmente. Você precisará inicializar as dependências em três níveis:

Clone o repositório:

git clone [https://github.com/carlosresendeP/medico-copilot.git](https://github.com/carlosresendeP/medico-copilot.git)
cd medico-copilot


Instale as dependências da Raiz (Frontend e Geral):

npm install
# ou
yarn install


Instale as dependências do Backend:

cd backend
npm install
# ou
yarn install
cd .. # Retorna para a raiz


Configure as variáveis de ambiente:
Copie os arquivos de exemplo para criar seus arquivos de configuração nos locais apropriados (raiz e backend):

cp .env.example .env            # Configurações do Frontend
cp backend/.env.example backend/.env # Configurações do Backend (APIs)


Edite os arquivos .env para inserir suas chaves de API necessárias (ex: OPENAI_API_KEY, GEMINI_API_KEY).

Inicie os Servidores:
Você precisará iniciar o Backend e o Frontend separadamente (consulte os scripts package.json de cada diretório).

🤝 Contribuição

Contribuições são extremamente bem-vindas! Se você tiver sugestões, encontrou um bug, ou gostaria de adicionar uma nova funcionalidade, por favor:

Abra uma Issue para discutir as mudanças propostas.

Crie um Pull Request com suas alterações.

⚖️ Licença

Este projeto está licenciado sob a MIT License. Consulte o arquivo LICENSE.md para mais informações.