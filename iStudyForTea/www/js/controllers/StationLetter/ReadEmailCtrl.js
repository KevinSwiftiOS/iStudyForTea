/**
 * Created by hcnucai on 2016/10/27.
 */
app.controller("ReadEmailCtrl",function ($scope,$stateParams,$rootScope,$state) {
//监听事件 当进入的时候tab消失
    $scope.$on("$ionicView.beforeEnter",function () {
        $rootScope.hideTabs = true;
    });
  //回复邮件和写邮件的
    $scope.reply = function () {
        $state.go('tab.StationLetter-WriteEmail');
    }
    $scope.writeEmail = function () {
        $state.go('tab.StationLetter-WriteEmail');
    }
})