import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPropiedadesComponent } from './info_propiedades.component';

describe('DatallesDeProductoComponent', () => {
  let component: InfoPropiedadesComponent;
  let fixture: ComponentFixture<InfoPropiedadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPropiedadesComponent]
    });
    fixture = TestBed.createComponent(InfoPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
