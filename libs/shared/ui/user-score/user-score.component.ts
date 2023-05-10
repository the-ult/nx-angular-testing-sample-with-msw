import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ult-user-score',
  standalone: true,
  imports: [],
  template: `{{ score }}`,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--ult-radius-round);
        border: 1px solid black;

        width: 34px;
        height: 34px;
        line-height: 24px;
        vertical-align: center;

        font-size: var(--ult-typography-caption-font-size);
        font-weight: var(--ult-typography-subtitle2-font-weight);

        /* TODO: proper color variable */
        /* color: var(--ult-) */
        color: #fff;
        background-color: #204529;
        /* background-color: #571435;
        background-color: #423d0f; */
        /* background-color: var(--ult-theme-background); */
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserScoreComponent {
  @Input() score!: number;
}
