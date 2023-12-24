# FauveDeco

## Requirements
- PHP 8.2 ou superieur
- Composer ( https://getcomposer.org/download/ )
- NodeJS ( https://nodejs.org/en )
- Docker ( https://www.docker.com/products/docker-desktop/ )

## Configuration php

Dans le `php.ini` à la racine de votre installation php
- Activer les extensions `zip` & `pdo_pgsql` et également le répertoire d'extension 
  
(Conseil : utilisé CTRL + F)

```
; On windows:
extension_dir = "ext"
[...]
extension=pdo_pgsql
[...]
extension=zip
```

## Installation de l'environnement

- Installer la base de donnée sur Docker

```sh
docker run --name fauvedeco -e POSTGRES_PASSWORD=00000000 -d -p 5432:5432 postgres 

docker exec -it fauvedeco psql -U postgres

<!-- copié/collé le contenue du fichier "dump.sql" situé à la racine du projet dans le terminal-->

\q
```

- Cloner le repo

`git clone git@github.com:AdrienRov/FauveDeco.git`
- Installer les composants

```sh
cd server
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:schema:update 
cd ../client
composer install
npm install
```

## Config pour les mails
- Se rendre sur 
https://mailtrap.io/
- créer un compte
- aller dans "Email Testing"
- "Add Inbox"
- Dans "Integration"
- selectionner "Symfony 5+"
- copier le MAILER_DSN et le mettre dans `.env` du /server
- Les mails seront reçu sur la boite de mailtrap

## Lancement du serveur

- Dans /client faire `npm start`
- Dans /server faire `symfony serve`

Au premier lancement :

```sql
docker exec -it fauvedeco psql -U postgres

-- créé un utilisateur en s'inscrivant depuis le site puis executer le code suivant pour créer l'administrateur
UPDATE user 
SET role = 2 
WHERE id = 1;

\q
```