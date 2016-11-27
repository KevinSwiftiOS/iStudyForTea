/**
 * Created by hcnucai on 2016/10/23.
 */
app.controller('LoginCtrl',function ($scope,$state,httpService,$cacheFactory) {


    $scope.login = function () {

       //登录服务
        var username = angular.element(document.querySelector('#username')).val();
        var password = angular.element(document.querySelector('#password')).val();

        $state.go('tab.TeachManagement');
        //启动界面
      //登录服务 暂时先赋一个authtoken
      var ls = window.localStorage;
      ls.setItem("authtoken","0B849459E30161BEF4AD80E6239A4A8D1940640FCEF133F0");
      var myCache = $cacheFactory("my-cache");

    }

});
