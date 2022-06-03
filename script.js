const quoteText = document.querySelector('.quote'),
    authorName = document.querySelector('.name'),
    quoteBtn = document.querySelector('button'),
    speechBtn = document.querySelector('.sound'),
    copyBtn = document.querySelector('.copy'),
    twitterBtn = document.querySelector('.twitter'),
    title = document.querySelector('.title'),
    span = document.querySelector('.copied');

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
    // span.innerText = 'Quote Copied!'
    // setTimeout(function () {
    //     span.innerText = ''
    // }, 1500)

    Toastify({
        text: "Quote Copied!",
        duration: 2000,
        destination: "https://aashutosh.vercel.app/",
        newWindow: true,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(327deg, rgba(34,193,195,1) 34%, rgba(76,45,253,1) 100%)",
            borderRadius: "20px",
        }
        // onClick: function(){} // Callback after click
    }).showToast();
})


twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/compose/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener('click', randomQuote);