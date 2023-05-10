import { AsyncPipe, DatePipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '@ult/movie/data-access';
import { UserScoreComponent } from '@ult/movie/ui/user-score';
import { MovieDetail } from '@ult/shared/data-access';
import { trackByProp } from '@ult/shared/utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'ult-movie-detail-page',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, UserScoreComponent, DatePipe, NgOptimizedImage],
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailPage {
  readonly movie$: Observable<MovieDetail | null>;
  readonly mediaType: 'Movies' | 'TV Shows' = 'Movies';
  readonly trackBy = trackByProp<MovieDetail>('id');
  readonly trackByGenre = trackByProp<MovieDetail['genres'][0]>('name');

  constructor(activatedRoute: ActivatedRoute) {
    const idParameter = activatedRoute.snapshot.paramMap.get('movieId');

    if (!idParameter) {
      throw new Error('No movieId param found in route');
    }

    this.movie$ = inject(MovieService).getMovie$(+idParameter);
  }
}
