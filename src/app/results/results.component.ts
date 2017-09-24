import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.less'],
  inputs: ['initialTextTotalCharacters', 'typedCorrectCharacters', 'characterMistaken', 'textWrittenCorrectly', 'totalCharactersTyped']
})
export class ResultsComponent implements OnInit, OnChanges {

  public initialTextTotalCharacters: string;
  public typedCorrectCharacters: string;
  public characterMistaken: string;
  public textWrittenCorrectly: string;
  public totalCharactersTyped: number;

  public accuracy: number;

  constructor() { }

  ngOnInit() {
    this.textWrittenCorrectly = "";
    this.characterMistaken = "";
    this.typedCorrectCharacters = '0';
    this.totalCharactersTyped = 0;
    // this.initialTextTotalCharacters = ''
    this.accuracy = 0;
  }
  ngOnChanges(changes: SimpleChanges): void {
    let textWrittenCorrectlyLength = this.textWrittenCorrectly.length;
    if (changes.textWrittenCorrectlyLength ||
      changes.typedCorrectCharacters ||
      changes.characterMistaken ||
      changes.totalCharactersTyped ||
      changes.initialTextTotalCharacters) {
      this.calculateAccuracy();
    }
  }

  public calculateAccuracy() {
    if ((this.typedCorrectCharacters && this.textWrittenCorrectly)) {
      this.accuracy = Math.round((Number(this.textWrittenCorrectly.length / Number(this.totalCharactersTyped))) * 100)
      console.log(this.accuracy);
    }
    else {
      this.accuracy = 0
    }
  }

}
