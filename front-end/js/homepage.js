function showHomepage(data) {
  var id = data.user._id;
  var method = "get";
  var url = "http://localhost:3000/api/users/" + id;
  return ajaxRequest(method, url, null, getUserPage);
}

function getUserPage(res) {
  console.log(res);
}

