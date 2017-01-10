/**
 * Created by hcnucai on 2016/11/15.
 */
app.controller("CourseAddAnnoucementCtrl",function ($scope,httpService,$cordovaImagePicker,uploadFile,base64,$ionicHistory,showBigImg,$stateParams,$state) {
    $scope.$on("$ionicView.beforeEnter",function () {
    });
//popView的一些事件代理x
  $scope.ann = {
    subject:"",
    content:""
  };
  var height = document.body.scrollHeight;
  $scope.textAreaStyle = {
    "width" :"98%",
    "height": height * 0.5 + "px",
    "margin-left":"5px",
    "margin-right": "5px",
    "border-style":"solid",
    "border-width":"1px",
    "border-color":"darkgray",
  }
  $scope.imgsDivStyle = {
    "border-style":"solid",
    "border-width":"1px",
    "border-color":"darkgray",
    "width": "98%",
    "margin-left":"5px",
    "margin-right":"5px",
    "height": height * 0.4 + "px"
  }
   $scope.pinStyle = {
     "font-size":"30px",
     "color":"gray"
   }
   var isTop = false;
  var myDate = new Date();
  $scope.year = myDate.getFullYear();
  $scope.month = myDate.getMonth() + 1;
  $scope.day = myDate.getDate();
  //是否置顶
  $scope.selectTop = function () {
   if(isTop){
     isTop = false;
     $scope.pinStyle = {
       "font-size":"30px",
       "color":"gray"
     }
   }else{
     isTop = true;
     $scope.pinStyle = {
       "font-size":"30px",
       "color":"blue"
     }
   }
  }
  var images = [];
  $scope.ann = {
    subject:"",
    content:""
  }
  //选择相册的
  //添加图片的操作
  $scope.selectImage = function () {
    var options = {
      maximumImagesCount: 10,
      width: 400,
      height: 400,
      quality: 80
    };
    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        for (var i = 0; i < results.length; i++) {
          var dic = {src:results[i]};
          images.push(dic);
        }
        $scope.images = images;
        //上传图片拿到url后进行动态加载div

      }, function(error) {
        // error getting photos
      });
  };
//完成的按钮
  $scope.finish = function () {
    var subject = $scope.ann.subject;
    var content = $scope.ann.content;
    if(subject == "")
      swal("提醒","标题未填","warning");
    else if(content == "" && images.length == 0)
      swal("提醒","公告内容未填","warning");
 else{
      //先上传图片 再上传内容
     // $cordovaProgress.showSimpleWithLabel(true, "请等待,正在发公告中");
      var totalHtml = "";
      var ls = window.localStorage;
      var authtoken = ls.getItem("authtoken");
      totalHtml += content;
      if (images.length > 0) {
        var cnt = 0;
        //首先进行图片的上传
        for (var i = 0; i < images.length; i++) {
          var uri = images[i].src;
          var param = {
            authtoken: authtoken,
            type: 3
          }
          var promise = uploadFile.upload(uri, param);
          promise.then(function (res) {
            totalHtml += "<div><img src =" + "\"" + res["uploadedurl"] + "\"" + "/></div>";
            cnt++;
            if (cnt == images.length) {
              //上传总共的文本
              sendAnn(totalHtml, subject, authtoken);
            }
          }, function (err) {
          //  $cordovaProgress.hide();
            swal("图片上传失败", err, "error");
          })
        }
      } else {
        sendAnn(totalHtml, subject, authtoken);
      }
    }
  }
  function   sendAnn(totalHtml, subject, authtoken) {
     var param = {
       title:subject,
       content:totalHtml,
       courseid:$stateParams.courseid,
       istop:isTop,
       authtoken:authtoken
     }
     console.log(param);
     var promise = httpService.post("apiteach/newnotify",param);
    promise.then(function() {
      swal({
          title: "恭喜您",
          text: "发送公告成功",
          type: "success",
          height: 10000,
          width: 100,
        },
        function () {
          $ionicHistory.goBack();
          return true;
        });
    },function (data) {
      swal("提醒",data,"创建失败");
    })
  }
})
