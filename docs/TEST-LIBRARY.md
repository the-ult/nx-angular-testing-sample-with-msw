# [(Angular) Testing Library](https://testing-library.com/docs/angular-testing-library/intro)

## Install

```console
npm install --save-dev @testing-library/angular @testing-library/user-event @testing-library/jest-dom
```

### Add additional libraries for linting

```console
npm install --save-dev  eslint-plugin-testing-library eslint-plugin-jest-dom @types/testing-library__jest-dom
```

#### Setup ESLint

Add:

```json
{
  "overrides": [
    ...
    {
      "files": [
        "{apps,libs}/**/__tests__/**/*.[jt]s?(x)",
        "{apps,libs}/**/?(*.)+(spec|test).[jt]s?(x)"
      ],
      "env": {
        "jest": true
      },
      "extends": [
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/angular",
      ],
      "rules": {
        "testing-library/prefer-explicit-assert": "error",
        "testing-library/prefer-user-event": "error",
        "testing-library/prefer-wait-for": "error",
        "jest/consistent-test-it": ["error"],
        "@typescript-eslint/unbound-method": "off",
        "jest/unbound-method": "error"
      }
    }
  ]
}
```

## MWSjs setup for Jest tests

- [MSWjs: setup node mockServer](https://mswjs.io/docs/getting-started/integrate/node)
- [Using MSW in an Angular project with Jest](https://timdeschryver.dev/blog/using-msw-in-an-angular-project#jest-tests)

## Extra resources

TODO: add blogposts from Tim
