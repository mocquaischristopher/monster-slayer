"use strict";
let pvYouSpan = document.querySelector('.pvYou');
let pvMonsterSpan = document.querySelector('.pvMonster');
let pvYou;
let pvMonster;

let progressYou = document.getElementById('pvYou');
let progressMonster = document.getElementById("pvMonster");

let log = document.querySelector(".log");

let startButton = document.querySelector('.start');
let buttons = document.querySelector('.buttons');
let attackButton = document.querySelector('.attack');
let specialButton = document.querySelector('.specialAttack');
let healButton = document.querySelector('.heal');
let giveUpButton = document.querySelector('.giveUp');
buttons.hidden = true;
startButton.addEventListener('click', start);
attackButton.addEventListener('click', attack);
specialButton.addEventListener('click', special);
healButton.addEventListener('click', heal);
giveUpButton.addEventListener('click', giveUp);


function start() {
    pvYou = 100;
    pvMonster = 100;

    pvYouSpan.innerHTML = pvYou;
    pvMonsterSpan.innerHTML = pvMonster;

    progressYou.value = pvYou;
    progressMonster.value = pvMonster;

    startButton.hidden = true;
    attackButton.disabled = false;
    specialButton.disabled = false;
    healButton.disabled = false;
    buttons.hidden = false;

    let turns = document.createElement("ul");
    log.append(turns);
}

function li(key, attackMonster, attackYou){
    let liP = document.createElement("li");
    liP.classList.add("blue");
    let liM = document.createElement("li");
    liM.classList.add("red");
    
    let txtYou;
    let txtMonster = "MONSTER hits PLAYER FOR " + attackMonster;

    switch (key) {
        case "attack":
            txtYou = "PLAYER hits MONSTER FOR " + attackYou 
            break;
            
        case "special":
            txtYou = "PLAYER hits MONSTER HARD FOR " + attackYou;
            break;

        case "heal":
            txtYou = "PLAYER HEALS FOR 10";
            break;
    }

    let textYou = document.createTextNode(txtYou);
    let textMonster = document.createTextNode(txtMonster);

    let turn = document.getElementsByTagName("ul");
    turn[0].append(liP);
    turn[0].append(liM);
    liP.append(textYou)
    liM.append(textMonster);
}

function attack() {
    let attackYou = Math.floor(Math.random() * ((10 - 3) + 1) + 3);
    let attackMonster = Math.floor(Math.random() * ((10 - 5) + 1) + 5);

    li("attack", attackMonster, attackYou);
    
    pvYou -= attackMonster;
    pvYouSpan.innerHTML = pvYou;
    progressYou.value = pvYou;
    pvMonster -= attackYou;
    pvMonsterSpan.innerHTML = pvMonster
    progressMonster.value = pvMonster;

    win();
}

function special() {
    let attackYou = Math.floor(Math.random() * ((20 - 10) + 1) + 10);
    let attackMonster = Math.floor(Math.random() * ((10 - 5) + 1) + 5);

    li("special", attackMonster, attackYou);

    pvYou -= attackMonster;
    pvMonster -= attackYou;
    pvYouSpan.innerHTML = pvYou;
    progressYou.value = pvYou;
    pvMonsterSpan.innerHTML = pvMonster
    progressMonster.value = pvMonster;

    win();
}

function heal() {

    if ((pvYou += 10) >= 100) {
        pvYou = 100;
    } else {
        pvYou += 10;
    }

    let attackMonster = Math.floor(Math.random() * ((10 - 5) + 1) + 5);

    li("heal", attackMonster);

    pvYou -= attackMonster;
    pvMonster;
    pvYouSpan.innerHTML = pvYou;
    progressYou.value = pvYou;
    pvMonsterSpan.innerHTML = pvMonster
    progressMonster.value = pvMonster;

    win();
}

function giveUp() {

    let turn = document.getElementsByTagName("ul");

    if(confirm("YOU are give up, new game?")){
        turn[0].remove();
        start();
    }else{
        attackButton.disabled = true;
        specialButton.disabled = true;
        healButton.disabled = true;
    }
}

function win() {
    let turn = document.getElementsByTagName("ul");

    if( pvYou <= 0){
        if(confirm("MONSTER win the game, new game?")){
            turn[0].remove();
            start();
        }else{
            attackButton.disabled = true;
            specialButton.disabled = true;
            healButton.disabled = true;
        }
    } else if(pvMonster <= 0){
        if(confirm("YOU win the game, new game?")){
            turn[0].remove();
            start();
        }else{
            attackButton.disabled = true;
            specialButton.disabled = true;
            healButton.disabled = true;
        }
    }
}

