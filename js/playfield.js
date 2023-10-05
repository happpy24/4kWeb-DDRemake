export class PlayField {
    constructor(game){
        this.game = game;
        this.width = 128;
        this.height = 128;
        this.x = this.game.width / 2 - this.width * 2;
        this.y = this.game.height - this.height - 15;
        this.rd1 = document.getElementById('receptor-down-1');
        this.rd1display = false;
        this.rd2 = document.getElementById('receptor-down-2');
        this.rd2display = false;
        this.rd3 = document.getElementById('receptor-down-3');
        this.rd3display = false;
        this.rd4 = document.getElementById('receptor-down-4');
        this.rd4display = false;
        this.ru1 = document.getElementById('receptor-up-1');
        this.ru2 = document.getElementById('receptor-up-2');
        this.ru3 = document.getElementById('receptor-up-3');
        this.ru4 = document.getElementById('receptor-up-4');
    }
    update(input, deltaTime){ 
        this.rd1display = false;
        this.rd2display = false;
        this.rd3display = false;
        this.rd4display = false;
        if (input.includes("d")) {
            this.rd1display = true;
        } if (input.includes("f")) {
            this.rd2display = true;
        } if (input.includes("j")) {
            this.rd3display = true;
        } if (input.includes("k")) {
            this.rd4display = true;
        }
    }
    draw(context){
        context.drawImage(this.ru1, this.x, this.y, this.width, this.height);
        context.drawImage(this.ru2, this.x + this.width, this.y, this.width, this.height);
        context.drawImage(this.ru3, this.x + this.width * 2, this.y, this.width, this.height);
        context.drawImage(this.ru4, this.x + this.width * 3, this.y, this.width, this.height);

        if (this.rd1display) context.drawImage(this.rd1, this.x, this.y, this.width, this.height);
        if (this.rd2display) context.drawImage(this.rd2, this.x + this.width, this.y, this.width, this.height);
        if (this.rd3display) context.drawImage(this.rd3, this.x + this.width * 2, this.y, this.width, this.height);
        if (this.rd4display) context.drawImage(this.rd4, this.x + this.width * 3, this.y, this.width, this.height);
    }
}