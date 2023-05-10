import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ult-app-bar',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <header>
      <a href="/" class="logo">
        <img ngSrc="assets/tmdb_logo.svg" alt="The Movie Database (TMDB)" width="154" height="20" />
      </a>
      <nav>
        <ng-content selector="a[ultNavItem]"></ng-content>
      </nav>
    </header>
  `,
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UltAppBarComponent {}
