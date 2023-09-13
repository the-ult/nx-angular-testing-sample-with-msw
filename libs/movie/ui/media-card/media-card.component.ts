import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { ENVIRONMENT, RouteType } from '@ult/shared/data-access';
import { UserScoreComponent } from '../user-score';
import { MediaCardInput, isMovieCardInput } from './media-card.model';

@Component({
  selector: 'ult-media-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLinkWithHref, UserScoreComponent, DatePipe],
  template: `
    <a [routerLink]="['/', mediaType, mediaData.id]">
      <img width="180" height="275" [alt]="title" [ngSrc]="ENV.url.img + mediaData.poster_path" />
    </a>
    <div class="card__content">
      <ult-user-score data-testid="movie-score" [score]="mediaData.vote_average />>
      <h4>{{ title }}</h4>
      <p class="date">{{ releaseDate | date }}</p>
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

        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;

        &:hover {
          transform: scale(1.03);
        }
      }

      a {
        display: inline-block;
      }

      img {
        object-fit: cover;
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
        right: var(--ult-space-xs);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UltMediaCardComponent {
  protected readonly ENV = inject(ENVIRONMENT);

  @Input({ required: true })
  mediaData!: MediaCardInput;

  @Input({ required: true })
  mediaType!: RouteType;

  get title() {
    return isMovieCardInput(this.mediaData) ? this.mediaData.title : this.mediaData.name;
  }

  get releaseDate() {
    return isMovieCardInput(this.mediaData) ? this.mediaData.release_date : this.mediaData.first_air_date;
  }
}
