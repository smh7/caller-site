
$(document).ready(function() {
 
  $("#btn-search").on("click", function(e) {
      var userSearchInput = $('#search-term').val();
      var userNumberRec = $('#number-records').val();
      var userStartYr = $('#start-yr').val();
      var userEndYr = $('#end-yr').val();
    
    console.log(userSearchInput);
    console.log(userNumberRec);
    console.log(userStartYr);
    console.log(userEndYr);
    e.preventDefault();
  
    

    //ajax stuff
    var url = "http://localhost:8080/login";
    // url += '?' + $.param({
    //   'api-key': "ce055c783ff5473b8165d9c119213281",
    //   'q': userSearchInput //, 
    //   // 'page': userNumberRec << the "page" field from the API doesn't return a specific number of articles, it returns the number of pages with ten on each page. We're now limiting the number of records in the for loop below.
    // });
    // if(userStartYr != "") {
    //     url += "&begin_date=" + userStartYr + "0101";
    // }
    // if(userEndYr != "") {
    //     url += "&end_date=" + userEndYr + "0101";
    // }
    $.ajax({
      url: url,
      method: 'POST',
    }).done(function (result) {
      output = '';
     // Build cards for output
      for (i = 0; i < /*result.response.docs.length*/ userNumberRec; i++) {
        output += `
        <div class="card p-1 col-md-8 mx-auto" style = "width: 18rem;">
          <div class="card-body">
          <h5 class="card-title"> ${result.response.docs[i].snippet} </h5> 
          <h6 class="card-subtitle mb-2 text-muted">${result.response.docs[i].byline.original}</h6> 
          <a href ="${result.response.docs[i].web_url}" class="card-link" target="_blank">Link to Article</a>
        </div> 
      </div>
      `
      }
      // Update UI
      document.getElementById('articles').innerHTML = output;
      // If we want input fields cleared automatically upon submission of search
      $('#search-term').val('');
      $('#number-records').val('');
      $('#start-yr').val('');
      $('#end-yr').val('');

      // Clear Results Button
      $('#clear-results').on('click', function(e){
        output = '';
        document.getElementById('articles').innerHTML = output;
      })

    });
  });
});

