import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Movie, MovieType } from '@ult/shared/data-access';
import { MovieService } from './movie.service';

const equal = (a: unknown, b: unknown) => a === b;

@Injectable({ providedIn: 'root' })
export class MovieFacade {
	readonly #movieService = inject(MovieService);

	#state = signal(
		{
			results: [] as Movie[],
			page: 0,
			totalPages: 0,
			totalResults: 0,
		},
		{ equal },
	);
	// satisfies signal<Movies>;

	readonly $getMovies = computed(() => this.#state().results, { equal });
	// !FIXME: update state with the new value
	readonly $get = (id: number) => toSignal(this.#movieService.getMovie$(id), { initialValue: undefined });

	readonly $queryMovies = (type: MovieType) =>
		toSignal(this.#movieService.queryMovies$(type), {
			initialValue: { results: [] },
		});
}
