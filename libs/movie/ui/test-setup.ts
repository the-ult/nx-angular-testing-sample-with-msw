// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Jest global
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};
import '@testing-library/jest-dom';
import 'jest-preset-angular/setup-jest';
