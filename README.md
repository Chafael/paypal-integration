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


## Notas temporales
1. revisar api
2. revisar sdk
3. revisar ts
4. revisar zod
5. revisar jest
6. revisar supertest
7. revisar dotenv
8. revisar docker
9. revisar compose
10. revisar git
