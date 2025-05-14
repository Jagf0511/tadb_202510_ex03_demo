# API de Gestión de Medicamentos

## Descripción
Sistema de gestión de medicamentos implementado como API RESTful en Node.js y Express, diseñado para ayudar en la identificación de alternativas de medicamentos basadas en sus compuestos. La aplicación permite realizar operaciones CRUD sobre medicamentos y sus compuestos, facilitando la consulta cruzada entre entidades.

## Contexto del Proyecto
Esta aplicación fue desarrollada en respuesta a las dificultades en el acceso a medicamentos, permitiendo identificar alternativas basadas en composiciones similares de diferentes laboratorios.

## Estructura de Datos
El sistema maneja tres tablas principales:

### 1. Compuestos
- **Id**: Identificador único
- **Nombre**: Nombre del compuesto

### 2. Medicamentos
- **Id**: Identificador único
- **Nombre**: Nombre del medicamento
- **Fabricante**: Laboratorio fabricante

### 3. Compuestos por Medicamento
- **Id de compuesto**: Referencia al compuesto
- **Id de medicamento**: Referencia al medicamento
- **Concentración**: Valor numérico de concentración
- **Unidad de medida**: Unidad de la concentración (mg, ml, etc.)

## Requisitos Previos
- Node.js (versión 18 o superior)
- npm (gestor de paquetes de Node.js)
- MySQL (base de datos)

## Instalación
1. Clonar el repositorio
2. Instalar las dependencias:
   ```bash
   npm install
   ```

## Configuración
1. Configurar las variables de entorno:
   - `PORT`: Puerto del servidor (por defecto: 3000)
   - `DB_HOST`: Host de la base de datos
   - `DB_USER`: Usuario de la base de datos
   - `DB_PASSWORD`: Contraseña de la base de datos
   - `DB_NAME`: Nombre de la base de datos

## Estructura del Proyecto
```
├── config/            # Configuración del proyecto
├── controllers/       # Controladores de las rutas
├── models/           # Modelos de datos
├── repositories/     # Repositorios de datos
├── routes/           # Definición de rutas
├── services/         # Servicios auxiliares
├── server.js         # Archivo principal del servidor
├── .env              # Variables de entorno
├── package.json      # Dependencias y scripts
└── package-lock.json # Lock de dependencias
```

## Endpoints Disponibles

### Compuestos
- `GET /api/compuestos`: Listar todos los compuestos
- `GET /api/compuestos/{compuesto_id}`: Obtener compuesto por ID
- `GET /api/compuestos/{compuesto_id}/medicamentos`: Listar medicamentos que contienen el compuesto
- `POST /api/compuestos`: Crear nuevo compuesto
- `PUT /api/compuestos`: Actualizar compuesto
- `DELETE /api/compuestos/{compuesto_id}`: Eliminar compuesto

### Medicamentos
- `GET /api/medicamentos`: Listar todos los medicamentos
- `GET /api/medicamentos/{medicamento_id}`: Obtener medicamento por ID
- `GET /api/medicamentos/{medicamento_id}/compuestos`: Listar compuestos del medicamento
- `POST /api/medicamentos`: Crear nuevo medicamento
- `PUT /api/medicamentos`: Actualizar medicamento
- `DELETE /api/medicamentos/{medicamento_id}`: Eliminar medicamento

## Ejecución
1. Iniciar el servidor:
   ```bash
   npm start
   ```
   o
   ```bash
   node server.js
   ```

2. El servidor estará disponible en `http://localhost:3000`

## Documentación API
La documentación completa de la API está disponible en:
`http://localhost:3000/api-docs`

## Tecnologías Utilizadas
- Express.js: Framework web
- MySQL: Base de datos
- Swagger: Documentación de la API
- CORS: Control de acceso
- dotenv: Gestión de variables de entorno

## Arquitectura
El sistema sigue una arquitectura en capas:
- **Controlador**: Manejo de peticiones HTTP
- **Servicio**: Lógica de negocio y validaciones
- **Repositorio**: Operaciones CRUD con la base de datos
- **Modelo**: Definición de entidades
- **Contexto**: Conexión a la base de datos

## Datos de Ejemplo
El sistema incluye datos de ejemplo para demostración:
- Compuesto: Acetaminofén, Cetirizina, Cafeína, Fenilefrina Clorhidrato
- Medicamento: Noxpirin (Laboratorios Siegried)
- Relaciones con sus respectivas concentraciones y unidades de medida

## Notas
- Asegúrese de tener la base de datos MySQL configurada y accesible
- Verifique que las variables de entorno en el archivo `.env` estén correctamente configuradas
- La documentación Swagger facilita la prueba de la API
- El sistema permite consultar medicamentos con compuestos similares

## Licencia
ISC

## Autor
Julián Andrés Guisao Fernández
