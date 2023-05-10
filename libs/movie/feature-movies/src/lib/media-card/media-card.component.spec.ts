import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { ENV_MOCK } from '@ult/shared/test/mocks';

import { UltMediaCardComponent } from './media-card.component';

describe('MediaCardComponent', () => {
  let component: UltMediaCardComponent;
  let fixture: ComponentFixture<UltMediaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltMediaCardComponent, RouterLinkWithHref, RouterTestingModule],
      providers: [{ provide: ENVIRONMENT, useValue: ENV_MOCK }],
    }).compileComponents();

    fixture = TestBed.createComponent(UltMediaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
