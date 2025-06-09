# TrainTrack - Frontend

## 📋 Sobre o Projeto

TrainTrack é uma aplicação web moderna desenvolvida em React para rastreamento e gerenciamento de treinos cadastrados. A aplicação oferece uma interface intuitiva para usuários monitorarem seus progressos, visualizarem estatísticas e gerenciarem suas contas.

🎨 Backend: O backend desta aplicação está disponível em [TrainTrack Backend](https://github.com/arlissondiogo/backend-traintrack.git)

## 🚀 Tecnologias Utilizadas

### Core

- **React 19.0.0** - Biblioteca principal para construção da interface
- **React DOM 19.0.0** - Renderização do React no DOM
- **Vite 6.2.0** - Build tool e servidor de desenvolvimento
- **React Router DOM 7.5.0** - Roteamento da aplicação

### Estilização

- **Tailwind CSS 4.1.5** - Framework CSS utilitário
- **@tailwindcss/vite 4.1.5** - Plugin do Tailwind para Vite
- **Autoprefixer 10.4.21** - Processador PostCSS para compatibilidade

### Gráficos e Visualização

- **Chart.js 4.4.9** - Biblioteca para criação de gráficos
- **react-chartjs-2 5.3.0** - Wrapper React para Chart.js

### Ícones e UI

- **Lucide React 0.487.0** - Biblioteca de ícones

### HTTP Client

- **Axios 1.9.0** - Cliente HTTP para requisições API

### Ferramentas de Desenvolvimento

- **ESLint** - Linter para JavaScript/React
- **PostCSS** - Processador CSS
- **TypeScript Types** - Tipagem para React

## 📁 Estrutura do Projeto

```
traintrack-frontend/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── forgot-pass.svg          # Ilustração para recuperação de senha
│   │   ├── logo.svg                 # Logo da aplicação
│   │   ├── pic-signup.svg           # Ilustração para cadastro
│   │   └── traintrack-illustration.svg  # Ilustração principal do app
│   ├── src/
│   │   ├── assets/                  # Recursos estáticos
│   │   │   ├── logo.svg
│   │   ├── components/              # Componentes reutilizáveis
│   │   │   ├── Dashboard/           # Painel principal
│   │   │   ├── DeleteAccountModal/  # Modal de exclusão de conta
│   │   │   ├── Header/              # Cabeçalho da aplicação
│   │   │   ├── NavItem/             # Item de navegação
│   │   │   └── ProgressoCharts/     # Componentes de gráficos
│   │   ├── Pages/                   # Páginas da aplicação
│   │   │   ├── AddWorkout/          # Adicionar treino
│   │   │   ├── ForgotPassword/      # Esqueci minha senha
│   │   │   ├── Home/                # Página inicial
│   │   │   ├── Login/               # Página de login
│   │   │   ├── NotFound/            # Página 404
│   │   │   ├── Profile/             # Perfil do usuário
│   │   │   ├── ResetPassword/       # Redefinir senha
│   │   │   ├── SignUp/              # Cadastro de usuário
│   │   │   └── UpdateProfile/       # Atualizar perfil
│   │   ├── App.css                  # Estilos globais
│   │   ├── App.jsx                  # Componente raiz
│   │   ├── index.css                # Estilos base e Tailwind
│   │   └── main.jsx                 # Ponto de entrada da aplicação
│   ├── .gitignore                   # Arquivos ignorados pelo Git
│   ├── eslint.config.js             # Configuração do ESLint
│   ├── index.html                   # Template HTML principal
│   ├── package-lock.json            # Lock de dependências
│   ├── package.json                 # Configurações e dependências
│   ├── vite.config.js               # Configuração do Vite
│   ├── LICENSE                      # Licença do projeto
│   └── README.md                    # Documentação básica
```

## 🔧 Configuração e Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/arlissondiogo/frontend-traintrack.git
cd frontend-traintrack/frontend
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera build de produção

# Linting
npm run lint         # Executa verificação de código

# Preview
npm run preview      # Visualiza build de produção
```

## 📱 Funcionalidades Principais

### 🏠 Dashboard

- Visão geral dos treinos e estatísticas
- Gráficos de progresso interativos
- Resumo de atividades recentes

### 👤 Gerenciamento de Usuário

- **Cadastro de Usuário** (`SignUp`)
- **Login** com autenticação
- **Perfil do Usuário** (`Profile`)
- **Atualização de Perfil** (`UpdateProfile`)
- **Recuperação de Senha** (`ForgotPassword`)
- **Reset de Senha** (`ResetPassword`)
- **Exclusão de Conta** (Modal de confirmação)

### 💪 Gestão de Treinos

- **Adicionar Treinos** (`AddWorkout`)
- Visualização de progressos com gráficos
- Histórico de atividades

### 🎨 Interface

- Design responsivo com Tailwind CSS
- Componentes reutilizáveis
- Navegação intuitiva com React Router
- Ícones modernos com Lucide React

## 🏗️ Arquitetura

### Componentes Principais

#### `App.jsx`

Componente raiz da aplicação que configura:

- Roteamento principal
- Providers globais
- Layout base

#### `Dashboard/`

Painel principal com:

- Estatísticas de treinos
- Gráficos de progresso (Chart.js)
- Cards informativos

#### `Pages/`

Páginas da aplicação:

- Autenticação (Login, SignUp, ForgotPassword, ResetPassword)
- Perfil (Profile, UpdateProfile)
- Funcionalidades (AddWorkout)
- Utilitárias (Home, NotFound)

#### `components/`

Componentes reutilizáveis:

- Header de navegação
- Modais (DeleteAccountModal)
- Charts de progresso
- Items de navegação

### Roteamento

Utiliza React Router DOM para:

- Navegação SPA (Single Page Application)
- Rotas protegidas para usuários autenticados
- Redirecionamentos automáticos
- Página 404 para rotas não encontradas

## 🎨 Estilização

### Tailwind CSS

- Sistema de design consistente
- Classes utilitárias para estilização rápida
- Responsividade mobile-first
- Tema customizável

### Arquivos CSS Personalizados

- `App.css` - Estilos globais da aplicação
- `index.css` - Reset CSS e configurações base
- `DeleteAccountModal.css` - Estilos específicos do modal

## 📊 Visualização de Dados

### Chart.js Integration

- Gráficos interativos de progresso
- Visualização de estatísticas de treino
- Componentes reutilizáveis para diferentes tipos de gráficos
- Responsivo e acessível

## 🔒 Segurança

- Autenticação baseada em tokens
- Validação de formulários
- Sanitização de dados
- Rotas protegidas

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

## 📝 Desenvolvimento

### Padrões de Código

- ESLint configurado para React
- Componentes funcionais com Hooks
- Nomenclatura consistente
- Estrutura de arquivos organizada

### Boas Práticas

- Componentização adequada
- Gerenciamento de estado eficiente
- Código limpo e documentado
- Responsividade em todos os dispositivos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**TrainTrack** - Transformando a forma como você acompanha seus treinos! 💪🏃‍♂️
