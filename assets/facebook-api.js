function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().
  // console.log(userID);
  // console.log(response); // The current login status of the person.
  if (response.status === 'connected') { // Logged into your webpage and Facebook.
    var varAuthResponse = response.authResponse;
    var accessToken = varAuthResponse.accessToken;
    var userID = response.authResponse.userID;
    console.log('Berhasil Login');
    FB.api('https://graph.facebook.com/' + userID + '?fields=id,name,email,picture&access_token=' + accessToken,
      function (response1) {
        console.log(response1);
        // console.log('name' + response1.name);
        // console.log('email' + response1.email);
        // console.log('link profile img' + response1.picture.data.url);

        localStorage.setItem("id_token_user", accessToken);
        localStorage.setItem("id_api_user", userID);
        localStorage.setItem("name_user", response1.name);
        localStorage.setItem("email_user", response1.email);
        localStorage.setItem("img_user", response1.picture.data.url);

        localStorage.setItem("method_login", "facebook");
        cekStoragePLogin();
      });

  } else { // Not logged into your webpage or we are unable to tell.
    // window.location = './login.html?sts=failed-login';
    console.log("Belum Login");
  }
}


function checkLoginState() { // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function (response) { // See the onlogin handler
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function () {
  FB.init({
    appId: '467083088450620',
    cookie: true, // Enable cookies to allow the server to access the session.
    xfbml: true, // Parse social plugins on this webpage.
    version: 'v13.0' // Use this Graph API version for this call.
  });


  FB.getLoginStatus(function (response) { // Called after the JS SDK has been initialized.
    console.log('Login Status Respone ' + response);
    statusChangeCallback(response); // Returns the login status.
  });

};
// function startFB() {
//   console.log("startFB Triggre");
// }

function signOutFacebook() {
  FB.logout(function (response) {
    console.log('User signed out.');
    localStorage.removeItem("id_token_user");
    localStorage.removeItem("id_api_user");
    localStorage.removeItem("name_user");
    localStorage.removeItem("email_user");
    localStorage.removeItem("img_user");
    console.log(response);
    location.reload();
  });
  // FB.logout();
}

function cekStoragePLogin() {
  let id_token_user = localStorage.getItem("id_token_user");

  if (id_token_user) {
    console.log('berhasil gan');
  } else {
    console.log('enggak ada session');
    startApp();
  }
}