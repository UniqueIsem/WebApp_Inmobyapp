import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPropiedadesComponent } from './lista_propiedades.component';

describe('ListaPropiedadesComponent', () => {
  let component: ListaPropiedadesComponent;
  let fixture: ComponentFixture<ListaPropiedadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPropiedadesComponent]
    });
    fixture = TestBed.createComponent(ListaPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
