# Setup dynamic ENVIRONMENT

- [Nx Issue: Adding envFile argument in nx serve / build for custom env loading](https://github.com/nrwl/nx/issues/7729#issuecomment-1318514444)

- [NX: Using environment variables in Angular applications](https://nx.dev/recipes/environment-variables/use-environment-variables-in-angular)

## APP

Create a `apps/movie-db/.env.local` which will be used as default.
If you wish to use the service with your own API key, add the Bearer token of [TMDB](https://www.themoviedb.org/settings/api):

```env
# DEFAULT LOCAL DEVELOPMENT ENV SETTINGS
NX_API_URL=https://api.themoviedb.org/3
NX_IMG_URL=https://image.tmdb.org/t/p/w220_and_h330_face
NX_TMDB_BEARER=[YOUR BEARER TOKEN: https://developers.themoviedb.org/3]
NX_MSW_API_MOCKING=false
```

and an `apps/movie-db/.env.serve.msw` for usage with MSW:

```
# MOCK/MSW LOCAL DEVELOPMENT ENV SETTINGS
NX_API_URL=http://localhost:4200
NX_IMG_URL=https://image.tmdb.org/t/p/w220_and_h330_face
NX_MSW_API_MOCKING=true
NX_TMDB_BEARER=MOCK_BEARER
```

### project.json

Add an extra configuration: `msw` to the `serve` target in `apps/movie-db/project.json`.
This target will automatically be used to load the proper `.env.mock` environment settings.

```json
"targets": {
  "build":{},
  "serve": {
      "executor": "@nx/angular:webpack-dev-server",
      "configurations": {
        "production": {
          "browserTarget": "movie-db:build:production"
        },
        "development": {
          "browserTarget": "movie-db:build:development"
        },
        // ADD MSW target
        "msw": {
          "browserTarget": "movie-db:build:development"
        }
      },
      // YOU COULD EVEN CHANGE THE DEFAULT TO "msw"
      "defaultConfiguration": "development"
    },
}
```

Run with: `nx serve -c=msw movie-db`

## For E2E

Add a `apps/movie-db-e2e/.env.e2e` for usage with MSW:

```
# MOCK/MSW LOCAL DEVELOPMENT ENV SETTINGS
NX_API_URL=http://localhost:4200
NX_IMG_URL=https://image.tmdb.org/t/p/w220_and_h330_face
NX_MSW_API_MOCKING=true
NX_TMDB_BEARER=MOCK_BEARER
```
