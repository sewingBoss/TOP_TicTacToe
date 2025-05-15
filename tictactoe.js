//gameboard stuff
class Gameboard{
    constructor(){
        this.arr = [
            ['','',''], //row0
            ['','',''], //row1
            ['','','']  //row2
        ];
        this.turn = 'O';
        this.winner = null;
    }

    nxtTurn(){
        this.turn = this.turn == 'X'? 'O': 'X';
        console.log(`next turn is ${this.turn}!`);
    }

    setCell(row,col){
        this.arr[row][col] = this.turn;
        console.log(`row ${row} and col ${col} set to ${this.turn}`);
    }

    getCell(row, col){
        return this.arr[row][col];
    }

    getTurn(){
        return this.turn;
    }

    someoneWon(){
        if(this.winner){
            console.log(`${this.winner} wins!`);
            const winscreen = document.querySelector('.youwin');
            winscreen.classList.remove('invisible');
            winscreen.classList.add('playagain');

            const winpara = winscreen.querySelector('p');
            winpara.textContent = `${this.winner} Wins !`
            return;
        }
    }

 checkWin(){
        //horizontal check
        out:for(let i = 0; i<3; i++){
            let prevVal;
            let bool = true;
            for(let j = 0; j<3; j++){
                let currVal = this.arr[i][j];

                if(prevVal === "" || currVal === "") break;
                if(j==0) {
                    prevVal = currVal;
                    continue;
                };

                bool = (currVal === prevVal);

                if(!bool){
                    break;
                } else if (j==2){
                    this.winner = currVal;
                    break out;
                }
                prevVal = currVal;
            }
        };
this.someoneWon();
        //vertical check
        out:for(let i = 0; i<3; i++){
            let prevVal;
            let bool = true;
            for(let j = 0; j<3; j++){
                let currVal = this.arr[j][i];

                if(prevVal === "" || currVal === "") break;
                if(j==0) {
                    prevVal = currVal;
                    continue;
                };
                
                bool = (currVal === prevVal);

                if(!bool){
                    break;
                } else if (j==2){
                    this.winner = currVal;
                    break out;
                }
                prevVal = currVal;
            }
        };
this.someoneWon();

        //diagonal check left to right
        {
            let prevVal;
            let bool = true;

            for(let i = 0;i<3;i++){
                let currVal = this.arr[i][i];
                if(!(i==0)){bool = (currVal === prevVal)};
                if(!bool){
                    break;
                } else if(i == 2){
                    this.winner = currVal;
                }
                prevVal = currVal;
             }
        }
this.someoneWon();
        //diagonal check right to left
        {
            let prevVal;
            let bool = true;

            for(let i = 2;i>-1;i--){
                let currVal = this.arr[i][2-i];
                if(!(i==2)){bool = (currVal === prevVal)};
                if(!bool){
                    break;
                } else if(i == 0){
                    this.winner = currVal;
                }
                prevVal = currVal;
             }
        }
this.someoneWon();
    };
}
const gameboard = new Gameboard();


//player stuff
class Player{
    constructor(name){
        this._name = name;
        this._wins = 0;
    }

    set wins(placeholder){
        this._wins ++;
    }

    get wins(){
        return this._wins;
    }

    get win(){
        this.wins(0); //should work as wins setter. We need to use this
    }
    
    get name(){
        return this._name;
    }
}


//player form stuff
const player1form = document.querySelector('#player1');
const player1Button = player1form.querySelector('button');
let player1obj;
player1Button.addEventListener('click', (e)=>{
    e.preventDefault();
    const formdata = new FormData(player1form);
    let p1name = formdata.get('name');
    if(player1obj===undefined){ player1obj = new Player(p1name);}
    player1form.classList.add('invisible');
    console.log(player1form.classList.forEach((i)=>{console.log(i)}));
});

const player2form = document.querySelector('#player2');
const player2Button = player2form.querySelector('button');
let player2obj;
player2Button.addEventListener('click', (e)=>{
    e.preventDefault();
    const formdata = new FormData(player2form);
    let p1name = formdata.get('name');

    let p2name = e.target.name;
    if(player2obj===undefined){ player2obj = new Player(p2name);}
    player2form.classList.add('invisible');
});



//set cell stuff
function setChoice(celel){
    let r = celel.dataset.row;
    let c = celel.dataset.col;
    let result = true;;
    if(gameboard.getCell(r,c)){
        alert("You can't override someone's box!");
        result = false;
    } else {
        gameboard.setCell(r,c);
        gameboard.checkWin();
    }
    return result;
};

let cells = document.querySelectorAll('.cell');
cells.forEach((cel)=>{
    cel.addEventListener('click', (e)=>{
        let worked = setChoice(cel);
        if(worked){
            cel.textContent = gameboard.getTurn();
            gameboard.nxtTurn();
        }

    });
});

//replay stuff
{
    const replaybutton = document.querySelector('.youwin>button');
    replaybutton.addEventListener('click',(e)=>{
        e.preventDefault();

        location.reload();
    })
}