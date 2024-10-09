The repo is currently configured to produce the error:

# installation

```
git clone https://github.com/noxify/bemi-repro
cd bemi-repro
pnpm i
cp .env.example .env
pnpm db:generate
pnpm db:migrate:dev
```

## run the app

```
pnpm dev
```

> The dev command will start the frontend app ( nextjs ) and also the mock server to test the oauth via lucia.

Now open the browser at http://localhost:3000

## Different prisma configurations

- If you want to use the `driverAdapter` configuration, just rename the `index_driverAdapter.ts` to `index.ts` inside the `packages/db` folder
  and run the command above again.
- If you want to use the "default prisma" configuration, just rename the `index_init.ts` to `index.ts` inside the `packages/db` folder
  and run the command above again.

## environment

### System

```
Operating System:
  Platform: macOS 15.0.1
  Available memory (MB): 36864
  Available CPU cores: 12
Binaries:
  Node: 22.5.1
  npm: 10.8.2
  pnpm: 9.12.1
Relevant Packages:
  next: 14.2.15
  react: 18.3.1
  react-dom: 18.3.1
  typescript: 5.6.3
```

### Database

For the database I'm using [DBNgin](https://github.com/TablePlus/DBngin).

It's postgres ;) The version is 16.4.

I just created the rds instance and changed the password for the `postgres` user.

The rest is the default configuration.
