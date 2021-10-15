import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVehiculosComponent } from './list-vehiculos.component';

describe('ListVehiculosComponent', () => {
  let component: ListVehiculosComponent;
  let fixture: ComponentFixture<ListVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
