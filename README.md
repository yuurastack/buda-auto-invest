# Función de auto inversión en Buda.com

## Keywords

BTC, Bitcoin, ETH, LTC, BCH, Buda.com, Cloud functions, compra programada recurrente

## Descripción

Esta es una función programada para auto invertir en una criptomoneada utilizando la plataforma buda.com

## Requisitos

Debes tener dinero en tu cuenta de buda, esta función ejecutará una orden de compra tipo market por el monto mínimo de acuerdo a la periodicidad que le indiques dentro de index.ts
Cuenta de Firebase con blaze plan activado: https://firebase.google.com/pricing#blaze-calculator
La ejecución de esta función debiese costar $0 mensual

Si se desea invertir en más de una moneda a la vez, se recomienda clonar esta función para manejar la periodicidad y ejecución de compras por separado. 
En tal caso recordar modificar el nombre de la función tanto en index.ts como en package.json

## Setup

* modifica firebase.json con el nombre de tu proyecto firebase
* login con firebase tools https://firebase.google.com/docs/functions/get-started
* asignar las variables de entorno MARKET_ID ( por default btc_clp ), API_KEY y  API_SECRET. Más información de la api de buda en https://api.buda.com/#introduccion , variables de entorno gcp en https://cloud.google.com/functions/docs/configuring/env-var#functions_env_var_access-nodejs
* dentro de  /functions correr:
* npm install
* npm run deploy
