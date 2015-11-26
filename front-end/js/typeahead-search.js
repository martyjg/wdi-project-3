var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
    
  };
};

function getUsersList() {
  var allUsers = []


  for (var i = 0; i < getUsers().responseJSON.users.length; i++) {
    allUsers.push(getUsers().responseJSON.users[i].username)
  };


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
  var groupId = $(this).context.id;
  var url = "http://localhost:3000/api" + action + "/" + groupId + "/adduser";
  var data = $(this).serialize();
  return ajaxRequest(method, url, data, null, true);
}

function listMembers(groupMembers) {
  for (i = 0; i < groupMembers.length; i++) {
    $("#listed-group-members").prepend("<li>" + groupMembers[i] + "</li>"
      )
  } 
}
