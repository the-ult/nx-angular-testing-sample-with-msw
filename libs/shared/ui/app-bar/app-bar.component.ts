import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ult-app-bar',
  standalone: true,
  imports: [],
  template: `
    <header>
      <h1>THE MOVIE DB</h1>
      <nav>
        <ng-content selector="a[ultNavItem]"></ng-content>
      </nav>
    </header>
  `,
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UltAppBarComponent {}
