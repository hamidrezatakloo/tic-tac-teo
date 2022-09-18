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



const start =(initiate)=>{
    
}