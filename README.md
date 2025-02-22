# API REST - Librería

## Descripción

API REST desarrollada con Express y MySQL para la gestión de una librería, permitiendo la administración de libros, usuarios y préstamos. Cuenta con autenticación mediante correo electrónico y Google, almacenamiento de datos en MySQL y Docker para su despliegue.

---

## Tecnologías utilizadas

- **Backend:** Node.js con Express
- **Base de datos:** MySQL
- **Autenticación:** JWT, bcryptjs, Google OAuth
- **Correo:** Nodemailer
- **Contenedores:** Docker
- **Frontend:** React con Tailwind CSS *(pendiente)*

---

## Endpoints implementados

### Usuarios

- Registro de usuario
- Inicio de sesión (normal y Google)
- Recuperación de contraseña
- Actualización de perfil

### Libros

- CRUD completo de libros

### Préstamos

- CRUD completo de préstamos

---



## Instalación y configuración

### Requisitos previos

- Node.js
- Docker
- MySQL

### Pasos para correr el proyecto

1. Clonar el repositorio

```bash
    git clone <URL_DEL_REPOSITORIO>
    cd nombre-del-proyecto
```

2. Instalar dependencias

```bash
    npm install
```

3. Configurar variables de entorno (`.env`)

```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=tu_contraseña
    DB_NAME=libreria
    JWT_SECRET=clave_secreta
    GOOGLE_CLIENT_ID=tu_id_google
    GOOGLE_CLIENT_SECRET=tu_secreto_google
    EMAIL_USER=tu_email
    EMAIL_PASS=tu_password
```

4. Iniciar con Docker (opcional)

```bash
    docker-compose up -d
```

5. Ejecutar el servidor

```bash
    npm run dev
```

---



