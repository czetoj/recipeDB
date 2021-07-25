import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeBarChartComponent } from './recipe-bar-chart.component';

describe('RecipeBarChartComponent', () => {
  let component: RecipeBarChartComponent;
  let fixture: ComponentFixture<RecipeBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
