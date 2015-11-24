$(init);

function init() {
  $("form").on("submit", submitForm);
  $("#new-group").on("submit", createNewGroup);
  $(".logout-link").on("click", logout);
  $(".login-link, .register-link").on("click", showPage);
  $("#register").hide();
  $(".homepage").hide();
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
  $('#register').hide();
  $('#login').hide();

  return $("#" + linkClass).show();
}

function submitForm() {
  event.preventDefault();

  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();

  return ajaxRequest(method, url, data, authenticationSuccessful);
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
  $(".logged-out, .form-section").hide();
  $(".logged-in").show();
}

function loggedOutState() {
  $(".logged-out, .form-section").show();
  $(".logged-in").hide();
  $(".homepage").hide();
}

function authenticationSuccessful(data) {
  if (data.token) setToken(data.token);
  showHomepage(data);
  return checkLoginState();
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