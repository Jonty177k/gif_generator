
$(document).ready(function() {

	var animals = ["Dogs", "Cats"];

    function renderButtons() {

        $("#gifButtonArea").text(" ");

        for(var i = 0; i < animals.length; i++) {

        $("#gifButtonArea").append("<button class='items'> " + animals[i] + "</button>");

    	};
    };

	$("#submitNewAnimal").on("click", function(event) {

		event.preventDefault();

		var animal = $("#addAnimalInput").val();

		animals.push(animal);

		renderButtons();	

		$("#gifButtonArea").ready(function() {
		$(".items").on("click", function() {

	    var searchAnimal = $(this).text();
	    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        searchAnimal + "&api_key=dc6zaTOxFJmzC&limit=5";

	      console.log(searchAnimal);

	      $.ajax({
	          url: queryURL,
	          method: "GET"
	        })
	        .done(function(response) {

	          var results = response.data;

	          for (var i = 0; i < results.length; i++) {
	            var gifDiv = $("<div class='item' >");

	            var rating = results[i].rating;

	            var p = $("<p>").text("Rating: " + rating);
	            //var b = $("<button class='copy-this'>").text("copy url");

	            var altAnimalURL = results[i].images.fixed_height.url;

	            var animalURL = results[i].images.fixed_height_still.url;

	            var animalImage = $("<img class='gif' base-url="+animalURL+" other-url="+altAnimalURL+">");

	            animalImage.attr("src", animalURL);

	            gifDiv.prepend(p);
	            //gifDiv.prepend(b);
	            gifDiv.prepend(animalImage);
	            

	            $("#renderGifsHere").prepend(gifDiv);
	          }
	        });
	    });

	});

	});

	$("#clearNewAnimal").on("click", function(event) {

		event.preventDefault();

		animals = [];

		renderButtons();
	});

	$("#gifButtonArea").ready(function() {

	$(".items").on("click", function() {

    var searchAnimal = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchAnimal + "&api_key=dc6zaTOxFJmzC&limit=5";

      console.log(searchAnimal);

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {

          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item' >");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            //var b = $("<button class='copy-this'>").text("copy url");

            var altAnimalURL = results[i].images.fixed_height.url;

            var animalURL = results[i].images.fixed_height_still.url;

            var animalImage = $("<img class='gif' base-url="+animalURL+" other-url="+altAnimalURL+">");

            animalImage.attr("src", animalURL);

            gifDiv.prepend(p);
            //gifDiv.prepend(b);
            gifDiv.prepend(animalImage);

            $("#renderGifsHere").prepend(gifDiv);
          }

      });

    });

	});



    $(document).on("mouseover",".gif", function() {

        $(this).attr("src", $(this).attr("other-url"));

	});

    $(document).on("mouseout",".gif", function() {

        $(this).attr("src", $(this).attr("base-url"));

	});

	// $(document).on("click", ".gif", function() {

	// 	var copyURL = $(this).attr("other-url");

	// 	console.log(copyURL);

	// 	//copyURL.execCommand('copy');

	// 	window.clipboard.setData("Text", copyURL);

	// });

	renderButtons();

});

