import { TestBed } from '@angular/core/testing';
import { UltAppBarComponent } from './app-bar.component';

describe(UltAppBarComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(UltAppBarComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(UltAppBarComponent);
  });
});
