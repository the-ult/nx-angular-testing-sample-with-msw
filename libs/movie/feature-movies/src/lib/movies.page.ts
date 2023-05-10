import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, TrackByFunction } from '@angular/core';
import { Movie } from '@ult/movie/data-access';
import { map } from 'rxjs';
import { UltMediaCardComponent } from './media-card/media-card.component';
import { MovieService } from './movie.service';

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

  readonly movieTrackBy: TrackByFunction<Movie> = (index, { id }) => id || index;
}
