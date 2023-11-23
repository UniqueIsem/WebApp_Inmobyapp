import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuperComponent } from './signup-super.component';

describe('SignupSuperComponent', () => {
  let component: SignupSuperComponent;
  let fixture: ComponentFixture<SignupSuperComponent>;

  beforeEach(async () => {
    /*await*/ TestBed.configureTestingModule({
      /*imports*/declarations: [SignupSuperComponent]
    })
    /*.compileComponents();*/
    
    fixture = TestBed.createComponent(SignupSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
