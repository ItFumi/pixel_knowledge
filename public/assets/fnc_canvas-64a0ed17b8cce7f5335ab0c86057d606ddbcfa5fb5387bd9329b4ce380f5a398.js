function prev_canvas(){var e=$(".step_images img").length,t=JSON.parse(myStorage.getItem("log"));canvas._objects.length>0&&(0==canvas.item(canvas._objects.length-1).width&&($(".step_current_num").html(e-1),$(".step_images li").last().remove(),$(".step_images li img").css("opacity","1").last().css("opacity",".7"),temp.unshift(t.pop()),myStorage.setItem("log",JSON.stringify(t))),h.push(canvas._objects.pop()),canvas.renderAll())}function next_canvas(){var e=$(".step_images img").length,t=JSON.parse(myStorage.getItem("log"));h.length>0&&(0==h[h.length-1].width&&($(".step_current_num").html(e+1),$(".step_images").append("<li><img src='"+temp[0].canvas_img_base64+"' ></li>"),$(".step_images li img").css("opacity","1").last().css("opacity",".7"),t.push(temp.shift()),myStorage.setItem("log",JSON.stringify(t))),isRedoing=!0,canvas.add(h.pop()))}function save_canvas(){var e=$(".step_images img").length;if(e<9){$(".step_current_num").html(e+1);var t=JSON.parse(myStorage.getItem("log")),a=$("#knowledge_comment").val(),n=canvas.toDataURL(),s=JSON.stringify(canvas);t.push({comment:a,canvas_img_base64:n,canvas_entity:s}),$("#knowledge_comment").val(""),$(".step_images").append("<li><img src='"+n+"' ></li>"),$(".step_images li img").css("opacity","1").last().css("opacity",".7"),myStorage.setItem("log",JSON.stringify(t)),rect=new fabric.Rect({width:0}),canvas.add(rect)}else alert("\u30b9\u30c6\u30c3\u30d7\u306f9\u30b9\u30c6\u30c3\u30d7\u307e\u3067\u8a18\u9332\u3067\u304d\u307e\u3059\u3002")}function post_canvas(){if($(".step_images img").length>0){var e=JSON.parse(myStorage.getItem("log"));fd=new FormData($("#knowledge_form")[0]);var t=new XMLHttpRequest;if(e.length>0){for(var a=0,n=e.length-1;n>=0;n--)e[n].comment!==undefined&&(myStorage.setItem("log",JSON.stringify(e)),fd.append("picture"+a,e[n].canvas_img_base64),fd.append("comment"+a,e[n].comment),fd.append("canvas"+a,e[n].canvas_entity),a++);fd.append("step",a)}t.open("POST","./"),t.send(fd),t.onreadystatechange=function(){location.href="../../"}}else alert("\u30b9\u30c6\u30c3\u30d7\u3092\u8a18\u9332\u3057\u3066\u304f\u3060\u3055\u3044\u3002")}function mode_ch_canvas(e){canvas.isDrawingMode=e}function text_insert(){var e=$("#canvas_textbox").val();if(""==e)return alert("\u30c6\u30ad\u30b9\u30c8\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),!1;$("#canvas_textbox").val("");var t=new fabric.Text(e,{top:0,left:0,fontFamily:"Arial",fontSize:select_font_size,fill:select_text_color});canvas.add(t),canvas.isDrawingMode=!1}function image_insert(){var e=$("#canvas_image").val();if($("#canvas_image").val(""),$(".upload_image_name").text("\u753b\u50cf\u3092\u9078\u629e\u3059\u308b").css("color","#999"),""==e)return alert("\u753b\u50cf\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),!1;var t=$("#resize_canvas");if(originalBinary=t[0].toDataURL("image/jpeg"),5e3<=originalBinary.length)var a=5e3/originalBinary.length,n=t[0].toDataURL("image/jpeg",a);console.log(n.length),fabric.Image.fromURL(n,function(e){images=e.set({left:0,top:0}),canvas.add(images),canvas.renderAll()}),canvas.isDrawingMode=!1}function update_prev_canvas(){var e=JSON.parse(myStorage.getItem("log"));if(canvas._objects.length>def_objnum){if(0==canvas.item(canvas._objects.length-1).width){if(temp.unshift(e.pop()),myStorage.setItem("log",JSON.stringify(e)),e[e.length-1]===undefined)var t=gon.steps[index].picture.url;else t=e[e.length-1].canvas_img_base64;$(".step_images img").eq(index).attr("src",t)}h.push(canvas._objects.pop()),canvas.renderAll()}}function update_next_canvas(){var e=JSON.parse(myStorage.getItem("log"));h.length>0&&(0==h[h.length-1].width&&($(".step_images img").eq(index).attr("src",temp[0].canvas_img_base64),e.push(temp.shift()),myStorage.setItem("log",JSON.stringify(e))),isRedoing=!0,canvas.add(h.pop()))}function update_canvas(){var e=$(".step_images img").eq(index).attr("id"),t=$("#knowledge_comment").val(),a=canvas.toDataURL(),n=JSON.stringify(canvas),s=JSON.parse(myStorage.getItem("log"));if(s.length>0)for(var i=0;i<s.length;i++){if(s[i].id==e)return s[i].id=e,s[i].comment=t,s[i].canvas_img_base64=a,s[i].canvas_entity=n,myStorage.setItem("log",JSON.stringify(s)),!1;i==s.length-1&&(s.push({id:e,comment:t,canvas_img_base64:a,canvas_entity:n}),myStorage.setItem("log",JSON.stringify(s)))}else s.push({id:e,comment:t,canvas_img_base64:a,canvas_entity:n}),myStorage.setItem("log",JSON.stringify(s));$(".step_images img").eq(index).attr("src",a);var c=new fabric.Rect({width:0});canvas.add(c)}function update_post_canvas(){var e=JSON.parse(myStorage.getItem("log"));fd=new FormData($("#knowledge_update_form")[0]);var t=new XMLHttpRequest;if(e.length>0){for(var a=0,n=e.length-1;n>=0;n--)e[n].comment!==undefined&&(fd.append("id"+a,e[n].id),fd.append("comment"+a,e[n].comment),fd.append("picture"+a,e[n].canvas_img_base64),fd.append("canvas"+a,e[n].canvas_entity),a++);fd.append("step",a)}t.open("POST","./"),t.send(fd),t.onreadystatechange=function(){location.href="../../"}}$(function(){if(draw_weight=5,draw_color="#000",select_font_size=14,select_text_color="#000",myStorage=localStorage,myStorage.clear(),myStorage.setItem("log",JSON.stringify([])),canvas=new fabric.Canvas("my_canvas",{backgroundColor:"#fff"}),canvas.isDrawingMode=!0,canvas.freeDrawingBrush.width=draw_weight,canvas.on("object:added",function(){isRedoing||(h=[]),isRedoing=!1}),isRedoing=!1,h=[],temp=[],rect="",""!=gon.steps){index=0,canvas.loadFromJSON(gon.steps[0].canvas_obj),$("#knowledge_comment").val(gon.steps[0].comment);for(var e=canvas._objects.length-1;e>=0;e--)"rect"==canvas._objects[e].type&&canvas.remove(canvas.item(e));def_objnum=canvas._objects.length;for(e=0;e<gon.steps.length;e++)$(".step_images").append("<li class='edit_step'><img id='"+gon.steps[e].id+"' src='"+gon.steps[e].picture.url+"'></li>");$(".step_current_num").html(index+1),$(".step_max_num").html(gon.steps.length),$(".step_images li img").first().css("opacity",".7")}$(".step_images").on("click","img",function(){if(""!=gon.steps){$(".step_images li img").css("opacity","1"),$(this).css("opacity",".7"),index=$(".step_images img").index(this),$(".step_current_num").html(index+1);var e=$(this).attr("id"),t=JSON.parse(myStorage.getItem("log"));if(t.length>0)for(var a=0;a<t.length;a++){if(t[a].id==e)return canvas.clear().renderAll(),canvas.loadFromJSON(t[a].canvas_entity),$("#knowledge_comment").val(t[a].comment),!1;a==t.length-1&&(canvas.clear().renderAll(),canvas.loadFromJSON(gon.steps[index].canvas_obj),$("#knowledge_comment").val(gon.steps[index].comment))}else canvas.clear().renderAll(),canvas.loadFromJSON(gon.steps[index].canvas_obj),$("#knowledge_comment").val(gon.steps[index].comment);for(a=canvas._objects.length-1;a>=0;a--)"rect"==canvas._objects[a].type&&canvas.remove(canvas.item(a));def_objnum=canvas._objects.length}}),$(".title_input").keyup(function(){$(this).val().length>50&&alert("\u30bf\u30a4\u30c8\u30eb\u306f50\u6587\u5b57\u4ee5\u5185\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044")}),$(".content_input").keyup(function(){$(this).val().length>200&&alert("\u6982\u8981\u306f200\u6587\u5b57\u4ee5\u5185\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044")}),$(".insert_text_input").keyup(function(){$(this).val().length>50&&alert("\u633f\u5165\u3059\u308b\u30c6\u30ad\u30b9\u30c8\u306f50\u6587\u5b57\u4ee5\u5185\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044")}),$(".comment_input").keyup(function(){$(this).val().length>100&&alert("\u30b3\u30e1\u30f3\u30c8\u306f100\u6587\u5b57\u4ee5\u5185\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044")}),$("#canvas_image").on("change",function(e){var t=e.target.files[0];if(t.type.indexOf("image")<0)return alert("\u753b\u50cf\u30d5\u30a1\u30a4\u30eb\u3092\u6307\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),!1;$(".upload_image_name").text(t.name).css("color","#333");var a=new Image,n=new FileReader;n.onload=function(e){a.onload=function(){if(a.width>a.height){var e=400;a.width<400&&(e=a.width);var t=e/a.width,n=a.height*t}else{n=400;a.height<400&&(n=a.height);t=n/a.height,e=a.width*t}var s=$("#resize_canvas")[0].getContext("2d");$("#resize_canvas").attr("width",e),$("#resize_canvas").attr("height",n),s.drawImage(a,0,0,e,n)},a.src=e.target.result},n.readAsDataURL(t)}),$("html").keyup(function(e){8==e.keyCode&&canvas.getActiveObject()&&(h.push(canvas.getActiveObject()),canvas.remove(canvas.getActiveObject()),def_objnum=canvas._objects.length)}),$(".canvas_select_area .btn-group:nth-of-type(1) li a").click(function(){var e=$(this).html();$(".canvas_select_area .btn-group:nth-of-type(1) span").html(e),"\u7d30"==e?draw_weight=5:"\u4e2d"==e?draw_weight=10:"\u592a"==e&&(draw_weight=15),canvas.freeDrawingBrush.width=draw_weight}),$(".canvas_select_area .btn-group:nth-of-type(2) li a").click(function(){select_font_size=$(this).html(),$(".canvas_select_area .btn-group:nth-of-type(2) span").html(select_font_size)}),$(".draw_colorpicker").each(function(){$(this).minicolors({format:"hex",defaultValue:draw_color,theme:"default"})}),$(".draw_colorpicker").change(function(){draw_color=$(this).val(),canvas.freeDrawingBrush.color=draw_color}),$(".select_text_colorpicker").each(function(){$(this).minicolors({format:"hex",defaultValue:select_text_color,theme:"default"})}),$(".select_text_colorpicker").change(function(){select_text_color=$(this).val()})});