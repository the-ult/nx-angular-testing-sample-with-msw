import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';

@Component({
	selector: 'ult-user-score',
	standalone: true,
	template: `
		<span class="percentage">{{ score }}</span>
	`,
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

				font-size: var(--ult-typography-body-small-font-size);
				font-weight: 300;
				letter-spacing: 0.5px;

				color: var(--ult-color-default-contrast);
				background-color: #204529;
				/* background-color: #571435;
        background-color: #423d0f; */
				/* background-color: var(--ult-theme-background); */
			}

			.percentage::after {
				content: '%';
				position: absolute;
				top: 0;
				right: 3px;
				font-size: 0.5em;
				color: rgba(255, 255, 255, 0.7);
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserScoreComponent {
	@Input({ required: true, transform: numberAttribute }) score!: number;
}
