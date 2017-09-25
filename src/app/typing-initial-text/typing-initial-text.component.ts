import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
export interface SplitedStringInterface {
  letter: string,
  position: number,
  color: string
}

@Component({
  selector: 'app-typing-initial-text',
  templateUrl: './typing-initial-text.component.html',
  styleUrls: ['./typing-initial-text.component.less'],
  inputs: ["initialText"]
  // outputs:['initialTextEmitter']
})
export class TypingInitialTextComponent implements OnInit, AfterViewInit, OnChanges {


  ngAfterViewInit(): void {
    this.el.nativeElement.innerText = "";
    this.putColorSplitedTextInDom();

  }

  @ViewChild('initialTextH1') el: ElementRef;

  constructor(private rd: Renderer2) { }
  public initialText: string;
  public splitedText: string[];
  public splitedTextWithColor: SplitedStringInterface[];


  ngOnInit() {
    if (this.initialText) {

      this.el.nativeElement.innerText = "";
      this.splitedText = this.splitInitialString(this.initialText)
      this.splitedTextWithColor = [];
      this.makeColorSplitedText(this.splitedText, 'black');
    }

  }


  public splitInitialString(someString: string) {
    if (someString) {
      return someString.split("")
    }
  }

  public makeColorSplitedText(splitedText: string[], textColor: string): any {
    this.splitedText.forEach((elem, index) => {
      this.splitedTextWithColor.push({
        letter: elem,
        position: index,
        color: textColor
      })

    })
  }

  public putColorSplitedTextInDom() {
    if (this.splitedTextWithColor) {

      this.splitedTextWithColor.forEach((elem, index) => {
        this.el.nativeElement
          .insertAdjacentHTML('beforeend', '<span class="two" style="color: ' + this.splitedTextWithColor[index].color + ' ">' +
          this.splitedTextWithColor[index].letter + '</span>');

      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.splitedTextWithColor) {
      console.log(changes)
    }
  }

  // on reset
  public onReset(newText: string) {
    if (newText) {

      this.splitedText = null;
      this.splitedText = this.splitInitialString(newText)
      this.splitedTextWithColor = null;



      this.el.nativeElement.innerText = "";
      this.splitedTextWithColor = [];
      this.makeColorSplitedText(this.splitedText, 'black');
      this.putColorSplitedTextInDom();
    }
  }

  // ToDo change this to use ngClass
  public makeCorrectCharacterBlue(characterIndex: number) {
    if (this.splitedTextWithColor) {

      this.splitedTextWithColor[characterIndex - 1].color = 'blue';
      this.el.nativeElement.innerText = "";
      this.putColorSplitedTextInDom();
      // this.el.nativeElement.focus();
    }
  }

  public makeWrongCharacterRed(characterIndex: number) {
    if (this.splitedTextWithColor) {

      this.splitedTextWithColor[characterIndex - 1].color = 'red';
      this.el.nativeElement.innerText = "";
      this.putColorSplitedTextInDom();
      // this.el.nativeElement.focus();
    }
  }

}
