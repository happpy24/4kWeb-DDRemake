export class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((   e.key === "d" ||
                    e.key === "f" ||
                    e.key === "j" ||
                    e.key === "k"
                ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (    e.key === "d" ||
                    e.key === "f" ||
                    e.key === "j" ||
                    e.key === "k"
                ){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}