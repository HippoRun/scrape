// Load saved articles
function loadArticles(saved) {
    let route = '/articles';
    if (saved) {
        route += '?saved=true';
    }
};

// Scrape Articles
    function scrapeArticles() {
        $.ajax({
            url: "/scrape"
        }).then(loadArticles());
    };

// Save Article event handler
$(document).on("click", "#home", function (){
    loadArticles(true);
});

//Scrape Articles event handler
$(document).on("click", "#home", function(){
    scrapeArticles();
});

// Article Save event Handler
$(document).on("click", ".saveArticle", function(){
    const articleID = $(this).attr("id")
    console.log("saved article: " + articleID);
    $.ajax({
        method: "PUT",
        url: "/articles/" + articleID,
        data: { saved: true }
    }).then(data => {
        console.log(data);
    })
});