export class HitObject {
    constructor(game) {
        this.game = game;
        this.width = 116;
        this.height = 116;
        this.hitobject = document.getElementById('hitobjects');
        this.holdbody = document.getElementById('holdbody');
        this.holdend = document.getElementById('holdend');
        this.notes = []; // Array to store notes

        // Load and parse the text file
        fetch('songs/BLACKorWHITE/lvl.txt')
            .then((response) => response.text())
            .then((data) => {
                const lines = data.split('\n');
                for (const line of lines) {
                    const values = line.split(',').map(Number);
                    const lane = this.calculateXPosition(values[0]); // Calculate XPosition based on lane
                    const offset = values[2];
                    const holdEndOffset = values[5];
                    const y = this.calculateYPosition(offset);
                    const rotation = this.calculateRotation(lane);
                    const isHoldNote = holdEndOffset > 0;
                    this.notes.push({ lane, y, rotation, isHoldNote, holdEndOffset });
                }
            });
    }

    update(input, deltaTime) {
        for (const note of this.notes) {
            note.y += 25 * deltaTime;
            console.log(deltaTime);
        }
    }

    draw(context) {
        for (const note of this.notes) {
            context.save();
            context.translate(note.lane + this.width / 2, note.y + this.height / 2);
            context.rotate(note.rotation * Math.PI / 180);
    
            if (note.isHoldNote) {
                // Calculate the height of the hold body based on the difference in Y positions
                const holdBodyHeight = this.calculateYPosition(note.holdEndOffset) - note.y;
    
                // Calculate the number of times to repeat the hold body image
                const numRepeats = Math.floor(holdBodyHeight / this.holdbody.height);
                const remainingHeight = holdBodyHeight % this.holdbody.height;
                
                // Draw repeated hold body images
                for (let i = 0; i < numRepeats; i++) {
                    context.drawImage(
                        this.holdbody,
                        0,
                        0,
                        this.holdbody.width,
                        this.holdbody.height,
                        -this.width / 2,
                        -this.height / 2 + i * this.holdbody.height,
                        this.width,
                        this.holdbody.height
                    );
                }
    
                // Draw the last part of the hold body (if any) and the hold end image
                context.drawImage(
                    this.holdbody,
                    0,
                    0,
                    this.holdbody.width,
                    remainingHeight,
                    -this.width / 2,
                    -this.height / 2 + numRepeats * this.holdbody.height,
                    this.width,
                    remainingHeight
                );
    
                // Calculate the Y position for the hold end image
                const holdEndY = this.calculateYPosition(note.holdEndOffset);
                
                // Draw the hold end image
                context.drawImage(
                    this.holdend,
                    0,
                    0,
                    this.holdend.width,
                    this.holdend.height,
                    -this.width / 2,
                    -this.height / 2 + holdBodyHeight, // Position it at the end of the hold body
                    this.width,
                    this.height
                );
            } else {
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
            }
    
            context.restore();
        }
    }

    calculateXPosition(lane) {
        // Round the lane to the nearest valid lane position
        const validLanes = [64, 192, 320, 448];
        const roundedLane = validLanes.reduce((closestLane, validLane) => {
            return Math.abs(lane - validLane) < Math.abs(closestLane - validLane) ? lane : closestLane;
        });

        switch (roundedLane) {
            case 64:
                return (this.game.width / 2 - this.width) - 128;
            case 192:
                return (this.game.width / 2 - this.width);
            case 320:
                return (this.game.width / 2 - this.width) + 128;
            case 448:
                return (this.game.width / 2 - this.width) + (128*2);
            default:
                return 0;
        }
    }

    calculateYPosition(offset) {
        return this.game.height - offset * 1.5;
    }

    calculateRotation(lane) {
        switch (lane) {
            case 64:
                return 90;
            case 192:
                return 0;
            case 320:
                return 180;
            case 448:
                return 270;
            default:
                return 0;
        }
    }
}

// export class HitObject {
//     constructor(game, extractedData) {
//         this.game = game;
//         this.width = 116;
//         this.height = 116;
//         this.hitobject = document.getElementById('hitobjects');
//         this.holdbody = document.getElementById('holdbody');
//         this.holdend = document.getElementById('holdend');
//         this.notes = []; // Array to store notes
//         this.currentNoteIndex = 0; // Index to track the currently loaded note
//         this.loadNotes(extractedData); // Load notes from the extracted data
//     }

//     loadNotes(extractedData) {
//         if (!extractedData || !extractedData.HitObjects) {
//             console.error('No HitObjects data found in the extracted .qua file.');
//             return;
//         }

//         const hitObjects = extractedData.HitObjects;

//         for (const obj of hitObjects) {
//             const startTime = obj.StartTime;
//             const lane = obj.Lane;
            
//             // You can add other necessary properties from obj here if needed

//             const y = this.calculateYPosition(startTime);
//             const rotation = this.calculateRotation(lane);
//             const isHoldNote = obj.KeySounds.length > 0; // Check if it's a hold note based on KeySounds

//             this.notes.push({ lane, y, rotation, isHoldNote });
//         }
//     }

//     update(input, deltaTime) {
//         if (this.currentNoteIndex < this.notes.length) {
//             const note = this.notes[this.currentNoteIndex];
//             note.y += 20 * deltaTime;
//             console.log(deltaTime);

//             // Check if the note has reached a certain position (e.g., the bottom of the screen)
//             if (note.y >= this.game.height) {
//                 // Move to the next note
//                 this.currentNoteIndex++;
//             }
//         }
//     }

//     draw(context) {
//         for (const note of this.notes) {
//             context.save();
//             context.translate(note.lane + this.width / 2, note.y + this.height / 2);
//             context.rotate(note.rotation * Math.PI / 180);
    
//             if (note.isHoldNote) {
//                 // Calculate the height of the hold body based on the difference in Y positions
//                 const holdBodyHeight = this.calculateYPosition(note.holdEndOffset) - note.y;
    
//                 // Calculate the number of times to repeat the hold body image
//                 const numRepeats = Math.floor(holdBodyHeight / this.holdbody.height);
//                 const remainingHeight = holdBodyHeight % this.holdbody.height;
                
//                 // Draw repeated hold body images
//                 for (let i = 0; i < numRepeats; i++) {
//                     context.drawImage(
//                         this.holdbody,
//                         0,
//                         0,
//                         this.holdbody.width,
//                         this.holdbody.height,
//                         -this.width / 2,
//                         -this.height / 2 + i * this.holdbody.height,
//                         this.width,
//                         this.holdbody.height
//                     );
//                 }
    
//                 // Draw the last part of the hold body (if any) and the hold end image
//                 context.drawImage(
//                     this.holdbody,
//                     0,
//                     0,
//                     this.holdbody.width,
//                     remainingHeight,
//                     -this.width / 2,
//                     -this.height / 2 + numRepeats * this.holdbody.height,
//                     this.width,
//                     remainingHeight
//                 );
    
//                 // Calculate the Y position for the hold end image
//                 const holdEndY = this.calculateYPosition(note.holdEndOffset);
                
//                 // Draw the hold end image
//                 context.drawImage(
//                     this.holdend,
//                     0,
//                     0,
//                     this.holdend.width,
//                     this.holdend.height,
//                     -this.width / 2,
//                     -this.height / 2 + holdBodyHeight, // Position it at the end of the hold body
//                     this.width,
//                     this.height
//                 );
//             } else {
//                 // Draw regular hit object for non-hold notes
//                 context.drawImage(
//                     this.hitobject,
//                     0,
//                     0,
//                     256,
//                     256,
//                     -this.width / 2,
//                     -this.height / 2,
//                     this.width,
//                     this.height
//                 );
//             }
    
//             context.restore();
//         }
//     }

//     calculateXPosition(lane) {
//         // Round the lane to the nearest valid lane position
//         const validLanes = [64, 192, 320, 448];
//         const roundedLane = validLanes.reduce((closestLane, validLane) => {
//             return Math.abs(lane - validLane) < Math.abs(closestLane - validLane) ? lane : closestLane;
//         });

//         switch (roundedLane) {
//             case 64:
//                 return (this.game.width / 2 - this.width / 2) - 128;
//             case 192:
//                 return (this.game.width / 2 - this.width / 2);
//             case 320:
//                 return (this.game.width / 2 - this.width / 2) + 128;
//             case 448:
//                 return (this.game.width / 2 - this.width / 2) + 256;
//             default:
//                 return 0;
//         }
//     }

//     calculateYPosition(offset) {
//         // Adjust Y position based on offset (You can adjust this based on your needs)
//         return this.game.height - offset * 2; // Assuming 100 ms corresponds to some reasonable screen height
//     }

//     calculateRotation(lane) {
//         switch (lane) {
//             case 64:
//                 return 90;
//             case 192:
//                 return 0;
//             case 320:
//                 return 180;
//             case 448:
//                 return 270;
//             default:
//                 return 0;
//         }
//     }
// }