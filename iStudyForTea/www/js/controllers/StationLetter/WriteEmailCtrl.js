/**
 * Created by hcnucai on 2016/10/27.
 */
app.controller("WriteEmailCtrl",function ($scope,$stateParams,$rootScope,$state,$ionicPopup) {
//监听事件 当进入的时候tab消失
        $scope.$on("$ionicView.beforeEnter",function () {
            $rootScope.hideTabs = true;

    });
//添加联系人的
    $scope.addContactPerson = function () {
        $state.go('tab.StationLetter-ContactPerson');
    }
    //点击查看联系人
    $scope.showContactPerson = function () {
   var alertPopup = $ionicPopup.alert({
       title:"您选择的联系人有",
       template:"kevin,swift,cao",
   });
        alertPopup.then(function (res) {
            console.log("OK");
        })
    }
})