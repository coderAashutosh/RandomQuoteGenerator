const quoteText = document.querySelector('.quote'),
    authorName = document.querySelector('.name'),
    quoteBtn = document.querySelector('button'),
    speechBtn = document.querySelector('.sound'),
    copyBtn = document.querySelector('.copy'),
    twitterBtn = document.querySelector('.twitter'),
    title = document.querySelector('.title')

// Random Quote Function
function randomQuote() {
    quoteBtn.classList.add('Loading')
    quoteBtn.innerText = 'Loading...'
    // Fetching Random Quotes from API and parsing it into JS Object.
    fetch('https://api.quotable.io/random').then(res => res.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = 'New Quote';
        quoteBtn.classList.remove('Loading')
        title.innerText = result.author
    });
}


// For Text to Speech
speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        // The SpeechSynthesisUtterance is a web speech API that represents a speech request.
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        speechSynthesis.speak(utterance)
    }
});

// Copy Button Functioning
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(quoteText.innerText);
    alert('Quote Copied!!')
})

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/compose/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener('click', randomQuote);