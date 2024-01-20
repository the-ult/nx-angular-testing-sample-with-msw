import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieFacade, TvShowFacade } from '@ult/movie/data-access';
import { UltMediaCardComponent } from '@ult/movie/ui/media-card';
import type { Movie, TvShow } from '@ult/shared/data-access';
import { trackByProp } from '@ult/shared/utils';

@Component({
  selector: 'ult-movie-feature-shell',
  standalone: true,
  imports: [UltMediaCardComponent, AsyncPipe],
  templateUrl: './movie-feature-shell.component.html',
  styleUrls: ['./movie-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFeatureShellPage {
  // !FIXME: use computed in the facade
  protected readonly popularMovies = inject(MovieFacade).$queryMovies('popular')().results;

  protected readonly popularTVShows = inject(TvShowFacade).$queryTVShows('popular')().results;

  protected readonly trackBy = trackByProp<Movie | TvShow>('id');
}
