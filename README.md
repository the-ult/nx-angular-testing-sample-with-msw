# MOVIE-DB - Nx and Angular Playground

![Main page](./docs/img/movie-db-main.png)

## What

![WIP](./docs/img/wip.png)

A Movies DB demo app based on the amazing [The Movie DB](https://www.themoviedb.org/) to play with the newest [Nx](https://nx.dev) and [Angular](https://angular.io) _'best practices'_ like [Standalone Components](https://angular.io/guide/standalone-components), `Inject()` and plenty more. While following Semantic HTML and newest CSS solutions.

Providing the best [VSCode settings](.vscode/settings.json), [VSCode extensions](.vscode/extensions.json) and [ESLint](.eslintrc.json) settings.

Using tools like: [Cypress](https://cypress.io), [MSWjs](https://mswjs.io), [Zod](https://zod.dev/?id=introduction), [Testing Library Angular](https://testing-library.com/docs/angular-testing-library/intro/) and others.

Trying to provide a good base for both a learning and as a starter repository.

## Why

I wanted to write a blogpost about using [MSWjs](https://mswjs.io) in a Nx repo with both Cypress, Cypress Component Tests and @testing-library/angular.
To be able to write a proper blogpost, I needed to setup a proper example repo.
While creating this example repo, I figured, let's use and try the newest Angular best practices.
And create an example app, which can be used as a starter/example for future projects as well.

(The blogpost is still WIP 😇)

## Tech / Tools used

- [Nx](https://nx.dev)
- [Angular](https://angular.io)
- [Cypress](https://cypress.io)
  - [Cypress Testing Library](https://github.com/testing-library/cypress-testing-library) - for end to end test assertions
- [Jest](https://jestjs.io) - for running unit tests
  - [Testing Library Angular](https://testing-library.com/docs/angular-testing-library/intro/) - for unit test assertions
- [MSWjs](https://mswjs.io)
- [Zod](https://zod.dev/?id=introduction)

## Setup

#### Enable pnpm

```
❯ corepack enable
```

### Install dependencies

```
❯ pnpm install
```

## Run

#### Start dev server with MSW mocking at localhost:4200

```
❯ pnpm start:msw movie-db
```

OR

```
❯ nx mock movie-db
```

Or run with live data.

> In this case you first have to add your TMDB BEARER token
> to [apps/movie-db/.env.serve](./apps/movie-db/.env.local)
>
> See:
>
> - [TMDB - documentation](https://developers.themoviedb.org/3/getting-started/authentication#bearer-token)
> - [TMDB - user settings](https://www.themoviedb.org/settings/api)

```
❯ nx serve movie-db
```

### E2E

```
❯ pnpm e2e:msw
```

OR

```
❯ nx e2e movie-db-e2e [--watch --browser=chrome]
```

### Cypress Component Test

```
pnpm nx component-test movie-feature-media-items --watch
```

OR

```
nx run movie-feature-media-items:component-test --watch
```

## Best practices followed

- Using [Standalone components](https://angular.io/guide/standalone-components)
- Use `inject()` instead of `constructor()` to initialize services
  - **N.B**
    We Set the `"target": "ES2022"`, which means the `"useDefineForClassFields"` is automatically set to `true`. And Angular will not set it to `false`.
    We do this to force the use of `inject()` instead of using Dependency Injection via the `constructor()`, which is not EcmaScript-compliant and be [future proof](https://angular.schule/blog/2022-11-use-define-for-class-fields) and avoid future breaking changes.
- Strict settings in `tsconfig` and with `ESLint` to help/force best practices
- Use [Nx - Grouping libraries](https://nx.dev/more-concepts/grouping-libraries#example-workspace) with a little DDD sauce, to force a cohesive structure
- functional Interceptors and functional Guards

## Things I would like to add / improve

- [ ] Refactor to use Angular Signals
- [ ] Use OpenAPI-to-zod to generate Zod types
- [ ] Create `provideMswHandler` provider
- [ ] Add/improve tv/movie detail page
- [ ] Add shared styles as example
- [ ] Working Cypress Component Tests with MSWjs
  - They now result in a race condition. See: [MSW leaves cypress component test runner in a loop](https://github.com/mswjs/msw/issues/744)
- [ ] Proper Error handling
- [ ] Add proper Logging `provideLogger()`
- [ ] Setup Github actions and github page
- [ ] Refactor and use [Tailwind CSS](https://tailwindcss.com/) ?? (just to try it out)
- [ ] Responsive (using container-queries)
- [ ] Do not use image url's while testing (add images to mock assets)

## Credits / Resources / Thanks / Shout-outs

- Data provided by [The Movie DB](https://www.themoviedb.org)
- The amazing teams and community of both [@Angular](https://www.angular.io) and [Nx](https://nx.dev)!
- [Netanel Basal](https://netbasal.medium.com/)
  - Amazing (short) blogposts
  - Creator of [ngneat](https://github.com/ngneat) with great tools like: [Elf](ngneat.github.io/elf/), [Transloco](ngneat.github.io/transloco/), [until-destroy](https://github.com/ngneat/until-destroy) and plenty more.
- [Tim Deschryver](https://timdeschryver.dev/blog/getting-the-most-value-out-of-your-angular-component-tests)
  - Great blogposts about Angular, Testing, and plenty more.
- [Kent C. Dodds](https://kentcdodds.com/blog?q=testing)
  - Creator of Testing Library
  - Testing Jedi
- [Movies App](https://tastejs.com/movies/) - Amazing sample applications for different frameworks.
- [Nuxt Movies](https://github.com/nuxt/movies) - TMDB example app with Nuxt and VueJs
- [Unnecessary VSCode Extensions](https://javascript.plainenglish.io/unnecessary-vscode-extensions-e72cb637f1cf) - See [VSCode Extension Settings](/.vscode/extensions.json) and [VSCode workspace settings](.vscode/settings.json)

<!-- - [Versatile Angular - Younes Jaaidi](https://marmicode.io/blog/versatile-angular) - Angular (SFC) with Vite
- [Analogjs](https://github.com/analogjs/analog) - Amazing all in one framework for Angular by Brandon Roberts. Using Vite -->
