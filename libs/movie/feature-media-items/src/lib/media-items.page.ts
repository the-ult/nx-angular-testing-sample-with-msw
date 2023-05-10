import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, TVShowService } from '@ult/movie/data-access';
import { UltMediaCardComponent } from '@ult/movie/ui/media-card';
import { Movie, RouteType, TvShow } from '@ult/shared/data-access';
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
  readonly title: 'Movies' | 'TV Shows' = 'Movies';
  readonly mediaType: RouteType;
  readonly trackBy = trackByProp<Movie | TvShow>('id');

  constructor(activatedRoute: ActivatedRoute) {
    // ! FIXME: how can we use this without the Evil `as`
    this.mediaType = activatedRoute.snapshot.data['mediaType'] as RouteType;

    if (this.mediaType === 'movie') {
      this.mediaItems$ = inject(MovieService)
        .queryMovies$('popular')
        .pipe(map((movie) => movie.results));

      this.title = 'Movies';
    }
    if (this.mediaType === 'tv') {
      this.mediaItems$ = inject(TVShowService)
        .queryTVShows$('popular')
        .pipe(map((tvShow) => tvShow.results));

      this.title = 'TV Shows';
    }
  }
}
