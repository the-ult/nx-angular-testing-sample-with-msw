import { MountConfig } from 'cypress/angular';
import { UltMediaCardComponent } from './media-card.component';

describe(UltMediaCardComponent.name, () => {
  const config: MountConfig<UltMediaCardComponent> = {
    declarations: [],
    imports: [],
  };

  it('renders', () => {
    cy.mount(UltMediaCardComponent, config);
  });
});
