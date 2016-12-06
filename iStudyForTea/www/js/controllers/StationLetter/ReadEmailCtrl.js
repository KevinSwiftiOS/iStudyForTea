/**
 * Created by hcnucai on 2016/10/27.
 */
app.controller("ReadEmailCtrl",function ($scope,$stateParams,lettersInAndOut,httpService,$ionicHistory,$state) {
//监听事件 当进入的时候tab消失
var index = $stateParams.index;
  var fromIn = $stateParams.fromIn;
  if(fromIn) {
    var inItem = lettersInAndOut.getInItems(index);
    $scope.subject = inItem.subject;
    $scope.content = inItem.content;
    //表明这封信件已读
    if(inItem.isread == false){

      var ls = window.localStorage;
      var param = {
        authtoken:ls.getItem("authtoken"),
        msgid:inItem.id
      }
      var promise = httpService.post("http://dodo.hznu.edu.cn/api/messagereaded",param);
      promise.then(function () {
         //阅读成功
        lettersInAndOut.setReadInItems(index);
      },function (err) {

      })
    }
  }else{
    var outItem = lettersInAndOut.getOutItems(index);
    $scope.subject = outItem["subject"];
    $scope.content = outItem.content;
  }
  //回复邮件和写邮件的
    $scope.reply = function () {
        if(fromIn) {
          var inItems = lettersInAndOut.getInItems(index);
          $state.go('tab.StationLetter-WriteEmail',{code:inItems.code,subject:"回复:" + inItems.subject,senderid:inItems.senderid,sendername:inItems.sendername});
        }else{
          swal("提醒","不能回复自己","error");
        }
    }
    $scope.writeEmail = function () {
        $state.go('tab.StationLetter-WriteEmail');
    }
    //删除信件
  $scope.remove = function () {
    var id;
    if(fromIn) {
      var inItem = lettersInAndOut.getInItems(index);
      id = inItem.id;
    }else{
      var outItem = lettersInAndOut.getOutItems(index);
      id = outItem.id;
    }
    var ls = window.localStorage;
     var param = {
       authtoken:ls.getItem("authtoken"),
       "msgid":id
     }
     console.log(param);
    var promise = httpService.post("http://dodo.hznu.edu.cn/api/messagedelete",param);
    promise.then(function (res) {
      if(fromIn)
      lettersInAndOut.removeInItems(index);
      else
        lettersInAndOut.removeOutItems(index);
      $ionicHistory.goBack();

    },function (err) {
      swal("信件删除失败",err,"error");
    })

  }
})
