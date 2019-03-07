let tetris = document.createElement('div');
tetris.classList.add('tetris');

for(let i=0; i<181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    tetris.appendChild(excel);
};

let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris);

let excel = document.getElementsByClassName('excel');
let i = 0;

for(let y=10; y>0;){

};