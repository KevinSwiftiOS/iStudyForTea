/**
 * Created by hcnucai on 2016/10/29.
 */
//定义学习计划的Ctrl
app.controller("StudyPlanCtrl",function ($scope,$rootScope,$stateParams,$ionicModal,$state,$ionicHistory) {
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
    console.log("StudyPlan",$scope.id);
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
    //数据的显示
    $scope.items = [{
        testid:232,
         title:"VB综合练习",
         num:20,
          starttime:"2016-12-12",
          endtime:"2016-12-12"

}];
    //阅卷的按钮
    $scope.goOver = function (id) {
    $state.go("tab.TeachManagement-OneCourseStudyPlanGoOver",({"testid":id}));
    }
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    console.log("StudyPlan",index);
    $scope.index = index;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
})