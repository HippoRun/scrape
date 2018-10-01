// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

$(document).ready(function(){
    
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    $(".clear").on("click", handleArticleClear);

function initPage() {
    $.get("/api/headlines?saved=false").then(function(data) {
        articleContainer.empty();

        if (data && data.length) {
            renderArticles(data);
        }
        else {
            renderEmpty();
        }
    });
}

functionrenderArticles(articles) {
    var articleCards = [];
    for (var i = 0; i < articles.lenth; i++){
        articleCards.push(createCard(articles[i]));
    }

    articleContainer.append(articleCards);
}

function createCard(article) {
    var card = $("<div class='card'>");
    var cardHeadder = $("<div class='card-header'>").append(
        $("<h3>").append(
            $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
            .attr("href", article.url)
            .text(article.headline),
            $("<a class='btn btn-success save'>Save Article</a>")
        )
    );

    var cardBody = $("<div class='card-body'>").text(article.summary);

    card.append(cardHeadder, cardBody);
    card.data("_id", article._id);
    return card;
}

function renderEmpty(){
    var emptyAlert = $(
        [
            "<div class='alert alert-warning text-center'>",
            "<h4> Oh No. It looks like we don't have any new articles.</h4>",
            "</div>",
            "<div class='card'>",
            "<div class='card-header text-center'>",
            "<h3>What would you like to do?</h3>",
            "</div>",
            "<div class='card-body text-center'>",
            "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
            "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
            "</div>",
            "</div>"
        ].join("")
    );
    // Appeding this data to the page
    articleContainer.append(emptyAlert);
}

function handleArticleSave(){
    // This function is triggered when the user wants to save an article
    // When we render the article initially, we attached a js object containing the headline Id 
    // to the element using the .data method. Here we retrieve that.
    var articleToSave = $(this)
    .parents(".card")
    .data();

    // Remove card from page
    $(this)
    .parents(".card")
    .remove();

    articleToSave.save = true;
    // using a patch method to be semantic since this is an update to an existing record in our collection
    $.ajax({
        method: "PUT",
        url: "/api/headlines/" + articleToSave._id,
        data: articleToSave
    }).then(function(data) {
    // If the data was saved successfully
    if (data.saved) {
    // Run the initPage function again. This will reload the entire list of articles
    initPage();
    }
    });
}

function handleArticleScrape() {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/fetch").then(function(data) {
    // If we are able to successfully scrape the NYTIMES and compare the articles to those
    // already in our collection, re render the articles on the page
    // and let the user know how many unique articles we were able to save
    initPage();
    bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
    });
}

function handleArticleClear() {
    $.get("api/clear").then(function() {
        articleContainer.empty();
        initPage();
    });
}
};)