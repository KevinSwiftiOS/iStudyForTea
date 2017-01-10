/**
 * Created by hcnucai on 2016/10/23.
 */
//注入ctrl
app.controller("SendIdentityCtrl",function ($scope,$timeout,$state,httpService,$stateParams) {
    var totalTime;
  var email = $stateParams.email;
    var updateClock = function () {
        if(totalTime >= 0) {
          $scope.clock = totalTime--;

          $timeout(function () {
            updateClock();
          }, 1000);
        }else{
          $scope.isZero = true;
        }
    };

    //进行确认的按钮
     $scope.makeSure = function () {


        var identityText = angular.element(document.querySelector('#identityText')).val();
       var param = {
         email:email,
         validcode:identityText
       };

       var promise = httpService.infoPost("api/validcode",param);
       promise.then(function (res) {
         //验证码没有错误后进行跳转
         $state.go('ResetPassword',{token:res["info"].token});
       },function (err) {
         swal("验证失败",err,"error");
       })





    }
    //再发一次按钮
  $scope.sendAgain = function () {
    var param = {
      email:email
    }
    var promise = httpService.post("http://dodo.hznu.edu.cn/api/sendvalidcode",param);
    promise.then(function (res) {
      totalTime = 60;
      updateClock();
      $scope.isZero = false;
    },function (err) {
      swal("发送失败",err,"error");
    })
  }
    //监听视图进入
    $scope.$on("$ionicView.beforeEnter",function () {
      $scope.isZero = false;
         totalTime = 60;
        updateClock();
    })
    //当视图消失的时候 totalTime也变为60
    $scope.$on("$ionicView.beforeLeave",function () {
        totalTime = 0;
        updateClock();
    })
})
