import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { UltAppBarComponent, UltNavItemComponent } from '@ult/shared/ui/app-bar';

@Component({
  standalone: true,
  selector: 'ult-root',
  imports: [
    NgOptimizedImage,
    RouterLinkActive,
    RouterLinkWithHref,
    RouterOutlet,
    UltAppBarComponent,
    UltNavItemComponent,
  ],
  template: `
    <ult-app-bar>
      <a ultNavItem [routerLink]="['/movies']" routerLinkActive="active-link"> movies </a>
      <a ultNavItem [routerLink]="['/tv-shows']" routerLinkActive="active-link"> series </a>
    </ult-app-bar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      <a
        href="https://github.com/the-ult/angular-nx-playground"
        target="_blank"
        aria-label="Github repo: tmdb playground"
      >
        <svg width="20px" height="20px" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8a8 8 0 0 0-8-8z"
          ></path>
        </svg>
      </a>
      <a href="https://twitter.com/the_ult_dev" target="_blank" aria-label="Follow me on Twitter">
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width="20px"
          height="20px"
        >
          <path
            d="M8.29 20.25c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.36-.02-.53A8.35 8.35 0 0 0 22 5.92a8.19 8.19 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.22 8.22 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.73A11.65 11.65 0 0 1 3.4 4.75a4.1 4.1 0 0 0 1.27 5.48A4.07 4.07 0 0 1 2.8 9.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.62 11.62 0 0 0 6.29 1.84"
          ></path>
        </svg>
      </a>
      <span class="flex-spacer"></span>
      <div>
        Data provided by:
        <a href="https://www.themoviedb.org/" target="_blank" aria-label="TMDB">
          <img
            ngSrc="assets/tmdb_logo.svg"
            aria-label="The Movie Database (TMDB)"
            width="140"
            height="16"
          />
        </a>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      main {
        height: calc(100vh - var(--ult-app-bar-height));
        background-color: var(--ult-theme-background);
        padding: var(--ult-space-md) 0;
        margin-inline: auto;
        margin-top: var(--ult-app-bar-height);
        // TODO: use media queries
        max-width: var(--ult-page-width);
      }

      footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        color: var(--ult-color-default-contrast);
        padding: var(--ult-space-md);
        background-image: linear-gradient(
          to top right,
          var(--ult-theme-primary),
          var(--ult-theme-secondary)
        );
        margin-inline: auto;
        max-width: var(--ult-page-width);
        border-top-left-radius: var(--ult-radius-small);
        border-top-right-radius: var(--ult-radius-small);

        a {
          text-decoration: none;
          color: inherit;
          margin-right: var(--ult-space-md);
          &:hover {
            color: var(--ult-theme-secondary);
          }
        }
      }
    `,
  ],
})
export class AppRoot {}
