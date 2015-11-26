function showHomepage(data) {
  $(".homepage").show();

  var user = currentUser()
  var id = user._id;
  var method = "get";
  var url = "http://localhost:3000/api/users/" + id;
  return ajaxRequest(method, url, null, displayGroups, true);
}


// EMOJI N TING

function getEmoji(keyword){
  $.ajax({
    method: "GET",
    url: "https://www.emojidex.com/api/v1/utf_emoji"
  }).done(function(data){
    for (var i = 0; i < data.length; i++) {
      if (data[i].code === keyword) {
        $('h1#'+keyword).html(data[i].moji)
      }
    };
  })
}

function callback(data){
  return data
}

function displayGroups(res) {
  var groups = res.groups;

  for (var i=0; i < groups.length; i++) {
    var id = groups[i]._id;
    $('.homepage').append(
      '<div class="col s12 m6 l4">' +
      '<div class="card">' +
      '<div class="card-image waves-effect waves-block waves-light">' +
      '<h1 class="emojimage" id='+groups[i].emojimage+'><h1>' +
      '</div>' +
      '<div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' + groups[i].name + '<i class="material-icons right"><span></span><i class="fa fa-arrow-up"></i></i></span>' +
      '<p><a href="/" id="' + id + '">View Group</a></p>' +
      '</div>' +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' + groups[i].name + '<i class="material-icons right"><i class="fa fa-arrow-down"></i></span>' +
      '<p></p>' +
      '</div>' +
      '</div>' +
      '</div>');
    $("#" + id).on("click", showGroupPage);
    getEmoji(groups[i].emojimage)
  }
}


function showGroupPage() {
  event.preventDefault();
  // console.log("this is this at the point of show group " + req);
  var id = $(this).attr('id');
  var method = "get";
  var url = "http://localhost:3000/api/groups/" + id;
  createMemberForm(id);
  return ajaxRequest(method, url, null, displayPolls, true);
}

function createNewGroup() {
  event.preventDefault();
  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();
  return ajaxRequest(method, url, data, addGroupToHomepage, true);
}

function createMemberForm(id) {
  $("#newmember").append(
    '<form class="col s12 new-member" method="put" action="/groups" id=' + id + '>' +
      '<div class="row">' +
        '<div id="the-basics" class="col s12">' +
        '<input id="username" name="username" class="typeahead" type="text" placeholder="Add New Group Member">' +
        '</div>' +
      '</div>' +
      '<div class="col s12">' +
        '<div class="row">' +
          '<input type="submit" value="new-member" class="btn" id="submit">' +
        '</div>' +
      '</div>' +
    '</form>'
    )
  $(".new-member").on("submit", submitNewMember);
}



function addGroupToHomepage(req) {
  $('.homepage').append(
    '<div class="col s12 m6 l4">' +
    '<div class="card">' +
    '<div class="card-image waves-effect waves-block waves-light">' +
    '<img class="activator" src="http://materializecss.com/images/office.jpg">' +
    '</div>' +
    '<div class="card-content">' +
    '<span class="card-title activator grey-text text-darken-4">' + req.name + '<i class="material-icons right"><i class="fa fa-arrow-up"></i></i></span>' +
    '<p><a href="/" id="' + req._id + '">View Group</a></p>' +
    '</div>' +
    '<div class="card-reveal">' +
    '<span class="card-title grey-text text-darken-4">' + req.name + '<i class="material-icons right"><i class="fa fa-arrow-down"></i></span>' +
    '<p id='+groups[i].emojimage+'></p>' +
    '</div>' +
    '</div>' +
    '</div>'
    );
  $("#newgroup").hide();
  $("#groups").show();

}

function displayPolls(req) {
  $("#groups").hide();
  $("#group").show();
  getUsersList();


  // $(".homepage").hide();
  // $(".group-page").show();
  // $("#poll-form").show();
  $("#groupId").val(req.group._id);
  // $(".group-members").show();
  // $("#poll-feed").show();
  var groupMembers = req.groupMembers;

  listMembers(groupMembers);

  var polls = req.group.polls;

  for (var i = 0; i < polls.length; i++) {
    var responseForm = '<section id="newresponse"><form class="newresponse" id="' + req._id + '" method="post" action="/responses"><input id="submit" name="minus2" type="submit" class="btn minus2" value="-2" ><input id="submit" name="minus1" type="submit" class="btn minus1" value="-1" ><input id="submit" name="zero" type="submit" class="btn zero" value="0" ><input id="submit" name="plus1" type="submit" class="btn plus1" value="+1" ><input id="submit" name="plus2" type="submit" class="btn plus2" value="+2" ></form></section>';

    $("#poll-feed").prepend(
      '<li>' +
        '<div class="collapsible-header"><i class="fa fa-arrow-down"></i>' + polls[i].question + '</div>' +
        '<div class="collapsible-body"><p>' + responseForm + '</p></div>' +
      '</li>'
      )
  }
}

function submitPoll() {
  event.preventDefault();
  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();

  return ajaxRequest(method, url, data, addPoll, true);
}

function addPoll(req, res) {
  var responseForm = '<section id="newresponse"><form class="newresponse" id="' + req._id + '" method="post" action="/responses"><input id="submit" name="minus2" type="submit" class="btn minus2" value="-2" ><input id="submit" name="minus1" type="submit" class="btn minus1" value="-1" ><input id="submit" name="zero" type="submit" class="btn zero" value="0" ><input id="submit" name="plus1" type="submit" class="btn plus1" value="+1" ><input id="submit" name="plus2" type="submit" class="btn plus2" value="+2" ></form></section>';

  $("#poll-feed").prepend(
    '<li>' +
      '<div class="collapsible-header"><i class="fa fa-arrow-down"></i>' + req.question + '</div>' +
      '<div class="collapsible-body"><p id="' + req._id + '">' + responseForm + '</p></div>' +
    '</li>'
    )
  $("#newpoll").hide();
  $("#group").show();
}


function submitResponse() {
  event.preventDefault();
  console.log("hiya");
  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();

  return ajaxRequest(method, url, data, addResponse, true); 
}

function addResponse(req, res) {
  console.log("jessica christ");
}


function ajaxRequest(method, url, data, callback, async) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    async: async,
    beforeSend: setRequestHeader
  }).done(function(res) {
    if (callback) return callback(res);
  }).fail(function(data) {
    displayErrors();
  });
}

