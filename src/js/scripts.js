const coverGif = "src/images/front.png";
const gameList = []
let time = 0;
let timeID = 0;
let numberOfTurns = 0;
let previousCard = "None"
let pairsMatched = 0;
let gifsList = [
    "src/images/bobrossparrot.gif",
    "src/images/explodyparrot.gif",
    "src/images/fiestaparrot.gif",
    "src/images/metalparrot.gif",
    "src/images/revertitparrot.gif",
    "src/images/tripletsparrot.gif",
    "src/images/unicornparrot.gif"    
];

let numberOfCards = prompt("Com quantas cartas você quer jogar?\n*Apenas números pares\n(Mínimo: 4 cartas - Máximo: 14 cartas)");

while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards%2 != 0) {
    numberOfCards = prompt("Com quantas cartas você quer jogar?\n*Apenas números pares\n(Mínimo: 4 cartas - Máximo: 14 cartas)");
} 

for (let i = 0; i < numberOfCards/2; i++) {
    gameList.push(gifsList[i]);
    gameList.push(gifsList[i]);
}

for (let i = 0; i < numberOfCards; i++) {
    document.querySelector(".cardDisplay").innerHTML += `<li onclick="gamePlaying(this)" id="${i+1}" class="card unturned"><img src="src/images/front.png" alt="desenho de um papagaio verde, de bico amarelo e laranja, e barriga vermelha e azul, usado como verso de todas as cartas, que é substituido pela figura de papagaio psicodélico escolhida aleatóriamente escondida depois que a carta é clicada"></li>`;
}

gameList.sort(comparator);
console.log(gameList);

timeID = setInterval(babyOneMoreTime, 1000);
function babyOneMoreTime() {
    time++;
    document.querySelector("span").innerHTML = time;
}


function comparator() {
    return Math.random() - 0.5;
}

function gamePlaying(element) {
    const cardImage = element.querySelector("img");
    
    if (element.classList.contains("unturned")) {
        turnCard(element, cardImage, gameList[element.id-1]);
        numberOfTurns++;
    } 

    if (previousCard != "None" && !previousCard[0].classList.contains("matched") &&!previousCard[0].classList.contains("unturned") ) {
        
        if ( previousCard[0].id != element.id && previousCard[1].src === cardImage.src) {
            previousCard[0].classList.add("matched");
            element.classList.add("matched");
            pairsMatched++;
            previousCard = [element, cardImage];
            
            if (pairsMatched === numberOfCards/2) {
                clearInterval(timeID);
                setTimeout(alert, 50, `Você ganhou em ${numberOfTurns} jogadas e levou ${time} segundos para concluir`);
            }
            return;
        } 
        setTimeout(turnCard, 1000, previousCard[0], previousCard[1], coverGif);
        if( previousCard[0].id != element.id) {
            setTimeout(turnCard, 1000, element, cardImage, coverGif);
        } else {
            previousCard = "None";
            return;
        }
    } 
    
    previousCard = [element, cardImage];
}

function turnCard(cardElement, imageElement, imageSRC) {
    imageElement.src = imageSRC;
    cardElement.classList.toggle("unturned");
}