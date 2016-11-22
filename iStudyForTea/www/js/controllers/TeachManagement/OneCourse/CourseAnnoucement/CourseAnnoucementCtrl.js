/**
 * Created by hcnucai on 2016/10/29.
 */
//课程公告模块
app.controller("CourseAnnoucementCtrl",function ($scope,$stateParams,$ionicModal,$state,$ionicHistory) {
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

    $scope.id = $stateParams.id;
    console.log("CourseAnnoucement",$scope.id);

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
    //定义数据
    $scope.items = [
        {
            author:"张量",
            date:"2016年12月12日 12:12:12",
            title:"VB程序设计",
            id:333
        }
    ]
    //定义跳转的动作
    $scope.courseAnnDetailInfo = function ($index) {
        $state.go("tab.TeachManagement-OneCourseAnnoucementDetailInfo",({id:$scope.items[$index].id}));
    }
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
    //增加系统公告界面
    $scope.addAnnoucement = function () {
        $state.go("tab.TeachManagement-OneCourseAddAnnoucement");
    }
})