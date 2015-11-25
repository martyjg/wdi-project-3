function showHomepage(data) {
  $(".homepage").show();

  var user = currentUser()
  var id = user._id;
  var method = "get";
  var url = "http://localhost:3000/api/users/" + id;
  return ajaxRequest(method, url, null, displayGroups);
}


// EMOJI N TING

function getEmoji(keyword){
  console.log(emoji)
  for (var i = 0; i < emojis.length; i++) {
    if(keyword === emojis[i]){
      console.log(emojis[i].moji)
    }
  };
}

var emoji ;


function getEmojiAjaxRequest(){
  $.ajax({
    method: "GET",
    url: "https://www.emojidex.com/api/v1/utf_emoji"
  }).done(function(moji){
    return moji
  })
}



function displayGroups(res) {
  var groups = res.groups;

  for (var i=0; i < groups.length; i++) {
    var id = groups[i]._id;
    $('.homepage').append(
      '<div class="col s12 m6 l4">' +
      '<div class="card">' +
          '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="http://materializecss.com/images/office.jpg">' +
          '</div>' +
          '<div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + groups[i].name + '<i class="material-icons right"><i class="fa fa-arrow-up"></i></i></span>' +
            '<p><a href="/" id="' + id + '">View Group</a></p>' +
          '</div>' +
          '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + groups[i].name + '<i class="material-icons right"><i class="fa fa-arrow-down"></i></span>' +
            '<p>' + getEmoji(groups[i].emojimage) + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
    $("#" + id).on("click", showGroupPage);
  }
}


function showGroupPage() {
  event.preventDefault();
  // console.log("this is this at the point of show group " + req);
  var id = $(this).attr('id');
  var method = "get";
  var url = "http://localhost:3000/api/groups/" + id;
  return ajaxRequest(method, url, null, displayPolls);
}

function createNewGroup() {
  event.preventDefault();
  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();
  return ajaxRequest(method, url, data, addGroupToHomepage);
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
          '<p>' + getEmoji(req.emojimage) + '</p>' +
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

  // $(".homepage").hide();
  // $(".group-page").show();
  // $("#poll-form").show();
  $("#groupId").val(req.group._id);
  // $(".group-members").show();
  // $("#poll-feed").show();
  var groupMembers = req.groupMembers;

  for (i = 0; i < groupMembers.length; i++) {

  $("#listed-group-members").prepend("<li>" + groupMembers[i] + "</li>"
    )
}

  var polls = req.group.polls;

  for (var i = 0; i < polls.length; i++) {
    $("#poll-feed").prepend(
      '<li>' +
        '<div class="collapsible-header"><i class="fa fa-arrow-down"></i>' + polls[i].question + '</div>' +
        '<div class="collapsible-body"><p>' + responseForm(polls[i].response) + '</p></div>' +
      '</li>'
    )
  }
}

function submitPoll() {
  event.preventDefault();
  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();

  return ajaxRequest(method, url, data, addPoll);
}

function addPoll(req, res) {
  $("#poll-feed").prepend(
    '<li>' +
      '<div class="collapsible-header"><i class="fa fa-arrow-down"></i>' + req.question + '</div>' +
      '<div class="collapsible-body"><p>' + responseForm(req.response) + '</p></div>' +
    '</li>'
  )
  $("#newpoll").hide();
  $("#group").show();
}



function ajaxRequest(method, url, data, callback) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: setRequestHeader
  }).done(function(res) {
    if (callback) return callback(res);    
  }).fail(function(data) {
    displayErrors();
  });
}

