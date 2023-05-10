import { TestBed } from '@angular/core/testing';
import { MountConfig } from 'cypress/angular';
import { UltMediaCardComponent } from './media-card.component';

describe(UltMediaCardComponent.name, () => {
  const config: MountConfig<UltMediaCardComponent> = {
    declarations: [],
    imports: [],
  };

  it('renders', () => {
    TestBed.overrideComponent(UltMediaCardComponent, { add: { providers: config.providers } });
    cy.mount(UltMediaCardComponent, config);
  });
});
