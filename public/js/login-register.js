$(init);

function init() {

  $(".login, .register").on("submit", submitForm);
  $(".new-group").on("submit", createNewGroup);
  $(".newpoll").on("submit", submitPoll);
  $(".newresponse").on("submit", submitResponse);
  $(".new-member").on("submit", submitNewMember);

  $(".logout-link").on("click", logout);
  $(".login-link, .register-link, .groups-link, .newgroup-link, .newmember-link, .members-click").on("click", showPage);
  $(".members-link").on("click", groupMemberAndAdd);
  $(".newpoll-link").on("click", groupPollAndAdd);

  setResponseListeners();

  hideErrors();
  checkLoginState();
}

function showCanvas() {
  $("canvas, #particles-js, .register, .nav-wrapper, .logo").show();
  $(".register, .nav-wrapper").hide();
  setTimeout(function(){
         $(".logo").addClass('animated shake infinite');
     }, 2000);
}

function hideCanvas() {
  $("canvas, #particles-js ,.logo").fadeOut(1000);
  $(".register, .nav-wrapper").fadeIn(1000);
}

function forceHideCanvas() {
  $("canvas, #particles-js, .logo").hide();

}

function hideLabel() {
  console.log(this);
}

function checkLoginState() {
  if (getToken()) {
    return loggedInState();
  } else {
    return loggedOutState();
  }
}

function showPage() {
  event.preventDefault();
  $('.logo').removeClass('animated shake').addClass('animated shake');

  var linkClass = $(this).attr("class").split("-")[0];
  $("section").hide();
  return $("#" + linkClass).show();
}

function submitForm() {
  event.preventDefault();

  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();
  return ajaxRequestforLoginRegister(method, url, data, authenticationSuccessful, true);
}

function logout() {
  event.preventDefault();
  localStorage.clear();
  showCanvas();
  $(setTimeout(hideCanvas, 5000));
  return loggedOutState();
}

function hideErrors() {
  return $(".alert").hide(); //potentially incorrect
}

function displayErrors(data) {
  return $(".alert").text(data).show();
}

function loggedInState() {
  $(".logged-out").hide();
  $(".logged-in").show();
  $("section").hide();
  $("#groups").show();
  showHomepage();
  getUsersList();
  forceHideCanvas();
}

function loggedOutState() {
  $(".logged-out, .form-section").show();
  $(".logged-in").hide();
  $("section").hide();
  $("#register").show();
  showCanvas();
  $(setTimeout(hideCanvas, 5000));
  $('.homepage').empty();
  $("#poll-feed").empty();
}

function authenticationSuccessful(data) {
  if (data.token) setToken(data.token);
  setCurrentUser(data.token);
  return checkLoginState();
}

function setCurrentUser(token) {
  console.log(token);
  
  return localStorage.setItem('currentUser', atob(token.split(".")[1]));
}

function currentUser(){
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(currentUser)
  console.log(currentUser._doc)
  return currentUser._doc;
}

function setToken(token) {
  return localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem('token');
}

function setRequestHeader(xhr, settings) {
  var token = localStorage.getItem("token");
  if (token) return xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

function ajaxRequestforLoginRegister(method, url, data, callback) {
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