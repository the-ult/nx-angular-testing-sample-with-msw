import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Movie } from '@ult/movie/data-access';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { UserScoreComponent } from '@ult/shared/ui/user-score';

@Component({
  selector: 'ult-media-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLinkWithHref, UserScoreComponent, DatePipe],
  template: `
    <a [routerLink]="[mediaData.id]">
      <img
        [alt]="mediaData.title"
        [ngSrc]="ENV.url.img + mediaData.poster_path"
        width="180"
        height="275"
      />
    </a>
    <div class="card__content">
      <ult-user-score [score]="mediaData.vote_average" data-testid="movie-score"></ult-user-score>
      <h4>{{ mediaData.title }}</h4>
      <p class="date">{{ mediaData.release_date | date }}</p>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        border: 1px solid #e3e3e3;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px 0px;
        border-radius: var(--ult-image-border-radius);
        background-color: #fff;
        /*  ! FIXME: proper sizes */
        width: 182px;
      }

      img {
        background-image: cover;
        border-radius: var(--ult-image-border-radius) var(--ult-image-border-radius) 0 0;
      }

      .card__content {
        position: relative;
        padding: var(--ult-space) var(--ult-space-md);
      }

      h4 {
        margin: 0;
        text-overflow: ellipsis;
        width: inherit;
        white-space: nowrap;
        overflow: hidden;
      }

      p.date {
        margin: 0;
        /* color: var(--ult-theme-text-secondary-on-light); */
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
      }

      ult-user-score {
        position: absolute;
        top: calc(-1 * var(--ult-space-md));
        left: var(--ult-space-xs);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UltMediaCardComponent {
  protected readonly ENV = inject(ENVIRONMENT);

  @Input() mediaData!: Pick<
    Movie,
    'title' | 'id' | 'release_date' | 'vote_average' | 'poster_path'
  >;
}
