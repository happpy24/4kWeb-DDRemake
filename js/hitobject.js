export class HitObject {
    constructor(game) {
        this.game = game;
        this.width = 116;
        this.height = 116;
        this.hitobject = document.getElementById("hitobjects");
        this.data = game.parsedData;
        console.log(this.data);
        this.notes = [];

        this.data.hitobjects.forEach((item) => {
            const lane = item.lane;
            const offset = item.offset;
            const y = this.calculateYPosition(offset);
            const rotation = this.calculateRotation(lane);

            this.notes.push({ lane, y, rotation });
        });
    }

    update(input, deltaTime) {
        for (const note of this.notes) {
            note.y += 25 * deltaTime;
        }
    }

    draw(context) {
        for (const note of this.notes) {
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

    calculateYPosition(offset) {
        return this.game.height - offset * 1.5;
    }

    calculateRotation(lane) {
        // Check if lane value is within a range of 10 around the valid lanes (64, 192, 320, 448)
        const validLanes = [64, 192, 320, 448];
        for (const validLane of validLanes) {
            if (Math.abs(lane - validLane) <= 10) {
                switch (validLane) {
                    case 64:
                        return 90; // Correct rotation for validLane 64 (90 degrees)
                    case 192:
                        return 0; // Correct rotation for validLane 192 (0 degrees)
                    case 320:
                        return 180; // Correct rotation for validLane 320 (180 degrees)
                    case 448:
                        return 270; // Correct rotation for validLane 448 (270 degrees)
                }
            }
        }

        return 0; // Default rotation if not within the range
    }
}
