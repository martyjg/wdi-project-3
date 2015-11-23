$(init);

function init() {
  $("form").on("submit", submitForm);
  $(".logout-link").on("click", logout);
  $(".login-link, .register-link").on("click", showPage);
  hideErrors();
  checkLoginState();
}

function checkLoginState() {
  if (localStorage.getItem("token")) {
    return loggedInState();
  } else {
    return loggedOutState();
  }
}

function showPage() {
  event.preventDefault();
  var linkClass = $(this).attr("class").split("-")[0];
  $("section").hide();
  hideErrors();
  return $("#" + linkClass).show();
}

function submitForm() {
  event.preventDefault();

  // $.ajax({
  //   url:'http://localhost:3000/api/register',
  //   type:'post',
  //   data: { user: {
  //     "username": $("input#username").val(),
  //     "password": $("input#password").val(),
  //     "email": $("input#email").val()
  //   }}
  // }).done(function(data) {
  //   addUser(data);
  //   toggleUserForm();
  //   $("input#username").val(null),
  //   $("input#password").val(null),
  //   $("input#email").val(null)
  // });


  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();

  console.log(data);

  return ajaxRequest(method, url, data, authenticationSuccessful);
}

//method = "post", action = "/register"
//method is "post", correct
//url is "http://localhost:3000/api/register", correct

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
  $("logged-out form-section").hide();
  $("logged-in").show();
}

function loggedOutState() {
  $("logged-out form-section").show();
  $("logged-in").hide();
}

function authenticationSuccessful(data) {
  if (data.token) {
    localStorage.setItem("token", token);
  } 
  return checkLoginState();
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
  }).done(function(data) {
    if (callback) return callback(data);    
  }).fail(function(data) {
    displayErrors();
  });
}