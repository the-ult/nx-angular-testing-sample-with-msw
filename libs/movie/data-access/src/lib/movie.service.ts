import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import type { MediaError, MovieDetail, Movies, MovieType } from '@ult/shared/data-access';
import { ENVIRONMENT, MovieDetailSchema, MoviesSchema } from '@ult/shared/data-access';
import { parseResponse } from '@ult/shared/utils';
import type { Observable } from 'rxjs';
import { catchError, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
	readonly #http = inject(HttpClient);
	readonly #BASE_URL = inject(ENVIRONMENT).url.api;

	// queryMovies$(type: MovieType = 'popular'): Observable<Movies | MovieError> {
	queryMovies$(type: MovieType = 'popular') {
		return this.#http.get<Movies>(`${this.#BASE_URL}/movie/${type}`).pipe(
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
			}),
		);
	}

	getMovie$(id: number): Observable<MovieDetail | null> {
		return this.#http.get<MovieDetail>(`${this.#BASE_URL}/movie/${id}`).pipe(
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
			}),
		);
	}
}
