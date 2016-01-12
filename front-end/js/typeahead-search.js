var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    matches = [];
    substrRegex = new RegExp(q, 'i');

    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches); 
  };
};

function getUsersList() {
  var allUsers = getUsers().responseJSON.users.map(function(user) { 
    return user.username 
  })
  $('#the-basics .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'users',
    source: substringMatcher(allUsers)
  });
};

function getUsers() {
  var method = "get";
  var url = "http://localhost:3000/api/users"
  return ajaxRequest(method, url, null, getUsersCallback, false);
}

function getUsersCallback(data){
  return data;
}

function submitNewMember() {
  event.preventDefault();
  var method = $(this).attr("method");
  var action = $(this).attr("action");
  var url    = "http://localhost:3000/api" + action + "/adduser"

  var data = $(this).serialize();

  return ajaxRequest(method, url, data, function(data){
    $("#listed-group-members").prepend("<li><p>"+data.user.username+"</p></li>");
  });
}

function listMembers(groupMembers) {
  $("#listed-group-members").empty();
  for (i = 0; i < groupMembers.length; i++) {
    $("#listed-group-members").prepend("<li><p>" + groupMembers[i] + "</p></li>"
      )
  } 
}
