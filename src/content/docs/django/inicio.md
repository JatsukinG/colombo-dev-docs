---
title: Inicio con Django
description: Cómo crear un proyecto Django, una app y una API sencilla desde cero.
---

## 1. Instalación

Crea un entorno virtual e instala Django:

```bash
python -m venv venv
source venv/bin/activate        # Mac / Linux
venv\Scripts\activate           # Windows

pip install django
```

---

## 2. Crear el proyecto

```bash
django-admin startproject miproyecto .
```

El `.` al final evita crear una carpeta extra — el proyecto se crea en el directorio actual.

Estructura resultante:

```
miproyecto/
├── manage.py
└── miproyecto/
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

---

## 3. Correr el servidor

```bash
python manage.py runserver
```

Abre `http://127.0.0.1:8000` y verás la pantalla de bienvenida de Django.

---

## 4. Crear una app

En Django, un proyecto se divide en **apps** — módulos independientes con su propia lógica.

```bash
python manage.py startapp libros
```

Luego registra la app en `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'libros',
]
```

---

## 5. Crear un modelo

En `libros/models.py`:

```python
from django.db import models

class Libro(models.Model):
    titulo = models.CharField(max_length=200)
    autor  = models.CharField(max_length=100)
    anio   = models.IntegerField()

    def __str__(self):
        return self.titulo
```

---

## 6. Migraciones

Las migraciones traducen los modelos a tablas en la base de datos.

```bash
# Genera el archivo de migración
python manage.py makemigrations

# Aplica las migraciones a la DB
python manage.py migrate
```

Cada vez que modificas un modelo debes repetir estos dos comandos.

---

## 7. API sencilla

### Configurar la URL

En `miproyecto/urls.py` agrega la ruta hacia las URLs de la app:

```python
from django.urls import path, include

urlpatterns = [
    path('api/libros/', include('libros.urls')),
]
```

Crea `libros/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.lista_libros),
]
```

### Crear la vista

En `libros/views.py`:

```python
import json
from django.http import JsonResponse
from .models import Libro

def lista_libros(request):
    libros = Libro.objects.values('titulo', 'autor', 'anio')
    return JsonResponse(list(libros), safe=False)
```

Visita `http://127.0.0.1:8000/api/libros/` y obtendrás la lista en JSON.

---

## Resumen

| Paso | Comando |
|------|---------|
| Crear proyecto | `django-admin startproject miproyecto .` |
| Correr servidor | `python manage.py runserver` |
| Crear app | `python manage.py startapp libros` |
| Generar migraciones | `python manage.py makemigrations` |
| Aplicar migraciones | `python manage.py migrate` |
