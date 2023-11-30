const GameNPC = {
    benefit1: '../resources/game/IMG/NPC01_10.5x.png',
    benefit2: '../resources/game/IMG/NPC020.5x.png',
    benefit3: '../resources/game/IMG/NPC030.5x.png',
    benefit4: '../resources/game/IMG/NPC040.5x.png',
};
class NPC{
    constructor() {
        this.parentNode = document.querySelector('.game');
        this.img = document.createElement('img'); // Create image element
        this.img.className = 'npcImage'; // Set image class
        this.parentNode.appendChild(this.img); // Append image to parent element
    }
    SetBenefit1(){
        this.img.src = GameNPC.benefit1;
    }
    SetBenefit2(){
        this.img.src = GameNPC.benefit2;
    }
    SetBenefit3(){
        this.img.src = GameNPC.benefit3;
    }
    SetBenefit4(){
        this.img.src = GameNPC.benefit4;
    }
    // Add a method to delete the NPC
    deleteNPC() {
        if (this.parentNode && this.img.parentNode) {
            this.parentNode.removeChild(this.img);
        }
    }
}