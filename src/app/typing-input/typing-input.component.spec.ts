import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingInputComponent } from './typing-input.component';

describe('TypingInputComponent', () => {
  let component: TypingInputComponent;
  let fixture: ComponentFixture<TypingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
