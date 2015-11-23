function showHomepage(id) {
  console.log(id);
  var method = "get";
  var url = "http://localhost:3000/api/users/" + id;
  return ajaxRequest(method, url, null, getUserPage);
}

function getUserPage(res) {
  console.log(res);
}


// event.preventDefault();

// var method = $(this).attr("method");
// var url    = "http://localhost:3000/api" + $(this).attr("action");
// var data   = $(this).serialize();

// console.log(data);

// return ajaxRequest(method, url, data, authenticationSuccessful);