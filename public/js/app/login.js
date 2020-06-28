class Login {
  constructor() {}
  process_login() {
    let email = $("input[name='email']").val();
    let password = $("input[name='password']").val();

    if (!email || !password) {
      // $("#msg").text("Please E time");
      $("#msg").hide();
    } else {
      $.ajax({
        url: "/api/v1/admin/login",
        method: "POST",
        data: { email, password },
      })
        .done(function (data) {
          // console.log(data);
          window.location.replace("/admin/event/list");
        })
        .fail(function (err) {
          $("#msg").html(err.responseJSON.message);
          $("#msg").show();
        });
    }

    return false;
  }
}
