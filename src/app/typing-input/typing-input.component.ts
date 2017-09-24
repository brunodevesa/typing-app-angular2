import { Component, OnInit, EventEmitter, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-typing-input',
  templateUrl: './typing-input.component.html',
  styleUrls: ['./typing-input.component.less'],
  inputs: ['resetText'],
  outputs: ['notifyKeyup', 'notifyOnReset']
})
export class TypingInputComponent implements OnInit {
  @ViewChild('myInputArea') el: ElementRef;

  notifyKeyup: EventEmitter<any> = new EventEmitter<any>();
  notifyOnReset: EventEmitter<any> = new EventEmitter<any>();

  constructor(private rd: Renderer2) { }

  public textInputByUser: string;
  public caretPosition: number;
  public keyCode: number;
  public toReset: boolean;

  ngOnInit() {
    this.textInputByUser = "";
    this.keyCode = 0;
    this.el.nativeElement.focus();
  }


  public onReset() {
    console.log(this.rd);
    console.log('Enter was pressed. Lets reset this thing..')
    this.el.nativeElement.value = "";
    this.el.nativeElement.focus();
    this.textInputByUser = "";
    this.notifyOnReset.emit(true)
  }

  public getKeyCode(): number {
    return this.keyCode
  }

  onKeyup(event: any) {
    if (event !== null && event.keyCode == 13) {
      this.keyCode = event.keyCode;
      this.onReset();
    }
  }

  onTyping(event: any, myInputArea) {
    if (event !== null) {
      this.textInputByUser = event.target.value;
      this.caretPosition = myInputArea.selectionStart;
      this.notifyKeyup.emit({
        event: event,
        text: this.textInputByUser,
        caretPosition: this.caretPosition,
      })
    }
  }


}
