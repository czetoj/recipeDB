import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuajanloComponent } from './menuajanlo.component';

describe('MenuajanloComponent', () => {
  let component: MenuajanloComponent;
  let fixture: ComponentFixture<MenuajanloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuajanloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuajanloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
