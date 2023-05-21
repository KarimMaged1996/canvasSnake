let log = console.log

let startBtn;
let legendsBtn;
addEventListener('load', scriptBegins)


function scriptBegins(){
    startBtn = document.querySelector('[data-startBtn]')
    legendsBtn = document.querySelector('[data-startLegends]')

    startBtn.addEventListener('click', startGame)
    legendsBtn.addEventListener('click', scoreBoard)
}



function startGame() {
    location.assign('./index.html')
}


// async function scoreBoard(){
//     let res = await fetch('./players.json')
//     let data = await res.json()
//     log(data)

//     body = {
//         id: 4,
//         name: "moh",
//         score: 300
//     }
    
//     res = await fetch('./players.json', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(body)
//     })
// }