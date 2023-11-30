const key = {
	keyDown : {},
	keyValue : {
		37: 'left',
		39: 'right',
		88: 'attack',
        67: 'temp',
	}
}

const allObstacleComProp ={
    arr : []
}

const allBenefitComProp ={
    arr : []
}
const gameProp = {
    screenWidth : window.innerWidth,
    screenHeight : window.innerHeight,
    gameAppLeft : document.querySelector('.game').getBoundingClientRect().left,
}

var timer = 0;
var Count = 0;
let npc;

const DeleteNPC = () =>{
    if(npc){
        npc.parentNode.removeChild(npc.el);
        npc = null;
    }
}

function Update(){
    timer++;
    if(timer % 400 === 0){
        Count++;
        switch (Count) {
            case 1:
                var benefit = new Benefit('benefit1');
                allBenefitComProp.arr.push(benefit);
                npc = new NPC();
                npc.SetBenefit1();
                setTimeout(() => {
                    // Delete the NPC after a timeout
                    npc.deleteNPC();
                }, 2000)
                break;
            case 2:
                var obstacle = new Obstacle();
                allObstacleComProp.arr.push(obstacle);

                break;
            case 3:
                var benefit = new Benefit('benefit2');
                allBenefitComProp.arr.push(benefit);
                npc = new NPC();
                npc.SetBenefit2();
                setTimeout(() => {
                    // Delete the NPC after a timeout
                    npc.deleteNPC();
                }, 2000)
                break;
            case 4:
                var obstacle = new Obstacle();
                allObstacleComProp.arr.push(obstacle);
                break;
            case 5:
                var benefit = new Benefit('benefit3');
                allBenefitComProp.arr.push(benefit);
                npc = new NPC();
                npc.SetBenefit3();
                setTimeout(() => {
                    // Delete the NPC after a timeout
                    npc.deleteNPC();
                }, 2000)
                break;
            case 6:
                var obstacle = new Obstacle();
                allObstacleComProp.arr.push(obstacle);
                break;
            case 7:
                var benefit = new Benefit('benefit4');
                allBenefitComProp.arr.push(benefit);
                npc = new NPC();
                npc.SetBenefit4();
                setTimeout(() => {
                    // Delete the NPC after a timeout
                    npc.deleteNPC();
                }, 2000)
                break;
            case 8:
                var obstacle = new Obstacle();
                allObstacleComProp.arr.push(obstacle);
                break;
            case 9:
                window.cancelAnimationFrame(loopFunction);
                hero.Clear();
                // Use setTimeout to delay the execution of background.PlayUI() by 2 seconds
                setTimeout(function() {
                    background.ClearUI();
                    // Remove or delete hero and snow
                    if (hero) {
                        hero.parentNode.removeChild(hero.el);
                        hero = null;
                    }
                    if (snow) {
                        snow.parentNode.removeChild(snow.el);
                        snow = null;
                    }
                    if(hud){
                        hud.deleteHUD();
                    }
                    if(npc){
                        npc.deleteNPC();
                    }
                }, 1000);
                break;
            default:
                var benefit = new Benefit('benefitCash');
                allBenefitComProp.arr.push(benefit);
                break;
            
        }
        console.log(Count);
    }
    allObstacleComProp.arr.forEach((a,i,o) =>{
        a.Move();
        if(a.CollisionScrren()){
            o.splice(i,1);
        }
        a.Collision();
    });
    allBenefitComProp.arr.forEach((a,i,o) =>{
        a.Move();
        if(a.CollisionScrren()){
            o.splice(i,1);
        }
        a.Collision();
    });
}



const PlatformEvent = () =>{
    window.addEventListener('keydown', e => {
        key.keyDown[key.keyValue[e.which]] = true;
        if (key.keyValue[e.which] === 'left') {
            background.StartRun();
        }
        if (key.keyValue[e.which] === 'right') {
            background.StopRunning();
        }
    });
    window.addEventListener('keyup', e => {
		key.keyDown[key.keyValue[e.which]] = false;
	});
}

//미리 필요한 이미지들을 로드하는 함수
const loadCharacterImg = () =>{
    const preLoadImgSrc = ['../resources/game/IMG/01_산타-행얼이_누끼\ -\ 복사본.png']
    preLoadImgSrc.forEach(arr =>{
        const img = new Image();
        img.src = arr;
    });
}

let hero;
let snow;
let hud;
let snowSize;
const LoadCharacter = () =>{
    hero = new Hero();
    snow = new Snow();
    hud = new HUD();
}

const GameStart = ()  =>{
    hero.StartRun();
    snow.startGrowing();
    renderGame();
}


var loopFunction;
// Example usage:

const renderGame = () =>{
    loopFunction = window.requestAnimationFrame(renderGame);
    background.Running();
    hero.Render();
    snow.Render();
    snow.grow();
    background.UpdateSnowText();
    Update();
}

let background;
let firebasehandler;
let rankingResult;
let UserRank;

const init = () => {
    background = new BackGround('.game');
    firebaseHandler = new FirebaseHandler();
    UserRank = new Rank();
    // Create a RankingResult object and set the values
    rankingResult = new RankingResult();
    // var benefit = new Benefit('benefit4');
    loadCharacterImg();
    PlatformEvent();
}

function GetRankingResult(data) {
    const ranksArray = Object.keys(data).map(key => data[key]);

    // Sort ranks by Score in descending order
    ranksArray.sort((a, b) => b.Score - a.Score);

    // Calculate total HappyBox count and number of users
    let totalHappyBoxCount = 0;
    let numberOfUsers = ranksArray.length;

    ranksArray.forEach(rank => {
        totalHappyBoxCount += rank.HappyBox;
    });

    // Set the rank for each user based on their position in the sorted array
    ranksArray.forEach((rank, index) => {
        rank.Rank = index + 1; // Rank starts from 1, not 0
    });

    rankingResult.Rank = ranksArray.find(user => user.NickName === 'ExampleUser').Rank;
    rankingResult.HappyBoxCount = totalHappyBoxCount;
    rankingResult.UserCount = numberOfUsers;

    background.ResultUI();
}
window.onload = () =>{
    init();
}
