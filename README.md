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

## Bug knowns
- bug1
- bug2
- bug3
- bug4
- bug5
- bug6
- bug7
- bug8
- bug9
- bug10
