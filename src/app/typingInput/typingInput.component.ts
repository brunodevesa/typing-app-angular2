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
    }

    public inputText: string
    public characterCounter: number

    onKeyup(msg: string, event: any) {
        this.characterCounter = msg.length
        console.log('im typing')
        if (event.keyCode == 13) {

        }
    }

}