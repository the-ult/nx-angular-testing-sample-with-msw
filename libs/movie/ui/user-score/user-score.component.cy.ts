import { TestBed } from '@angular/core/testing';
import { UserScoreComponent } from './user-score.component';

describe(UserScoreComponent.name, () => {
	beforeEach(() => {
		TestBed.overrideComponent(UserScoreComponent, {
			add: {
				imports: [],
				providers: [],
			},
		});
	});

	it('renders', () => {
		cy.mount(UserScoreComponent, {
			componentProperties: {
				score: 0,
			},
		});
	});
});
