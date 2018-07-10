$("#submit-card").on("click", function(event) {
    event.preventDefault();
    console.log('#submit-card was pressed');  
    $.ajax({
      url: "http://localHost:8080/card",
      method: "POST"
    }).then(console.log("this is the .then"));
});

// $('#submit-card').click(function() {
//     console.log('#submit-card was pressed');
//     event.preventDefault();
//     $.ajax({
//         url: 'http://localHost:8080/card"',
//         method: 'POST',
//         data: {
//             'card_img_top': "one",
//             'card_title': "two",
//             'card_text': "etc",
//             'list_group1': "etc",
//             'list_group2': "foo",
//             'list_group3': "bar"
//         },
//         success: function(result) {
//             alert('Successfully called');
//         },
//         error: function(status, exception) {
//             alert('Exception:', exception);
//         }
//     })
// });

