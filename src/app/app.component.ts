import { Component, OnInit } from '@angular/core';

import { RoomService } from "./room.service"

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
  ready = 0
  constructor(
    private room: RoomService
  ) { }
  ngOnInit() {
    this.room.getRoomList()
  }
  setId() {
    var url = this.room.url + "set_id.php?id=" + this.id
    this.room.fetch_url(url).then((data: any) => {
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
    var url = this.room.url + "new_room.php?user_id=" + this.current_id + "&name=" + this.name
    this.room.fetch_url(url).then((data) => {
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
      this.room.fetch_url(this.room.url + "get_room_player.php?id=" + this.room_id).then((result) => {
        if(result > 1) {
          this.ready = 1
        }
      })
    }, 500)
  }
}
