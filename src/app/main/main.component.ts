import { Component, OnInit, ViewChild, EventEmitter, AfterViewInit, AfterViewChecked, ChangeDetectorRef, Injectable } from '@angular/core';
import { TypingInitialTextComponent } from '../typing-initial-text/typing-initial-text.component'
import { TypingInputComponent } from 'app/typing-input/typing-input.component';

import { ServicesComponent } from '../services/services.component';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResultsComponent } from 'app/results/results.component';


// to remove when the http service is ready to fetch sentences from there
// how to use a file just for constants by the way ?


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  inputs: ['notifyKeyup', 'notifyOnReset'],
  outputs: ['text', 'initialTextTotalCharacters', 
          'typedCorrectCharacters', 'characterMistaken', 'textWrittenCorrectly', 'totalCharactersTyped'
          ,'accuracyHistoric']
})
export class MainComponent implements OnInit {

  @ViewChild(TypingInitialTextComponent) typingInitialTextComponent;
  @ViewChild(TypingInputComponent) typingInputComponent;
  @ViewChild(ResultsComponent) resultsComponent;

  constructor(private _servicesComponent: ServicesComponent) {



  }

  public textWritten: string
  public initialText: string;
  public initialTextTotalCharacters: number;
  public characterTyped: string;
  public typedCorrectCharacters: number;
  public textWrittenCorrectly: string
  public totalCharactersTyped: number;
  public characterTypedCorrectly: {
    key: string,
    position: number
  }
  public characterCounter: number;
  public characterMistaken: number;

  public sentences: any
  public sentencesIndex: number;

  public accuracyHistoric : number[]


  ngOnInit() {

    this.accuracyHistoric = [];
    // Get local json file through http service
    this._servicesComponent.getJson()
      .then((response) => {
        this.sentences = response;

        this.sentencesIndex = 0
        this.onMainReset();
   
      })


  }

  public onMainReset() {
    if (this.sentencesIndex < this.sentences.length) {
      this.initialText = this.sentences[this.sentencesIndex];
    }
    this.initialTextTotalCharacters = this.initialText.length;
    this.typedCorrectCharacters = 0;
    this.textWrittenCorrectly = "";
    this.totalCharactersTyped = 0;
    this.characterTypedCorrectly = {
      key: "",
      position: 0
    }
    this.characterCounter = 0;
    this.characterMistaken = 0;
  }


  // When Enter is Pressed - it will be removed...
  public onReset(event: any) {

    if (event === true) {
      console.log("Enter was pressed ! ")
      this.textWrittenCorrectly = "";
      this.characterCounter = 0;
      this.characterMistaken = 0;
      this.typedCorrectCharacters = 0;
      this.totalCharactersTyped = 0;

      this.textWritten = ""
      this.typingInitialTextComponent.onReset();

    }
  }


  public onTyping(event: any) {
    console.log('parent. :   event : ' + event.event)
    console.log('parent. :   text : ' + event.text)
    console.log('parent. :   keypressed : ' + event.event.data)
    console.log('parent. :   caretPosition : ' + event.caretPosition)
    this.textWritten = event.text;
    const caret = event.caretPosition - 1;
    // const textIndex =this.characterCounter;
    const keyPressed = event.event.data;
    const initialTextIndex = this.initialText[event.caretPosition - 1]

    // When user is tying
    if (caret === this.characterCounter &&
      keyPressed == initialTextIndex && keyPressed !== null) {
      this.characterCounter++;
      this.characterTypedCorrectly.key = event.event.data;
      this.characterTypedCorrectly.position = event.caretPosition - 1;

      this.textWrittenCorrectly += this.characterTypedCorrectly.key;
      this.typedCorrectCharacters++;
      this.totalCharactersTyped++;
      console.log('typedCorrectCharacters: ' + this.typedCorrectCharacters);

      this.typingInitialTextComponent.makeCorrectCharacterBlue(this.characterCounter);

      console.log(this.characterTypedCorrectly.key);
      console.log(this.characterTypedCorrectly.position);
    }

    // When user presses BackSpace
    else if
       (keyPressed !== initialTextIndex && event.event.inputType !== "deleteContentBackward") {
      this.characterMistaken++;
      this.totalCharactersTyped++;

      this.typingInitialTextComponent.makeWrongCharacterRed(this.characterCounter + 1);
    }

    // When user presses Enter
    else if (keyPressed !== initialTextIndex && event.event.data !== " " && event.event.inputType !== "deleteContentBackward") {
      this.characterMistaken++;
      this.totalCharactersTyped++;
      this.typingInitialTextComponent.makeWrongCharacterRed(this.characterCounter - 1);
    }

    // When user finishes typing the text, fetch another sentence:
    if (Number(this.typedCorrectCharacters) === this.initialTextTotalCharacters) {
   
    
      // get accuracy from results and save it
      this.accuracyHistoric.push(this.resultsComponent.accuracy)

      this.sentencesIndex++
      this.onMainReset();
      this.typingInputComponent.onReset();
      this.typingInitialTextComponent.onReset(this.sentences[this.sentencesIndex]);
      this.resultsComponent.calculateGlobalAccuracy();

    }


  }


}








