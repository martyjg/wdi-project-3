$(init);

function init() {
  $(".login, .register").on("submit", submitForm);
  $(".new-group").on("submit", createNewGroup);
  $(".newpoll").on("submit", submitPoll);
  $(".newresponse").on("submit", submitResponse);

  $(".logout-link").on("click", logout);
  $(".login-link, .register-link, .groups-link, .newgroup-link, .newmember-link").on("click", showPage);
  $(".members-link").on("click", groupMemberAndAdd);
  $(".newpoll-link").on("click", groupPollAndAdd);

  setResponseListeners();

  hideErrors();
  checkLoginState();
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
}

function loggedOutState() {
  $(".logged-out, .form-section").show();
  $(".logged-in").hide();
  $("section").hide();
  $("#register").show();
}

function authenticationSuccessful(data) {
  if (data.token) setToken(data.token);
  setCurrentUser(data.token);
  return checkLoginState();
}

function setCurrentUser(token) {
  return localStorage.setItem('currentUser', atob(token.split(".")[1]));
}

function currentUser(){
  return JSON.parse(localStorage.getItem('currentUser'));
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