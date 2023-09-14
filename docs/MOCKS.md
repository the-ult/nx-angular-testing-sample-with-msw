## TMDB

_If you like to test it yourself with [TMDB](https://developers.themoviedb.org/3/getting-started/introduction), you will need to get an API-token/Bearer token._

## @myorg/shared/test/mocks

### 1. tsconfig.(base).json

For Mock files:
Why: To enable exporting and importing our `json` files.

Add:

```json
{
  ...
  /// Enable importing .json files
  /// See more: https://www.typescriptlang.org/tsconfig#resolveJsonModule
  `"resolveJsonModule": true,`
  /// Allow 'import x from y' when a module doesn't have a default export.
  /// See more: https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports
  `"allowSyntheticDefaultImports": true,`
}
```

### 2. Create `shared/test/mocks`

```
npx nx generate @nx/workspace:library mock --directory=shared/test --tags=scope:shared-test,type:mock --buildable --skipBabelrc --unitTestRunner=none --no-interactive
```

### 3. Remove obsolete file

- `libs/shared/test/mock/src/lib/shared-test-mock.ts`

## Adding the mock data

- Using a REST Client (Like [Insomnia](https://insomnia.rest/))

![GetMovies](./img/insomnia_getmovies.png 'Get movies with insomnia')

1. Copy the response and save it in: `libs/shared/test/mocks/src/lib/movie/movies-popular-page-1.json`
2. Create an `index.ts` in `libs/shared/test/mocks/src/lib/movie/index.ts`
3. Export the response:
   ```ts
   export { default as MoviesPopularPage1 } from './movies-popular-page-1.json';
   ```
4. Add export to root `index.ts`: `libs/shared/test/mocks/src/index.ts`
   ```ts
   export * from './lib/movie';
   ```
5. Now we can import the mock data like:

   ```ts

   ```

And to add some extra mock data, like to test pagination, we add a `movies-popular-page-2.json` as well.
By calling: `https://api.themoviedb.org/3/movie/popular?page=2`

So now we have:

```ts
export { default as MoviesPopularPage1 } from './movies-popular-page-1.json';
export { default as MoviesPopularPage2 } from './movies-popular-page-2.json';
```

And we are gonna be adding a lot more mock data.
