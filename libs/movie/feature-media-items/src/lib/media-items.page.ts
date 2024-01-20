import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input as RouterInput, computed, inject } from '@angular/core';
import { MovieFacade } from '@ult/movie/data-access';
import { UltMediaCardComponent } from '@ult/movie/ui/media-card';
import type { Movie, TvShow } from '@ult/shared/data-access';
import { RouteType } from '@ult/shared/data-access';
import { trackByProp } from '@ult/shared/utils';

@Component({
  selector: 'ult-media-items-page',
  standalone: true,
  templateUrl: './media-items.page.html',
  styleUrls: ['./media-items.page.scss'],
  imports: [UltMediaCardComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemsPage {
  // !FIXME: the required is not working with a router input => should check in the constructor or ngOnInit as well
  @RouterInput({ required: true }) mediaType!: RouteType;

  readonly #movieFacade = inject(MovieFacade);
  readonly #$movieItems = this.#movieFacade.$queryMovies('popular');

  protected readonly $mediaItemResults = computed(() => this.#$movieItems().results); //.results;
  protected readonly title: 'Movies' | 'TV Shows' = 'Movies';
  protected readonly trackByMovieId = trackByProp<Movie | TvShow>('id');

  // constructor() {
  // effect(() => {
  //   console.log('mediaItems', this.$mediaItemResults());
  // });
  // ! FIXME: how can we use this without the Evil `as`
  // if (this.mediaType === 'movie') {
  //   this.$mediaItems = computed(() => inject(MovieFacade).$queryMovies('popular')().results);
  //   this.title = 'Movies';
  // }
  // if (this.mediaType === 'tv') {
  //   this.$mediaItems = computed(() => inject(TvShowFacade).$queryTVShows('popular')().results);
  //   this.title = 'TV Shows';
  // }
  // }
}
