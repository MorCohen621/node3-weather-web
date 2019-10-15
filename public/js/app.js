const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

// msg1.textContent = 'from JS'
// msg2.textContent = "from JS2"

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent =data.error
            }
            else {
                msg1.textContent = data.location
                msg2.textContent =data.forcast
            }
        })
    })

})