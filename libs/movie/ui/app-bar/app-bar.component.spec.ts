import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { UltAppBarComponent } from './app-bar.component';

describe('UltAppBarComponent', () => {
  let component: UltAppBarComponent;
  let fixture: ComponentFixture<UltAppBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltAppBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UltAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
