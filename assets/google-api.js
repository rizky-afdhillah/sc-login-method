//  function cekLogin() {
//    let id_token_user = localStorage.getItem("id_token_user");

//    if (id_token_user) {
//      window.location = './';
//    } else {
//      window.location = './login.html';
//    }
//  }

//  function onSignIn(googleUser) {
//    var profile = googleUser.getBasicProfile();
//    var img_url = profile.getImageUrl();
//    var img_url = img_url.slice(0, -6); // Masteringjs.io

//    document.getElementById("name").innerHTML = profile.getName();
//    document.getElementById("email").innerHTML = profile.getEmail();
//    document.getElementById("img-profil").src = img_url;

//    localStorage.setItem("id_glogin", profile.getId());

//    let logout = document.getElementById("logout");
//    logout.style.display = 'flex';
//    logout.style.position = 'relative';

//    cekLogin();
//  }

//  function signOut() {
//    var auth2 = gapi.auth2.getAuthInstance();
//    auth2.signOut().then(function () {
//      console.log('User signed out.');
//      localStorage.removeItem("id_glogin");
//     //  location.reload();
//    });
//  }

// Start
function cekLogin() {
  let id_token_user = localStorage.getItem("id_token_user");

  if (id_token_user) {
    window.location = './';
    console.log('berhasil gan');
  } else {
    window.location = './login.html';
    console.log('enggak ada session');
  }
}
var googleUser = {};
var startApp = function () {
  gapi.load('auth2', function () {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: '965298354907-83vd9i1t0d7piqohml1lc4rseq1f0mvg.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    attachSignin(document.getElementById('login-via-google'));
  });
};

function attachSignin(element) {
  console.log(element.id);
  auth2.attachClickHandler(element, {},
    function (googleUser) {
      var profile = googleUser.getBasicProfile(); //get basic profil to variable

      var img_url = profile.getImageUrl(); //take img url
      var img_url = img_url.slice(0, -6); // string to HD file

      // save to localstorage/penyimpanan internal browser website.
      localStorage.setItem("id_token_user", profile.getId());
      localStorage.setItem("id_api_user", profile.getId());
      localStorage.setItem("name_user", profile.getName());
      localStorage.setItem("email_user", profile.getEmail());
      localStorage.setItem("img_user", img_url);

      localStorage.setItem("method_login", "google");

      cekLogin();
    },
    function (error) {
      // alert(JSON.stringify(error, undefined, 2));
      window.location = './login.html';
    });
}

function signOutGoogle() {
  console.log('User signed out.');
  localStorage.removeItem("id_token_user");
  localStorage.removeItem("id_api_user");
  localStorage.removeItem("name_user");
  localStorage.removeItem("email_user");
  localStorage.removeItem("img_user");
  localStorage.removeItem("method_login");
  cekLogin();
}

function cekStoragePLogin() {
  let id_token_user = localStorage.getItem("id_token_user");

  if (id_token_user) {
    window.location = './';
    console.log('berhasil gan');
  } else {
    console.log('enggak ada session');
    startApp();
  }
}