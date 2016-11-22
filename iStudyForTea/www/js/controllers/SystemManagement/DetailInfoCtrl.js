/**
 * Created by hcnucai on 2016/10/27.
 */
app.controller("DetailInfoCtrl",function ($scope,$stateParams,$rootScope) {
//监听事件 当进入的时候tab消失
    $scope.$on("$ionicView.beforeEnter",function () {
        $rootScope.hideTabs = true;
    });

})