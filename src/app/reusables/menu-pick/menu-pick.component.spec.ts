import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPickComponent } from './menu-pick.component';

describe('MenuPickComponent', () => {
  let component: MenuPickComponent;
  let fixture: ComponentFixture<MenuPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
