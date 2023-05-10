/// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom';
import 'jest-preset-angular/setup-jest';

/**
 * Import the MSW server
 * Which automatically does the `beforeAll`, `afterEach` and `afterAll`.
 * It listens, resets and stops the MSW server
 */
import '@ult/shared/test/msw/server';
