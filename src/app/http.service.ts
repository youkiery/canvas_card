import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = "http://linesrc.netne.net/card/get_data.php?"
  constructor () { }

  fetch_url (url) {
    return new Promise((resolve, reject) => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          try {
            var response = JSON.parse(xhttp.responseText);
            console.log(response);
            //response.data = JSON.parse(response.data)
            resolve(response)
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
