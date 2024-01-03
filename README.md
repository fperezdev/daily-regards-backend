# Daily Regards Backend

## Tabla de contenidos

- [daily-regards-backend](#daily-regards-backend)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción](#descripción)
  - [Stack Tecnológico](#stack-tecnológico)
  - [Levantar el Servicio](#levantar-el-servicio)
    - [Localmente](#localmente)
  - [Idiomas](#idiomas)
  - [Convenciones](#convenciones)
  - [Contribuyentes](#contribuyentes)

## Descripción

`daily-regards-backend` es una aplicación de backend para el proyecto daily-regards. Esta sirve para enviar mensajes diarios a otras personas.

## Stack Tecnológico

- Node.js LTS 18.17.0
- pnpm 8.14.0
- husky 8.0.3
- lint-staged 15.2.0
- eslint 8.56.0
- prettier 3.1.1
- typescript 5.3.3

- express 4.18.2

## Levantar el Servicio

### Localmente

Para levantar el servicio localmente es necesario cumplir los siguientes requisitos:

1. Tener instalado [Node.js](https://nodejs.org/) en su versión 18.17.0 preferentemente.
2. Tener instalado [pnpm](https://yarnpkg.com/), se puede instalar con el comando `npm install --global pnpm`

Y seguir los siguientes pasos:

1. Clonar el repositorio `daily-regards-backend` y entrar en la carpeta del proyecto.
2. Instalar los paquetes necesarios con el comando `pnpm install`.
3. Tener las variables de entorno necesarias en un archivo .env en la ruta principal del proyecto. Este archivo se puede conseguir con @Francisco Perez.
4. Correr la aplicación en modo desarrollo con el comando `pnpm dev`.
5. Para preparar husky correr el comando `pnpm run prepare`

## Idiomas

Español.

## Convenciones

- Se recomiendo utilizar el editor de texto VSCode para poder instalar las siguientes extensiones de `eslint` y `prettier`:

  ```
  - dbaeumer.vscode-eslint
  - esbenp.prettier-vscode
  ```

## Contribuyentes

@Francisco Pérez
