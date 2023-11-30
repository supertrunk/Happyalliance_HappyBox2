const GameHUD = {
    run2: '../resources/game/IMG/ProfileRun01.png',
    run1: '../resources/game/IMG/ProfileRun02.png',
    crash2: '../resources/game/IMG/ProfileCrash01.png',
    crash1: '../resources/game/IMG/ProfileCrash02.png',
    good: '../resources/game/IMG/ProfileGood.png',
    clear: '../resources/game/IMG/ProfileClear.png',
};

class HUD {
    constructor() {
        this.parentNode = document.querySelector('.game');
        this.img = document.createElement('img'); // Create image element
        this.img.className = 'HUDImage'; // Set image class
        this.parentNode.appendChild(this.img); // Append image to parent element
    }
    SetHUD() {
        //this.img.src = GameHUD.clear; // Set default image source
    }
    SetHUDImg(name) {
        // Set button position to absolute, right-top corner
        this.img.style.position = 'fixed';
        this.img.style.width = '333px'; // Resize button width
        this.img.style.height = '333px'; // Resize button height
        this.img.style.top = '20px'; // Adjust top position
        this.img.style.right = '20px'; // Adjust right position
        switch (name) {
            case 'run1':
                this.SetRun1();
                break;
            case 'run2':
                this.SetRun2();
                break;
            case 'collision1':
                this.SetCrash1();
                break;
            case 'collision2':
                this.SetCrash2();
                break;
            case 'benefit':
                this.SetGood();
                break;
            case 'clear':
                this.SetClear();
                break;
        }
    }
    SetRun1() {
        this.img.src = GameHUD.run1;
    }
    SetRun2() {
        this.img.src = GameHUD.run2;
    }
    SetCrash1() {
        this.img.src = GameHUD.crash1;
    }
    SetCrash2() {
        this.img.src = GameHUD.crash2;
    }
    SetGood() {
        this.img.src = GameHUD.good;
    }
    SetClear() {
        this.img.src = GameHUD.clear;
    }
    deleteHUD() {
        if (this.parentNode && this.img.parentNode) {
            this.parentNode.removeChild(this.img);
        }
    }
}