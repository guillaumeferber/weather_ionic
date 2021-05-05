import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastInformationComponent } from './forecast-information.component';

describe('ForecastInformationComponent', () => {
  let component: ForecastInformationComponent;
  let fixture: ComponentFixture<ForecastInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
