export class HitObject {
    constructor(game) {
        this.game = game;
        this.width = 116;
        this.height = 116;
        this.hitobject = document.getElementById("hitobjects");
        this.data = game.parsedData;
        this.moveDuration = 0.6;
        this.notes = [];
        this.queue = [];
        this.dn = 0;

        this.data.hitobjects.forEach((item) => {
            const lane = item.lane;
            const offset = item.offset;
            const y = -this.height;
            const rotation = this.calculateRotation(lane);
            
            this.notes.push({ lane, y, rotation, offset });
        });
    }

    update(input, deltaTime, timer) {
        for (const note of this.notes) {
            if (timer > note.offset) {
                try {
                    if (this.notes[this.notes.indexOf(note)].offset == this.notes[this.notes.indexOf(note) + 1].offset) {
                        console.log('DoubleNote')
                        this.queue.push(this.notes[this.notes.indexOf(note) + 1])
                        this.notes.shift();
                    }
                } catch { continue; }
                
                this.queue.push(note);
                this.notes.shift();
            }
        }

        for (const note of this.queue) {            
            const speed = this.calculateMoveSpeed(this.moveDuration);
            if (note.y >= 1100) {
                this.queue.shift();
                console.log(this.queue.length)
            } else { 
                try {
                    if (this.queue[this.queue.indexOf(note)].offset == this.queue[this.queue.indexOf(note) + 1].offset) {
                        this.queue[this.queue.indexOf(note) + 1].y += speed * (deltaTime / 10);
                        note.y += speed * (deltaTime / 10);
                        this.dn = 1;
                    } else if (this.dn == 0){
                        note.y += speed * (deltaTime / 10); 
                    } else {
                        this.dn = 0;
                    }
                    
                } catch { continue; }

                console.log(this.queue[this.queue.indexOf(note)].offset)
            }
        }
    }

    draw(context) {
        for (const note of this.queue) {
            context.save();
            const xPos = this.calculateXPosition(note.lane);
            context.translate(
                xPos + this.width / 2 - 6,
                note.y + this.height / 2
            );
            const rotation = this.calculateRotation(note.lane);
            context.rotate((rotation * Math.PI) / 180); // Rotate based on the note's rotation

            // Draw regular hit object for non-hold notes
            context.drawImage(
                this.hitobject,
                0,
                0,
                256,
                256,
                -this.width / 2,
                -this.height / 2,
                this.width,
                this.height
            );

            context.restore();
        }
    }

    calculateXPosition(lane) {
        // Check if lane value is within a range of 10 around the valid lanes (64, 192, 320, 448)
        const validLanes = [64, 192, 320, 448];
        for (const validLane of validLanes) {
            if (Math.abs(lane - validLane) <= 10) {
                switch (validLane) {
                    case 64:
                        return this.game.width / 2 - this.width - 128;
                    case 192:
                        return this.game.width / 2 - this.width;
                    case 320:
                        return this.game.width / 2 - this.width + 128;
                    case 448:
                        return this.game.width / 2 - this.width + 128 * 2;
                }
            }
        }

        return 0;
    }

    calculateMoveSpeed(moveDuration) {
        let v = 0;
        let s = 1053 / 100;
        let t = moveDuration;

        return v = s / t;
    }

    calculateRotation(lane) {
        // Check if lane value is within a range of 10 around the valid lanes (64, 192, 320, 448)
        const validLanes = [64, 192, 320, 448];
        for (const validLane of validLanes) {
            if (Math.abs(lane - validLane) <= 10) {
                switch (validLane) {
                    case 64:
                        return 90; 
                    case 192:
                        return 0;
                    case 320:
                        return 180;
                    case 448:
                        return 270;
                }
            }
        }

        return 0;
    }
}
