import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieService, TVShowService } from '@ult/movie/data-access';
import { Movie, TvShow } from '@ult/shared/data-access';
import { UltMediaCardComponent } from '@ult/shared/ui/media-card';
import { trackByProp } from '@ult/shared/utils';

import { map } from 'rxjs';

@Component({
  selector: 'ult-movie-feature-shell',
  standalone: true,
  imports: [UltMediaCardComponent, NgForOf, AsyncPipe],
  templateUrl: './movie-feature-shell.component.html',
  styleUrls: ['./movie-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFeatureShellPage {
  readonly popularMovies$ = inject(MovieService)
    .queryMovies$('popular')
    .pipe(map(({ results }) => results));

  readonly popularTVShows$ = inject(TVShowService)
    .queryTVShows$('popular')
    .pipe(map(({ results }) => results));

  readonly trackBy = trackByProp<Movie | TvShow>('id');
}
