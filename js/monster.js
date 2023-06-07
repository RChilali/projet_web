let name
let life
let money
let awake

// buttons
let btnRun = document.getElementById("run")
let btnFight = document.getElementById("fight")
let btnWork = document.getElementById("work")
let btnSleep = document.getElementById("sleep")
let btnEat = document.getElementById("eat")
let btnShow = document.getElementById("show")
let btnNew = document.getElementById("new")
let btnKill = document.getElementById("kill")

// other elements
let actionBox = document.getElementById("actionbox")
let statut = document.getElementById("statut")
let monster = document.getElementById("monster")


let timeforrandomaction = 7000
let sleepTimeout


function initMonstre(nom, vie, argent) {
    name = nom
    life = vie
    money = argent
    awake = true
}

function afficheMonstre() {
    console.log(name, life, money)
    logBoite("name: " + name + " life: " + life + " money: " + money)
}

function logBoite(message) {
    let newP = document.createElement("p")
    newP.innerHTML = message
    actionBox.insertBefore(newP, actionBox.firstChild)
}

function updatestatut() {
    statut.children[0].innerHTML = "Vie : " + life
    statut.children[1].innerHTML = "Argent : " + money
    statut.children[2].innerHTML = awake ? "Éveillé" : "Endormi"
}

function courir() {
    if (awake && life > 1) {
        life -= 1
        logBoite("Vous avez couru, vous perdez 1 points de vie")
        updatestatut()
    }
    if (!awake) {
        logBoite("Vous ne pouvez pas courir, vous êtes endormi")
    }
    if (life < 2) {
        logBoite("Vous ne pouvez pas courir, vous n'avez plus assez de vie")
    }
}

function seBattre() {
    if (awake && life > 3) {
        life -= 3
        logBoite("Vous vous êtes battu, vous perdez 3 points de vie")
        updatestatut()
    }
    if (!awake) {
        logBoite("Vous ne pouvez pas vous battre, vous êtes endormi")
    }
    if (life < 4) {
        logBoite("Vous ne pouvez pas vous battre, vous n'avez plus assez de vie")
    }
}

function travailler() {
    if (awake && life > 1) {
        life -= 1
        money += 2
        logBoite("Vous avez travaillé, vous perdez 1 points de vie et gagnez 2 unités d'argent")
        updatestatut()
    }
    if (!awake) {
        logBoite("Vous ne pouvez pas travailler, vous êtes endormi")
    }
    if (life < 2) {
        logBoite("Vous ne pouvez pas travailler, vous n'avez plus assez de vie")
    }
}

function manger() {
    if (awake && money > 2) {
        life += 2
        money -= 3
        logBoite("Vous avez mangé, vous gagnez 2 points de vie et perdez 3 unités d'argent")
        updatestatut()
    }
    if (!awake) {
        logBoite("Vous ne pouvez pas manger, vous êtes endormi")
    }
    if (money < 3) {
        logBoite("Vous ne pouvez pas manger, vous n'avez plus assez d'argent")
    }
}

function dormir() {
    if (awake) {
        awake = false
        logBoite("Vous vous êtes endormi")
        updatestatut()
        sleepTimeout = setTimeout(function () {
            awake = true
            life += 1
            logBoite("Vous vous êtes réveillé, vous gagnez 1 point de vie")
            updatestatut()
        }, 5000)
    } else {
        logBoite("Vous êtes déjà endormi")
    }
}

function actionauhasard() {
    if (life > 0) {
        let actions = [courir, seBattre, travailler, manger, dormir]
        let action = actions[Math.round(Math.random() * actions.length)]
        action()
    }
}

function kill() {
    if (life > 0) {
        clearTimeout(sleepTimeout);
        awake = true;
        life = 0
        logBoite("Vous êtes mort")
        updatestatut()
    } else {
        logBoite("Vous êtes déjà mort")
    }
}

function newlife() {
    if (life === 0) {
        initMonstre("michel", 20, 20)
        btnKill.disabled = false
        updatestatut()
    } else {
        logBoite("Vous êtes encore vivant")
    }
}

function refresh() {
    // border should increment with money
    monster.style.border = "solid black"
    monster.style.borderWidth = money + "px"
    if (life < 10) {
        monster.style.backgroundColor = "rgb(255, " + (255 - life * 25) + ", " + (255 - life * 25) + ")"
    } else if (life < 20) {
        monster.style.backgroundColor = "rgb(" + (255 - (life - 10) * 25) + ", 255, " + (255 - (life - 10) * 25) + ")"
    } else monster.style.backgroundColor = "rgb(" + (255 - (life - 20) * 25) + ", " + (255 - (life - 20) * 25) + ", 255)"
    btnKill.disabled = (life === 0);
    btnNew.disabled = (life > 0)
    btnSleep.disabled = (awake === false)
    let state = (awake === false || life === 0)
    btnSleep.disabled = state
    btnRun.disabled = state
    btnFight.disabled = state
    btnWork.disabled = state
    btnEat.disabled = state
}

function go() {
    initMonstre("michel", 20, 20)

    setInterval(actionauhasard, timeforrandomaction)
    setInterval(refresh, 100)

    btnShow.addEventListener("click", afficheMonstre)
    btnRun.addEventListener("click", courir)
    btnFight.addEventListener("click", seBattre)
    btnWork.addEventListener("click", travailler)
    btnEat.addEventListener("click", manger)
    btnSleep.addEventListener("click", dormir)
    btnNew.addEventListener("click", newlife)
    btnKill.addEventListener("click", kill)
    updatestatut()
}

window.addEventListener("load", go)
