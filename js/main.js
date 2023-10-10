import { BgElements } from "./bgelements.js";
import { HitObject } from "./hitobject.js";
import { InputHandler } from "./input.js";
import { PlayField } from "./playfield.js";
import { parseOsuFile } from "./extractor.js";

window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const audioPlayer = document.getElementById("audioPlayer");
    const ctx = canvas.getContext("2d");

    // Fetch data from correct file
    fetch("songs/BLACKorWHITE/lvl.txt")
        .then((response) => response.text())
        .then((data) => {
            const parsedData = parseOsuFile(data);
            console.log("Parsed Data:", parsedData);

            dataAvailablility(parsedData);
        });

    function dataAvailablility(data) {
        const parsedData = data;

        canvas.width = 1920;
        canvas.height = 1080;

        class Game {
            constructor(width, height, parsedData) {
                this.width = width;
                this.height = height;
                this.parsedData = parsedData;
                this.bgelements = new BgElements(this);
                this.hitobject = new HitObject(this);
                this.playfield = new PlayField(this);
                this.input = new InputHandler();
                this.timer = 0;
            }

            update(deltaTime) {
                // Update game elements with deltaTime
                this.timer += deltaTime;

                this.playfield.update(this.input.keys, deltaTime);
                this.hitobject.update(this.input.keys, deltaTime, this.timer);
            }

            draw(context) {
                this.bgelements.draw(context);
                this.playfield.draw(context);
                this.hitobject.draw(context);
                audioPlayer.play();
            }
        }

        function playAudio() {
            audioPlayer.play();
        }

        // To pause the audio when needed in your game
        function pauseAudio() {
            audioPlayer.pause();
        }

        const game = new Game(canvas.width, canvas.height, parsedData);
        console.log(game);

        let lastTime = 0;

        function animate(timeStamp) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const deltaTime = (timeStamp - lastTime)
            lastTime = timeStamp;

            game.update(deltaTime);
            game.draw(ctx);
            requestAnimationFrame(animate);
        }

        animate(0);
    }
});
