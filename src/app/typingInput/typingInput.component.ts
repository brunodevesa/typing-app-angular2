import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'input-selector',
    templateUrl: './typingInput.component.html',
    styleUrls: ['./typingInput.component.less']

})

export class TypingInput implements OnInit {

    constructor() {

    }
    ngOnInit(): void {
        this.characterCounter = 0;
        this.characterGoodCounter = 0;
        this.characterTotalCounter = 0;
        this.initialText = "this is somehow a very difficult text"
        for (var i = 0; i < this.initialText.length; i++) {
            var element = this.initialText[i];
            this.initialTextArray.push(element)
        }
    }

    public inputText: string;
    public characterCounter: number;
    public characterGoodCounter: number;
    public characterTotalCounter: number;
    public initialText : string ;
    
    public initialTextArray : string[] = [];
    public currentCharacter : string
    
    onCenas(event:any)
    {
        console.log('in on onCenas ' + event.keyCode);
        if (event.keyCode == 13) {
            this.inputText = "";
            this.characterCounter = 0;
            this.characterGoodCounter = 0;
            this.characterTotalCounter = 0;
        }
        
    }

    onKeyup(msg: string, event: any, initialText: string) {
        this.characterTotalCounter++;
        this.characterCounter = msg.length
        this.currentCharacter = this.initialTextArray[this.characterCounter-1];
        console.log(this.currentCharacter)
        console.log('event.data : '+event.data)
        if (event.data == this.initialTextArray[this.characterCounter-1]) {
            console.log('characters match !')
            this.characterGoodCounter++;
        }
        if(event.inputType == "deleteContentBackward"){
            this.characterTotalCounter++;
        }
        if (this.initialText == msg) {
            setTimeout(() => {
            alert('F I N I S HE D !!!  (press Enter to continue)')
            }, 100)
        }
       
    }

}