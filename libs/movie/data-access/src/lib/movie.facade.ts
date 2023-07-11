import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { MovieType } from '@ult/shared/data-access';
import { MovieService } from './movie.service';

@Injectable({ providedIn: 'root' })
export class MovieFacade {
  #movieService = inject(MovieService);

  readonly $get = (id: number) =>
    toSignal(this.#movieService.getMovie$(id), { initialValue: undefined });

  readonly $queryMovies = (type: MovieType) =>
    toSignal(this.#movieService.queryMovies$(type), {
      initialValue: { results: [] },
    });
}
