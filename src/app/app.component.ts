import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Tours of Heroes';
  loading = true
  constructor() {

  }
  ngOnInit() {
    // check if loading working when nav is active
  }
}
