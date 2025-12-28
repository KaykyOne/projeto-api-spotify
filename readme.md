# 🎵 Contratar Artistas - Spotify Integration

Uma aplicação fullstack moderna que integra a API do Spotify para contratar artistas. O projeto consiste em uma API REST robusta desenvolvida com **Laravel** e um frontend interativo construído com **Next.js**.

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [⚠️ Avisos Importantes](#-avisos-importantes)
- [API Endpoints](#api-endpoints)

---

## 🎯 Visão Geral

Este projeto permite que usuários autenticados com suas contas do Spotify possam contratar artistas de forma fácil e intuitiva. A aplicação consome a API do Spotify para buscar informações de artistas e integra um sistema de contratação com banco de dados próprio.

---

## ✨ Funcionalidades

### 🎨 Frontend (Next.js)

- ✅ Autenticação integrada com Spotify
- ✅ Busca de artistas em tempo real
- ✅ Carrossel de artistas populares
- ✅ Interface responsiva com Material-UI
- ✅ Notificações em tempo real (Toastify)
- ✅ Modal para contratação de artistas
- ✅ Design moderno com Tailwind CSS

### 🔧 Backend (Laravel)

- ✅ API REST para gerenciar contratações
- ✅ Integração com Spotify API
- ✅ Modelagem de dados relacional
- ✅ CRUD completo para hirings
- ✅ Validação robusta de dados
- ✅ Health check endpoint

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **PHP 8.2+** - Linguagem de programação
- **Laravel 12** - Framework web
- **Composer** - Gerenciador de dependências PHP
- **SQLite/MySQL** - Banco de dados

### Frontend

- **Node.js** - Runtime JavaScript
- **Next.js 16** - Framework React fullstack
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS
- **Material-UI 7** - Componentes UI
- **Axios** - Cliente HTTP
- **React Toastify** - Notificações

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **PHP 8.2 ou superior** ([Download](https://www.php.net/downloads))
- **Composer** ([Download](https://getcomposer.org/download/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm ou yarn** (vem com Node.js)
- **Git** ([Download](https://git-scm.com/))

### Verificar instalações

```bash
# Verificar PHP
php -v

# Verificar Composer
composer -V

# Verificar Node.js e npm
node -v
npm -v
```

---

## 🚀 Instalação e Configuração

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/KaykyOne/projeto-api-spotify.git
cd projeto-api-spotify
```

### 2️⃣ Configurar Backend (API - Laravel)

```bash
# Navegar para a pasta da API
cd api

# Instalar dependências PHP
composer install

# Copiar arquivo de ambiente
copy .env.example .env

# Gerar chave da aplicação
php artisan key:generate

# Configurar banco de dados (editar .env se necessário)
# Executar migrações
php artisan migrate


```

**Editar `.env` conforme sua configuração local:**

```env
APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true

DB_CONNECTION=sqlite
# ou
DB_HOST=127.0.0.1
DB_DATABASE=contatar_artistas
DB_USERNAME=root
DB_PASSWORD=
```

### 3️⃣ Configurar Frontend (Next.js)

```bash
# Voltar à raiz do projeto
cd ..

# Navegar para a pasta do frontend
cd front

# Instalar dependências Node.js
npm install

# Criar arquivo de ambiente
copy .env.example .env.local
# ou
echo "" > .env.local
```

**Configurar `.env.local` do frontend:**

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=sua_chave_aqui
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

---

## ▶️ Como Executar o Projeto

### Opção 1: Em Dois Terminais (Recomendado)

**Terminal 1 - Backend (Laravel):**

```bash
cd api
php artisan serve
# A API rodará em http://localhost:8000
```

**Terminal 2 - Frontend (Next.js):**

```bash
cd front
npm run dev
# O frontend rodará em http://localhost:3000
```

### Opção 2: Em Um Terminal (Concorrente)

Na raiz do projeto (se configurado com `concurrently`):

```bash
npm run dev
# Executa tanto backend quanto frontend simultaneamente
```

### Acessar a Aplicação

Abra seu navegador e acesse: **http://localhost:3000**

---

## 📁 Estrutura do Projeto

```
projeto-api-spotify/
│
├── 📂 api/                          # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/        # Controladores (HiringController, SpotifyController)
│   │   └── Models/                  # Modelos (User, Hiring)
│   ├── database/
│   │   ├── migrations/              # Migrações do banco de dados
│   │   ├── factories/               # Factories para testes
│   │   └── seeders/                 # Seeders para população de dados
│   ├── routes/
│   │   └── api.php                  # Rotas da API REST
│   ├── config/                      # Configurações da aplicação
│   ├── .env                         # Variáveis de ambiente
│   ├── composer.json                # Dependências PHP
│   └── artisan                      # CLI Laravel
│
├── 📂 front/                        # Frontend Next.js
│   ├── src/
│   │   ├── app/                     # Páginas e layout
│   │   ├── components/              # Componentes React
│   │   │   ├── navbar.tsx
│   │   │   ├── carrosel.tsx
│   │   │   ├── modalHiring.tsx
│   │   │   └── ...
│   │   ├── hooks/                   # Custom hooks
│   │   └── models/                  # Types/Interfaces TypeScript
│   ├── public/                      # Assets estáticos
│   ├── .env.local                   # Variáveis de ambiente
│   ├── package.json                 # Dependências Node.js
│   ├── next.config.ts               # Configuração Next.js
│   └── tsconfig.json                # Configuração TypeScript
│
└── README.md                        # Este arquivo
```

---

## 📡 API Endpoints

### Base URL

```
http://localhost:8000/api
```

### Health Check

```http
GET /ping
```

**Response:** `{ "pong": true }`

### Hirings (Contratações)

#### Listar todas as contratações

```http
GET /hiring
```

#### Criar nova contratação

```http
POST /hiring
Content-Type: application/json

{
  "artist_name": "string",
  "artist_id": "string",
  "user_id": "string",
  "event_date": "2025-01-15"
}
```

#### Deletar contratação

```http
DELETE /hiring/{id}
```

---

## ⚠️ Avisos Importantes

### 🔐 Arquivo `.env` para Fins Acadêmicos

Este repositório contém um arquivo `.env` com credenciais e chaves de API inclusos **exclusivamente para fins acadêmicos e de demonstração**. 

⚠️ **ATENÇÃO:**

- ❌ **NÃO** use estas credenciais em produção
- ❌ **NÃO** compartilhe este repositório com terceiros sem avisar sobre as credenciais
- ✅ Substitua todas as chaves antes de fazer deploy

### 🔄 Expiração de Credenciais

As credenciais do Spotify (Client ID, Secret, Tokens) inclusos neste projeto **expiram automaticamente** e precisarão ser **renovadas periodicamente**.

#### Quando as credenciais expiram:

1. **Access Tokens**: Expiram em **1 hora** (padrão Spotify)
2. **Refresh Tokens**: Expiram em **até 60 dias**
3. **API Credentials**: Permanecem válidas até revogação manual

#### Como renovar credenciais do Spotify:

1. Acesse [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Faça login com sua conta Spotify
3. Selecione sua aplicação
4. Gere novas credenciais se necessário
5. Atualize as variáveis de ambiente:
   
   ```env
   SPOTIFY_CLIENT_ID=novo_id
   SPOTIFY_CLIENT_SECRET=novo_secret
   ```
6. Reinicie os servidores

---

## 📖 Guia de Desenvolvimento

### Criar um novo Controller

```bash
cd api
php artisan make:controller NomeController
```

### Criar uma nova Migration

```bash
php artisan make:migration create_tabela_table
```

### Limpar cache

```bash
php artisan config:clear
php artisan cache:clear
```

### Gerar componente React

```bash
cd front
# Crie manualmente em src/components/
```

---

## 🐛 Troubleshooting

### Erro: "SQLSTATE[HY000]: General error"

```bash
# Resetar banco de dados
cd api
php artisan migrate:reset
php artisan migrate

```

### Erro: "Cannot GET /api/..."

- Certifique-se que o servidor Laravel está rodando em `http://localhost:8000`
- Verifique se as rotas estão corretas em `api/routes/api.php`

### Erro: "NEXT_PUBLIC_API_URL is not defined"

- Crie o arquivo `.env.local` no diretório `front/`
- Adicione as variáveis de ambiente necessárias

### Porta 8000 já está em uso

```bash
# Use outra porta
php artisan serve --port=8001
# Atualize a variável de ambiente do frontend
```

---

## 📝 Licença

Este projeto é fornecido como é, para fins educacionais.

---

## 👥 Contribuindo

Para contribuir com melhorias:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Se encontrar problemas:

- Verifique se todos os pré-requisitos estão instalados
- Consulte a seção [Troubleshooting](#troubleshooting)
- Abra uma issue no repositório

---

## 📚 Referências Úteis

- [Documentação Laravel](https://laravel.com/docs)
- [Documentação Next.js](https://nextjs.org/docs)
- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api)
- [Material-UI Docs](https://mui.com/material-ui/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Desenvolvido com ❤️ para fins acadêmicos**

*Última atualização: Dezembro de 2025*
