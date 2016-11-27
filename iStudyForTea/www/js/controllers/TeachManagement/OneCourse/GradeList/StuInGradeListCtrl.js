/**
 * Created by hcnucai on 2016/11/15.
 */
app.controller("StuInGradeListCtrl",function ($scope,$ionicModal,$state,$stateParams,$ionicHistory) {

    //监听事件 加载菜单栏
    $ionicModal.fromTemplateUrl("Menu.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.$on("$ionicView.beforeLeave",function () {
        $scope.modal.hide();
    })

    $scope.courseid = $stateParams.courseid;
    console.log("StuGradeList",$scope.id);

    //显示菜单的事件
    $scope.openModal = function () {
        $scope.modal.show();

    }
    $scope.modalHide = function () {
        $scope.modal.hide();
    }
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    //搜索框的事件
    $scope.user = {};
    $scope.removeSearch = function () {
        $scope.user.search = "";
    }
    //定义变量
    $scope.items = [
        {
            image:"http://dodo.hznu.edu.cn/Upload/editor/776de979-dead-4a60-83ca-a6aa00be839a.jpg",
           userno:"2014211081",
           username:"曹凯强",
            id:23232
}];
$scope.goToDetailGradeList = function (id) {
    $state.go("tab.TeachManagement-OneCourseDetailGradeList",({id:id}));
}
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
})
