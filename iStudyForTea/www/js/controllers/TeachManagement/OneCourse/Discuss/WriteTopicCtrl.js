/**
 * Created by hcnucai on 2016/12/9.
 */
app.controller("WriteTopicCtrl", function ($ionicLoading, $scope, httpService, $cordovaImagePicker, uploadFile, base64, $ionicHistory, showBigImg, $stateParams, $state) {
  $scope.topic = {
    subject: "",
    content: ""
  };
  var height = document.body.scrollHeight;
  $scope.textAreaStyle = {
    "width": "98%",
    "height": height * 0.5 + "px",
    "margin-left": "5px",
    "margin-right": "5px",
    "border-style": "solid",
    "border-width": "1px",
    "border-color": "darkgray",
  }
  $scope.imgsDivStyle = {
    "border-style": "solid",
    "border-width": "1px",
    "border-color": "darkgray",
    "width": "98%",
    "margin-left": "5px",
    "margin-right": "5px",
    "height": height * 0.4 + "px"
  }
  var images = [];
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
          var dic = {src: results[i]};
          images.push(dic);
        }
        $scope.images = images;
        //上传图片拿到url后进行动态加载div

      }, function (error) {
        // error getting photos
      });
  };
  //发送主题
  $scope.writeTopic = function () {
    var subject = $scope.topic.subject;
    var content = $scope.topic.content;

    if (subject == "")
      swal("提醒", "标题不能为空", "warning");
    else if (content == "" && images.length == 0)
      swal("提醒", "内容不能为空", "warning");
    else {
      //先上传图片 再上传内容
      $ionicLoading.show({
        template: '请等待'
      });

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
              sendTopic(totalHtml, subject, authtoken);
            }
          }, function (err) {
            $ionicLoading.hide();
            swal("图片上传失败", err, "error");
          })
        }
      } else {
        sendTopic(totalHtml, subject, authtoken);
      }
    }
  }
  function sendTopic(totalHtml, subject, authtoken) {
    //定义参数
    var data = {
      subject: subject,
      parentid: "",
      content: totalHtml,
      forumtypeid: "",
      projectid: $stateParams.courseid
    }
    var param = {
      authtoken: authtoken,
      postype: "1",
      data: base64.encode(angular.toJson(data))
    }
    var promise = httpService.post("api/forumpost", param);
    promise.then(function (res) {
      $ionicLoading.hide();
      $ionicHistory.goBack();
    }, function (err) {
      $ionicLoading.hide();
      swal("发帖失败", err, "error");
    })
  }

  //图片放大
  $scope.showBigImage = function ($index) {
    $state.go("tab.StationLette-ShowBigImage", {index: $index, imgs: images});
  }
})
