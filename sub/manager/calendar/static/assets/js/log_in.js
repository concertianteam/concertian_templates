$(document).ready(function(){
  $("form#log_inForm").on('submit',function(e){ // loginForm is submitted
      e.preventDefault()
    var username = $('email').attr('value'); // get username
    var password = $('password').attr('value'); // get password

    if (username && password) { // values are not empty
      $.ajax({
        type: "POST",
        url: "http://api.bandcloud.net/agents/auth",
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        // send username and password as parameters to the Perl script
        data: "email" + username + "password" + password,
        success: function(data){
          if (data.error) { // script returned error
            $('div#loginResult').text("data.error: " + data.error);
            $('div#loginResult').addClass("error");
          } // if
          else { // login was successful
            $('form#loginForm').hide();
            $('div#loginResult').text("data.success: " + data.success 
              + ", data.userid: " + data.userid);
            $('div#loginResult').addClass("success");
          } //else
        } // success
      }); // ajax
    } // if
    else {
      $('div#loginResult').text("enter username and password");
      $('div#loginResult').addClass("error");
    } // else
    $('div#loginResult').fadeIn();
    return false;
  });
});