/**
 * Created by hcnucai on 2016/10/23.
 */
app.controller("ResetPsswordCtrl", function ($scope, $state, httpService, $stateParams) {


  $scope.config = function () {
    //如果密码
    var newPassword = angular.element(document.querySelector('#newPassword')).val();
    var configNewPassword = angular.element(document.querySelector('#configNewPassword')).val();
    var token = $stateParams.token;
    if (newPassword === configNewPassword) {
      var params = {
        token: token,
        newpassword: newPassword
      }
      var promise = httpService.infoPost("api/resetpassowrd", params);
      promise.then(function (res) {
        var username = res["info"].username;
        var ls = window.localStorage;
        ls.setItem("username", username);
        ls.setItem("password", newPassword);
        swal({
            title: "恭喜您",
            text: "修改密码成功成功",
            type: "success",
            height: 10000,
            width: 100,
          },
          function () {
            $state.go('tab.TeachManagement');
            return true;


          });
      })

    } else {
      swal("提醒", "密码填写不相同", "warning");
    }
  }
});
