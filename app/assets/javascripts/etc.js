$(function() {
  $("#user_image").change(function(e) {
    var file = e.target.files[0];
    if(file.type.indexOf("image") < 0){
      alert("画像ファイルを指定してください。");
      return false;
    }
    $(".upload_image_name").text(file.name).css("color","#333");
  });
  $("#sign_in_user").on("ajax:success", function(e) {
    if(e.detail[0].success) {
      window.location.reload();
    } else {
      $(this).find(".modal_sign_item").css("color","#f00");
      $(this).find(".modal_sign_input").css("border-color","#f00");
      $(this).find(".sign_in_error").css("display","block");
      $(this).find(".sign_in_error").text("メールアドレスとパスワードの組み合わせに一致するユーザーが見つかりません");
    }
  });
  $("#password_forgot_user").on("ajax:success", function(e) {
    if(e.detail[0].success) {
    } else {
      $(this).find(".modal_sign_item").css("color","#f00");
      $(this).find(".modal_sign_input").css("border-color","#f00");
      $(this).find(".modal_sign_item span").text("");
      $(this).find(".modal_sign_item span").eq(0).text(e.detail[0].messages["email"]);
    }
  });
  $("#sign_up_user").on("ajax:success", function(e) {
    if(e.detail[0].success) {
      window.location.reload();
    } else {
      $(this).find(".modal_sign_item").css("color","#333");
      $(this).find(".modal_sign_input").css("border-color","#e5e5e5");
      $(this).find(".modal_sign_item span").text("");
      if(e.detail[0].messages["name"] != undefined) {
        $(this).find(".modal_sign_item").eq(0).css("color","#f00");
        $(this).find(".modal_sign_input").eq(0).css("border-color","#f00");
        $(this).find(".modal_sign_item").eq(0).find("span").text(e.detail[0].messages["name"]);
      }
      if(e.detail[0].messages["email"] != undefined) {
        $(this).find(".modal_sign_item").eq(1).css("color","#f00");
        $(this).find(".modal_sign_input").eq(1).css("border-color","#f00");
        $(this).find(".modal_sign_item").eq(1).find("span").text(e.detail[0].messages["email"]);
      }
      if(e.detail[0].messages["password"] != undefined) {
        $(this).find(".modal_sign_item").eq(2).css("color","#f00");
        $(this).find(".modal_sign_input").eq(2).css("border-color","#f00");
        $(this).find(".modal_sign_item").eq(2).find("span").text(e.detail[0].messages["password"]);
      }
      if(e.detail[0].messages["password_confirmation"] != undefined) {
        $(this).find(".modal_sign_item").eq(3).css("color","#f00");
        $(this).find(".modal_sign_input").eq(3).css("border-color","#f00");
        $(this).find(".modal_sign_item").eq(3).find("span").text(e.detail[0].messages["password_confirmation"]);
      }
    }
  });
  $(".link_password_forgot a").click(function() {
    $("#sign_in .modal-title").text("パスワード再設定");
    $("#sign_in .modal_sign_in").css("display","none");
    $("#sign_in .modal_password_forgot").css("display","block");
    return false;
  });
  $(".link_sign_in a").click(function() {
    $("#sign_in .modal-title").text("ログイン");
    $("#sign_in .modal_password_forgot").css("display","none");
    $("#sign_in .modal_sign_in").css("display","block");
    return false;
  });
  $(".bxslider").bxSlider({
    slideWidth: 700
	});
  $(".user_tooltip").tooltip({
    placement : "top"
  });
});
