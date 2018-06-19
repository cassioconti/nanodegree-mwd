(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                'Authorization': 'Client-ID ####'
            }
        }).done(addImage);

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=####`
        }).done(addArticles);
    });

    function addImage(result) {
        if (result && result.results && result.results[0]) {
            const firstImage = result.results[0];
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }
    }

    function addArticles(result) {
        result.response.docs.forEach(doc => {
            htmlContent = `<p>${doc.snippet}</p>`;
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        });
    }
})();