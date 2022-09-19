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
    const boardList = [...Array(9)];
    return boardList;
}

const createPlayers = (initiate)=>{
    playerOne = player(initiate.selectedChoice,initiate.nickName);
    playerBot = player(
        initiate.selectedChoice =='X'?'O':'X',
        'bot'
    );
    return {playerOne,playerBot};
}

const indexSquare=(target)=>{
    return Array.from(target.parentNode.children)
    .indexOf(target);  
}

const checkEmpty = (target,boardList)=>{
    const index = indexSquare(target)
    if (boardList[index]==undefined)
        return true;
    else
        return false;
}

const updateSquare =(target,player,boardList)=>{
    target.textContent = player.getMark();
    boardList[indexSquare(target)] = player.getMark();
}

const computerChoice =(boardList)=>{
    const freeSquares =[];
    for(const square of boardList){
        if(square ==undefined)
            freeSquares.push(boardList.indexOf(square));
    }
    const randomIndex = Math.random()*freeSquares.length;
    randomIndex = Math.floor(randomIndex);
    return randomIndex;
}

const getSquare = (index)=>{
    const container = document.querySelector('.container');
    const square = container.children[index];
    return square;
}

const start =(initiate)=>{
    const boardList = createBoard();
    const players =createPlayers(initiate);
    document.addEventListener('click',e=>{
        if (e.target.matches('.square'))
            if (checkEmpty(e.target,boardList))
                updateSquare(e.target,players.playerOne,boardList);
    })
}