import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatallesDeProductoComponent } from './datalles-de-producto.component';

describe('DatallesDeProductoComponent', () => {
  let component: DatallesDeProductoComponent;
  let fixture: ComponentFixture<DatallesDeProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatallesDeProductoComponent]
    });
    fixture = TestBed.createComponent(DatallesDeProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
