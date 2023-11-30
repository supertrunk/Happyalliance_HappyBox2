const jumpElapsedTIme = 25;
class Hero{
    constructor(){
        this.parentNode = document.querySelector('.hero_box');
        this.el = document.createElement('div');
        this.el.className = 'hero'; // Corrected class name
        // this.elChildren = document.createElement('div');
        // this.elChildren.className = el; // 정상적인 클래스 이름으로 수정
        this.moveX = 0;
        this.moveY = 0;
        this.moveSpeed = 16;
        this.jumpImpulse = 15;
        this.jumpTimer = 0;
        this.jumpSwitch = false;
        this.triggerJump = false;
        this.prevState = '';
        this.runName = '';
        // Append the created element to the parent node
        this.parentNode.appendChild(this.el);
        console.log(this.el);
    }
    Render(){
        if(this.jumpSwitch == true){
            this.moveY = this.moveY - this.jumpImpulse;
            this.jumpTimer++;
        }
        if(this.jumpSwitch == false && this.triggerJump == true){
            this.moveY = this.moveY + this.jumpImpulse;
        }
        if(this.moveY > 0 && this.triggerJump == true){
            this.triggerJump = false;
            this.moveY = 0;
        }
        if(this.jumpTimer > jumpElapsedTIme){
            this.jumpSwitch = false;
            this.jumpTimer = 0;
        }
        this.el.style.transform = `translate(0,${this.moveY}px)`;
    }
    position(){
        return{
            left : this.el.getBoundingClientRect().left,
            right : this.el.getBoundingClientRect().right,
            top : gameProp.screenHeight - this.el.getBoundingClientRect().top,
            bottom : gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
        }
    }
    Jump(){
        if(this.triggerJump == false){
            this.jumpSwitch = true;
            this.triggerJump = true;
            this.jumpTimer = 0;
        }
    }
    StartRun(){
        this.runName = Math.random() < 0.5 ? 'run1' : 'run2';
        this.el.classList.add(this.runName);
        this.prevState = this.runName;
        hud.SetHUDImg(this.prevState);
    }
    Crash(){
        this.el.classList.remove(this.prevState);
        const randomCollision = Math.random() < 0.5 ? 'collision1' : 'collision2';
        this.el.classList.add(randomCollision);
        this.prevState = randomCollision;
        hud.SetHUDImg(this.prevState);
        // Use an arrow function to maintain the 'this' context
        setTimeout(() => {
            this.ReRun();
        }, 2000);
    }
    Benefit(){
        this.el.classList.remove(this.prevState);
        this.el.classList.add('benefit');
        this.prevState = 'benefit';
        hud.SetHUDImg(this.prevState);
        // Use an arrow function to maintain the 'this' context
        setTimeout(() => {
            this.ReRun();
        }, 2000);
    }
    ReRun(){
        this.el.classList.remove(this.prevState);
        this.el.classList.add(this.runName);
        this.prevState = this.runName;
        hud.SetHUDImg(this.prevState);
    }
    Clear(){
        this.el.classList.remove(this.prevState);
        hud.SetHUDImg('clear');
    }
}

class Obstacle{
    constructor(){
        this.parentNode = document.querySelector('.game');
        this.el = document.createElement('div');
        this.el.className = 'obstacle_box';
        this.elChildren = document.createElement('div');
        this.elChildren.className = (Math.random() < 0.5 ? 'stone' : 'stone2'); // 정상적인 클래스 이름으로 수정
        this.x = 0;
        this.y = 0;
        this.distance = 0;
        this.moveSpeed = 16;
        this.init();
    }
    init(){
        this.el.appendChild(this.elChildren);
        this.parentNode.appendChild(this.el);
    }
    position(){
        return{
            left : this.el.getBoundingClientRect().left,
            right : this.el.getBoundingClientRect().right,
            top : gameProp.screenHeight - this.el.getBoundingClientRect().top,
            bottom : gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
        }
    }
    Move(){
        this.distance -= this.moveSpeed;
        this.el.style.transform = `translate(${this.distance}px, ${this.y}px)`;
    }
    CollisionScrren(){
        // .game의 왼쪽 끝에 도달하면 제거
        if (this.position().right < gameProp.gameAppLeft) {
            this.el.remove();
            return true;
        }
        return false;
    }
    Collision(){
        if(
            this.position().left - buffer < hero.position().right + buffer &&
            this.position().right + buffer > hero.position().left - buffer &&
            this.position().top + bufferUPDonw > hero.position().bottom - bufferUPDonw
            )
        {
            this.el.remove();
            hero.Crash();
            console.log("Collision");
        }
        // console.log(this.position().top);//1040
        // console.log(hero.position().bottom);//800
        // console.log(this.position().left);//1040
        // console.log(hero.position().left);//800
    }
}
const buffer = -200;
const bufferUPDonw = -50;
class Benefit{
    constructor(childclassname){
        this.parentNode = document.querySelector('.game');
        this.el = document.createElement('div');
        this.el.className = 'benefit_box';
        this.elChildren = document.createElement('div');
        this.elChildren.className = childclassname; // 정상적인 클래스 이름으로 수정
        this.x = 0;
        this.y = 0;
        this.distance = 0;
        this.moveSpeed = 16;
        this.init();
    }
    init(){
        this.el.appendChild(this.elChildren);
        this.parentNode.appendChild(this.el);
        console.log(this.elChildren);
    }
    position(){
        return{
            left : this.el.getBoundingClientRect().left,
            right : this.el.getBoundingClientRect().right,
            top : gameProp.screenHeight - this.el.getBoundingClientRect().top,
            bottom : gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
        }
    }
    Move(){
        this.distance -= this.moveSpeed;
        this.el.style.transform = `translate(${this.distance}px, ${this.y}px)`;
    }
    CollisionScrren(){
        // .game의 왼쪽 끝에 도달하면 제거
        if (this.position().right < gameProp.gameAppLeft) {
            this.el.remove();
            console.log("CollisionScrren");
            return true;
        }
        return false;
    }
    Collision(){
        if (
            this.position().left < hero.position().right &&
            this.position().right > hero.position().left &&
            this.position().bottom < hero.position().bottom
        )
        {
            this.el.remove();
            hero.Benefit();
            console.log("Collision");
        }      
    }
}

class Snow {
    constructor() {
        this.parentNode = document.querySelector('.hero_box');
        this.el = document.createElement('div');
        this.el.className = 'snow_box';
        this.elChildren = document.createElement('div');
        this.elChildren.className = 'snow';
        this.currentSize = 10;
        this.growthRate = 1; // Initial growth rate
        this.boosted = false; // Flag to track booster item effect
        this.prevState = 'size1';
        this.timer = 0;
        this.moveY = 0;
        this.jumpImpulse = 15;
        this.jumpTimer = 0;
        this.jumpSwitch = false;
        this.triggerJump = false;
        this.init();
    }
    init() {
        this.el.appendChild(this.elChildren);
        this.parentNode.appendChild(this.el);
        console.log(this.elChildren);
    }
    startGrowing() {
        this.elChildren.classList.add('size1');
    }
    updateSizeClass() {
        // Remove all size classes
        this.elChildren.classList.remove('size1', 'size2', 'size3', 'size4', 'size5');

        // Add the appropriate size class based on the current size
        if (this.currentSize <= 100) {
            this.elChildren.classList.add('size1');
        } else if (this.currentSize <= 200) {
            this.elChildren.classList.add('size2');
        } else if (this.currentSize <= 300) {
            this.elChildren.classList.add('size3');
        } else if (this.currentSize <= 400) {
            this.elChildren.classList.add('size4');
        } else {
            this.elChildren.classList.add('size5');
        }
    }
    grow() {
        this.timer++;
        if(this.timer % 10 === 0){
            if (this.boosted) {
                // If boosted, grow at double the rate
                this.currentSize += this.growthRate * 2;
            } else {
                this.currentSize += this.growthRate;
            }
            
            // Apply maximum size limit
            if (this.currentSize > 500) {
                this.currentSize = 500;
            }
            this.updateSizeClass();
            snowSize = this.currentSize;
            // // Update the size visually
            // this.el.style.width = this.currentSize + 'px';
            // this.el.style.height = this.currentSize + 'px';
        }
    }
    collisionPenalty() {
        // Apply collision penalty
        this.currentSize -= 30;

        // Ensure the size doesn't go below the starting size
        if (this.currentSize < 10) {
            this.currentSize = 10;
        }

        // Update the size visually
        this.el.style.width = this.currentSize + 'px';
        this.el.style.height = this.currentSize + 'px';
    }
    activateBooster() {
        // Activate booster item effect for 5 seconds
        this.boosted = true;
        setTimeout(() => {
            this.boosted = false;
        }, 5000);
    }    
    Render(){
        if(this.jumpSwitch == true){
            this.moveY = this.moveY - this.jumpImpulse;
            this.jumpTimer++;
        }
        if(this.jumpSwitch == false && this.triggerJump == true){
            this.moveY = this.moveY + this.jumpImpulse;
        }
        if(this.moveY > 0 && this.triggerJump == true){
            this.triggerJump = false;
            this.moveY = 0;
        }
        if(this.jumpTimer > jumpElapsedTIme){
            this.jumpSwitch = false;
            this.jumpTimer = 0;
        }
        this.el.style.transform = `translate(0,${this.moveY}px)`;
    }
    Jump(){
        if(this.triggerJump == false){
            this.jumpSwitch = true;
            this.triggerJump = true;
            this.jumpTimer = 0;
        }
    }
}
