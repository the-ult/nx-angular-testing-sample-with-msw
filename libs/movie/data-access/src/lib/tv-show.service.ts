import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import {
  ENVIRONMENT,
  MediaError,
  TvShows,
  TVShowsSchema,
  TVShowType,
} from '@ult/shared/data-access';
import { parseResponse } from '@ult/shared/utils';
import { catchError, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TVShowService {
  private http = inject(HttpClient);

  private readonly ENV = inject(ENVIRONMENT);

  queryTVShows$(type: TVShowType = 'popular') {
    return this.http.get<TvShows>(`${this.ENV.url.api}/tv/${type}`).pipe(
      parseResponse(TVShowsSchema),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.error((error.error as MediaError).status_message);

          // TODO: show Notification message or emptyState / 404
          // return of(error.error);

          const emptyResult: Pick<TvShows, 'results'> = {
            results: [],
          };
          return of(emptyResult);
        }

        return throwError(() => error);
      })
    );
  }
}
