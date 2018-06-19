(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
                headers: {
                    Authorization: 'Client-ID ####'
                }
            }).then(result => result.json())
            .then(addImage)
            .catch(e => requestError(e, 'image'));

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=####`)
            .then(result => result.json())
            .then(addArticles)
            .catch(e => requestError(e, 'articles'));
    });

    function addImage(result) {
        htmlContent = '';
        if (result && result.results && result.results[0]) {
            const firstImage = result.results[0];
            htmlContent = `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        } else {
            htmlContent = '<p>Unfortunately, no image was returned for your search.</p>'
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    function addArticles(result) {
        result.response.docs.forEach(doc => {
            htmlContent = `<p>${doc.snippet}</p>`;
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        });
    }

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
})();