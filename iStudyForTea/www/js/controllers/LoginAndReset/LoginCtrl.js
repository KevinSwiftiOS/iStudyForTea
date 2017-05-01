/**
 * Created by hcnucai on 2016/10/23.
 */
app.controller('LoginCtrl', function ($scope, $state, httpService, img) {


  $scope.login = function () {

    //登录服务
    var username = angular.element(document.querySelector('#username')).val();
    var password = angular.element(document.querySelector('#password')).val();
    //启动界面
    var param = {
      username: username,
      password: password,
      devicetoken: "",
      number: "",
      os: "",
      clienttype: 2
    }
    var promise = httpService.infoPost("api/login", param);
    promise.then(function (data) {
      var ls = window.localStorage;
      ls.setItem("authtoken", data.authtoken);
      var info = data["info"];
      if (info.avtarurl == null) {
        //头像的设置
        info.avtarurl = "img/head.png";
        img.avtarurl = "img/head.png";
      } else {
        img.avtarurl = info.avtarurl;
      }
      ls.setItem("userInfo", angular.toJson(info));
      ls.setItem("username", username);
      ls.setItem("password", password);

      $state.go("tab.TeachManagement", ({fromLogin: true}));
    }, function (data) {
      swal("请求失败", data, "error");
    })

  }

});
