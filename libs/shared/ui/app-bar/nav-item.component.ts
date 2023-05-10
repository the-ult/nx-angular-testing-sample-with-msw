import { Component } from '@angular/core';

/**
 * Use the `ultNavItem` to style the navigation links
 * in the app-bar.
 *
 * Since we use content-projection, we cannot simply override the styles.
 * To prevent having to use 😈 solutions like ::ng-deep
 * We create a component/directive to apply the proper styling.
 *
 * @see: [The ultimate guide to style content projection in Angular](https://kevinkreuzer.medium.com/the-ultimate-guide-to-style-projected-content-in-angular-731c0721902f)
 */

@Component({
  selector: 'ult-nav-item, a[ultNavItem]',
  standalone: true,
  exportAs: 'ultNavItem',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        text-decoration: none;
        color: var(--mdc-theme-text-primary-on-dark);
        padding: 4px 16px;
        text-transform: uppercase;
        font-size: var(--mdc-typography-headline6-font-size);
        font-weight: var(--mdc-typography-headline6-font-weight);

        &:not(:last-child) {
          margin-right: var(--ult-space);
        }

        &:hover,
        &:active {
          border-bottom: 2px solid var(--mdc-theme-secondary);
        }
      }
    `,
  ],
})
export class UltNavItemComponent {}
