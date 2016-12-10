/**
 * Created by hcnucai on 2016/11/19.
 */
app.controller("NoteReplyListCtrl",function ($cordovaProgress,$scope,httpService,$cordovaImagePicker,uploadFile,base64,$ionicHistory,showBigImg,$stateParams,$state,discussService,$ionicLoading,subDate) {
  //样式高度
  var height = document.body.scrollHeight,images = [];
  $scope.textAreaStyle = {
    "width" :"98%",
    "height": height * 0.3 + "px",
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
    "height": height * 0.3 + "px"
  }
  $scope.reply = {
    content:"",
  }
  $scope.images = [];
    //内容模块
  $ionicLoading.show({
    template: '请等待'
  });
  var ls = window.localStorage;
  var param = {
    authtoken:ls.getItem("authtoken"),
    count:100,
    page:1,
    tag:$stateParams.id
  };
  $scope.view = {
    title:"回复"
  };
var promise = httpService.post("http://dodo.hznu.edu.cn/api/forumcommentquery",param);
  promise.then(function (res) {
    var items = res;
    for(var i = 0; i < items.length;i++) {
      if(items[i].avatar_url == null)
        items[i].avatar_url = "img/head.png";
      items[i].date = "于" + subDate.divedeToDay(items[i].date) + " 发表";
    }
    $scope.items = items;
    $ionicLoading.hide();
    discussService.replyItems = items;
    $scope.$broadcast('scroll.refreshComplete');
    $scope.view = {
      title: "回复(" + items.length + ")"
    };

  },function (err) {
    swal("请求失败",err,"error");
    var items = [];
    $scope.items = items;
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
    $scope.view = {
      title: "回复(" + items.length + ")"
    };
  })
 //刷新的动作
  $scope.doRefresh = function () {
    var promise = httpService.post("http://dodo.hznu.edu.cn/api/forumcommentquery",param);
    promise.then(function (res) {
      var items = res;
      for(var i = 0; i < items.length;i++) {
        if(items[i].avatar_url == null)
          items[i].avatar_url = "img/head.png";
        items[i].date = "于" + subDate.divedeToDay(items[i].date) + " 发表";
      }
      $scope.items = items;
      $ionicLoading.hide();
      discussService.replyItems = items;
      $scope.$broadcast('scroll.refreshComplete');
      $scope.view = {
        title: "回复(" + items.length + ")"
      };
    },function (err) {
      swal("请求失败",err,"error");
      var items = [];
      $scope.items = items;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      $scope.view = {
        title: "回复(" + items.length + ")"
      };
    })
  }
 //查看详情回复界面
  $scope.seeDetailRepyNote = function ($index) {
   $state.go("tab.TeachManagement-OneCourseNoteReplyDetail",{index:$index});
  }
  //选择相册
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
  $scope.send = function () {
    console.log(3232);
    var content = $scope.reply.content;
    if(content == "" && images.length == 0)
      swal("提醒","未添加回复内容","warning");
    else{
      //先上传图片 再上传内容
      $cordovaProgress.showSimpleWithLabel(true, "请等待,正在回帖中");
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
              sendFinal(totalHtml, authtoken);
            }
          }, function (err) {
            $cordovaProgress.hide();
            swal("图片上传失败", err, "error");
          })
        }
      } else {
        sendFinal(totalHtml, authtoken);
      }
    }
  }
  function sendFinal(totalHtml,authtoken) {
 var data = {
   subject:"",
   parentid:$stateParams.id,
   content:totalHtml,
   forumtypeid:"",
   projectid:discussService.courseId
 }
 var param = {
   authtoken: authtoken,
   postype: "2",
   data: base64.encode(angular.toJson(data)),
  }
    var promise = httpService.post("http://dodo.hznu.edu.cn/api/forumpost",param);
    promise.then(function () {
    $cordovaProgress.hide();
      $scope.doRefresh();
    },function (err) {
      $cordovaProgress.hide();
      swal("回帖失败",err,"error");
    })

  }
  //图片放大的动作
  $scope.showBigImage = function ($index) {
    $state.go("tab.StationLette-ShowBigImage",{index:$index,imgs:images});
  }
});
