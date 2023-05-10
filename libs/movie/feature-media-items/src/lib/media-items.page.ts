import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, TVShowService } from '@ult/movie/data-access';
import { Movie, RouteType, TvShow } from '@ult/shared/data-access';
import { UltMediaCardComponent } from '@ult/movie/ui/media-card';
import { trackByProp } from '@ult/shared/utils';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'ult-media-items-page',
  standalone: true,
  templateUrl: './media-items.page.html',
  styleUrls: ['./media-items.page.scss'],
  imports: [UltMediaCardComponent, NgForOf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemsPage {
  readonly mediaItems$!: Observable<(Movie | TvShow)[]>;
  readonly mediaType: 'Movies' | 'TV Shows' = 'Movies';
  readonly trackBy = trackByProp<Movie | TvShow>('id');

  constructor(activatedRoute: ActivatedRoute) {
    // ! FIXME: how can we use this without the Evil `as`
    const type = activatedRoute.snapshot.data['mediaType'] as RouteType;

    if (type === 'movies') {
      this.mediaItems$ = inject(MovieService)
        .queryMovies$('popular')
        .pipe(map((movie) => movie.results));

      this.mediaType = 'Movies';
    }
    if (type === 'tvShows') {
      this.mediaItems$ = inject(TVShowService)
        .queryTVShows$('popular')
        .pipe(map((tvShow) => tvShow.results));

      this.mediaType = 'TV Shows';
    }
  }
}
