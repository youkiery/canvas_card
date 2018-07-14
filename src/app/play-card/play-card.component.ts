import { Component, OnInit } from '@angular/core';
import { ResourceService } from "../resource.service"
import { CardService } from "../card.service"
import { DrawImageService } from "../draw-image.service"
import { Card } from '../card';

@Component({
  selector: 'app-play-card',
  templateUrl: './play-card.component.html',
  styleUrls: ['./play-card.component.css']
})
export class PlayCardComponent implements OnInit {
  c
  ctx
  width = 1000
  height = 480
  loading: boolean = true
  player: [Card[]] = [[]]
  master = 0
  turn: number
  last_winner: number
  player_number = 4

  current_play: {
    type: number,   // 0: single, 1: pair, 2: strain
    number: number, // 
    high: {
      rank: number,
      value: number
    }
  }
  constructor(
    private resource: ResourceService,
    private card: CardService,
    private draw: DrawImageService
  ) { }

  ngOnInit() {
    this.resource.getCardSrc().then(() => {
      this.loading = false
      this.c = document.getElementById("play-card-area")
      this.c.width = this.width
      this.c.height = this.height
      this.ctx = this.c.getContext("2d")
      this.card.init()
      this.redraw()
      document.addEventListener("click", (e) => {        
        var offX = e.offsetX
        var offY = e.offsetY
        var ck = -1
        this.player[0].forEach((card, card_index) => {
          var l = card.x < offX, u = card.x + this.card.width > offX, r = card.y < offY, d = card.y + this.card.height > offY
          if(l && u && r && d) {
            ck = card_index
          }
        })
        if(ck > -1) {
          if(this.player[0][ck].selected) {
            this.player[0][ck].selected = false
          }
          else {
            this.player[0][ck].selected = true
          }
          
          this.draw.clear(this.ctx, this.width, this.height)
          this.draw.drawAllCard(this.ctx, this.resource.card, this.card.fixed_deck, this.player, this.card.width, this.card.height, this.width, this.height)
        }
      })
    })
  }
  order(cards) {
    // từ danh sách bài truyền vào, trả về danh sách bài được sắp xếp theo thứ tự ưu tiên phỏm, bài từ thấp đến cao
    
  }
  playAndRemove() {
    var selected = this.player[0].filter(card => {
      return card.selected
    })
    selected.forEach(card => {
      var value = card.value
      var rank = card.rank
      this.player[0] = this.player[0].filter(card2 => {
        return card2.value !== value 
      })  
    })
    this.draw.drawAllCard(this.ctx, this.resource.card, this.card.fixed_deck, this.player, this.card.width, this.card.height, this.width, this.height)
  }

  // play() {
  //   console.log(this.turn);
  //   if(this.turn) {
  //     // ai
  //     var ai_card = this.player[this.turn]
  //     var ai_card_number = ai_card.length
  //     var ai_card_set = this.cardSet(ai_card)
  //     console.log(ai_card_set);
  //     if(this.current_play) {
  //       switch(this.current_play.type) {
  //         case 0:
  //           if(ai_card_set.single.length) {
  //             ai_card_set.single.forEach(s_card => {
  //               if(s_card.value > this.current_play.high.value || (s_card.value == this.current_play.high.value && s_card.value[this.current_play.number - 1].rank == this.current_play.high.rank)) {
  //                 console.log(s_card);
  //               }
  //             })
  //           }
  //           else {
  //             console.log("end turn");
  //           }
  //         break;
  //         case 1:
  //           if(ai_card_set.pair[this.current_play.number - 2].length) {
  //             var ck = 0
  //             ai_card_set.pair[this.current_play.number - 2].forEach(pair => {
  //               if(pair[0].value == this.current_play.high.value && pair[this.current_play.number - 1].rank == this.current_play.high.rank) {
  //                 console.log(pair);
  //                 ck = 1
  //               }
  //             })
  //             if(ck) {
  //               console.log("end turn");
  //             }
  //           }
  //           else {
  //             console.log("end turn");              
  //           }
  //         break;
  //         case 2:
  //           if(ai_card_set.strain.length) {
  //             var ck = 0
  //             ai_card_set.strain.forEach(trains => {
  //               // check position for #2 condition
  //               if(trains.length == this.current_play.number || trains.length - 3 >= 3) {
  //                 console.log(trains);
  //                 ck = 1
  //               }                
  //             })
  //             if(ck) {
  //               console.log("end turn");
  //             }
  //           }
  //           else {
  //             console.log("end turn");              
  //           }
  //         break;
  //       }  
  //     }
  //   }
  // }

  cardSet(cards) {
    // trả về các lá bài lẻ (single), cặp (pair 0: đôi, 1: ba lá, 2: tứ quý), lốc
    // cấu trúc trả về:
    /*
      {
        single: [],
        pair: [
          [double],
          [triple],
          [quara]
        ],
        strain: [
          []
        ]
      }

    */
    var single = []
    var d_cards = JSON.parse(JSON.stringify(cards))
    var pair = [[],[],[]]
    var strain = []
    var curr, prv
    var pairs = [], trains = []
    var l = d_cards.length - 1
    cards.forEach((card, card_index) => {
      prv = curr
      curr = card
      if(prv) {
        if(curr.value == prv.value) {
          if(!pairs.length) {
            pairs.push(prv)
          }
          pairs.push(curr)
          if(card_index == l) {
            var length = pairs.length
            if(length) {
              pair[length - 2].push(pairs)
              pairs.forEach(p_card => {
                d_cards = d_cards.filter(d_card => {
                  return d_card.value !== p_card.value && d_card.rank !== p_card.rank
                })
              })
              pairs = []
            }
          }
        }
        else {
          var length = pairs.length
          if(length) {
            pair[length - 2].push(pairs)
            pairs.forEach(p_card => {
              d_cards = d_cards.filter(d_card => {
                return d_card.value !== p_card.value && d_card.rank !== p_card.rank
              })
            })
            pairs = []
          }
        }
        if(curr.value - prv.value == 1) {
          if(!trains.length) {
            trains.push(prv)
          }
          trains.push(curr)
          if(card_index == l) {
            var length = trains.length
            if(length > 2) {
              strain.push(trains)
              trains.forEach(t_card => {
                d_cards = d_cards.filter(d_card => {
                  return d_card.value !== t_card.value && d_card.rank !== t_card.rank
                })
              })
            }
            trains = []
          }
        }
        else if(curr.value - prv.value > 1) {
          var length = trains.length
          if(length > 2) {
            strain.push(trains)
            trains.forEach(t_card => {
              d_cards = d_cards.filter(d_card => {
                return d_card.value !== t_card.value && d_card.rank !== t_card.rank
              })
            })
          }
          trains = []
        }
      }
    })
    single = d_cards
    return {
      single: single,
      pair: pair,
      strain: strain,
    }
  }
  redraw() {
    // phát bài lại, chia bài cho tất cả người chơi, sau đó vẽ bài
    this.card.suffer()
    for(var i = 0; i < this.player_number; i ++) {
      // card.drawCard, phát bài cho người chơi
      this.player[i] = JSON.parse(JSON.stringify(this.card.drawCard(i, this.master)))
      console.log(this.cardsValue(this.player[i]));      
    }
    console.log(this.cardsValue(this.card.current_deck));
    this.draw.drawAllCard(this.ctx, this.resource.card, this.card.fixed_deck, this.player, this.card.width, this.card.height, this.width, this.height)
  }
  playerPlayCard(player_cards) {
    var selected = player_cards.filter(card => {
      return card.selected
    })
    selected = selected.sort((a, b) => {
      return a.value - b.value || a.rank - b.rank
    })
    if(!selected.length) {
      console.log("no selected!");
    }
    else if(selected.length == 1) {
      console.log("single: " + this.cardValue(selected[0]))
    }
    else {
      var prv, curr, ck = 1, type = 0
      selected.forEach(card => {
        prv = curr
        curr = card
        if(prv) {
          if(curr.value == prv.value) {
            if(type == 2) {
              ck = 0
            }
            type = 1
          }
          else if(curr.value - prv.value == 1) {
            if(type == 1) {
              ck = 0
            }
            type = 2
          }
          else {
            ck = 0
          }
        }
      })
      if(ck) {
        if(type == 2 && selected.length > 2) {
          console.log("strain: " + this.cardsValue(selected));
        }
        else {
          console.log("pair: " + this.cardsValue(selected));          
        }
      }
      else {
        console.log("no syntax!");
        
      }
    }
  }
  cardValue(card) {
    return this.card.value_list[card.value] + this.card.rank_list[card.rank]
  }
  cardsValue(cards) {
    var value = []
    cards.forEach(card => {
      value.push(this.cardValue(card))
    })
    return value.join(",")
  }
  checkType() {
    var cards = this.player[0]
    var msg = []
    var selected = cards.filter(card => {
      return card.selected
    })
    selected = selected.sort((a, b) => {
      return a.value - b.value || a.rank - b.rank
    })
    
    if(this.current_play) {
      switch(this.current_play.type) {
        case 0:
          if(selected.length !== 1) {
            console.log(1);
          }
          else if(selected[0].value < this.current_play.high.value) {
            console.log(2);          
          }
          else if(selected[0].rank < this.current_play.high.rank) {
            console.log(3);
          }
        break;
        case 1:
          if(selected.length !== this.current_play.number) {
            console.log(1);
          }
          else {
            var ck = 0
            var curr, prv
            selected.forEach(card => {
              prv = curr
              curr = card
              if(prv && prv.value != curr.value) {
                ck = 1
              }
            })
            console.log(selected[this.current_play.number - 1].value, this.current_play.high.value);
            
            if(ck) {
              console.log(2);
            }
            else if(selected[this.current_play.number - 1].value < this.current_play.high.value) {
              console.log(3);
            }
            else if(selected[this.current_play.number - 1].value === this.current_play.high.value && selected[0].rank < this.current_play.high.rank) {
              console.log(4);
            }
          }
        break;
        case 2:
          if(selected.length !== this.current_play.number) {
            console.log(1);
          }
          else {
            var ck = 0
            var curr, prv
            selected.forEach(card => {
              prv = curr
              curr = card
              if(prv && curr.value - prv.value > 1) {
                ck = 1
              }
            })
            if(ck) {
              console.log(2);
            }
            else if(selected[this.current_play.number - 1].value < this.current_play.high.value) {
              console.log(3);
            }
            else if(selected[this.current_play.number - 1].value === this.current_play.high.value && selected[0].rank < this.current_play.high.rank) {
              console.log(4);
            }
          }
        break;
      }
    }
  }
}
