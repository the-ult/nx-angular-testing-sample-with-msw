import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movies, MoviesSchema, MovieType } from '@ult/movie/data-access';
import { parseResponse } from '@ult/shared/utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);

  queryMovies$(type: MovieType = 'popular'): Observable<Movies> {
    return this.http.get<Movies>(`movie/${type}`).pipe(parseResponse(MoviesSchema));
  }
}
