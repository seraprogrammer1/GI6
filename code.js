
const playerScore = document.querySelector("playerScore");
const compScore = document.querySelector("compScore");
const h3 = document.querySelector("h3");

const input = document.querySelector("input");
const label = document.querySelector("label");

const button = document.querySelector("button");

const option_selector = document.getElementById("option_selector");
const children = option_selector.children;

const Moves = [["Rock", "Paper"], ["Paper", "Scissor"], ["Scissor", "Rock"]]

let invalidEntry = false;

// get the computer entry and check it the player won!!!
function Game(player_move){

    // remove the red outline around the inputs parent
    if (invalidEntry){
        input.parentElement.style = "border-color: rgb(125, 107, 107);"
        input.placeholder = "Rock, Paper, Scissor"

        invalidEntry = false;
    }


    const value = Math.floor(Math.random()*3)
    const comp_move = Moves[value][0];
    const lose_move = Moves[value][1];

    if (comp_move == player_move){
        h3.innerHTML = "It's a tie!"
    } else if (lose_move == player_move){
        h3.innerHTML = `${player_move} beats ${comp_move}. You Win!`
        playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1;
    } else {
        h3.innerHTML = `${comp_move} beats ${player_move}. Computer wins!`
        compScore.innerHTML = parseInt(compScore.innerHTML) + 1;
    }
}

function Reset(){
    playerScore.innerHTML = 0;
    compScore.innerHTML = 0;
    h3.innerHTML = "Let the game Begin!!!"
}

// add all the children of option_selector to and eventlistener
// base on the children order it know which move the player want to do
for (let i = 0; i < children.length; i++) {
    const child = children[i];
    child.addEventListener('click', (event) => {
        Game(Moves[i][0]);
    });
}

// capitalize the first letter of a word and lowercase the rest of the word
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// checks to see if the input value is valid. only valid entry get sent to game function
function checker() {
    move = capitalize(input.value);

    console.log(move == Moves[0][0])
    if (move !== Moves[0][0] && move !== Moves[1][0] && move !== Moves[2][0]){
        input.parentElement.style = "border-color: red;"

        input.value = ""
        input.placeholder = "Invalid Entry"

        invalidEntry = true;
    } else {
        Game(move);
    }
}

// pressing enter while inside the input will call the checker function
input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        checker();
    }
})

// clicking the label will call the checker function
label.addEventListener('click', (event) => {
    checker();
})

// clicking the label will call the Reset function
button.addEventListener('click', (event) => {
    Reset();
})

