# 🍳 YummiAPI - Plataforma de Recetas Culinarias

API REST desarrollada con Node.js, Express, MongoDB y Dotenv para una plataforma de recetas culinarias donde los usuarios pueden registrarse, agregar recetas con ingredientes, y buscar recetas por ingrediente.

## 🚀 Características

- **Gestión de usuarios**: Registro, consulta, actualización y eliminación
- **Gestión de recetas**: Creación, edición, eliminación y consulta por usuario
- **Gestión de ingredientes**: Agregar ingredientes a recetas, buscar recetas por ingrediente
- **Búsqueda avanzada**: Encontrar recetas que contengan ingredientes específicos
- **Datos de prueba**: Script de inicialización con datos de ejemplo

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Dotenv** - Gestión de variables de entorno

## 📋 Prerrequisitos

- Node.js (versión 14 o superior)
- MongoDB (local o en la nube)
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd YummiAPI
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   PORT=3000
   HOST_NAME=localhost
   MONGO_URI=mongodb://localhost:27017
   DB_NAME=yummi_recetas
   ```

4. **Inicializar datos de prueba**
   ```bash
   node src/dataset.js
   ```

5. **Ejecutar el servidor**
   ```bash
   # Desarrollo
   npm run dev
   
   # Producción
   npm start
   ```

## 📚 Documentación de la API

### Base URL
```
http://localhost:3000
```

### Health Check
```http
GET /health
```

**Respuesta:**
```json
{
  "message": "API de Recetas Culinarias activa!!! 🍳"
}
```

---

## 👥 Gestión de Usuarios

### 1. Obtener todos los usuarios
```http
GET /usuarios
```

**Respuesta:**
```json
{
  "message": "Usuarios obtenidos exitosamente",
  "count": 3,
  "usuarios": [
    {
      "id": 1,
      "nombre": "María García",
      "email": "maria.garcia@email.com",
      "fechaRegistro": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 2. Obtener usuario por ID
```http
GET /usuarios/:id
```

**Parámetros:**
- `id` (number): ID del usuario

**Respuesta:**
```json
{
  "message": "Usuario obtenido exitosamente",
  "usuario": {
    "id": 1,
    "nombre": "María García",
    "email": "maria.garcia@email.com",
    "fechaRegistro": "2024-01-15T10:30:00Z"
  }
}
```

### 3. Crear nuevo usuario
```http
POST /usuarios
```

**Body:**
```json
{
  "id": 4,
  "nombre": "Carlos Rodríguez",
  "email": "carlos.rodriguez@email.com"
}
```

**Respuesta:**
```json
{
  "message": "Usuario creado exitosamente",
  "usuario": {
    "id": 4,
    "nombre": "Carlos Rodríguez",
    "email": "carlos.rodriguez@email.com",
    "fechaRegistro": "2024-02-15T10:30:00Z"
  }
}
```

### 4. Actualizar usuario
```http
PATCH /usuarios/:id
```

**Parámetros:**
- `id` (number): ID del usuario

**Body:**
```json
{
  "nombre": "María García López",
  "email": "maria.lopez@email.com"
}
```

**Respuesta:**
```json
{
  "message": "Usuario actualizado exitosamente"
}
```

### 5. Eliminar usuario
```http
DELETE /usuarios/:id
```

**Parámetros:**
- `id` (number): ID del usuario

**Respuesta:**
```json
{
  "message": "Usuario y todas sus recetas eliminados exitosamente"
}
```

---

## 🍳 Gestión de Recetas

### 1. Obtener todas las recetas
```http
GET /recetas
```

**Respuesta:**
```json
{
  "message": "Recetas obtenidas exitosamente",
  "count": 4,
  "recetas": [
    {
      "id": 1,
      "titulo": "Pasta Carbonara",
      "descripcion": "Deliciosa pasta italiana con huevo, queso parmesano y panceta",
      "usuarioId": 1,
      "fechaCreacion": "2024-01-16T12:00:00Z",
      "ingredientes": []
    }
  ]
}
```

### 2. Obtener receta por ID (con ingredientes)
```http
GET /recetas/:id
```

**Parámetros:**
- `id` (number): ID de la receta

**Respuesta:**
```json
{
  "message": "Receta obtenida exitosamente",
  "receta": {
    "id": 1,
    "titulo": "Pasta Carbonara",
    "descripcion": "Deliciosa pasta italiana con huevo, queso parmesano y panceta",
    "usuarioId": 1,
    "fechaCreacion": "2024-01-16T12:00:00Z",
    "ingredientes": [
      {
        "id": 1,
        "nombre": "Pasta",
        "recetaId": 1,
        "fechaAgregado": "2024-01-16T12:05:00Z"
      },
      {
        "id": 2,
        "nombre": "Huevos",
        "recetaId": 1,
        "fechaAgregado": "2024-01-16T12:05:00Z"
      }
    ]
  }
}
```

### 3. Obtener recetas de un usuario específico
```http
GET /recetas/usuario/:usuarioId
```

**Parámetros:**
- `usuarioId` (number): ID del usuario

**Respuesta:**
```json
{
  "message": "Recetas del usuario 1 obtenidas exitosamente",
  "count": 2,
  "recetas": [
    {
      "id": 1,
      "titulo": "Pasta Carbonara",
      "descripcion": "Deliciosa pasta italiana con huevo, queso parmesano y panceta",
      "usuarioId": 1,
      "fechaCreacion": "2024-01-16T12:00:00Z",
      "ingredientes": []
    },
    {
      "id": 3,
      "titulo": "Ensalada César",
      "descripcion": "Ensalada fresca con lechuga, pollo, queso parmesano y aderezo especial",
      "usuarioId": 1,
      "fechaCreacion": "2024-01-25T11:20:00Z",
      "ingredientes": []
    }
  ]
}
```

### 4. Crear nueva receta
```http
POST /recetas
```

**Body:**
```json
{
  "id": 5,
  "titulo": "Risotto de Hongos",
  "descripcion": "Cremoso risotto italiano con hongos porcini",
  "usuarioId": 2
}
```

**Respuesta:**
```json
{
  "message": "Receta creada exitosamente",
  "receta": {
    "id": 5,
    "titulo": "Risotto de Hongos",
    "descripcion": "Cremoso risotto italiano con hongos porcini",
    "usuarioId": 2,
    "fechaCreacion": "2024-02-15T10:30:00Z",
    "ingredientes": []
  }
}
```

### 5. Actualizar receta
```http
PATCH /recetas/:id
```

**Parámetros:**
- `id` (number): ID de la receta

**Body:**
```json
{
  "titulo": "Pasta Carbonara Tradicional",
  "descripcion": "Auténtica receta italiana de pasta carbonara con guanciale"
}
```

**Respuesta:**
```json
{
  "message": "Receta actualizada exitosamente"
}
```

### 6. Eliminar receta
```http
DELETE /recetas/:id
```

**Parámetros:**
- `id` (number): ID de la receta

**Respuesta:**
```json
{
  "message": "Receta y todos sus ingredientes eliminados exitosamente"
}
```

---

## 🥕 Gestión de Ingredientes

### 1. Obtener ingredientes de una receta
```http
GET /ingredientes/receta/:recetaId
```

**Parámetros:**
- `recetaId` (number): ID de la receta

**Respuesta:**
```json
{
  "message": "Ingredientes de la receta 1 obtenidos exitosamente",
  "count": 5,
  "ingredientes": [
    {
      "id": 1,
      "nombre": "Pasta",
      "recetaId": 1,
      "fechaAgregado": "2024-01-16T12:05:00Z"
    },
    {
      "id": 2,
      "nombre": "Huevos",
      "recetaId": 1,
      "fechaAgregado": "2024-01-16T12:05:00Z"
    }
  ]
}
```

### 2. Agregar ingrediente a una receta
```http
POST /ingredientes
```

**Body:**
```json
{
  "id": 22,
  "nombre": "Aceite de Oliva",
  "recetaId": 1
}
```

**Respuesta:**
```json
{
  "message": "Ingrediente agregado exitosamente",
  "ingrediente": {
    "id": 22,
    "nombre": "Aceite de Oliva",
    "recetaId": 1,
    "fechaAgregado": "2024-02-15T10:30:00Z"
  }
}
```

### 3. Eliminar ingrediente de una receta
```http
DELETE /ingredientes/:id/receta/:recetaId
```

**Parámetros:**
- `id` (number): ID del ingrediente
- `recetaId` (number): ID de la receta

**Respuesta:**
```json
{
  "message": "Ingrediente eliminado exitosamente"
}
```

### 4. Buscar recetas por ingrediente
```http
GET /ingredientes/buscar?nombre=pollo
```

**Parámetros de consulta:**
- `nombre` (string): Nombre del ingrediente a buscar

**Respuesta:**
```json
{
  "message": "Recetas encontradas con el ingrediente 'pollo'",
  "count": 3,
  "recetas": [
    {
      "id": 2,
      "titulo": "Pollo al Curry",
      "descripcion": "Pollo cocinado con especias y leche de coco",
      "usuarioId": 2,
      "fechaCreacion": "2024-01-21T18:30:00Z",
      "ingredientesEncontrados": [
        {
          "id": 6,
          "nombre": "Pollo",
          "recetaId": 2,
          "fechaAgregado": "2024-01-21T18:35:00Z"
        }
      ]
    },
    {
      "id": 3,
      "titulo": "Ensalada César",
      "descripcion": "Ensalada fresca con lechuga, pollo, queso parmesano y aderezo especial",
      "usuarioId": 1,
      "fechaCreacion": "2024-01-25T11:20:00Z",
      "ingredientesEncontrados": [
        {
          "id": 12,
          "nombre": "Pollo",
          "recetaId": 3,
          "fechaAgregado": "2024-01-25T11:25:00Z"
        }
      ]
    }
  ]
}
```

---

## 🧪 Ejemplos de Uso

### Flujo completo de uso:

1. **Crear un usuario:**
   ```bash
   curl -X POST http://localhost:3000/usuarios \
     -H "Content-Type: application/json" \
     -d '{"id": 5, "nombre": "Chef Master", "email": "chef@email.com"}'
   ```

2. **Crear una receta:**
   ```bash
   curl -X POST http://localhost:3000/recetas \
     -H "Content-Type: application/json" \
     -d '{"id": 6, "titulo": "Paella Valenciana", "descripcion": "Auténtica paella española", "usuarioId": 5}'
   ```

3. **Agregar ingredientes:**
   ```bash
   curl -X POST http://localhost:3000/ingredientes \
     -H "Content-Type: application/json" \
     -d '{"id": 23, "nombre": "Arroz", "recetaId": 6}'
   ```

4. **Buscar recetas con arroz:**
   ```bash
   curl "http://localhost:3000/ingredientes/buscar?nombre=arroz"
   ```

## 🔍 Códigos de Estado HTTP

- `200` - OK (operación exitosa)
- `201` - Created (recurso creado)
- `400` - Bad Request (datos inválidos)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error (error del servidor)

## 🚨 Manejo de Errores

La API devuelve mensajes de error claros en formato JSON:

```json
{
  "error": "Usuario no encontrado"
}
```

## 📝 Notas Importantes

- Los IDs deben ser únicos dentro de cada colección
- Al eliminar un usuario, se eliminan automáticamente todas sus recetas
- Al eliminar una receta, se eliminan automáticamente todos sus ingredientes
- La búsqueda de ingredientes es case-insensitive
- Todos los timestamps están en formato ISO 8601

---

## 🎬 **Guía de Demostración Paso a Paso**

### **Preparación Inicial**

1. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```

2. **Verificar que el servidor esté funcionando:**
   - Abrir: `http://localhost:3000/health`
   - Debe mostrar: `{"message": "API de Recetas Culinarias activa!!! 🍳"}`

3. **Inicializar datos de prueba:**
   ```bash
   npm run seed
   ```

### **Flujo de Demostración Completo**

#### **PASO 1: Verificar Datos Iniciales**

**1.1 - Listar todos los usuarios**
```http
GET http://localhost:3000/usuarios
```
*Resultado: 3 usuarios (María García, Juan Pérez, Ana López)*

**1.2 - Listar todas las recetas**
```http
GET http://localhost:3000/recetas
```
*Resultado: 4 recetas iniciales*

#### **PASO 2: Gestión de Usuarios**

**2.1 - Obtener usuario específico**
```http
GET http://localhost:3000/usuarios/1
```
*Resultado: Información de María García*

**2.2 - Crear nuevo usuario**
```http
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "id": 4,
  "nombre": "Chef Master",
  "email": "chef.master@email.com"
}
```

**2.3 - Actualizar usuario**
```http
PATCH http://localhost:3000/usuarios/4
Content-Type: application/json

{
  "nombre": "Chef Master Pro",
  "email": "chef.pro@email.com"
}
```

#### **PASO 3: Gestión de Recetas**

**3.1 - Crear nueva receta**
```http
POST http://localhost:3000/recetas
Content-Type: application/json

{
  "id": 5,
  "titulo": "Risotto de Hongos",
  "descripcion": "Cremoso risotto italiano con hongos porcini",
  "usuarioId": 4
}
```

**3.2 - Obtener receta con ingredientes**
```http
GET http://localhost:3000/recetas/1
```
*Resultado: Pasta Carbonara con sus 5 ingredientes*

**3.3 - Listar recetas de un usuario específico**
```http
GET http://localhost:3000/recetas/usuario/1
```
*Resultado: 2 recetas de María García*

#### **PASO 4: Gestión de Ingredientes**

**4.1 - Agregar ingredientes a la nueva receta**
```http
POST http://localhost:3000/ingredientes
Content-Type: application/json

{
  "id": 22,
  "nombre": "Arroz Arborio",
  "recetaId": 5
}
```

**4.2 - Ver ingredientes de una receta**
```http
GET http://localhost:3000/ingredientes/receta/1
```
*Resultado: 5 ingredientes de Pasta Carbonara*

#### **PASO 5: BÚSQUEDA POR INGREDIENTE** 🔍

**5.1 - Buscar recetas con "pollo"**
```http
GET http://localhost:3000/ingredientes/buscar?nombre=pollo
```
*Resultado: 3 recetas que contienen pollo*

**5.2 - Buscar recetas con "queso"**
```http
GET http://localhost:3000/ingredientes/buscar?nombre=queso
```
*Resultado: 2 recetas con queso parmesano*

**5.3 - Buscar recetas con "cebolla"**
```http
GET http://localhost:3000/ingredientes/buscar?nombre=cebolla
```
*Resultado: 2 recetas con cebolla*

#### **PASO 6: LISTADO DE RECETAS POR USUARIO** 👤

**6.1 - Recetas de María García (usuario 1)**
```http
GET http://localhost:3000/recetas/usuario/1
```
*Resultado: 2 recetas (Pasta Carbonara y Ensalada César)*

**6.2 - Recetas de Juan Pérez (usuario 2)**
```http
GET http://localhost:3000/recetas/usuario/2
```
*Resultado: 1 receta (Pollo al Curry)*

**6.3 - Recetas de Ana López (usuario 3)**
```http
GET http://localhost:3000/recetas/usuario/3
```
*Resultado: 1 receta (Tacos de Pollo)*

#### **PASO 7: Operaciones de Eliminación**

**7.1 - Eliminar ingrediente**
```http
DELETE http://localhost:3000/ingredientes/24/receta/5
```

**7.2 - Eliminar receta**
```http
DELETE http://localhost:3000/recetas/5
```

**7.3 - Eliminar usuario**
```http
DELETE http://localhost:3000/usuarios/4
```

### **🎯 Casos de Prueba Especiales**

#### **Búsquedas por Ingrediente:**
- **"pollo"** → 3 recetas encontradas
- **"queso"** → 2 recetas encontradas  
- **"cebolla"** → 2 recetas encontradas
- **"arroz"** → 0 recetas (después de eliminar)

#### **Recetas por Usuario:**
- **Usuario 1 (María)** → 2 recetas
- **Usuario 2 (Juan)** → 1 receta
- **Usuario 3 (Ana)** → 1 receta

### **📱 Configuración en Insomnia/Postman**

#### **Variables de entorno recomendadas:**
```
base_url: http://localhost:3000
usuario_id: 1
receta_id: 1
```

#### **Headers necesarios:**
```
Content-Type: application/json
```

#### **Colecciones sugeridas:**
1. **Usuarios** (5 endpoints)
2. **Recetas** (6 endpoints)  
3. **Ingredientes** (4 endpoints)
4. **Búsquedas** (búsqueda por ingrediente)

### **✅ Funcionalidades Demostradas:**

- ✅ **Gestión completa de usuarios** (CRUD)
- ✅ **Gestión completa de recetas** (CRUD)
- ✅ **Gestión completa de ingredientes** (CRUD)
- ✅ **Búsqueda por ingrediente** (case-insensitive)
- ✅ **Listado de recetas por usuario**
- ✅ **Eliminación en cascada** (usuario → recetas → ingredientes)
- ✅ **Validaciones y manejo de errores**

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.