console.log("Client side JS");

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     // run when json data has been arrived and then parse
//     response.json().then((data) => {
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
// const messageOne = document.querySelector('p')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'riya'
// messageOne.textContent = ''
// messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();//refresh na thay page mate
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = search.value
    console.log(location);
    messageOne.textContent = 'Loading...'
    debugger
    fetch('http://localhost:8000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error);
                messageOne.textContent = data.error
            }else{
                // console.log(data.location);
                console.log(data.forecast.forecast);
                messageOne.textContent = data.location,
                messageTwo.textContent = data.forecast.forecast
            }
        })
    })
})