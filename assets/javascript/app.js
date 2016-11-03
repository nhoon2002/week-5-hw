
// Adds the array of giphy topics to append as buttons
var topics = ['hamburger', 'pizza', 'pasta', 'sushi', 'noodles', 'coffee', 'tea', 'cake', 'bread', 'steak', 'chicken'];


   var i = 0;

   // Generic function for dumping the JSON content for each button into the div
   function displayGiphy(){

         //Clears the image container on each new topic
         $('#imagesContainer').html('');

         // Here we grab the text from the button
         var searchKey = $(this).attr('data-name');

         // Here we assemble our URL
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +searchKey+ "&api_key=dc6zaTOxFJmzC&limit=10";



         // AJAX call
         $.ajax({url: queryURL, method: 'GET'}).done(function(response){
            console.log(response);

            // Loops through object to pull out images from the 10 element array
            for (var j = 0; j < response.data.length; j++) {

               // Animated URL
               var imageURL = response.data[j].images.original.url;

               // Still URL
               var imageURL_still = response.data[j].images.original_still.url;

               // Assigning attributes to the dynamically created img variables
               var Images = $("<img>");
               Images.attr('src', imageURL_still);
               Images.attr('alt', 'giphys');
               Images.attr('style', 'height: 300px');
               Images.attr('data-still', imageURL_still);
               Images.attr('data-animate', imageURL);
               Images.attr('data-state', 'still');
               Images.addClass('gif');

               // Appending each image to the images container
               $('#imagesContainer').append(Images);

               console.log(Images);
            }
         });

   }




   // Generic function for rendering the buttons
   function renderButtons(){

      // Loops through the array of topics
      for (i; i < topics.length; i++){

          // Then dynamicaly generates buttons for each movie in the array
          var topicButtons = $('<button>')
          topicButtons.addClass('foods');
          topicButtons.attr('data-name', topics[i]);
          topicButtons.text(topics[i]); //


          $('#buttonsContainer').append(topicButtons); // Added the button to the HTML
      }
   }

   // ========================================================

   // This function handles events where a button is clicked
   $('#addNew').on('click', function(){

      // This line of code will grab the input from the textbox
      var food = $('#new_input').val().trim();

      // The input from the textbox is then added to our array
      topics.push(food);
      console.log(topics);
      $('#new_input').children('text').val('')

      // Creates newly added button
      renderButtons();

      // We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
      return false;
   })

   // ========================================================

   // Generates giphys on click of topic
   $(document).on('click', '.foods', displayGiphy);


   // CLICK TO PLAY, CLCK AGAIN TO PAUSE


   // $('.gif').on('click', function() {
   $(document).on('click', '.gif', function(){

      console.log(this);

       var state = $(this).attr('data-state');
       console.log(this);


       if (state == 'still') {
          var stillURL = $(this).attr('data-animate');

          $(this).attr('src', stillURL);
          $(this).attr('data-state', 'animated');

       } else if (state !== 'still') {
          var animateURL = $(this).attr('data-still')

          $(this).attr('src', animateURL);
          $(this).attr('data-state', 'still');
       }


   });




   // This calls the renderButtons() function to initialize the array
   renderButtons();
