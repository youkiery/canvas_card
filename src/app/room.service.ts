import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  url: string = "http://linesrc.netne.net/card/"
  room_list = []
  loading = true
  constructor(private http: HttpClient) { }
  getRoomList() {
    this.fetch_url(this.url + "get_room.php").then((json_string: string) => {      
      try {
        var room_data = JSON.parse(json_string)
        var room_data_type = typeof(room_data)
        if(room_data_type == "object" && room_data_type.length) {
          this.room_list = room_data
        }
        else {
          console.log("connection error");
        }
      }
      catch(e) {
        console.log(e);
      }
      this.loading = false
    })
  }
  fetch_url(url) {
    return new Promise((resolve, reject) => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          try {
            var data = JSON.parse(xhttp.responseText);
            resolve(data)
          }
          catch(e) {
            reject(e + ": " + xhttp.responseText)
          }
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();  
    })
  }
}
