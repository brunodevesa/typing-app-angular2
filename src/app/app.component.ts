import { Component } from '@angular/core';
import { ServicesComponent } from 'app/services/services.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers:[ServicesComponent]
})
export class AppComponent {
  title = 'app';
}
