import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ult-movie-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailPage {}
