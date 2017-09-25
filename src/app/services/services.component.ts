import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.less']
})
@Injectable()
export class ServicesComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(private _http: Http) {
  }

  // to load files locally, these files must be inside 'assets' folder - this is a webpack configuration
  private jsonUrl: string = "./assets/mock-sentences.json";

  getJson(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.jsonUrl)
        .forEach(response => {
          resolve(response.json());
        });
    })
  }


}

