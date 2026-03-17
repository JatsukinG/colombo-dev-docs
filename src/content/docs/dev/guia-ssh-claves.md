---
title: Guía SSH — Claves
description: Cómo crear y usar claves SSH para conectarte a GitHub, Bitbucket y servidores.
---

Esta guía explica **cómo crear y usar claves SSH** para conectarte de
forma segura a servicios como GitHub o Bitbucket.

---

## 1. ¿Qué es una clave SSH?

SSH (Secure Shell) utiliza **un par de claves criptográficas** para
autenticación segura:

-   **Clave privada** → se queda en tu computadora (NUNCA se comparte).
-   **Clave pública** → se sube al servicio (GitHub, Bitbucket,
    servidores, etc.).

Cuando te conectas, el servidor verifica que tu **clave privada
corresponde con la clave pública registrada**.

Esto permite **autenticarse sin usar usuario y contraseña**.

---

## 2. Crear una clave SSH

En **Mac, Linux o Windows (PowerShell o Git Bash)** ejecuta:

``` bash
ssh-keygen -t ed25519 -C "tu_email@example.com"
```

### Qué significa

-   `ssh-keygen` → comando para generar claves
-   `-t ed25519` → tipo de clave moderna y segura
-   `-C` → comentario para identificar la clave

Luego el sistema preguntará:

``` text
Enter file in which to save the key:
```

Aquí tienes dos opciones:

### Opción 1 (usar nombre por defecto)

Simplemente presiona **Enter**.

SSH guardará la clave en:

    ~/.ssh/id_ed25519

Se crearán dos archivos:

    ~/.ssh/id_ed25519       ← clave privada
    ~/.ssh/id_ed25519.pub   ← clave pública

### Opción 2 (darle un nombre personalizado)

Puedes escribir una ruta personalizada, por ejemplo:

    ~/.ssh/id_github

Esto es útil cuando quieres **tener múltiples claves para diferentes
servicios o cuentas**.

---

## 3. Ver tu clave pública

Para copiar la clave pública:

``` bash
cat ~/.ssh/id_ed25519.pub
```

Ese contenido es el que debes pegar en:

-   GitHub → SSH Keys
-   Bitbucket → SSH Keys
-   servidores remotos

---

## 4. ¿Qué es el SSH Agent?

El **SSH Agent** es un proceso que **guarda tus claves en memoria**,
para que no tengas que escribir la passphrase cada vez que uses SSH.

En otras palabras:

> Es un administrador que maneja tus claves SSH automáticamente mientras
> trabajas.

---

## 5. Iniciar el SSH Agent

En **Mac / Linux / Git Bash**:

``` bash
eval "$(ssh-agent -s)"
```

Esto inicia el agente SSH en tu sesión actual.

---

## 6. Agregar tu clave al agente

``` bash
ssh-add ~/.ssh/id_ed25519
```

Ahora el agente podrá usar tu clave automáticamente.

Para ver las claves cargadas:

``` bash
ssh-add -l
```

---

## 7. Usar varias claves SSH

Cuando tienes **varias cuentas o servicios**, lo ideal es crear **una
clave por proveedor**.

Ejemplo de estructura:

    ~/.ssh/
     ├── id_github
     ├── id_github.pub
     ├── id_bitbucket
     ├── id_bitbucket.pub
     └── config

---

## 8. Crear claves con nombres personalizados

Puedes guardar la clave con el nombre que quieras usando la opción `-f`.

Ejemplo para GitHub:

``` bash
ssh-keygen -t ed25519 -C "github_email@example.com" -f ~/.ssh/id_github
```

Ejemplo para Bitbucket:

``` bash
ssh-keygen -t ed25519 -C "bitbucket_email@example.com" -f ~/.ssh/id_bitbucket
```

La opción `-f ~/.ssh/id_github` le indica a SSH **dónde guardar la clave y qué nombre usar**.

---

## 9. Configurar el archivo ~/.ssh/config

Este archivo permite **decidir qué clave usar para cada servicio**.

Si no existe:

``` bash
touch ~/.ssh/config
```

Ejemplo de configuración:

``` bash
# -------------------------
# Configuración para GitHub
# -------------------------

Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github
    IdentitiesOnly yes


# -------------------------
# Configuración para Bitbucket
# -------------------------

Host bitbucket.org
    HostName bitbucket.org
    User git
    IdentityFile ~/.ssh/id_bitbucket
    IdentitiesOnly yes
```

### Explicación

-   **Host** → alias del servidor
-   **HostName** → dirección real del servidor
-   **User** → usuario SSH (normalmente `git`)
-   **IdentityFile** → clave privada que se usará
-   **IdentitiesOnly yes** → fuerza usar solo esa clave

---

## 10. Probar la conexión

GitHub:

``` bash
ssh -T git@github.com
```

Respuesta esperada:

    Hi username! You've successfully authenticated

---

## 11. Usar alias para múltiples cuentas

Puedes definir alias para distintas cuentas.

``` bash
# Cuenta personal
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github_personal

# Cuenta trabajo
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github_work
```

Luego clonar usando el alias:

``` bash
git clone git@github-personal:usuario/repositorio.git
```

---

## 12. Permisos recomendados

SSH exige permisos seguros:

``` bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*
```

---

## Resumen rápido

**1. Crear clave**

``` bash
ssh-keygen -t ed25519
```

**2. Iniciar agente**

``` bash
eval "$(ssh-agent -s)"
```

**3. Agregar clave**

``` bash
ssh-add ~/.ssh/id_ed25519
```

**4. Copiar clave pública**

``` bash
cat ~/.ssh/id_ed25519.pub
```

**5. Configurar `~/.ssh/config` para múltiples cuentas**
