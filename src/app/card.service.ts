import { Injectable } from '@angular/core';
import { Card } from "./card"

@Injectable({
  providedIn: 'root'
})
export class CardService {
  //value_list = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"]
  value_list = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
  rank_list = ["♣", "♠", "♦", "♥"]
  width = 72
  height = 98
  fixed_deck: Card[] = [new Card()]
  current_deck: Card[]
  min = 0
  max = 52
  card_number = 9
  constructor() { }
  init() {
    // khởi tạo bộ bài ban đầu dùng fixed_deck để vẽ bài
    var id = 0
    var value_length = this.value_list.length
    var rank_length = this.rank_list.length
    for(var i = 0; i < value_length; i ++) {
      for(var j = 0; j < rank_length; j ++) {
        this.fixed_deck[id] = {
          id: id,
          value: i,
          rank: j,
          x: i * this.width + i,
          y: j * this.height,
          selected: false
        }
        id ++
      }  
    }
    this.current_deck = JSON.parse(JSON.stringify(this.fixed_deck))
  }
  suffer() {
    // trộn bài, 54 * 4 lần 
    var end = this.max * 4
    for(var i = 0; i < end; i ++) {
      var x = Math.floor(Math.random() * (this.max - this.min) + this.min)
      var y = Math.floor(Math.random() * (this.max - this.min) + this.min)
      var temp = this.current_deck[x]
      this.current_deck[x] = this.current_deck[y]
      this.current_deck[y] = temp  
    }
  }
  drawCard(player_index, master) {
    // phát bài cho người chơi cụ thể, trả về danh sách bài
    var card_number = this.card_number
    var increament = 0
    if(player_index == master) {
      card_number += 1
    }
    else if(player_index > master) {
      increament = 1
    }
    var start = player_index * this.card_number + increament, end = start + card_number
    var cards = [new Card()]
    var id = 0
    for(; start < end; start ++) {
      cards[id] = this.current_deck[start]
      id ++
    }
    return cards
  }
  sortCard(cards) {
    // sắp xếp theo thứ tự tăng dần 
    cards = cards.sort((a, b) => {
      return a.value - b.value || a.rank - b.rank
    })
    return cards
  }
}
