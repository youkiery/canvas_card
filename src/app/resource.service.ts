import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  card
  constructor() { }
  getCardSrc() {
    return new Promise(resolve => {
      this.card = new Image()
      this.card.src = "assets/card2.png"
      this.card.onload = () => {
        resolve()
      }
    })
  }

}
