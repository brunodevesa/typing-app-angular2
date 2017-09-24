import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TypingInput } from './typingInput/typingInput.component';
import { MainComponent } from './main/main.component';
import { TypingInputComponent } from './typing-input/typing-input.component';
import { TypingInitialTextComponent } from './typing-initial-text/typing-initial-text.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent, TypingInput, MainComponent, TypingInputComponent, TypingInitialTextComponent, ResultsComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
