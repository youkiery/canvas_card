import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawImageService {
  player_area = [
    350,
    15
  ]
	constructor() { }
	drawAllCard(context, sprite, fixed_deck, player, width, height, cwidth, cheight) {
		// vẽ bài tất cả player
		this.clear(context, cwidth, cheight)
		player.forEach((player_card, player_index) => {
			var l = player_card.length
			player_card.forEach((card, card_index) => {
				// xác định vị trí để đặt quân bài trên bàn
				card.x = card_index * width
				card.y = this.player_area[player_index] + 10 * (card.selected ? -1 : 1)
				this.putCard(context, sprite, fixed_deck, card.id, card.x, card.y, width, height)
			})
		})
	}
	putCard(context, sprite, fixed_deck, card_id, x, y, width, height) {
		// vẽ quân bài
		context.drawImage(sprite, fixed_deck[card_id].x, fixed_deck[card_id].y, width, height, x, y, width, height)
	}
	clear(ctx, width, height) {
		ctx.clearRect(0, 0, width, height)
	}
  drawCard(context, card_value, rank_value, rank_index, x, y, width, height) {
			// vẽ bài bằng tay
			context.beginPath()
			context.moveTo(x, y + 3)
			context.lineTo(x, y + height - 3)
			context.lineTo(x + 3, y + height)

			//context.moveTo(card.x + 5, card.y + card.height)
			context.lineTo(x + width - 3, y + height)
			context.lineTo(x + width, y + height - 3)

			//context.moveTo(card.x + card.width, card.y + card.height - 5)
			context.lineTo(x + width, y + 3)
			context.lineTo(x + width - 3, y)

			//context.moveTo(card.x + card.width - 5, card.y)
			context.lineTo(x + 3, y)
			context.lineTo(x, y + 3)
			context.stroke()
			
			if(rank_index > 1) {
				context.fillStyle = "red";
			}
			else {
				context.fillStyle = "black";
			}
			context.font = "15px monospace";
			context.fillText(card_value, x + 2, y + 15);
			context.font = "30px monospace";
			context.fillText(rank_value, x + width - 20, y + height - 4);
  }
}
