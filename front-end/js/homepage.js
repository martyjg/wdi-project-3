function showHomepage(data) {
  $(".homepage").show();

  var id = data.user._id;
  var method = "get";
  var url = "http://localhost:3000/api/users/" + id;
  return ajaxRequest(method, url, null, displayGroups);
}

function displayGroups(res) {
  var groups = res.groups;

  for (var i=0; i < groups.length; i++) {
    var id = groups[i]._id;
    $('.homepage').append(
      // "<div class='col s12 m6 l4'><div class='card'><div class='card-content'>" + groups[i].description + "</div><div class='card-action'><a href='/' id='" + id + "'>view group</a></div></div></div>"

      // "<div class='card-image waves-effect waves-block waves-light col s12 m6 l4'><img class='activator' src='images/office.jpg'></div><div class='card-content'>< span class='card-title activator grey-text text-darken-4'>" + groups[i].name + "<i class='material-icons right'>more_vert</i></span><p><a href='http://localhost:3000/api/groups/'" + groups[i]._id + ">View Group</a></p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + groups[i].name + "<i class='material-icons right'>close</i></span><p>" + groups[i].description + "</p></div>"

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
            '<p>' + groups[i].description + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'



    );
    $("#" + id).on("click", showGroupPage);
  }
}


function showGroupPage() {
  event.preventDefault();
  id = $(this).attr('id');
  console.log("this is the id" + id)
  var method = "get";
  var url = "http://localhost:3000/api/groups/" + id;
  return ajaxRequest(method, url, null, displayPolls);
}

function createNewGroup() {
  event.preventDefault();
  console.log(this);

}

function displayPolls(res) {
  $(".homepage").hide();
  $(".group-page").show();
  $("#poll-form").show();
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

