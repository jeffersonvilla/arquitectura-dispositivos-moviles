# Proyecto E-commerce

Este proyecto consiste en un sistema de e-commerce con un backend (graphql) y un frontend, ambos ejecutándose en contenedores Docker. El backend utiliza una base de datos MongoDB.

## Requisitos

- Docker
- Docker Compose

## Configuración del proyecto

Este proyecto está configurado para ejecutarse con Docker Compose. A continuación se describen los pasos para ponerlo en funcionamiento.

## Instrucciones para ejecutar el proyecto

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/jeffersonvilla/arquitectura-dispositivos-moviles.git
    cd arquitectura-dispositivos-moviles
    git checkout actividad/graphql
    ```

2. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

3. Construye y levanta los contenedores usando Docker Compose:

    ```bash
    docker compose up
    ```

    Este comando construirá las imágenes Docker para el backend y el frontend, y luego levantará todos los servicios definidos en el archivo `docker-compose.yml`.

4. Una vez que los contenedores estén corriendo, podrás acceder a las siguientes URLs en tu navegador:

    - **Backend:** `http://localhost:37111`
    - **Frontend:** `http://localhost:37112`

## Estructura del proyecto

- **backend/**: Contiene el código fuente del backend.
- **frontend/**: Contiene el código fuente del frontend.
- **docker-compose.yml**: Archivo de configuración para Docker Compose.

## Detalles adicionales

- **MongoDB**:
  - El contenedor de MongoDB está configurado para iniciar con el usuario `admin` y la contraseña `secret`.
  - La base de datos por defecto es `ecommercedb`.

- **Puertos**:
  - El backend está expuesto en el puerto `4000` dentro del contenedor y mapeado al puerto `37111` en el host.
  - El frontend está expuesto en el puerto `80` dentro del contenedor y mapeado al puerto `37112` en el host.


---

Si tienes alguna pregunta o problema, no dudes en abrir un issue en este repositorio.

¡Gracias por usar este sistema de e-commerce!
