/**
 * Created by hcnucai on 2016/12/9.
 */
app.controller("WriteTopicCtrl",function ($scope,httpService,$cordovaProgress,$cordovaImagePicker,uploadFile,base64,$ionicHistory,showBigImg,$stateParams) {
$scope.topic = {
  subject:"",
  content:""
};
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
          var dic = {src:results[i]};
          images.push(dic);
        }
        $scope.images = images;
        //上传图片拿到url后进行动态加载div

      }, function(error) {
        // error getting photos
      });
  };
  //发送主题
  $scope.writeTopic = function () {
    var subject = $scope.topic.subject;
    var content = $scope.topic.content;
    console.log(subject);
    console.log(content);
    if(subject == "")
    swal("提醒","标题不能为空","warning");
  else if(content == "" && images.length == 0)
    swal("提醒","内容不能为空","warning");
    else{
      //先上传图片 再上传内容
      $cordovaProgress.showSimpleWithLabel(true, "请等待,正在发帖中");
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
            $cordovaProgress.hide();
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
      subject:subject,
      parentid:"",
      content:totalHtml,
      forumtypeid:"",
      projectid:$stateParams.courseid
    }
    var param = {
      authtoken:authtoken,
      postype:"1",
      data:base64.encode(angular.toJson(data))
    }
    var promise = httpService.post("http://dodo.hznu.edu.cn/api/forumpost",param);
    promise.then(function (res) {
      $cordovaProgress.hide();
      $ionicHistory.goBack();
    },function (err) {
      $cordovaProgress.hide();
      swal("发帖失败",err,"error");
    })
  }
})
