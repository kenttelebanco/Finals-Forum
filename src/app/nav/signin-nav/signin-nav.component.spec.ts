import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninNavComponent } from './signin-nav.component';

describe('SigninNavComponent', () => {
  let component: SigninNavComponent;
  let fixture: ComponentFixture<SigninNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
