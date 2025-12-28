# Setup do Projeto

## Após clonar o repositório, execute os seguintes comandos:

### 1. Instalar dependências do PHP
```bash
composer install
```

### 2. Instalar dependências do Node.js
```bash
npm install
```

### 3. Copiar arquivo de ambiente
```bash
copy .env.example .env
```

### 4. Gerar chave da aplicação
```bash
php artisan key:generate
```

### 5. Executar migrações do banco de dados
```bash
php artisan migrate
```

### 6. (Opcional) Executar seeders
```bash
php artisan db:seed
```

### 7. Iniciar o servidor local
```bash
php artisan serve
```

---

## Comandos úteis para desenvolvimento

- Criar um novo controller: `php artisan make:controller <nome>`
- Criar uma nova migration: `php artisan make:migration <nome>`
- Limpar cache de configuração: `php artisan config:clear`
