# Función de auto inversión en Buda.com

## Keywords

BTC, ETH, LTC, BCH, Buda.com

## Descripcion

Esta es una función programada para autoinvertir en una criptomoneada utilizando la plataforma buda.com

## Requisitos

Debes tener dinero en tu cuenta de buda, esta función ejecutará una orden de compra tipo market por el monto mínimo de acuerdo a la periodicidad que le indiques dentro de index.ts
Cuenta de Firebase con blaze plan activado: https://firebase.google.com/pricing#blaze-calculator
La ejecución de esta función debiese costar $0 mensual

## Setup

* modifica firebase.json con el nombre de tu proyecto firebase
* login con firebase tools https://firebase.google.com/docs/functions/get-started
* asignar las variables de entorno MARKET_ID ( por default btc_clp ), API_KEY y  API_SECRET. Más información de la api de buda en https://api.buda.com/#introduccion , variables de entorno gcp en https://cloud.google.com/functions/docs/configuring/env-var#functions_env_var_access-nodejs
* dentro de  /functions correr:
* npm install
* npm run deploy