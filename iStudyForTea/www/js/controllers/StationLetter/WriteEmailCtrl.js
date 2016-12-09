/**
 * Created by hcnucai on 2016/10/27.
 */
app.controller("WriteEmailCtrl",function ($cordovaProgress,$scope,$stateParams,$state,$ionicLoading,contactPersons,$cordovaImagePicker,httpService,uploadFile,base64,$ionicHistory,showBigImg) {
//测试
  var code = $stateParams.code;
  var subject = $stateParams.subject;
  var senderid = $stateParams.senderid;
  var sendername = $stateParams.sendername;
  var selPeronsId = [],selPersonsName = [], images = [];;
  $scope.$on("$ionicView.beforeEnter",function () {
    //看是否有联系人
    selPeronsId = contactPersons.getSelPersonsId();
    selPersonsName = contactPersons.getSelPersonsName();
    if(selPeronsId.indexOf(senderid) == -1 && senderid != null)
      selPeronsId.push(senderid);
    if(selPersonsName.indexOf(sendername) == -1 && sendername != null)
      selPersonsName.push(sendername);
    if(code != null){
      $scope.detail = {
        subject:subject,
        content:"",
      };
    }else{
      $scope.detail = {
        subject:"",
        content:"",
      };
    }

  });
//添加联系人的
    $scope.addContactPerson = function () {
      $state.go('tab.StationLetter-ContactPerson');
    }
    //点击查看联系人
    $scope.showContactPerson = function () {
      var totalSelPersonsName = "";
      for(var i = 0; i < selPersonsName.length;i++) {
        totalSelPersonsName += selPersonsName[i] + ",";
      }
      swal("你选择的联系人有",totalSelPersonsName);
      // var dic = [
      //   {src:"img/head.png"},
      //   {src:"img/top.png"},
      // ]
      // $state.go("tab.StationLette-ShowBigImage",{index:0,imgs:dic});
    }


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
  //发送
  $scope.writeEmail = function () {
    if(selPeronsId.length == 0){
      swal("提醒","未添加联系人","warning");
    }else if($scope.detail.content == "" && images.length == 0) {
swal("提醒","邮件内容未填","warning");
    }
    else {
      $cordovaProgress.showSimpleWithLabel(true, "请等待,正在发送中");
      var totalHtml = "";
      var ls = window.localStorage;
      var authtoken = ls.getItem("authtoken");
      totalHtml += $scope.detail.content;
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
              sendWithPerson(totalHtml, $scope.detail.subject, authtoken);
            }
          }, function (err) {
            $cordovaProgress.hide();
            swal("图片上传失败", err, "error");
          })
        }
      } else {
        sendWithPerson(totalHtml, $scope.detail.subject, authtoken);
      }
    }
  }
  function sendWithPerson(content,subject,authtoken) {
     //联系人的添加
    var receives = "";
      for(var i = 0; i < selPeronsId.length;i++){
        receives += selPeronsId[i] + ",";
      }

      //发送信件
      var data = {
        subject:subject,
        content:content,
        receives:receives
      };
      if(code != null)
        data.code = code;
    else
      data.code = "";
    var param = {
      authtoken:authtoken,
      data: base64.encode(angular.toJson(data)),
    }
   var promise =  httpService.post("http://dodo.hznu.edu.cn/api/messagesend",param);
    promise.then(function (res) {
      $cordovaProgress.hide();
      //删除本次的联系人
      contactPersons.removeSelPersons();
      //重组联系人
      var persons = contactPersons.getAllPersons();
      //进行遍历
      for(var i = 0; i < persons.length;i++){
        persons[i].isShow = false;
        persons[i].icon = "ion-ios-circle-outline";
        list = persons[i].ContacterList;
        for(var j = 0; j < list.length;j++) {
          list[j].icon = "ion-ios-circle-outline";
          if(list[j].Face == null)
            list[j].Face = "img/head.png";
        }
        persons[i].ContacterList = list;
      }
      contactPersons.setAllPersons(persons);
      $ionicHistory.goBack();
    },function (err) {
      $cordovaProgress.hide();
      swal("发送失败",err,"error");
    })
  }
  //双击放大图片
$scope.showBigImage = function ($index) {
  $state.go("tab.StationLette-ShowBigImage",{index:$index,imgs:images});
}
})
