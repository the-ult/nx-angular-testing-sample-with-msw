import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { TVShowType } from '@ult/shared/data-access';
import { TVShowService } from './tv-show.service';

@Injectable({ providedIn: 'root' })
export class TvShowFacade {
  readonly #tvShowService = inject(TVShowService);

  readonly $queryTVShows = (type: TVShowType) =>
    toSignal(this.#tvShowService.queryTVShows$(type), { initialValue: { results: [] } });
}
