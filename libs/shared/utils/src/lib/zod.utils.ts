import { inject } from '@angular/core';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { MonoTypeOperatorFunction, tap } from 'rxjs';
import type { ZodType } from 'zod';

/**
 *
 * ! FIXME => check if this is correct
 * N.B.
 *   The (extra) awesome thing when using the parseResponse (zod) and MSWjs, is when
 *   you are using the mock-data in your tests. The mock-data wil automatically be validated
 *   against the zod-Schema
 *
 * Thanks to Tim Deschryver
 * @see: https://timdeschryver.dev/blog/why-we-should-verify-http-response-bodies-and-why-we-should-use-zod-for-this#using-the-zod-schema-within-the-service
 *
 * @param schema
 *
 * @returns
 */
export function parseResponse<T>(schema: ZodType): MonoTypeOperatorFunction<T> {
  const env = inject(ENVIRONMENT);

  // ! FIXME: improve and add proper description
  // ! Shouldn't we use map() instead of tap()?
  // ! And catchError()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return tap({
    next: (value: T) => {
      if (env.production) {
        const parsed = schema.safeParse(value);
        if (!parsed.success) {
          // Log to service to be informed
          console.error(parsed.error);
        }
      } else {
        // Throw in development so we're aware of the error

        schema.parse(value);
      }
    },
  });
}
