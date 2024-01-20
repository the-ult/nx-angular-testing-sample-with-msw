import { TestBed } from '@angular/core/testing';
import { MovieDetailPage } from './movie-detail.page';

describe(MovieDetailPage.name, () => {
	beforeEach(() => {
		TestBed.overrideComponent(MovieDetailPage, {
			add: {
				imports: [],
				providers: [],
			},
		});
	});

	it('renders', () => {
		cy.mount(MovieDetailPage);
	});
});
