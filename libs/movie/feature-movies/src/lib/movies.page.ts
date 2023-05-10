import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    .pipe(map(({ results }) => results));
}
