# Restaurant Service

## Description

This is restaurant service that handle booking reservation usecase.

## Project setup

- Install PostgreSQL
- Create user and database
- Create configuration file `.env`

```bash
# create file
$ touch .env
```

- Add your `DATABASE_URL` to `.env` file

```bash
DATABASE_URL="postgres://{username}:{password}@localhost:5432/{dbname}"
```

- Run prisma db migration and generate PrismaClient

```bash
# migration
$ npx prisma migrate dev

# generate PrismaClient
$ npx prisma generate
```

- Install dependencies

```bash
# install dependencies
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

Please visit <http://localhost:3000/api> to access swagger
