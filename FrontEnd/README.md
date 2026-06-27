# BiblioTech — Biblioteca Pública Virtual

Sistema de biblioteca pública virtual com Spring Boot (back-end) e React (front-end).

---

## 📋 Pré-requisitos

| Ferramenta | Versão mínima |
|------------|--------------|
| Java       | 17           |
| Maven      | 3.8+         |
| Node.js    | 18+          |
| MySQL      | 8.0+         |

---

## 🗄️ Configuração do Banco de Dados

1. Crie o banco de dados:

```sql
CREATE DATABASE bibliotech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'bibliotech_user'@'localhost' IDENTIFIED BY 'sua_senha';
GRANT ALL PRIVILEGES ON bibliotech.* TO 'bibliotech_user'@'localhost';
FLUSH PRIVILEGES;
```

2. As migrações são aplicadas automaticamente pelo **Flyway** na primeira execução.

---

## ⚙️ Back-end (Spring Boot)

### Configuração

Edite `BackEnd/src/main/resources/application.properties` (ou crie um
`application-local.properties`):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bibliotech
spring.datasource.username=bibliotech_user
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=validate
spring.flyway.enabled=true

# JWT
app.jwt.secret=SUA_CHAVE_SECRETA_LONGA_E_ALEATORIA
app.jwt.expiration-ms=86400000
```

### Executar

```bash
# Na pasta raiz do projecto
cd BackEnd

# Com Maven Wrapper (recomendado)
./mvnw spring-boot:run

# Ou com Maven instalado globalmente
mvn spring-boot:run
```

O servidor sobe em **http://localhost:8080**.

### Endpoints principais

| Método | Endpoint                          | Descrição                      |
|--------|-----------------------------------|--------------------------------|
| POST   | `/api/auth/login`                 | Autenticação                   |
| GET    | `/api/auth/me`                    | Dados do utilizador autenticado|
| GET    | `/api/livros`                     | Lista do acervo                |
| GET    | `/api/progresso/{livroId}`        | Progresso de leitura           |
| POST   | `/api/progresso`                  | Salvar progresso               |
| GET    | `/api/relatorios/dashboard`       | Dados do dashboard (SUPERVISOR)|

---

## 🖥️ Front-end (React + Vite)

### Instalação

```bash
cd FrontEnd
npm install
```

### Variáveis de ambiente

Crie o arquivo `FrontEnd/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Executar em desenvolvimento

```bash
cd FrontEnd
npm run dev
```

A aplicação fica disponível em **http://localhost:5173**.

### Build para produção

```bash
cd FrontEnd
npm run build
```

Os ficheiros estáticos são gerados em `FrontEnd/dist/`.

---

## 👥 Credenciais de teste

| Perfil     | Email                    | Senha     |
|------------|--------------------------|-----------|
| Aluno      | aluno@bibliotech.com     | aluno123  |
| Supervisor | supervisor@bibliotech.com| super123  |

> ⚠️ Altere estas credenciais antes de publicar em produção.

---

## 🔒 Notas de segurança

- O JWT expira em 24 horas por padrão.
- CORS está configurado para aceitar apenas `http://localhost:5173` em desenvolvimento.
- Em produção, atualize `app.cors.allowed-origins` para o domínio real.

---

## 🧹 Scripts úteis

```bash
# Remover console.log de debug (executar na pasta FrontEnd)
node ../scripts/remove-console-logs.js

# Verificar build sem erros
npm run build
```

---

## 📁 Estrutura do projeto

```
biblioteca_publica/
├── BackEnd/                  # Spring Boot (Java)
│   ├── src/main/java/        # Código fonte
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/     # Scripts Flyway (V1__, V2__...)
│   └── pom.xml
├── FrontEnd/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── contexts/         # AuthContext
│   │   ├── hooks/            # useToast, etc.
│   │   ├── pages/            # DashboardAdmin, LeituraPage...
│   │   └── services/         # api.js (Axios instance)
│   ├── .env
│   └── package.json
└── README.md
```