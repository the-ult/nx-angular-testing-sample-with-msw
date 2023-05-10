import { TestBed } from '@angular/core/testing';
import { UltNavItemComponent } from './nav-item.component';

describe(UltNavItemComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(UltNavItemComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(UltNavItemComponent);
  });
});
