let API = "https://api.rss2json.com/v1/api.json?rss_url=";

// let userFeedURLs = localStorage.getItem('userFeedURLs');
// Get the URL parameters
let urlParams = new URLSearchParams(window.location.search);

// Get the value of the "rss" parameter
let userFeedURLs = urlParams.get('rss');

userFeedURLs = userFeedURLs.split(",")
userFeedURLs.forEach(userUrl => {
    $.ajax({
        type: 'GET',
        url: API + userUrl,
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);

            document.title = data.feed.title

            data.items.forEach(item => {
                var content = document.getElementById('content');

                var newItem = "";
                newItem += "<div class=\"container\" id=\"item\"><a href=\"" + item.link + "\"><h1>" + item.title + "</h1></a>" + "<h4> from " + data.feed.title + "</h4>";
                if (item.author != "" && item.author != data.feed.title)
                    newItem += "<h4> By " + item.author + "</h4>";

                newItem += "<h4>Published Date: " + item.pubDate + "</h4>";

                newItem += item.description + "<hr></div>";

                content.insertAdjacentHTML('beforeend', newItem);
            });
        }
    });
});