$.getJSON("/articles", function(data){
    var data = data.slice(0, 6);

    for (i = 0; i < data.length; i++){        
        $("#saved-articles").append("<a href='' class=card-body>" + data[i].title + "</a>" + "<div class=card-body>" + "Author: " + data[i].author + "</div>" +"<button class=save-btn>" + "Save Article" + "</button>");

        $("a").attr("href", data[i].link);
    };

    //when save article button is clicked article on list must be saved
    $(".save-btn").click(function() {
        $(this).text($(this).text() == 'Save Article' ? 'Saved!' : 'Save Article');
    });

    //when scrape new articles button is clicked, all articles are added to page
    $("#scrape").click(function() {
        $("#articlesDiv").show();
    });
   
    //when clear articles button is clicked, all articles are removed from page
    $("#btn-clear").click(function() {
        $("#articlesDiv").hide();
    });
});