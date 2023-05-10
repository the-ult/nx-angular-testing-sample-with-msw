/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MovieError, Movies, MoviesSchema, MovieType } from '@ult/movie/data-access';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { parseResponse } from '@ult/shared/utils';
import { catchError, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);

  private readonly ENV = inject(ENVIRONMENT);

  // queryMovies$(type: MovieType = 'popular'): Observable<Movies | MovieError> {
  queryMovies$(type: MovieType = 'popular') {
    // ! FIXME: set bearer token with Interceptor or something
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Bearer ${this.ENV.bearer}`,
    });

    return this.http.get<Movies>(`${this.ENV.url.api}/movie/${type}`, { headers }).pipe(
      parseResponse(MoviesSchema),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          console.error((error.error as MovieError).status_message);

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
}
