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

### 1. Configurar MySQL con Docker
Para configurar la base de datos MySQL usando Docker, ejecute:

```bash
docker run --name mysql_medicamentos \
  -e MYSQL_ROOT_PASSWORD=clave123 \
  -e MYSQL_DATABASE=medicamentosDB \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=clave123 \
  -p 3306:3306 \
  -v mysql_medicamentos_data:/var/lib/mysql \
  -d mysql:8.0 \
  --default-authentication-plugin=mysql_native_password
```

> **Nota sobre seguridad**: Este proyecto utiliza contraseñas simples y expuestas por razones educativas. En un entorno de producción, se deben implementar mejores prácticas de seguridad, como:
> - Uso de contraseñas seguras y únicas
> - Almacenamiento seguro de credenciales
> - Uso de variables de entorno para credenciales
> - Implementación de políticas de seguridad robustas
> - Uso de conexiones seguras (SSL/TLS)
> 
> Las contraseñas mostradas son solo para fines educativos y no deben ser utilizadas en producción.

### 2. Acceder a MySQL
Para acceder a MySQL:
```bash
docker exec -it mysql_medicamentos mysql -u root -p
# Password: clave123
```

### 3. Crear la base de datos y tablas
Ejecutar el siguiente script SQL:

```sql
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS medicamentos_db;
USE medicamentos_db;

-- Tabla Compuesto
CREATE TABLE IF NOT EXISTS Compuesto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    UNIQUE KEY unique_nombre (nombre)
);

-- Tabla Medicamento
CREATE TABLE IF NOT EXISTS Medicamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    UNIQUE KEY unique_nombre_fabricante (nombre, fabricante)
);

-- Tabla de relación CompuestoPorMedicamento
CREATE TABLE IF NOT EXISTS CompuestoPorMedicamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    compuesto_id INT NOT NULL,
    medicamento_id INT NOT NULL,
    concentracion DECIMAL(10,2) NOT NULL,
    unidad_medida VARCHAR(20) NOT NULL,
    FOREIGN KEY (compuesto_id) REFERENCES Compuesto(id),
    FOREIGN KEY (medicamento_id) REFERENCES Medicamento(id),
    UNIQUE KEY unique_compuesto_medicamento (compuesto_id, medicamento_id)
);

-- Insertar datos de ejemplo
INSERT INTO Compuesto (nombre) VALUES 
('Acetaminofén'),
('Cetirizina'),
('Cafeína'),
('Fenilefrina Clorhidrato');

INSERT INTO Medicamento (nombre, fabricante) VALUES 
('Noxpirin', 'Laboratorios Siegfried');

-- Insertar relaciones con sus concentraciones
INSERT INTO CompuestoPorMedicamento (compuesto_id, medicamento_id, concentracion, unidad_medida) VALUES 
(1, 1, 500, 'mg'),  -- Acetaminofén 500mg
(2, 1, 10, 'mg'),   -- Cetirizina 10mg
(3, 1, 30, 'mg'),   -- Cafeína 30mg
(4, 1, 10, 'mg');   -- Fenilefrina Clorhidrato 10mg
```

### 4. Configurar variables de entorno
Crear un archivo `.env` con las siguientes variables:
```env
PORT=3000
DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=clave123
DB_NAME=medicamentosDB
```

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
