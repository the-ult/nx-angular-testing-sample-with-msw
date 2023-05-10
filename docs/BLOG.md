# Using [mswjs](https://www.mswjs.io) with Angular, Cypress and Testing-Library in a Nx workspace

- Disclaimer (first post / needs improvements)
- Why?

  - CI (and local development) with multiple (> 6) (JAVA) docker containers and testdata => slow
  - Multiple different post about Nx, Angular, Testing-Library, Cypress, MSW, Zod
    - Wanted to combine them
    - https://timdeschryver.dev/blog/why-we-should-verify-http-response-bodies-and-why-we-should-use-zod-for-this
    - https://timdeschryver.dev/blog/how-zod-fixture-can-help-with-your-test-setups
    - https://timdeschryver.dev/blog/using-zod-fixture-with-msw-to-generate-mocked-api-responses

!! Nadelen Mocks beschrijven

- Wat als je API/data wijzigt?
- Kunnen we dat checken? -> Echte API calls en ZOD?

- using:
  - nx
  - Angular / Angular Material
    - standalone components (https://angular.io/guide/standalone-components#routing-and-lazy-loading)
    - inject() ipv constructor (add link)
    - Standalone-components, want beter/makkelijker te testen: [Single Component Angular Modules and Component Tests go hand in hand](https://timdeschryver.dev/blog/single-component-angular-modules-and-component-tests-go-hand-in-hand)

feature-movies-list
feature-movie-detail

- Cypress
  - Cypress Component Test
- Testing-library
  - Set
    ```ts
    import { configure } from '@testing-library/angular';
    configure({
      excludeComponentDeclaration: true,
    });
    ```
- mswjs
- TMDB -> https://www.themoviedb.org/
  - Grep json data (screenshots maken)
- setup msw libs
-

1. setup
2. what is msw

Sample Blogs:

- https://medium.com/@kevinkreuzer/angular-router-standalone-apis-461547e92bbc

Eventueel voor extra blogs:

- Nx and secondary entry points
- https://metaprogrammingguide.com/code/why-and-how-to-use-secondary-entrypoints-in-your-angular-libraries-in-nx

1. create lib shared/ui
2. move `src/test-setup.ts` to `shared/ui`
3. remove `src` folder
4. adjust files (jest.config.ts, project.json/sourceRoot, ng-packgr.json etc =? `src` folder

Review door:

- [ ] Marieke -> Engels
- [ ] Jitse -> Engels en Angular
- [ ] Ewout
- [ ] Tim Deschryver ? (Mswjw, Angular, etc)
- [ ] Juri?
