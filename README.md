# PayPal Payments API

REST API para procesamiento de pagos con PayPal, construida con Node.js, Express 5 y TypeScript.

---

## Indice

- [Requisitos](#requisitos)
- [Instalacion](#instalacion)
- [Configuracion](#configuracion)
- [Ejecucion](#ejecucion)
- [Docker](#docker)
- [Endpoints](#endpoints)
- [Pruebas](#pruebas)
- [Estructura del proyecto](#estructura-del-proyecto)

---

## Requisitos

| Herramienta | Version minima |
|-------------|----------------|
| Node.js     | 18.x o superior |
| npm         | 9.x o superior  |
| Docker      | 20.x o superior (opcional) |
| Cuenta PayPal Developer | Sandbox activa |

> Crea tu cuenta de desarrollador en https://developer.paypal.com y obtén las credenciales de Sandbox antes de continuar.

---

## Instalacion

Sigue estos pasos en orden.

**1. Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/paypal-payments-api.git
cd paypal-payments-api
```

**2. Instala las dependencias**

```bash
npm install
```

---

## Configuracion

**3. Crea el archivo de variables de entorno**

En la raiz del proyecto crea un archivo llamado `.env`:

```bash
# En Mac/Linux
touch .env

# En Windows (PowerShell)
New-Item .env
```

**4. Agrega las variables al archivo `.env`**

```env
PAYPAL_CLIENT_ID=tu_client_id_de_sandbox
PAYPAL_CLIENT_SECRET=tu_client_secret_de_sandbox
PORT=3000
```

Para obtener `PAYPAL_CLIENT_ID` y `PAYPAL_CLIENT_SECRET`:

```
1. Inicia sesion en https://developer.paypal.com/dashboard
2. Ve a "Apps & Credentials"
3. Asegurate de estar en modo "Sandbox"
4. Crea una nueva app o selecciona una existente
5. Copia el "Client ID" y el "Secret"
```

---

## Ejecucion

**5. Inicia el servidor en modo desarrollo**

```bash
npm run dev
```

El servidor estara disponible en:

```
http://localhost:3000
```

**Verificar que el servidor esta corriendo**

```bash
curl http://localhost:3000/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "API funcionando correctamente"
}
```

---

### Scripts disponibles

| Comando         | Descripcion                                      |
|-----------------|--------------------------------------------------|
| `npm run dev`   | Inicia el servidor en desarrollo con ts-node     |
| `npm run build` | Compila TypeScript a JavaScript en `/dist`       |
| `npm start`     | Inicia el servidor compilado desde `/dist`       |
| `npm test`      | Ejecuta las pruebas con cobertura                |

**Para produccion:**

```bash
npm run build
npm start
```

---

## Docker

Puedes ejecutar la API dentro de un contenedor sin instalar Node.js localmente.

> **Requisito previo:** El archivo `.env` debe existir en la raiz del proyecto antes de ejecutar cualquier comando de Docker.

**1. Construir la imagen**

```bash
docker build -t paypal-payments-api .
```

**2. Levantar con docker-compose (recomendado)**

```bash
docker-compose up --build
```

**3. Levantar en background**

```bash
docker-compose up -d --build
```

**4. Detener los contenedores**

```bash
docker-compose down
```

El servidor estara disponible en `http://localhost:3000`.

---


## Endpoints

La URL base de todos los endpoints es `/api`.

---

### Crear una orden

```
POST /api/orders
```

**Body (JSON):**

```json
{
  "amount": "100.00",
  "currency": "MXN"
}
```

| Campo      | Tipo   | Requerido | Validacion                                              |
|------------|--------|-----------|----------------------------------------------------------|
| `amount`   | string | Si        | Numero valido con hasta 2 decimales (ej. `100`, `99.99`) |
| `currency` | string | No        | Exactamente 3 letras (ej. `MXN`, `USD`). Default: `MXN` |

**Respuesta exitosa — 201 Created:**

```json
{
  "id": "7HC89012BG123456X",
  "status": "CREATED",
  "links": [
    {
      "href": "https://api.sandbox.paypal.com/v2/checkout/orders/7HC89012BG123456X",
      "rel": "self",
      "method": "GET"
    },
    {
      "href": "https://www.sandbox.paypal.com/checkoutnow?token=7HC89012BG123456X",
      "rel": "approve",
      "method": "GET"
    }
  ]
}
```

**Errores posibles:**

| Codigo | Descripcion                                              |
|--------|----------------------------------------------------------|
| 400    | El monto es requerido                                    |
| 400    | El monto debe ser un numero valido (ej. 100.00)          |
| 400    | La moneda debe ser un codigo de 3 letras (ej. MXN, USD) |
| 500    | Error al crear la orden                                  |

---

### Capturar una orden

Confirma y ejecuta el pago despues de que el usuario lo aprueba en PayPal.

```
POST /api/orders/:id/capture
```

| Parametro | Ubicacion | Descripcion                   |
|-----------|-----------|-------------------------------|
| `id`      | URL       | ID de la orden devuelto por PayPal |

**Ejemplo:**

```bash
curl -X POST http://localhost:3000/api/orders/7HC89012BG123456X/capture
```

**Respuesta exitosa — 200 OK:**

```json
{
  "id": "7HC89012BG123456X",
  "status": "COMPLETED",
  "purchase_units": [
    {
      "payments": {
        "captures": [
          {
            "id": "3C679366HH908993T",
            "status": "COMPLETED",
            "amount": {
              "currency_code": "MXN",
              "value": "100.00"
            }
          }
        ]
      }
    }
  ]
}
```

**Errores posibles:**

| Codigo | Descripcion                  |
|--------|------------------------------|
| 500    | Error al capturar la orden   |

---

### Consultar una orden

```
GET /api/orders/:id
```

| Parametro | Ubicacion | Descripcion                   |
|-----------|-----------|-------------------------------|
| `id`      | URL       | ID de la orden a consultar    |

**Ejemplo:**

```bash
curl http://localhost:3000/api/orders/7HC89012BG123456X
```

**Respuesta exitosa — 200 OK:**

```json
{
  "id": "7HC89012BG123456X",
  "status": "CREATED",
  "purchase_units": [
    {
      "amount": {
        "currency_code": "MXN",
        "value": "100.00"
      }
    }
  ]
}
```

**Errores posibles:**

| Codigo | Descripcion                  |
|--------|------------------------------|
| 500    | Error al obtener la orden    |

---

### Flujo completo de un pago

```
1. Tu servidor  ->  POST /api/orders          ->  PayPal devuelve order ID + link de aprobacion
2. Usuario      ->  Abre el link de aprobacion ->  Aprueba el pago en PayPal
3. Tu servidor  ->  POST /api/orders/:id/capture ->  PayPal confirma y ejecuta el cobro
4. Tu servidor  ->  GET  /api/orders/:id       ->  Verificas el estado final
```

---

## Pruebas

**Ejecutar todas las pruebas con reporte de cobertura:**

```bash
npm test
```

**Resultado esperado:**

```
Test Suites: 5 passed, 5 total
Tests:       27 passed, 27 total

-----------------------|---------|----------|---------|---------|
File                   | % Stmts | % Branch | % Funcs | % Lines |
-----------------------|---------|----------|---------|---------|
All files              |     100 |      100 |     100 |     100 |
  app.ts               |     100 |      100 |     100 |     100 |
  paypal.ts            |     100 |      100 |     100 |     100 |
  paypal.controller.ts |     100 |      100 |     100 |     100 |
  errorHandler.ts      |     100 |      100 |     100 |     100 |
  paypal.routes.ts     |     100 |      100 |     100 |     100 |
  order.schema.ts      |     100 |      100 |     100 |     100 |
  paypal.service.ts    |     100 |      100 |     100 |     100 |
-----------------------|---------|----------|---------|---------|
```

Los archivos de prueba se encuentran en la carpeta `/tests`. Cada archivo cubre una capa de la aplicacion:

| Archivo                      | Que prueba                                       |
|------------------------------|--------------------------------------------------|
| `app.test.ts`                | Endpoint /health y middleware de errores         |
| `paypal.config.test.ts`      | Validacion de variables de entorno               |
| `order.schema.test.ts`       | Reglas de validacion del schema Zod              |
| `paypal.service.test.ts`     | Logica de comunicacion con PayPal                |
| `paypal.controller.test.ts`  | Endpoints HTTP, validaciones y manejo de errores |

---

## Estructura del proyecto

```
paypal-payments-api/
|
+-- src/
|   +-- config/
|   |   \-- paypal.ts            # Conexion con el SDK de PayPal
|   |
|   +-- controllers/
|   |   \-- paypal.controller.ts # Recibe peticiones y responde al cliente
|   |
|   +-- middlewares/
|   |   \-- errorHandler.ts      # Manejo global de errores
|   |
|   +-- routes/
|   |   \-- paypal.routes.ts     # Define las URLs disponibles
|   |
|   +-- schemas/
|   |   \-- order.schema.ts      # Validacion de entrada con Zod
|   |
|   +-- services/
|   |   \-- paypal.service.ts    # Logica de negocio con la API de PayPal
|   |
|   +-- types/
|   |   \-- paypal.d.ts          # Declaraciones de tipos
|   |
|   +-- app.ts                   # Configuracion de Express
|   \-- index.ts                 # Punto de entrada del servidor
|
+-- tests/
|   +-- setup.ts                 # Variables de entorno para pruebas
|   +-- app.test.ts
|   +-- order.schema.test.ts
|   +-- paypal.config.test.ts
|   +-- paypal.controller.test.ts
|   \-- paypal.service.test.ts
|
+-- .env                         # Variables de entorno (no se sube a Git)
+-- .dockerignore                # Archivos excluidos del build de Docker
+-- .gitignore
+-- Dockerfile                   # Imagen de produccion con node:18-alpine
+-- docker-compose.yml           # Orquestacion del contenedor con Docker Compose
+-- jest.config.js
+-- package.json
+-- tsconfig.json
\-- tsconfig.test.json
```

---

## Tecnologias

| Paquete                          | Version  | Uso                                      |
|----------------------------------|----------|------------------------------------------|
| express                          | 5.2.1    | Framework web                            |
| zod                              | 4.4.3    | Validacion de esquemas en runtime        |
| @paypal/checkout-server-sdk      | 1.0.3    | SDK oficial de PayPal                    |
| dotenv                           | 17.4.2   | Variables de entorno                     |
| typescript                       | 6.0.3    | Lenguaje                                 |
| ts-node                          | 10.9.2   | Ejecucion de TypeScript en desarrollo    |
| jest                             | 30.3.0   | Framework de pruebas                     |
| ts-jest                          | 29.4.9   | Integracion de TypeScript con Jest       |
| supertest                        | 7.2.2    | Pruebas de endpoints HTTP                |
