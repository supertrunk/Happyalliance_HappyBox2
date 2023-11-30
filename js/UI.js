const GameBackground = {
    start: 'url("../resources/game/IMG/BGIMG_1.png")',
    tutorial: 'url("../resources/game/IMG/BGIMG_2.png")',
    nickname: 'url("../resources/game/IMG/BGIMG_3.png")',
    play: 'url("../resources/game/IMG/BGIMG_4.png")',
    run: 'url("../resources/game/IMG/01_Loop.png")',
    clear: 'url("../resources/game/IMG/BGIMG_5.png")',
    result: 'url("../resources/game/IMG/BGIMG_6.png")',
};

class BackGround{
    constructor(el){
        this.el = document.querySelector(el);
        this.gameBoxLeft = 0;
        this.isRunning = false;
        this.snowText = null; 

        this.StartUI();
    }
    StartRun(){
        this.isRunning = true;
    }
    Running(){
        if(this.isRunning)
        {
            // 배경 이미지를 움직이는 코드
            this.gameBoxLeft = (performance.now() / 75) * -50; // 예시로 시간에 따라 움직이도록 설정
            this.el.style.backgroundPositionX = `${this.gameBoxLeft}px`;
        }
    }
    StopRunning(){
        this.isRunning = false;
        this.el.style.backgroundPositionX = `0px`;
    }
    StartUI(){
        this.el.style.backgroundImage = GameBackground.start;
        SetStartUI(this.el);
        // this.ResultUI();
    }
    TutorialUI(){
        this.RemoveAllButtom();
        this.el.style.backgroundImage = GameBackground.tutorial;
        SetTutorialUIButtom(this.el);
    }
    NicknameUI(){
        this.RemoveAllButtom();
        this.el.style.backgroundImage = GameBackground.nickname;
        SetNickNameInputField(this.el);
        SetGamePlayButton(this.el);
    }
    PlayUI(){
        // Check if enteredNickname has a length greater than 0
        if (enteredNickname.length > 0) {
            UserRank.NickName = enteredNickname;
            this.RemoveAllButtom();
            this.RemoveAllInputfield();
            this.el.style.backgroundImage = GameBackground.play;
            SetGamePlayUI(this.el);
            LoadCharacter();
        } else {
            console.log('Nickname is empty. PlayUI not executed.');
        }
    }
    RunUI(){
        this.el.style.backgroundImage = GameBackground.run;
        GameStart();
        this.StartRun();
        SetRunUI(this.el);
        hud.SetHUD();
        this.SetSnowTextBox();
    }
    ClearUI(){
        this.RemoveAllButtom();
        this.RemoveAllInputfield();
        this.StopRunning();
        this.el.style.backgroundImage = GameBackground.clear;
        SetClearUI(this.el);
        UserRank.Score = snowSize;
        // Save data
        firebaseHandler.saveDataRank(UserRank);
    }
    ResultUI(){
        this.el.style.backgroundImage = GameBackground.result;
        SetResultUI(this.el);
    }
    RemoveAllButtom(){
        const existingButtons = document.querySelectorAll('.startButton');
        existingButtons.forEach(button => button.remove());
    }
    RemoveAllInputfield(){
        const existingButtons = document.querySelectorAll('.nicknameInputContainer');
        existingButtons.forEach(button => button.remove());
    }
    UpdateSnowText() {
        if (this.snowText) {
            // Get the current snow size
            const currentSnowSize = snowSize;
            this.snowText.innerText = `${currentSnowSize} cm`; 
        }
    }
    SetSnowTextBox(){
        const button = document.createElement('div'); // Create button
        button.classList.add('startButton'); // Set button class

        const img = document.createElement('img'); // Create image
        img.src = '../resources/game/IMG/Snowball_Size.png'; // Set image source
        img.alt = 'Start Button Image'; // Set image alt text

        this.snowText = document.createElement('div'); // Create text element
        this.snowText.classList.add('snowText');
        this.snowText.innerText = '0 cm'; // Set text content, default to an empty string if not provided
        button.appendChild(img); // Append image to button
        button.appendChild(this.snowText); // Append text to button

        this.el.appendChild(button); // Append button to parent element

        // Set button position to absolute, right-top corner
        button.style.position = 'fixed';
        button.style.width = '491px'; // Resize button width
        button.style.height = '120px'; // Resize button height
        button.style.top = '35px'; // Adjust the top position
        button.style.left = '20px'; // Adjust the right position
        button.style.display = 'flex'; // Use flex to align image and text vertically
        button.style.flexDirection = 'column'; // Stack image and text vertically

        img.style.width = '100%'; // Resize image to fill the entire button
        img.style.height = '70%'; // Adjust image height to 70% of the button height

        this.snowText.style.textAlign = 'right'; // Center align the text
        // Style the result text element
        this.snowText.style.position = 'absolute';
        this.snowText.style.top = '55%';
        this.snowText.style.left = '50%';
        this.snowText.style.transform = 'translate(-50%, -50%)';
        this.snowText.style.fontSize = '50px';
        this.snowText.style.color = 'black';
        this.snowText.style.width = '100%';
        this.snowText.style.height = '100%';
        this.snowText.style.paddingRight = '10px';
        this.snowText.style.fontFamily = 'CookieRunBlack';
        this.snowText.style.color = '#66ACFF';

        console.log(this.snowText);
    }
}
function SetStartUI(parentEl) { // Set start button
    SetGaemStartButtom(parentEl);
    SetStartUIGameTutorialButtom(parentEl);
}

function SetGaemStartButtom(parentEl){
    const button = document.createElement('div'); // Create button
    button.classList.add('startButton'); // Set button class

    const img = document.createElement('img'); // Create image
    img.src = '../resources/game/IMG/Btn_GameStart.png'; // Set image source
    img.alt = 'Start Button Image'; // Set image alt text

    button.appendChild(img); // Append image to button


    button.addEventListener('click', function() {
        background.NicknameUI();
    });

    parentEl.appendChild(button); // Append button to parent element

    button.style.position = 'absolute'; // Set button position to absolute
    button.style.width = '384px'; // Resize button width
    button.style.height = '130px'; // Resize button height
    button.style.left = '50px';
    button.style.bottom = '180px';


    img.style.width = '100%'; // Resize image to fill the entire button
    img.style.height = '100%'; // Resize image to fill the entire button
    //img.style.objectFit = 'contain'; // Resize image while maintaining its aspect ratio
}

function SetStartUIGameTutorialButtom(parentEl){
    const button = document.createElement('div'); // Create button
    button.classList.add('startButton'); // Set button class

    const img = document.createElement('img'); // Create image
    img.src = '../resources/game/IMG/Btn_HowtoPlay.png'; // Set image source
    img.alt = 'Start Button Image'; // Set image alt text

    button.appendChild(img); // Append image to button


    button.addEventListener('click', function() {
        background.TutorialUI();
    });

    parentEl.appendChild(button); // Append button to parent element

    button.style.position = 'absolute'; // Set button position to absolute
    button.style.width = '384px'; // Resize button width
    button.style.height = '130px'; // Resize button height
    button.style.left = '50px';
    button.style.bottom = '30px';


    img.style.width = '100%'; // Resize image to fill the entire button
    img.style.height = '100%'; // Resize image to fill the entire button
    //img.style.objectFit = 'contain'; // Resize image while maintaining its aspect ratio
}

function SetTutorialUIButtom(parentEl){
    const button = document.createElement('div'); // Create button
    button.classList.add('startButton'); // Set button class

    const img = document.createElement('img'); // Create image
    img.src = '../resources/game/IMG/Btn_GameStart2.png'; // Set image source
    img.alt = 'Start Button Image'; // Set image alt text

    button.appendChild(img); // Append image to button


    button.addEventListener('click', function() {
        background.NicknameUI();
    });

    parentEl.appendChild(button); // Append button to parent element

    button.style.position = 'absolute'; // Set button position to absolute
    button.style.width = '548px'; // Resize button width
    button.style.height = '182px'; // Resize button height
    button.style.left = '50%'; // Position at the center horizontally
    button.style.transform = 'translateX(-50%)'; // Adjust to center the button
    button.style.bottom = '140px'; // Position at the bottom


    img.style.width = '100%'; // Resize image to fill the entire button
    img.style.height = '100%'; // Resize image to fill the entire button
    //img.style.objectFit = 'contain'; // Resize image while maintaining its aspect ratio
}

let enteredNickname = ''; // Variable to store the entered nickname

function SetNickNameInputField(parentEl) {
    const inputField = document.createElement('div');
    inputField.classList.add('nicknameInputContainer');

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.placeholder = '(6자리)';
    inputElement.classList.add('nicknameInput');

    // Set background image using CSS
    inputElement.style.backgroundImage = 'url("../resources/game/IMG/Nickname_Slot.png")';
    inputElement.style.backgroundSize = 'cover';
    inputElement.style.backgroundPosition = 'center';
    inputElement.style.width = '794px'; // Resize button width
    inputElement.style.height = '189px'; // Resize button height
    inputElement.style.paddingRight = '80px'; // Adjust this value to control the right padding
    inputElement.style.textAlign = 'right';
    inputElement.style.fontSize = '80px';
    inputElement.style.color = '#4D3826';
    inputElement.style.border = 'none'; // Remove border
    inputElement.style.fontFamily = 'CookieRunBlack';

    // Add alpha (transparency) to the background
    inputElement.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // Adjust the alpha value as needed

    // Add event listener to limit the input to 6 characters and update the variable
    inputElement.addEventListener('input', function () {
        const inputValue = inputElement.value;
        if (inputValue.length > 6) {
            // Trunxcate the input to 6 characters
            inputElement.value = inputValue.slice(0, 6);
        }
        enteredNickname = inputElement.value; // Update the variable with the entered nickname
    });

    // Center the inputField
    inputField.style.position = 'absolute';
    inputField.style.left = '50%';
    inputField.style.top = '28%';
    inputField.style.transform = 'translate(-50%)';

    // Remove border
    inputElement.style.border = 'none';

    inputField.appendChild(inputElement);

    // Append input field to the parent element
    parentEl.appendChild(inputField);
}

function SetGamePlayButton (parentEl) {
    const button = document.createElement('div'); // Create button
    button.classList.add('startButton'); // Set button class

    const img = document.createElement('img'); // Create image
    img.src = '../resources/game/IMG/Btn_GameStart3.png'; // Set image source
    img.alt = 'Start Button Image'; // Set image alt text

    button.appendChild(img); // Append image to button


    button.addEventListener('click', function() {
        // Pass the entered nickname to the next screen or perform any action needed
        console.log('Entered Nickname:', enteredNickname);
        background.PlayUI();
    });

    parentEl.appendChild(button); // Append button to parent element

    button.style.position = 'absolute'; // Set button position to absolute
    button.style.width = '694px'; // Resize button width
    button.style.height = '228px'; // Resize button height
    button.style.left = '50%';
    button.style.bottom = '100px';
    button.style.transform = 'translate(-50%)';


    img.style.width = '100%'; // Resize image to fill the entire button
    img.style.height = '100%'; // Resize image to fill the entire button
    //img.style.objectFit = 'contain'; // Resize image while maintaining its aspect ratio
}

function SetGamePlayUI (parentEl) 
{
// Your UI setup code here...

    // Use setTimeout to delay the execution of background.PlayUI() by 2 seconds
    setTimeout(function() {
        background.RunUI();
    }, 1000);
}

function SetRunUI(parentEl) {
    SetJumpButton(parentEl);
    //SetHUD(parentEl);
}
function SetJumpButton (parentEl) {
    const button = document.createElement('div'); // Create button
    button.classList.add('startButton'); // Set button class

    const img = document.createElement('img'); // Create image
    img.src = '../resources/game/IMG/Btn_Jump.png'; // Set image source
    img.alt = 'Start Button Image'; // Set image alt text

    button.appendChild(img); // Append image to button


    button.addEventListener('click', function() {
        // Pass the entered nickname to the next screen or perform any action needed
        console.log("Jump");
        hero.Jump();
        snow.Jump();
    });

    parentEl.appendChild(button); // Append button to parent element

    button.style.position = 'absolute'; // Set button position to absolute
    button.style.width = '779px'; // Resize button width
    button.style.height = '255px'; // Resize button height
    button.style.left = '50%';
    button.style.bottom = '50px';
    button.style.transform = 'translate(-50%)';


    img.style.width = '100%'; // Resize image to fill the entire button
    img.style.height = '100%'; // Resize image to fill the entire button
    //img.style.objectFit = 'contain'; // Resize image while maintaining its aspect ratio
}


function SetClearUI(parentEl){
    // Use setTimeout to delay the execution of background.PlayUI() by 2 seconds
    setTimeout(function() {
        firebaseHandler.readDataRank(GetRankingResult);
    }, 2000);
}

function SetResultUI(parentEl) {
    const currentSnowSize = snowSize;
    const happyBox = Math.random() < 0.95 ? 2: 1;
    SetResultSnowBallText(parentEl,`${currentSnowSize}`);
    SetResultNicknameText(parentEl,enteredNickname);
    SetResultHappyBoxText(parentEl,happyBox);
    SetResultUserDataCountText(parentEl,rankingResult.UserCount);
    SetResultUserDataBoxCountText(parentEl,rankingResult.HappyBoxCount);
    SetResultEventButton(parentEl);
}

function SetResultSnowBallText(parentEl, resultText) {
    const resultTextElement = document.createElement('div'); // Create a div element for the result text
    resultTextElement.classList.add('resultText'); // Add a class for styling if needed
    resultTextElement.innerText = resultText || ''; // Set the text content, default to an empty string if not provided

    parentEl.appendChild(resultTextElement); // Append the result text element to the parent element

    // Style the result text element
    resultTextElement.style.position = 'absolute';
    resultTextElement.style.top = '16.5%';
    resultTextElement.style.left = '51%';
    resultTextElement.style.transform = 'translate(-50%, -50%)';
    resultTextElement.style.fontSize = '95px';
    resultTextElement.style.width = '900px';
    resultTextElement.style.height = '200px';
    resultTextElement.style.paddingTop = '20px';
    resultTextElement.style.paddingRight = '35%';
    resultTextElement.style.color = '#66ACFF';

    console.log(resultTextElement);
}
function SetResultNicknameText(parentEl, resultText) {
    const resultTextElement = document.createElement('div'); // Create a div element for the result text
    resultTextElement.classList.add('resultText'); // Add a class for styling if needed
    resultTextElement.innerText = resultText || ''; // Set the text content, default to an empty string if not provided

    parentEl.appendChild(resultTextElement); // Append the result text element to the parent element

    // Style the result text element
    resultTextElement.style.position = 'absolute';
    resultTextElement.style.top = '28%';
    resultTextElement.style.left = '43%';
    resultTextElement.style.transform = 'translate(-50%, -50%)';
    resultTextElement.style.fontSize = '60px';
    resultTextElement.style.color = 'black';
    resultTextElement.style.width = '600px';
    resultTextElement.style.height = '200px';
    resultTextElement.style.color = '#4D3826';
    resultTextElement.style.paddingTop = '20px';
    resultTextElement.style.paddingRight = '35%';

    console.log(resultTextElement);
}
function SetResultHappyBoxText(parentEl, resultText) {
    const resultTextElement = document.createElement('div'); // Create a div element for the result text
    resultTextElement.classList.add('resultText'); // Add a class for styling if needed
    resultTextElement.innerText = resultText || ''; // Set the text content, default to an empty string if not provided

    parentEl.appendChild(resultTextElement); // Append the result text element to the parent element

    // Style the result text element
    resultTextElement.style.position = 'absolute';
    resultTextElement.style.top = '36%';
    resultTextElement.style.left = '75%';
    resultTextElement.style.transform = 'translate(-50%, -50%)';
    resultTextElement.style.fontSize = '150px';
    resultTextElement.style.width = '300px';
    resultTextElement.style.height = '200px';
    resultTextElement.style.color = '#E81AA9';
    resultTextElement.style.paddingTop = '20px';
    resultTextElement.style.paddingRight = '35%';

    console.log(resultTextElement);
}
function SetResultUserDataCountText(parentEl, resultText) {
    const resultTextElement = document.createElement('div'); // Create a div element for the result text
    resultTextElement.classList.add('resultText'); // Add a class for styling if needed
    resultTextElement.innerText = resultText || ''; // Set the text content, default to an empty string if not provided

    parentEl.appendChild(resultTextElement); // Append the result text element to the parent element

    // Style the result text element
    resultTextElement.style.position = 'absolute';
    resultTextElement.style.top = '53.3%';
    resultTextElement.style.left = '81.5%';
    resultTextElement.style.transform = 'translate(-50%, -50%)';
    resultTextElement.style.fontSize = '35px';
    resultTextElement.style.width = '300px';
    resultTextElement.style.height = '200px';
    resultTextElement.style.color = '#FFFFFF';
    resultTextElement.style.paddingTop = '20px';
    resultTextElement.style.paddingRight = '35%';

    console.log(resultTextElement);
}
function SetResultUserDataBoxCountText(parentEl, resultText) {
    const resultTextElement = document.createElement('div'); // Create a div element for the result text
    resultTextElement.classList.add('resultText'); // Add a class for styling if needed
    resultTextElement.innerText = resultText || ''; // Set the text content, default to an empty string if not provided

    parentEl.appendChild(resultTextElement); // Append the result text element to the parent element

    // Style the result text element
    resultTextElement.style.position = 'absolute';
    resultTextElement.style.top = '56.2%';
    resultTextElement.style.left = '82.5%';
    resultTextElement.style.transform = 'translate(-50%, -50%)';
    resultTextElement.style.fontSize = '35px';
    resultTextElement.style.width = '300px';
    resultTextElement.style.height = '200px';
    resultTextElement.style.color = '#FFFFFF';
    resultTextElement.style.paddingTop = '20px';
    resultTextElement.style.paddingRight = '35%';

    console.log(resultTextElement);
}

function SetResultEventButton (parentEl) {
    const button = document.createElement('div'); // Create button
    button.classList.add('startButton'); // Set button class

    // const img = document.createElement('img'); // Create image
    // img.src = '../resources/game/IMG/Btn_GameStart3.png'; // Set image source
    // img.alt = 'Start Button Image'; // Set image alt text

    //button.appendChild(img); // Append image to button


    button.addEventListener('click', function() {
        openForm();
    });

    parentEl.appendChild(button); // Append button to parent element

    button.style.position = 'absolute'; // Set button position to absolute
    button.style.width = '820px'; // Resize button width
    button.style.height = '228px'; // Resize button height
    button.style.left = '50%';
    button.style.bottom = '80px';
    button.style.transform = 'translate(-50%)';


    // img.style.width = '100%'; // Resize image to fill the entire button
    // img.style.height = '100%'; // Resize image to fill the entire button
    console.log(button);
    //img.style.objectFit = 'contain'; // Resize image while maintaining its aspect ratio
}

function openForm() {
    const parrentEl = document.querySelector('.game');
    // Create scroll-bg element
    const scrollBg = document.createElement('div');
    scrollBg.classList.add('scroll-bg');

    // Create scroll-div element
    const scrollDiv = document.createElement('div');
    scrollDiv.classList.add('scroll-div');

    // Create scroll-object element
    const scrollObject = document.createElement('div');
    scrollObject.classList.add('scroll-object');

    // Create popupNickname element
    const popupNickname = document.createElement('div');
    popupNickname.classList.add('popupNickname');
    popupNickname.textContent = '안녕하세여여';//enteredNickname;
    popupNickname.style.color = '#36BAAB';
    popupNickname.style.fontFamily = 'CookieRunBlack';

    // Create close-button element
    const closeButton = document.createElement('div');
    closeButton.classList.add('close-button');

    closeButton.addEventListener('click', function() {
        closeForm();
    });

    // Append popupNickname and closeButton to scroll-object
    scrollObject.appendChild(popupNickname);
    scrollObject.appendChild(closeButton);

    scrollDiv.appendChild(scrollObject);
    scrollBg.appendChild(scrollDiv);
    parrentEl.appendChild(scrollBg);
}

function closeForm() {
    const scrollBg = document.querySelector('.scroll-bg');
    
    if (scrollBg) {
        // Remove the popup element from its parent
        scrollBg.parentNode.removeChild(scrollBg);
    }
}