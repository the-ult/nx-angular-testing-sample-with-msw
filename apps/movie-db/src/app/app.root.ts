import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { UltAppBarComponent, UltNavItemComponent } from '@ult/shared/ui/app-bar';

@Component({
  standalone: true,
  selector: 'ult-root',
  imports: [
    RouterLinkActive,
    RouterLinkWithHref,
    RouterOutlet,
    UltAppBarComponent,
    UltNavItemComponent,
  ],
  template: `<ult-app-bar>
      <a ultNavItem [routerLink]="['/movies']" routerLinkActive="active-link"> movies </a>
      <a ultNavItem [routerLink]="['/series']" routerLinkActive="active-link"> series </a>
    </ult-app-bar>
    <main>
      <router-outlet></router-outlet>
    </main>`,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      main {
        background-color: var(--ult-theme-background);
        height: calc(100vh - 64px);
        padding: var(--ult-space-md) var(--ult-space);
        margin-inline: auto;
        // TODO: use media queries
        max-width: var(--ult-page-width);
      }
    `,
  ],
})
export class AppRoot {}
