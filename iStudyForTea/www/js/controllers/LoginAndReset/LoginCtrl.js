/**
 * Created by hcnucai on 2016/10/23.
 */
app.controller('LoginCtrl',function ($scope,$state) {


    $scope.login = function () {

       //登录服务
        var username = angular.element(document.querySelector('#username')).val();
        var password = angular.element(document.querySelector('#password')).val();

        $state.go('tab.TeachManagement');
        //启动界面

    }

});
