/**
 * Created by hcnucai on 2016/10/24.
 */
app.controller('PersonalResetPasswordCtrl', function($scope,$ionicHistory,httpService){
    //监听进入页面时 进行初始化值
  $scope.$on("$ionicView.beforeEnter",function () {
    $scope.oldpassword = "";
    $scope.newPassword = "";
    $scope.configNewPassword = "";
  });
    //修改密码
    $scope.config = function () {
      var oldPassword = angular.element(document.querySelector('#oldPassword')).val();
        var newPassword = angular.element(document.querySelector('#newPassword')).val();
        var configNewPassword = angular.element(document.querySelector('#configNewPassword')).val();
       //返回上一个界面
      var ls = window.localStorage;
      if(oldPassword != ls.getItem("password")){
        swal("提醒","原始密码填写不正确","warning");
      }else if(newPassword != configNewPassword){
        swal("提醒","新密码填写不相同","warning");
      }else{
        var param = {
          authtoken:ls.getItem("authtoken"),
          oldpassword:oldPassword,
          newpassword:newPassword
        }
         var promise =  httpService.post("api/changepassword",param);
        promise.then(function (res) {
            swal({
                title: "恭喜您",
                text: "修改成功",
                type: "success",
                height: 10000,
                width: 100,
              },
              function () {
                $ionicHistory.goBack();
                return true;
              });

          },function (err) {
            swal("修改失败",err,"error");
          })
      }
    }
    });
