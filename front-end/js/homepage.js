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

  $('.homepage').empty();
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
      '<span class="card-title grey-text text-darken-4">' + groups[i].name + '<i class="material-icons right">close</i></span>' +
      '<p>' + groups[i].description + '</p>' +
      '</div>' +
      '</div>' +
      '</div>');
    $("#" + id).on("click", showGroupPage);
    getEmoji(groups[i].emojimage)
  }
}


function showGroupPage() {
  event.preventDefault();
  var id = $(this).attr('id');
  var method = "get";
  var url = "http://localhost:3000/api/groups/" + id;
  createMemberForm(id);
  groupPollAndAdd();
  return ajaxRequest(method, url, null, displayPolls, true);
}

function createNewGroup() {
  event.preventDefault();
  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();
  return ajaxRequest(method, url, data, addGroupToHomepage, true);
}

function groupPollAndAdd() {
  event.preventDefault();
  $("#grouppollsdisplay").show();
  $("#groupmembersdisplay").hide();
  $("#newpoll").show();
  $("#pollfeed").show();
  $("#members").hide();
  $("#newmember").hide();
}

function groupMemberAndAdd() {
  event.preventDefault();
  $("section").hide();
  $("#members").show();

  // $("#groupmembersdisplay").show();
  // $("#grouppollsdisplay").hide();
  // $("#newpoll").hide();
  // $("#pollfeed").hide();
  // $("#members").show();
  // $("#newmember").show();
}

function createMemberForm(id) {
  $(".new-member").attr("action", "/groups/"+ id);
}

function addGroupToHomepage(req) {
  $('.homepage').prepend(
    '<div class="col s12 m6 l4">' +
    '<div class="card">' +
    '<div class="card-image waves-effect waves-block waves-light">' +
      '<h1 class="emojimage" id='+ req.emojimage+'><h1>' +
    '</div>' +
    '<div class="card-content">' +
    '<span class="card-title activator grey-text text-darken-4">' + req.name + '<i class="material-icons right"><i class="fa fa-arrow-up"></i></i></span>' +
    '<p><a href="/" id="' + req._id + '">View Group</a></p>' +
    '</div>' +
    '<div class="blur-me">' +
    '<div class="card-reveal">' +
    '<span class="card-title grey-text text-darken-4">' + req.name + '<i class="material-icons right">close</i></span>' +
    '<p id='+ req.description +'></p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
    );
  $("#newgroup").hide();
  $(".homepage").html('')
  $("#groups").show();
  showHomepage();
}

function displayPolls(req) {
  $("#groups").hide();
  $("#group").show();
  $("#groupId").val(req.group._id);

  var groupMembers = req.groupMembers;

  listMembers(groupMembers);

  var polls = req.group.polls;
  $("#poll-feed").empty();

  for (var i = 0; i < polls.length; i++) {

    var responseForm = '<p id="newresponse"><form class="newresponse" id="' + polls[i]._id + '" method="post" action="/responses"><div class="input-field col s12"><input id="comment" name="comment" type="text" placeholder="comment"><label for="comment">comment</label></div><span><input type="radio" name="rating" id="minus2" value="-2"><label for="-2"><i class="fa fa-angle-double-down"></i></label></span><span><input type="radio" name="rating" id="minus1" value="-1"><label for="-1"><i class="fa fa-angle-down"></i></label></span><span><input type="radio" name="rating" id="zero" value="0"><label for="0"><i class="fa fa-minus"></i></label></span><span><input type="radio" name="rating" id="plus1" value="1"><label for="1"><i class="fa fa-angle-up"></i></label></span><span><input type="radio" name="rating" id="plus2" value="2"><label for="2"><i class="fa fa-angle-double-up"></i></label></span></form><p><h2 id="' + polls[i]._id + 'rating">?</h2></p></p>';

    var comments = '<p id="' + polls[i]._id + 'comments"></p>';

    $("#poll-feed").prepend(
      '<li class="poll">' +
        '<div class="collapsible-header"><i class="fa fa-arrow-down"></i><h4>' + polls[i].question + '</h4></div>' +
        '<div class="collapsible-body">' + responseForm + comments + '</div>' +
      '</li>'
      )
  }
}


function setResponseListeners() {
  $('.newresponse input').click(function () {
    $(".newresponse span").removeClass('checked');
    $(this).parent().addClass('checked');
  });

  $('body').on('click', 'form.newresponse label', function(){
      var rating  = $(this).prev().val();
      var comment = $(this).parents("form").find("input[name=comment]").val();
      var id      = $(this).parents("form").attr("id");
      submitResponse(rating, comment, id);
    }
  );
}


function submitPoll() {
  event.preventDefault();
  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();

  return ajaxRequest(method, url, data, addPoll, true);
}

function addPoll(req, res) {
  var responseForm = '<p id="newresponse"><form class="newresponse" id="' + req._id + '" method="post" action="/responses"><div class="input-field col s12"><input id="comment" name="comment" type="text" placeholder="comment"><label for="comment">comment</label></div><span><input type="radio" name="rating" id="minus2" value="-2"><label for="-2"><i class="fa fa-angle-double-down"></i></label></span><span><input type="radio" name="rating" id="minus1" value="-1"><label for="-1"><i class="fa fa-angle-down"></i></label></span><span><input type="radio" name="rating" id="zero" value="0"><label for="0"><i class="fa fa-minus"></i></label></span><span><input type="radio" name="rating" id="plus1" value="1"><label for="1"><i class="fa fa-angle-up"></i></label></span><span><input type="radio" name="rating" id="plus2" value="2"><label for="2"><i class="fa fa-angle-double-up"></i></label></span></form><h2 id="' + req._id + 'rating">?</h2></p>';

  var comments = '<p id="' + req._id + 'comments"></p>';

  $("#poll-feed").prepend(
    '<li>' +
      '<div class="collapsible-header"><i class="fa fa-arrow-down"></i><h4>' + req.question + '</h4></div>' +
      '<div class="collapsible-body">' + responseForm + comments +'</div>' +
    '</li>'
    )

  $("#newpoll").hide();
  $("#group").show();
}




function submitResponse(rating, comment, id) {
  event.preventDefault();
  var method = "patch";
  var url    = "http://localhost:3000/api/polls/" + id + "/response";
  var data   = { rating: rating, comment: comment };

  return ajaxRequest(method, url, data, addResponse, true); 
}

function addResponse(res) {
  event.preventDefault();
  var totalRating = 0;
  var comments = "";
  for (var i = 0; i < res.responses.length; i++) {
    totalRating = totalRating + res.responses[i].rating;

    var comment = "<p>" + res.responses[i].comment + "</p>";

    console.log(comment);
    comments = comments + comment;
  }

  $("#" + res._id + "rating").text(totalRating);
  $("#" + res._id + "comments").html(comments);
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

