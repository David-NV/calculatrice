let onOffBtn=document.querySelector(".btn_OnOff");
let etatCalculatrice="off"

let btnEfface=document.querySelector(".btn_efface");

let zoneSaisie=document.querySelector("#saisie");
let zoneResultat=document.querySelector("#resultat");
let chiffresBtn=document.querySelectorAll(".btn_chiffre");
let calculatrice=document.querySelector("body");
let affichage="0"

let operationBtn=document.querySelectorAll(".btn_operation")
let operation=[]
let operationPossible=false
let resultat=0;

function onOff() {
    if(etatCalculatrice==="off"){
        onOffBtn.textContent="OFF"
        etatCalculatrice="on"
        affichage="0"
        zoneSaisie.textContent=affichage
        operationPossible=true
    }else if(etatCalculatrice==="AC"){
        resultat=0
        affichage="0"
        zoneSaisie.textContent=affichage
        zoneResultat.textContent=""
        operationPossible=true
        onOffBtn.textContent="OFF"
        etatCalculatrice="on"
        
    }
    else{
        onOffBtn.textContent="ON"
        etatCalculatrice="off"
        zoneSaisie.textContent=""
        zoneResultat.textContent=""
        operationPossible=false
    }

}
function afficherAC(){
    if(etatCalculatrice==="on"){
        if(affichage!=="0"){
            onOffBtn.textContent="AC"
            etatCalculatrice="AC"
        }
    }
}
onOffBtn.addEventListener("click",()=>{
    onOff()
})
function effacer() {
    let temp=[]
    if(etatCalculatrice==="on"||etatCalculatrice==="AC"){
        temp=affichage.split("")
        temp.pop()
        affichage=temp.join("")
        if(affichage===""){
            affichage="0"
            etatCalculatrice="on"
            onOffBtn.textContent="OFF"
        }
        zoneSaisie.textContent=affichage
    }
    
}
btnEfface.addEventListener("click",()=>{
    effacer()
})

chiffresBtn.forEach(touche => {
    touche.addEventListener("click",()=>{
        if(etatCalculatrice==="on"||etatCalculatrice==="AC"){
            resultat=0;
            if(!operationPossible){
                affichage=""
                operationPossible=true
            }
            if(affichage==="0" ||affichage===""){
                affichage=touche.value
                afficherAC()
            }else{
                affichage+=touche.value;
                afficherAC()
            }
            zoneSaisie.textContent=affichage
        }
    })
});


function calculer() {
    operation=affichage.split(" ");
    if(operation.length<4){
        switch (operation[1]) {
            case "/":
                resultat=operation[0]/operation[2]
                break;
            case "x":
                resultat=operation[0]*operation[2]
                break;
            case "+":
                resultat=operation[0]*1+operation[2]*1
                break;
            case "-":
                resultat=operation[0]-operation[2]
                break;
            case "^":
                resultat=operation[0]**operation[2]
                break;
            case "e":
                resultat=operation[0]*(10**operation[2])
                break;
            default:
                break;
        }
    }
    zoneResultat.textContent=resultat
    operation=[]
    operationPossible=false    
}
function effectuerCalcul(signe,index1,index2) {
    switch (signe) {
        case "/":
            return(operation[index1]/operation[index2])
            // break;
        case "x":
            return(operation[index1]*operation[index2])
            // break;
        case "+":
            return(operation[index1]*1+operation[index2]*1)
            // break;
        case "-":
            return(operation[index1]-operation[index2])
            // break;
        case "^":
            return(operation[0]**operation[2])
            // break;
        default:
            break;
    }

}

function controlerOperation() {
    operation=affichage.split(" ");
    let indexExposant=operation.indexOf("e")
    while(indexExposant!==-1){
        let temp=operation[indexExposant-1]*(10**operation[indexExposant+1])
        operation.splice(indexExposant-1,3,temp)
        if(operation.length<4){
            indexExposant=-1
        }else{
            indexExposant=operation.indexOf("e")
        }
    }
    let indexPuissance=operation.indexOf("^")
    while(indexPuissance!==-1){
        let temp=operation[indexPuissance-1]**operation[indexPuissance+1]
        operation.splice(indexPuissance-1,3,temp)
        if(operation.length<4){
            indexPuissance=-1
        }else{
            indexPuissance=operation.indexOf("^")
        }
    }
    let indexMultiplication=operation.indexOf("x")
    let indexDivision=operation.indexOf("/")

    while(indexMultiplication!==-1||indexDivision!==-1){
        if(indexMultiplication!==-1&&indexDivision===-1){
            let temp=effectuerCalcul("x",indexMultiplication-1,indexMultiplication+1)
            operation.splice(indexMultiplication-1,3,temp)
        }
        if(indexMultiplication===-1&&indexDivision!==-1){
            let temp=effectuerCalcul("/",indexDivision-1,indexDivision+1)
            operation.splice(indexDivision-1,3,temp)
        }
        if(indexMultiplication!==-1&&indexDivision!==-1){
            if(indexMultiplication<indexDivision){
                let temp=effectuerCalcul("x",indexMultiplication-1,indexMultiplication+1)
                operation.splice(indexMultiplication-1,3,temp)
            }else{
                let temp=effectuerCalcul("/",indexDivision-1,indexDivision+1)
                operation.splice(indexDivision-1,3,temp)
            }
        }
        indexMultiplication=operation.indexOf("x")
        indexDivision=operation.indexOf("/")
    }
    let index=1
    while(index<operation.length){
        let temp=effectuerCalcul(operation[index],index-1,index+1)
        operation.splice(index-1,3,temp)
    }
    resultat=operation
    zoneResultat.textContent=resultat
    operation=[]
    operationPossible=false    
}
function pourcentage() {
    if(resultat!==0){
        operationPossible=true
        affichage=resultat+"/100"
        resultat/=100
    }
    else{
        if(!operationPossible){
            affichage=resultat
        }
        operationPossible=true
        let temp=affichage.split(" ");
        if(temp.length===1){
            resultat=temp[temp.length-1]/100;
            affichage=temp[temp.length-1]+" / 100"
        }else{
            temp[temp.length-1]/=100
            affichage=temp.join(" ")
            resultat=""
        }
    
    }
    zoneSaisie.textContent=affichage
    zoneResultat.textContent=resultat
}

function autreOperation(value) {
    if(resultat!==0){
        operationPossible=true
        affichage=resultat+value
        resultat=0;

    }else{
        if(!operationPossible){
            affichage="0"
        }
        operationPossible=true
        affichage+=value
        afficherAC()
    }
zoneSaisie.textContent=affichage
zoneResultat.textContent=""
}
operationBtn.forEach(touche => {
    touche.addEventListener("click",()=>{
        if(etatCalculatrice==="on"||etatCalculatrice==="AC"){
            if(touche.value===" = "){
                if(affichage!=="0"&&operationPossible){
                    controlerOperation()
                }
            }
            else if(touche.value===" % "){
                if(affichage!=="0"){
                    pourcentage()
                }
            }
            else{
                autreOperation(touche.value)
            }
        }
    })
});

calculatrice.addEventListener("keydown",(touche)=>{
    touche.preventDefault()
    toucheBas(touche)
    if(touche.code==="Home"||touche.code==="KeyQ"){
        onOff()
    }
    if (etatCalculatrice==="on"||etatCalculatrice==="AC") {    
        switch (touche.code) {
            case "Backspace":
                effacer()
                break;
            case "Enter":
            case"NumpadEnter":
                if(affichage!=="0"&&operationPossible){
                    controlerOperation()
                }
                break;
            case "KeyE":
                autreOperation(" e ")
                break;
            case "KeyW": //
                autreOperation(" ^ ")
                break;
            case "NumpadDivide":
            case "Period":
                autreOperation(" / ")
                break;
            case "NumpadMultiply":
            case "Backslash":
                autreOperation(" x ")
                break;
            case "NumpadSubtract":
            case "Digit6":
                autreOperation(" - ")
                break;
            case "NumpadAdd":
            case "Equal":
                autreOperation(" + ")
                break;
            default:
                if(etatCalculatrice==="on"||etatCalculatrice==="AC"){
                    resultat=0;
                    if(!isNaN(touche.key)||touche.key==="."){
                        if(!operationPossible){
                            affichage=""
                            zoneResultat.textContent=""
                            operationPossible=true
                        }
                        if(affichage==="0" ||affichage===""){
                            affichage=touche.key
                            afficherAC()
                        }else{
                            affichage+=touche.key;
                            afficherAC()
                        }
                    }
                    zoneSaisie.textContent=affichage
                }
                break;
        }
    }
})
calculatrice.addEventListener("keyup",(touche)=>{
    touche.preventDefault()
    toucheHaut(touche)
})


let allButtons=document.querySelectorAll("button")

function toucheBas(toucheUtilisee) {
    switch (toucheUtilisee.code) {
        case "Home":case "KeyQ":
            allButtons[0].classList.add("touche_enfoncee")
            break;
        case "Backspace":
            allButtons[1].classList.add("touche_enfoncee")
            break;
        case "KeyE":
            allButtons[2].classList.add("touche_enfoncee")
            break;
        case "NumpadDivide":case "Period":
            allButtons[3].classList.add("touche_enfoncee")
            break;
        case "Numpad7":
            allButtons[4].classList.add("touche_enfoncee")
            break;
        case "Numpad8":
            allButtons[5].classList.add("touche_enfoncee")
            break;
        case "Numpad9":
            allButtons[6].classList.add("touche_enfoncee")
            break;
        case "NumpadMultiply":case "Backslash":
            allButtons[7].classList.add("touche_enfoncee")
            break;
        case "Numpad4":
            allButtons[8].classList.add("touche_enfoncee")
            break;
        case "Numpad5":
            allButtons[9].classList.add("touche_enfoncee")
            break;
        case "Numpad6":
            allButtons[10].classList.add("touche_enfoncee")
            break;
        case "NumpadSubtract":case "Digit6":
            allButtons[11].classList.add("touche_enfoncee")
            break;
        case "Numpad1":
            allButtons[12].classList.add("touche_enfoncee")
            break;
        case "Numpad2":
            allButtons[13].classList.add("touche_enfoncee")
            break;
        case "Numpad3":
            allButtons[14].classList.add("touche_enfoncee")
            break;
        case "NumpadAdd":case "Equal":
            allButtons[15].classList.add("touche_enfoncee")
            break;
        case "Numpad0":
            allButtons[16].classList.add("touche_enfoncee")
            break;
        case "NumpadDecimal":
            allButtons[17].classList.add("touche_enfoncee")
            break;
        case "KeyW":
            allButtons[18].classList.add("touche_enfoncee")
            break;
        case "Enter":case"NumpadEnter":
            allButtons[19].classList.add("touche_enfoncee")
            break;
        default:
            break;
    }
    if (toucheUtilisee.code==="Home"||toucheUtilisee.code==="KeyQ"){
        onOffBtn.classList.add("touche_enfoncee")
    }
}

function toucheHaut() {
    allButtons.forEach(element => {
        element.classList.remove("touche_enfoncee")
        element.blur()
    });
}
