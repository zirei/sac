import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVehiculoComponent } from './details-vehiculo.component';

describe('DetailsVehiculoComponent', () => {
  let component: DetailsVehiculoComponent;
  let fixture: ComponentFixture<DetailsVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
