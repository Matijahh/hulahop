# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Print-on-demand marketplace. Admins define base garments, associates place their designs on them and sell through their own brand store (served at the root path `/:id`), and customers buy. Serbian is the default language.

The repo holds two independent npm packages with no root `package.json`: `backend/` (NestJS 10, TypeORM, MySQL) and `frontend/` (React 18, Vite, plain JSX). Run commands from the relevant package directory.

## Commands

Backend (`backend/`):

```bash
npm run start:dev                                     # watch mode on port 3000, Swagger at /swagger
npm run build
npx tsc --noEmit -p tsconfig.build.json               # type-check
npx jest src/app.controller.spec.ts                   # single spec
npx eslint src/modules/colors/colors.service.ts       # lint one file without auto-fixing
```

Frontend (`frontend/`):

```bash
npm run dev
npm run build
npm run lint
```

Current state of the checks:

- Type-checking and builds are the reliable gates.
- Most Jest suites fail at import because the Jest config has no mapping for the absolute `src/...` imports used throughout the backend. Nearly all specs are `should be defined` scaffolds anyway. The frontend has no tests.
- Backend `npm run lint` includes `--fix` and rewrites unrelated files, so lint only the files you touched with `npx eslint`. Both packages have a large backlog of existing lint errors, so `npm run lint` fails before any change.

## Environment

Each package reads a gitignored `.env`, and there is no example file.

- Backend, required (the process exits without them): `DB_USERNAME`, `DB_HOST`, `ACCESS_SECRET_KEY`, `REFRESH_SECRET_KEY`.
- Backend, optional: `DB_PASSWORD`, `DB_PORT`, `DB_DATABASE`, `APP_URL` (password reset links), `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SENDER`, `SMTP_RECEIVER`.
- Frontend: `VITE_BASE_SERVER_URL`.

`PORT` is read into `config` but unused, because `main.ts` hard-codes 3000.

## Domain model

- `products` are admin-owned base garments. They nest `product_variants` (color) and `product_sub_variants` (size and quantity), and store print-frame geometry for the front and back (`x_position`, `frame_width`, and `*_back` equivalents).
- `ProductsService.update` deletes and recreates all variants and sub-variants, so their ids change on every product edit.
- Each variant (color) has its own front photo (`image_id`) and optional back photo (`image_id_back`). The admin form saves the first (main) variant's photos as the product-level `image_id` and `image_id_back`, which are the fallback when a color has no back photo.
- `associate_products` are an associate's design on a base product. `image_json` and `image_json_back` hold Konva placement data, rendered by `components/PreviewJsonImage`. A non-null `image_id_back` marks a two-sided design.
- `products.double_design_price` is the surcharge for two-sided designs. The editor adds it to the base price, and when an admin changes it, `ProductsService.update` applies the difference to every two-sided associate product of that base product.
- User roles are `USER`, `ASSOCIATE`, and `ADMIN`.

## Backend architecture

**Module shape.** Each feature in `src/modules/<name>/` has a controller, service, module, `dto/`, `entities/`, and `repository/`. Register new modules in `modules/application.module.ts`, unless another module imports them.

**Data access.** Repositories are module-level constants (`dataSource.getRepository(Entity)`), not `@InjectRepository`. Services extend `AbstractService` and call `super(repository)`. Multi-table writes use a manual `dataSource.createQueryRunner()` transaction. Entities are auto-discovered from `*.entity.ts` and `entities/*`.

**Schema changes are manual.** `synchronize` is off and no migrations exist, so `npm run migration:run` has nothing to run. The baseline is `database/table.sql`, with later changes in `database/alter-query.sql`. A new column needs the entity change plus an `ALTER` applied to each database. These SQL files lag behind the entities (`products.double_design_price` is in neither), so don't treat them as the full schema.

**Auth.** `JwtAuthGuard` and `RolesGuard` are global, registered in `core/core.module.ts`. Every route needs a bearer token unless its handler has `@SkipAuth()`, which is only checked per handler and has no effect on a controller class. Restrict by role with `@Roles([Role.ADMIN])`.

**Responses.** Controllers use `@Res()` with `baseController.getResult(res, status, data, message)`, which returns `{ data, message }`, so the frontend reads `response.data.data`. The global `HttpExceptionFilter` returns `{ statusCode, message }`.

**Images.** Uploads go to `./uploads` under the process working directory, alongside a sharp-generated WebP copy. Other tables reference images by UUID, served publicly at `GET /images/:id` and `GET /images/compressed/:id`.

**Production file paths.** With `NODE_ENV=production`, translations and `.hbs` mail templates are read relative to the working directory instead of `src/`. `nest-cli.json` only copies `i18n/**` to `dist`, so the `.hbs` templates are not part of the build output.

## Frontend architecture

**Layout.** Views are grouped by audience under `views/` (`Admin`, `Associats`, `Users`, `Authentication`). The design editor exists as two parallel copies that have partly diverged: `views/Admin/AssociatesProducts/EditProduct` and `views/Associats/Products/EditProduct`. Editor changes usually need to be made in both.

**Routing.** Path constants live in `routes/routes.js`, and `routes/Modules/*` wraps each view in its layout. `routes/index.jsx` chooses the route set once at import from `localStorage`, and `utils/constant.jsx` reads the access token once at import for the axios default header. Login and logout therefore need a full page load (`window.location`), not client-side navigation.

**API calls.** Use `axiosInstance` and the helpers in `utils/axiosInstance.jsx`. The response interceptor already shows a toast with the translated `message` for every non-404 error, so call sites should not toast errors again. A 401 clears the tokens and redirects to `/sign-in`.

## Translations

Keys are the English source strings (`keySeparator: false`), and backend error messages are displayed through the same lookup. Add each new string to all four files:

- `frontend/src/locales/en/translation.json`
- `frontend/src/locales/sr/translation.json`
- `backend/src/i18n/en/translation.json`
- `backend/src/i18n/sb/translation.json`

On startup `App.jsx` fetches `GET /translations/{sb|en}` and re-initializes i18next, so the backend files are what the running app shows. Serbian is `sr` on the frontend and `sb` on the backend. `POST /translations` rewrites the files in `backend/src/i18n` on disk.
