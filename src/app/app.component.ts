import { Component, OnInit } from '@angular/core';

import { HttpService } from "./http.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jummy Card Canvas';
  id: number = 0
  name: string = ""  
  current_id: number
  action: number = 0
  room_id: number
  ready: boolean = false
  loading: boolean = true
  room_list: [{any}]
  constructor(
    private http: HttpService
  ) { }
  ngOnInit() {
    var url = this.http.url + "action=init";
    this.http.fetch_url(url).then((response: any) => {
      switch(response.status) {
        case 0:
          this.getRoomList();
          console.log("this id not avaiable"); 
          break;
        case 1:
          this.current_id = this.id
          this.room_id = response.data.room_id
          this.action = 1
          console.log("this id current playing");
          break;
        case 2:
          this.current_id = this.id
          console.log("set id success");
          break;
      }
    }, (e) => {
      console.log(e);      
    })
  }
  getRoomList() {
    this.loading = true
    var url = this.http.url + "action=getroomlist";
    this.http.fetch_url(url).then((response: any) => {
      if(response.status == 6) {
        this.room_list = response.data
      }
      this.loading = false
    })
  }
  setId() {
    var url = this.http.url + "action=setid&user_id=" + this.id
    this.http.fetch_url(url).then((data: any) => {
      console.log(data);
      switch(data.status) {
        case 0:
          console.log("this id not avaiable"); 
          break;
        case 1:
          this.current_id = this.id
          this.room_id = data.data.room_id
          this.action = 1
          console.log("this id current playing");
          break;
        case 2:
          this.current_id = this.id
          console.log("set id success");
          break;
      }
    }, (e) => {
      console.log(e);      
    })
  }
  newRoom() {
    var url = this.http.url + "new_room.php?user_id=" + this.current_id + "&name=" + this.name
    this.http.fetch_url(url).then((data) => {
      if(data == 1) {
        console.log("create success");
        this.room_id = Number(data)
        this.action = 1
      }
      else {
        console.log("this id not avaiable");        
      }
    })
  }
  inRoom() {
    setTimeout(() => {
      this.http.fetch_url(this.http.url + "get_room_player.php?id=" + this.room_id).then((result) => {
        if(result > 1) {
          this.ready = true
        }
      })
    }, 500)
  }
}
