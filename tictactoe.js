//gameboard stuff
const gameboard = function(){
    let arr = [
        ['','',''], //row0
        ['','',''], //row1
        ['','','']  //row2
    ];
    let turn = 'O';
    let winner;

    function nxtTurn(){
        if(turn == 'X'){
            turn = 'O';
        } else {
            turn = 'X';
        }
        console.log(`next turn is ${turn}!`);
    };

    function setCell(row, col){
        arr[row][col] = turn;
        console.log(`row ${row} and col ${col} set to ${turn}`);
    };

    function getCell(row,col){
        return arr[row][col];
    };
    function getTurn(){
        return turn;
    }
    function someoneWon(){
        if(winner){
            console.log(`${winner} wins!`);
            const winscreen = document.querySelector('.youwin');
            winscreen.classList.remove('invisible');
            winscreen.classList.add('playagain');

            const winpara = winscreen.querySelector('p');
            winpara.textContent = `${winner} Wins !`
            return;
        }
    }
    function checkWin(){
        //horizontal check
        out:for(let i = 0; i<3; i++){
            let prevVal;
            let bool = true;
            for(let j = 0; j<3; j++){
                let currVal = arr[i][j];

                if(prevVal === "" || currVal === "") break;
                if(j==0) {
                    prevVal = currVal;
                    continue;
                };

                bool = (currVal === prevVal);

                if(!bool){
                    break;
                } else if (j==2){
                    winner = currVal;
                    break out;
                }
                prevVal = currVal;
            }
        };
someoneWon();
        //vertical check
        out:for(let i = 0; i<3; i++){
            let prevVal;
            let bool = true;
            for(let j = 0; j<3; j++){
                let currVal = arr[j][i];

                if(prevVal === "" || currVal === "") break;
                if(j==0) {
                    prevVal = currVal;
                    continue;
                };
                
                bool = (currVal === prevVal);

                if(!bool){
                    break;
                } else if (j==2){
                    winner = currVal;
                    break out;
                }
                prevVal = currVal;
            }
        };
someoneWon();

        //diagonal check left to right
        {
            let prevVal;
            let bool = true;

            for(let i = 0;i<3;i++){
                let currVal = arr[i][i];
                if(!(i==0)){bool = (currVal === prevVal)};
                if(!bool){
                    break;
                } else if(i == 2){
                    winner = currVal;
                }
                prevVal = currVal;
             }
        }
someoneWon();
        //diagonal check right to left
        {
            let prevVal;
            let bool = true;

            for(let i = 2;i>-1;i--){
                let currVal = arr[i][2-i];
                if(!(i==2)){bool = (currVal === prevVal)};
                if(!bool){
                    break;
                } else if(i == 0){
                    winner = currVal;
                }
                prevVal = currVal;
             }
        }
someoneWon();
    };


    return {
        arr,
        setCell,
        getCell,
        checkWin,
        getTurn,
        nxtTurn
    };
}();



//player stuff
function playerFactory(pname){
    const name = pname;
    let wins = 0;

    function win(){
        wins ++;
    }

    return {
        name,
        win
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
    if(player1obj===undefined){ player1obj = playerFactory(p1name);}
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
    if(player2obj===undefined){ player2obj = playerFactory(p2name);}
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