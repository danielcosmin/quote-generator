const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

//let errorCount = 0

//Show loading spinner
function showLoadingSpinner(){
    loader.hidden = false
    quoteContainer.hidden = true
}

//Hide loading spinner
function removeLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

//Get the quotes API
async function getQuote() {
    showLoadingSpinner()
    const proxy_URL = 'https://cors-anywhere.herokuapp.com/'
    const api_URL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    //const api_URL = 'https://joke-api-strict-cors.appspot.com/jokes/random'
    //const api_URL = 'https://type.fit/api/quotes'
    //const api_URL = 'https://qvoca-bestquotes-v1.p.rapidapi.com/quote'
    try {
        const response = await fetch(proxy_URL + api_URL)
        const data = await response.json()
        //Display 'unknown' if there is no author
        if(data.quoteAuthor === '') {
            authorText.innerText = 'unknow'
        }else {
            authorText.innerText = data.quoteAuthor
        }
        //Reduce font size for long quotes
        if(data.quoteText.lenght > 120){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText
        //Stop loader and show quote
        removeLoadingSpinner()
        console.log(data)
    } catch (error) {
        // errorCount++
        // if(errorCount >= 10){
        //     throw new Error(alert('something went wrong'))
        // }
        getQuote()
        console.log('Your error is:' + error)
    }
}

//Twitter
function tweetQuote(){
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitter_URL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitter_URL, '_blank')
}

//Event lister
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)


//on Load
getQuote()
//showLoadingSpinner()