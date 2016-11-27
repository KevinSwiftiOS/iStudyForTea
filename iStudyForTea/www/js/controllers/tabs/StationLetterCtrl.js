/**
 * Created by hcnucai on 2016/10/22.
 */
app.controller('stationLetterCtrl', function($scope,Chats,$state,$rootScope,$ionicPopover,httpService) {
    $scope.popOver = $ionicPopover.fromTemplateUrl("station-popover.html",{
        scope:$scope
    });
    //fromTemplateUrl的方法
    $ionicPopover.fromTemplateUrl("station-popover.html", {
        scope: $scope
    }).then(function (popover) {
        $scope.popOver = popover;
    });

//打开的动作
    $scope.openPopover = function ($event) {
        $scope.popOver.show($event);
    }
    //清除浮动框
    $scope.$on("$destroy",function () {
        $scope.popOver.remove();
    })

    $scope.popItems = [
        {rowName: '收件箱',
            iconName:"icon ion-email"},
        {rowName: '发件箱',
            iconName:"icon ion-email"}];

    $scope.chats = Chats.all();
    //写邮件的
    $scope.writeEmail = function () {
        $state.go('tab.StationLetter-WriteEmail');
    }

    //选择不同的信件
    $scope.selectStation = function ($index) {
        alert($index);
    }
});
