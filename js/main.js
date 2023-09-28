import { BgElements } from './bgelements.js';
import { HitObject } from './hitobject.js';
import { InputHandler } from './input.js';
import { PlayField } from './playfield.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.bgelements = new BgElements(this);
            this.hitobject = new HitObject(this);
            this.playfield = new PlayField(this);
            this.input = new InputHandler();
        }
        update(){
            this.playfield.update(this.input.keys);
            this.hitobject.update();
        }
        draw(context){
            this.bgelements.draw(context);
            this.hitobject.draw(context);
            this.playfield.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});