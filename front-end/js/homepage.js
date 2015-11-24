function showHomepage(data) {
  var method = "get";
  var url = "http://localhost:3000/api/users/" + data.user._id;
  return ajaxRequest(method, url, null, getUserPage);
}

function getUserPage(res) {
  console.log("getUserPage fires");
}

