(function(){
    let selectedChoice = '';
    let nickName = '';
    document.addEventListener('click',e=>{
        if (e.target.matches('.choices>div'))
            selectedChoice = e.target.textContent;
        if (! e.target.matches('.start'))
            return
        nickName = document.querySelector('.playerName').value;
        start({selectedChoice,nickName})
        return;
    })
})();


const player =(mark,nickName)=>{
    const getName =()=>nickName;
    const getMark =()=>mark;
    return{getName,getMark}
}

const createBoard =()=>{
    const container = document.querySelector('.container');
    container.classList.add('board');
    container.replaceChildren();
    for(let i=0; i<9; ++i){
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);
    }
}

const createPlayers = (initiate)=>{
    playerOne = player(initiate.selectedChoice,initiate.nickName);
    playerBot = player(
        initiate.selectedChoice =='X'?'O':'X',
        'bot'
    );
    return {playerOne,playerBot};
}

const start =(initiate)=>{
    createBoard();
    const players =createPlayers(initiate);
}