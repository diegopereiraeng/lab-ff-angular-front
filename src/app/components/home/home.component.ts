import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from 'src/app/models/message.model';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {

    title = 'Demo';
    greeting: Message = {};

    constructor( private http: HttpClient) {
        //http.get('http://localhost:8080/api/').subscribe(data => this.greeting = data);
        http.get('http://localhost:8080/api/',{}).subscribe(data => this.greeting = data);
        
        
    }

    getGreatings(){
        return "Hi Guest"
    }

    authenticated() { return true; }

}