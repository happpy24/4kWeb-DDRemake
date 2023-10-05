export class BgElements {
    constructor(game){
        this.game = game;
        this.width = 400*1.5;
        this.height = game.height;
        this.x = game.width / 2 - this.width / 2;
        this.y = 0;
        this.bgmask = document.getElementById('bg-mask');
        this.bgtop = document.getElementById('bg-top');
        this.bgbot = document.getElementById('bg-bot');
    }
    update(){
        
    }
    draw(context){
        context.globalAlpha = 0.6;
        context.drawImage(this.bgmask, this.x, this.y, this.width, this.height);
        context.drawImage(this.bgtop, this.x, this.y, this.width, this.height);
        context.drawImage(this.bgbot, this.x, this.y, this.width, this.height);
    }
}