import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import type { MediaError, TvShowDetail, TvShows, TVShowType } from '@ult/shared/data-access';
import { ENVIRONMENT, TvShowDetailSchema, TVShowsSchema } from '@ult/shared/data-access';
import { parseResponse } from '@ult/shared/utils';
import type { Observable } from 'rxjs';
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

  getTvShow$(id: number): Observable<TvShowDetail | null> {
    return this.http.get<TvShowDetail>(`${this.ENV.url.api}/movie/${id}`).pipe(
      parseResponse(TvShowDetailSchema),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.error((error.error as MediaError).status_message);

          // TODO: show Notification message or emptyState / 404
          // return of(error.error);

          // eslint-disable-next-line unicorn/no-null
          return of(null);
        }

        return throwError(() => error);
      })
    );
  }
}
