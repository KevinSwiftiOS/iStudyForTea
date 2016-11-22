/**
 * Created by hcnucai on 2016/10/29.
 */
//作业列表 暂时线包括作业列表 实验列表 练习列表
app.controller("ExprementListCtrl",function ($scope,$stateParams,$ionicModal,$ionicHistory,$state) {
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
    console.log("ExprementList",$scope.id);

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
            id:222,
            title:"2013B-样卷",
            memo:"作业说明",
            teacher:"张量",
            datestart:"2016-12-12 12:12:12",
            dateend:"2016-12-13 12:12:12",
        }
    ];
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
    $scope.editHomeWorkDetail = function (id) {

        $state.go("tab.TeachManagement-OneCourseEditHomeWorkDetail",({id:id}));
    }
    //新建作业
    $scope.addHomeWork = function(){
        $state.go("tab.TeachManagement-OneCourseEditHomeWorkDetail",({id:null}));
    }
})