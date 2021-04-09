const coverGif = "src/images/front.png";
const gameList = []
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
    document.querySelector(".cardDisplay").innerHTML += `<li onclick="turnCard(this)" id="${i+1}" class="card unturned"><img src="src/images/front.png" alt="desenho de um papagaio verde, de bico amarelo e laranja, e barriga vermelha e azul, usado como verso de todas as cartas, que é substituido pela figura de papagaio psicodélico escolhida aleatóriamente escondida depois que a carta é clicada"></li>`;
}

gameList.sort(comparator);
console.log(gameList);

function comparator() {
    return Math.random() - 0.5;
}

function turnCard(element) {
    const cardImage = element.querySelector("img");
    console.log("ID da carta: " + element.id);


    
    if (element.classList.contains("unturned")) {
        console.log("virou essa");
        cardImage.src = gameList[element.id-1];
        element.classList.toggle("unturned");
        numberOfTurns++;

    } 
    if (previousCard != "None" && !previousCard[0].classList.contains("matched") &&!previousCard[0].classList.contains("unturned") ) {
        console.log("ID da carta anterior: " + previousCard[0].id);
        console.log("ID da carta atual: " + element.id);
        console.log("SRC da imagem anterior: " + previousCard[1].src);
        console.log("SRC da imagem atual: " + cardImage.src); 
        if ( previousCard[0].id != element.id && previousCard[1].src === cardImage.src) {
            console.log("Matched!")
            previousCard[0].classList.add("matched");
            element.classList.add("matched");
            pairsMatched++;
            previousCard = [element, cardImage];
            console.log("----------------------------");
            if (pairsMatched === numberOfCards/2) {
                setTimeout(alert, 50, `Você ganhou em ${numberOfTurns} jogadas`);
            }
            return;
        } 
        if(previousCard[0].id === element.id) {
            return;
        }
        console.log("Desvirou a ultima");
        previousCard[1].src = coverGif;
        previousCard[0].classList.toggle("unturned")
        if( previousCard[0].id != element.id) {
            console.log("Desvirou essa");
            cardImage.src = coverGif;
            element.classList.toggle("unturned");
        }
    } 
    
    previousCard = [element, cardImage];
    if (pairsMatched === numberOfCards/2) {
        setTimeout(alert, 50, `Você ganhou em ${numberOfTurns} jogadas`);
    }
    console.log("----------------------------");
}
