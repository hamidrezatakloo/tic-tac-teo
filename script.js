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
    for(let i=0; i<9; i++){
        if(boardList[i] ==undefined)
            freeSquares.push(i);
    }
    let randomIndex = Math.random()*freeSquares.length;
    randomIndex = Math.floor(randomIndex);
    return freeSquares[randomIndex];
}

const getSquare = (index)=>{
    const container = document.querySelector('.container');
    const square = container.children[index];
    return square;
}

const checkWin = (boardList)=>{
    for (let i=0; i<boardList.length; ++i)
        {
            if(i==0 || i==3 || i==6)
                if(boardList[i]==boardList[i+1] && boardList[i+1] == boardList[i+2])
                    return true;
            if(i==0 || i==1 || i==2)
                if(boardList[i]==boardList[i+3] && boardList[i+3] ==boardList[i+6])
                    return true;
            if(i==0)
                if(boardList[i]==boardList[i+4] && boardList[i+4] ==boardList[i+8])
                    return true
            if(i==2)
                if(boardList[i]==boardList[i+2] && boardList[i+2] ==boardList[i+6])
                    return true            

        }
    return false
}

const checkTied =(boardList)=>{
    if(boardList.indexOf(undefined)==-1)
        return true
    return false
}

const handleSquareClick =(e,boardList,players)=>{
    if (e.target.matches('.square'))
        if (checkEmpty(e.target,boardList)){
        updateSquare(e.target,players.playerOne,boardList);
        let pcTarget = getSquare(computerChoice(boardList));
        if(pcTarget ==undefined) return;
        updateSquare(pcTarget,players.playerBot,boardList);
        }

}

const start =(initiate)=>{
    const boardList = createBoard();
    const players =createPlayers(initiate);
    document.addEventListener('click',(e)=>{handleSquareClick(e,boardList,players)});
}