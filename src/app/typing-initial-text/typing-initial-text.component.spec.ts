import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingInitialTextComponent } from './typing-initial-text.component';

describe('TypingInitialTextComponent', () => {
  let component: TypingInitialTextComponent;
  let fixture: ComponentFixture<TypingInitialTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypingInitialTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingInitialTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
