import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultWebComponent } from './default-web.component';

describe('DefaultWebComponent', () => {
  let component: DefaultWebComponent;
  let fixture: ComponentFixture<DefaultWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
