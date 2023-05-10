import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieService } from '@ult/movie/data-access';
import { Movie } from '@ult/shared/data-access';
import { UltMediaCardComponent } from '@ult/shared/ui/media-card';
import { trackByProp } from '@ult/shared/utils';
import { map } from 'rxjs';

@Component({
  selector: 'ult-movies-page',
  standalone: true,
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  imports: [UltMediaCardComponent, NgForOf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesPage {
  readonly movies$ = inject(MovieService)
    .queryMovies$('popular')
    .pipe(map((movie) => movie.results));

  readonly movieTrackBy = trackByProp<Movie>('id');
}
