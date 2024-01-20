import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { MovieDetailPage } from './movie-detail.page';

describe('MovieDetailPage', () => {
	let component: MovieDetailPage;
	let fixture: ComponentFixture<MovieDetailPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MovieDetailPage],
		}).compileComponents();

		fixture = TestBed.createComponent(MovieDetailPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
