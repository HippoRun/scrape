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
    
}
    )
})