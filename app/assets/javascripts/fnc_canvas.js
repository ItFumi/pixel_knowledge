$(function() {
  // 描画線の太さ 初期値
  draw_weight = 5;
  // 描画カラー 初期値
  draw_color = "#000";
  // テキストサイズ 初期値
  select_font_size = 14;
  // テキストカラー 初期値
  select_text_color = "#000";
  // ストレージ宣言
  myStorage = localStorage;
  // ストレージ初期化
  myStorage.clear();
  myStorage.setItem("log", JSON.stringify([]));
  // canvas取得
  canvas = new fabric.Canvas("my_canvas", {
    backgroundColor: "#fff"
  });
  // 描画モード
  canvas.isDrawingMode = true;
  // 線の太さ
  canvas.freeDrawingBrush.width = draw_weight;

  canvas.on("object:added",function() {
    if (!isRedoing) {
      h = [];
    }
    isRedoing = false;
  });
  isRedoing = false;
  h = [];
  temp = [];
  rect = "";

  // 編集時
  if (gon.steps != "") {
    // ステップ番号指定用変数
    index = 0;
    // DB保存(ステップ1)のcanvasオブジェクト読み込み
    canvas.loadFromJSON(gon.steps[0].canvas_obj);
    // DB保存(ステップ1)のコメント読み込み
    $("#knowledge_comment").val(gon.steps[0].comment);
    // (ステップ1)の新規投稿時の記録ポイント全削除
    for(var i = canvas._objects.length-1;i >= 0; i--) {
      if (canvas._objects[i]["type"] == "rect") {
        canvas.remove(canvas.item(i));
      }
    }
    // (ステップ1)の編集時のオブジェクト数
    def_objnum = canvas._objects.length;
    // 知識の全ステップをステップ一覧に表示
    for(var i = 0;i < gon.steps.length; i++) {
      $(".step_images").append("<li class='edit_step'><img id='"+gon.steps[i].id+"' src='"+gon.steps[i].picture.url+"'></li>");
    }
    // 現在編集のステップ番号表示
    $(".step_current_num").html(index+1);
    // 合計ステップ数を表示
    $(".step_max_num").html(gon.steps.length);
    // (ステップ1)を透過 ※現在編集中という事を表現する為
    $(".step_images li img").first().css("opacity",".7");
  }
  // ステップ一覧の各ステップ押下時
  $(".step_images").on("click", "img", function() {
    // 編集時
    if (gon.steps != "") {
      // 編集するステップを透過 ※編集中という事を表現する為
      $(".step_images li img").css("opacity","1");
      $(this).css("opacity",".7");
      // ステップ一覧におけるステップの番号を取得
      index = $(".step_images img").index(this);
      // 現在編集のステップ番号表示
      $(".step_current_num").html(index+1);
      // ステップのidを取得
      var step_id = $(this).attr("id");
      // ストレージ内のログを取得
      var logs = JSON.parse(myStorage.getItem("log"));
      // ログが存在
      if (logs.length > 0) {
        for (var i = 0; i < logs.length; i++) {
          // 1度更新したステップが存在
          if (logs[i]["id"] == step_id) {
            // DB保存のcanvasオブジェクト読み込み
            canvas.clear().renderAll();
            canvas.loadFromJSON(logs[i]["canvas_entity"]);
            // ログに保存したコメントを取得
            $("#knowledge_comment").val(logs[i]["comment"]);
            // ループを抜ける
            return false;
          }
          if (i == logs.length - 1) {
            // DB保存のcanvasオブジェクト読み込み
            canvas.clear().renderAll();
            canvas.loadFromJSON(gon.steps[index].canvas_obj);
            // DB保存のコメント読み込み
            $("#knowledge_comment").val(gon.steps[index].comment);
          }
        }
      } else {
        // DB保存のcanvasオブジェクト読み込み
        canvas.clear().renderAll();
        canvas.loadFromJSON(gon.steps[index].canvas_obj);
        // DB保存のコメント読み込み
        $("#knowledge_comment").val(gon.steps[index].comment);
      }

      for(var i = canvas._objects.length-1;i >= 0; i--) {
        if (canvas._objects[i]["type"] == "rect") {
          canvas.remove(canvas.item(i));
        }
      }
      def_objnum = canvas._objects.length;
    }
  });

  $(".title_input").keyup(function() {
    var txtcount = $(this).val().length;
    if (txtcount > 50) {
      alert("タイトルは50文字以内で入力してください");
    }
  });
  $(".content_input").keyup(function() {
    var txtcount = $(this).val().length;
    if (txtcount > 200) {
      alert("概要は200文字以内で入力してください");
    }
  });
  $(".insert_text_input").keyup(function() {
    var txtcount = $(this).val().length;
    if (txtcount > 50) {
      alert("挿入するテキストは50文字以内で入力してください");
    }
  });
  $(".comment_input").keyup(function() {
    var txtcount = $(this).val().length;
    if (txtcount > 100) {
      alert("コメントは100文字以内で入力してください");
    }
  });

  $("#canvas_image").on("change", function(e) {
    var file = e.target.files[0];
    if(file.type.indexOf("image") < 0){
      alert("画像ファイルを指定してください。");
      return false;
    }
    $(".upload_image_name").text(file.name).css("color","#333");
    var image = new Image();
    var reader = new FileReader();
    reader.onload = function(f) {
      image.onload = function() {
        if (image.width > image.height) {
          var w = 400;
          if (image.width < 400) {
            w = image.width;
          }
          var ratio = w / image.width;
          var h = image.height * ratio;
        } else {
          var h = 400;
          if (image.height < 400) {
            h = image.height;
          }
          var ratio = h / image.height;
          var w = image.width * ratio;
        }

        var resize_canvas = $("#resize_canvas");
        var resize_ctx = resize_canvas[0].getContext("2d");
        $("#resize_canvas").attr("width", w);
        $("#resize_canvas").attr("height", h);
        resize_ctx.drawImage(image, 0, 0, w, h);
      }
      image.src = f.target.result;
    }
    reader.readAsDataURL(file);
  });

  $("html").keyup(function(e) {
    if(e.keyCode == 8) {
      if(canvas.getActiveObject()){
        h.push(canvas.getActiveObject());
        canvas.remove(canvas.getActiveObject());
        def_objnum = canvas._objects.length;
      }
    }
  });
  $(".canvas_select_area .btn-group:nth-of-type(1) li a").click(function() {
    var draw_weight_name = $(this).html();
    $(".canvas_select_area .btn-group:nth-of-type(1) span").html(draw_weight_name);
    if (draw_weight_name == "細") {
      draw_weight = 5;
    } else if (draw_weight_name == "中") {
      draw_weight = 10;
    } else if (draw_weight_name == "太") {
      draw_weight = 15;
    }
    canvas.freeDrawingBrush.width = draw_weight;
  });
  $(".canvas_select_area .btn-group:nth-of-type(2) li a").click(function() {
    select_font_size = $(this).html();
    $(".canvas_select_area .btn-group:nth-of-type(2) span").html(select_font_size);
  });
  $(".draw_colorpicker").each(function() {
    $(this).minicolors({
      format: "hex",
      defaultValue: draw_color,
      theme: "default"
    });
  });
  $(".draw_colorpicker").change(function() {
    draw_color = $(this).val();
    canvas.freeDrawingBrush.color = draw_color;
  });
  $(".select_text_colorpicker").each(function() {
    $(this).minicolors({
      format: "hex",
      defaultValue: select_text_color,
      theme: "default"
    });
  });
  $(".select_text_colorpicker").change(function() {
    select_text_color = $(this).val();
  });
});
function prev_canvas() { // Canvasの状態を1つ前の状態に戻す
  // 記録済のステップ数を取得
  var step_count = $(".step_images img").length;
  // ストレージ内のログを取得
  var logs = JSON.parse(myStorage.getItem("log"));
  if (canvas._objects.length > 0) {
    if (canvas.item(canvas._objects.length-1).width == 0) {
      // 現在編集のステップ番号表示
      $(".step_current_num").html(step_count-1);
      $(".step_images li").last().remove();
      $(".step_images li img").css("opacity","1").last().css("opacity",".7");
      temp.unshift(logs.pop());
      myStorage.setItem("log", JSON.stringify(logs));
    }
    h.push(canvas._objects.pop());
    canvas.renderAll();
  }
}
function next_canvas() { // Canvasの状態を1つ後の状態にする
  // 記録済のステップ数を取得
  var step_count = $(".step_images img").length;
  // ストレージ内のログを取得
  var logs = JSON.parse(myStorage.getItem("log"));
  if (h.length > 0) {
    if (h[h.length-1].width == 0) {
      // 現在編集のステップ番号表示
      $(".step_current_num").html(step_count+1);
      $(".step_images").append("<li><img src='"+temp[0]["canvas_img_base64"]+"' ></li>");
      $(".step_images li img").css("opacity","1").last().css("opacity",".7");
      logs.push(temp.shift());
      myStorage.setItem("log", JSON.stringify(logs));
    }
    isRedoing = true;
    canvas.add(h.pop());
  }
}
function save_canvas() {
  // 記録済のステップ数を取得
  var step_count = $(".step_images img").length;
  if (step_count < 9) {
    // 現在編集のステップ番号表示
    $(".step_current_num").html(step_count+1);
    // ストレージ内のログを取得
    var logs = JSON.parse(myStorage.getItem("log"));
    // コメントを取得
    var comment = $("#knowledge_comment").val();
    // 現在のcanvasの状態を取得
    var canvas_img_base64 = canvas.toDataURL();

    var canvas_entity = JSON.stringify(canvas);

    // ログ配列の先頭に現在のcanvasの状態を追加
    logs.push({comment,canvas_img_base64,canvas_entity});
    // コメント欄を空にする
    $("#knowledge_comment").val("");
    // 保存したcanvasを履歴欄に表示
    $(".step_images").append("<li><img src='"+canvas_img_base64+"' ></li>");
    $(".step_images li img").css("opacity","1").last().css("opacity",".7");
    // 追加後の配列をストレージに再格納
    myStorage.setItem("log", JSON.stringify(logs));

    rect = new fabric.Rect({width:0});
    canvas.add(rect);
  } else {
    alert("ステップは9ステップまで記録できます。");
  }
}
function post_canvas() {
  // 記録済のステップ数を取得
  var step_count = $(".step_images img").length;
  if (step_count > 0) {
    // ストレージ内のログを取得
    var logs = JSON.parse(myStorage.getItem("log"));
    // FormDataを定義
    // フォーム｢knowledge_form｣にPOSTデータを追加
    fd = new FormData($("#knowledge_form")[0]);
    // 非同期通信のAPIを定義
    var request = new XMLHttpRequest();
    // ログが存在した場合
    if (logs.length > 0) {
      var i = 0;
      for (var j = logs.length-1; j >= 0; j--) {
        // コメントが存在 = ステップとして記録している場合、True
        if (logs[j]["comment"] !== undefined) {
          myStorage.setItem("log", JSON.stringify(logs));
          // FormDataにイメージのデータを追加
          fd.append("picture"+i, logs[j]["canvas_img_base64"]);
          // FormDataにコメントのデータを追加
          fd.append("comment"+i, logs[j]["comment"]);
          // FormDataにオブジェクトのデータを追加
          fd.append("canvas"+i, logs[j]["canvas_entity"]);
          i++;
        }
      }
      fd.append("step", i);
    }
    // HTTPメソッドおよび通信先URLを指定
    request.open("POST", "./");
    // 通信開始
    request.send(fd);
    request.onreadystatechange = function() {
      location.href = "../../"
    }
  } else {
    alert("ステップを記録してください。");
  }
}
function mode_ch_canvas(ch_value) {
  canvas.isDrawingMode = ch_value;
}
function text_insert() {
  // テキストを取得
  var canvas_text = $("#canvas_textbox").val();
  // テキスト未入力の場合エラー
  if (canvas_text == "") {
    alert("テキストを入力してください。");
    return false;
  }
  // テキスト入力欄を空にする
  $("#canvas_textbox").val("");
  // テキストオブジェクトを生成
  var text = new fabric.Text(canvas_text, {
    top: 0,
    left: 0,
    fontFamily: "Arial",
    fontSize: select_font_size,
    fill: select_text_color
  });
  canvas.add(text);
  canvas.isDrawingMode = false;
}
function image_insert() {
  // 選択画像を取得
  var select_image = $("#canvas_image").val();
  $("#canvas_image").val("");
  $(".upload_image_name").text("画像を選択する").css("color","#999");
  // 画像が選択されていない場合エラー
  if (select_image == "") {
    alert("画像を選択してください。");
    return false;
  }
  var resize_canvas = $("#resize_canvas");
  originalBinary = resize_canvas[0].toDataURL("image/jpeg");

  if (5000 <= originalBinary.length) {
    var capacityRatio = 5000 / originalBinary.length;
    var processingBinary = resize_canvas[0].toDataURL("image/jpeg", capacityRatio);
  }
  fabric.Image.fromURL(processingBinary, function(img) {
    images = img.set({ left: 0, top: 0 })
    canvas.add(images);
    canvas.renderAll();
  });
  canvas.isDrawingMode = false;
}
function update_prev_canvas() { // Canvasの状態を1つ前の状態に戻す
  // ストレージ内のログを取得
  var logs = JSON.parse(myStorage.getItem("log"));
  if (canvas._objects.length > def_objnum) {
    if (canvas.item(canvas._objects.length-1).width == 0) {
      temp.unshift(logs.pop());
      myStorage.setItem("log", JSON.stringify(logs));
      if (logs[logs.length-1] === undefined) {
        var canvas_img_base64 = gon.steps[index].picture.url;
      } else {
        var canvas_img_base64 = logs[logs.length-1]["canvas_img_base64"];
      }
      $(".step_images img").eq(index).attr("src", canvas_img_base64);
    }
    h.push(canvas._objects.pop());
    canvas.renderAll();
  }
}
function update_next_canvas() { // Canvasの状態を1つ後の状態にする
  // ストレージ内のログを取得
  var logs = JSON.parse(myStorage.getItem("log"));
  if (h.length > 0) {
    if (h[h.length-1].width == 0) {
      $(".step_images img").eq(index).attr("src", temp[0]["canvas_img_base64"]);
      logs.push(temp.shift());
      myStorage.setItem("log", JSON.stringify(logs));
    }
    isRedoing = true;
    canvas.add(h.pop());
  }
}
function update_canvas() {
  // idを取得
  var id = $(".step_images img").eq(index).attr("id");
  // コメントを取得
  var comment = $("#knowledge_comment").val();
  // 現在のcanvasの状態を取得
  var canvas_img_base64 = canvas.toDataURL();
  // 保存したcanvasを履歴欄に表示
  $(".step_images img").eq(index).attr("src", canvas_img_base64);

  var canvas_entity = JSON.stringify(canvas);

  // ストレージ内のログを取得
  var logs = JSON.parse(myStorage.getItem("log"));
  // ログが存在
  if (logs.length > 0) {
    for (var i = 0; i < logs.length; i++) {
      // 1度更新したステップが存在
      if (logs[i]["id"] == id) {
        logs[i]["id"] = id;
        logs[i]["comment"] = comment;
        logs[i]["canvas_img_base64"] = canvas_img_base64;
        logs[i]["canvas_entity"] = canvas_entity;
        // 追加後の配列をストレージに再格納
        myStorage.setItem("log", JSON.stringify(logs));
        // ループを抜ける
        return false;
      }
      if (i == logs.length - 1) {
        // ログ配列の先頭に現在のcanvasの状態を追加
        logs.push({id,comment,canvas_img_base64,canvas_entity});
        // 追加後の配列をストレージに再格納
        myStorage.setItem("log", JSON.stringify(logs));
      }
    }
  } else {
    // ログ配列の先頭に現在のcanvasの状態を追加
    logs.push({id,comment,canvas_img_base64,canvas_entity});
    // 追加後の配列をストレージに再格納
    myStorage.setItem("log", JSON.stringify(logs));
  }

  var rect = new fabric.Rect({width:0});
  canvas.add(rect);
}
function update_post_canvas() {
  // ストレージ内のログを取得
  var logs = JSON.parse(myStorage.getItem("log"));
  // FormDataを定義
  // フォーム｢knowledge_form｣にPOSTデータを追加
  fd = new FormData($("#knowledge_update_form")[0]);
  // 非同期通信のAPIを定義
  var request = new XMLHttpRequest();
  // ログが存在した場合
  if (logs.length > 0) {
    var i = 0;
    for (var j = logs.length-1; j >= 0; j--) {
      // コメントが存在 = ステップとして記録している場合、True
      if (logs[j]["comment"] !== undefined) {
        // FormDataにidのデータを追加
        fd.append("id"+i, logs[j]["id"]);
        // FormDataにコメントのデータを追加
        fd.append("comment"+i, logs[j]["comment"]);
        // FormDataにイメージのデータを追加
        fd.append("picture"+i, logs[j]["canvas_img_base64"]);
        // FormDataにオブジェクトのデータを追加
        fd.append("canvas"+i, logs[j]["canvas_entity"]);
        i++;
      }
    }
    fd.append("step", i);
  }
  // HTTPメソッドおよび通信先URLを指定
  request.open("POST", "./");
  // 通信開始
  request.send(fd);
  request.onreadystatechange = function() {
    location.href = "../../"
  }
}
