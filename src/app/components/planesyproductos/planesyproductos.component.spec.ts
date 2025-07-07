import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesyproductosComponent } from './planesyproductos.component';

describe('PlanesyproductosComponent', () => {
  let component: PlanesyproductosComponent;
  let fixture: ComponentFixture<PlanesyproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesyproductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesyproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
