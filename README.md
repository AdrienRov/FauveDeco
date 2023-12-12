# FauveDeco

## Requirements
- PHP 8.2 ou superieur
- Composer ( https://getcomposer.org/download/ )
- NodeJS ( https://nodejs.org/en )
- Docker ( https://www.docker.com/products/docker-desktop/ )

## Installation
- Installer la base de donnée sur Docker
`docker run --name fauvedeco -e POSTGRES_PASSWORD=00000000 -d -p 5432:5432 postgres`
- Cloner le repo
`https://github.com/AdrienRov/FauveDeco`
- Installer les composants
```sh
cd server
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
cd ../client
npm install
```

## Commandes Symphony

Lancer serveur de développement
`symfony server:start`

Créer une migration
`php bin/console make:migration`
Appliquer une migration

`php bin/console doctrine:migrations:migrate`

## Commandes NodeJS

Lancer serveur de développement
`npm start`