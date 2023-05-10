import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movies, MoviesSchema, MovieType } from '@ult/movie/data-access';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { parseResponse } from '@ult/shared/utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);

  private readonly ENV = inject(ENVIRONMENT);

  queryMovies$(type: MovieType = 'popular'): Observable<Movies> {
    // ! FIXME: set bearer token with Interceptor or something
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Bearer ${this.ENV.bearer}`,
    });

    return this.http
      .get<Movies>(`${this.ENV.url.api}/movie/${type}`, { headers })
      .pipe(parseResponse(MoviesSchema));
  }
}
