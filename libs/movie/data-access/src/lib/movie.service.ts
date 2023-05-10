import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import {
  ENVIRONMENT,
  MediaError,
  MovieDetail,
  MovieDetailSchema,
  Movies,
  MoviesSchema,
  MovieType,
} from '@ult/shared/data-access';
import { parseResponse } from '@ult/shared/utils';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);

  private readonly ENV = inject(ENVIRONMENT);

  // queryMovies$(type: MovieType = 'popular'): Observable<Movies | MovieError> {
  queryMovies$(type: MovieType = 'popular') {
    return this.http.get<Movies>(`${this.ENV.url.api}/movie/${type}`).pipe(
      parseResponse(MoviesSchema),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.error((error.error as MediaError).status_message);

          // TODO: show Notification message or emptyState / 404
          // return of(error.error);

          const emptyResult: Pick<Movies, 'results'> = {
            results: [],
          };
          return of(emptyResult);
        }

        return throwError(() => error);
      })
    );
  }

  getMovie$(id: number): Observable<MovieDetail | null> {
    return this.http.get<MovieDetail>(`${this.ENV.url.api}/movie/${id}`).pipe(
      parseResponse(MovieDetailSchema),
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
