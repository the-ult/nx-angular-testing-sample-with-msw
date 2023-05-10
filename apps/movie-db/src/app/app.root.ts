import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { UltAppBarComponent, UltNavItemComponent } from '@ult/shared/ui/app-bar';

@Component({
  standalone: true,
  selector: 'ult-root',
  template: ` <ult-app-bar>
      <!-- TODO: add proper routerLinkActive -->
      <a ultNavItem [routerLink]="['/movies']" routerLinkActive="router-link-active">movies</a>
      <a ultNavItem [routerLink]="['/series']" routerLinkActive="router-link-active">series</a>
    </ult-app-bar>
    <main>
      <router-outlet></router-outlet>
    </main>`,
  imports: [RouterOutlet, RouterLinkWithHref, UltAppBarComponent, UltNavItemComponent],
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      main {
        background-color: var(--mdc-theme-background);
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
