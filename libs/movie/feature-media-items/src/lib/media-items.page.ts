import { AsyncPipe, NgForOf } from '@angular/common';
import type { Signal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  Input as RouterInput,
  computed,
  inject,
} from '@angular/core';
import { MovieFacade, TvShowFacade } from '@ult/movie/data-access';
import { UltMediaCardComponent } from '@ult/movie/ui/media-card';
import type { Movie, TvShow } from '@ult/shared/data-access';
import { RouteType } from '@ult/shared/data-access';
import { trackByProp } from '@ult/shared/utils';

@Component({
  selector: 'ult-media-items-page',
  standalone: true,
  templateUrl: './media-items.page.html',
  styleUrls: ['./media-items.page.scss'],
  imports: [UltMediaCardComponent, NgForOf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemsPage {
  @RouterInput({ required: true }) mediaType!: RouteType;

  readonly mediaItems!: Signal<(Movie | TvShow)[]>;
  readonly title: 'Movies' | 'TV Shows' = 'Movies';
  readonly trackByMovieId = trackByProp<Movie | TvShow>('id');

  constructor() {
    // ! FIXME: how can we use this without the Evil `as`

    if (this.mediaType === 'movie') {
      this.mediaItems = computed(() => inject(MovieFacade).$queryMovies('popular')().results);

      this.title = 'Movies';
    }

    if (this.mediaType === 'tv') {
      this.mediaItems = computed(() => inject(TvShowFacade).$queryTVShows('popular')().results);

      this.title = 'TV Shows';
    }
  }
}
