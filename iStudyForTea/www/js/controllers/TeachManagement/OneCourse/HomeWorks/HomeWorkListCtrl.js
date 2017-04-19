/**
 * Created by hcnucai on 2016/10/29.
 */
//作业列表 暂时线包括作业列表 实验列表 练习列表
app.controller("HomeWorkListCtrl", function ($scope, $stateParams, $ionicModal, $ionicHistory, $state, httpService, $ionicLoading, subDate) {
    //监听事件 加载菜单栏
    $ionicModal.fromTemplateUrl("Menu.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.$on("$ionicView.beforeLeave", function () {
        $scope.modal.hide();
    })
    //显示菜单的事件
    $scope.openModal = function () {
        $scope.modal.show();

    }
    $scope.modalHide = function () {
        $scope.modal.hide();
    }
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    //搜索框的事件
    $scope.user = {};
    $scope.removeSearch = function () {
        $scope.user.search = "";
    }
    $scope.courseid = $stateParams.courseid;
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //进行post请求
    //数据的显示
    var items = [];
    $scope.items = items;
    //第一次进入的时候拿数据
    var param = {
        authtoken: window.localStorage.getItem("authtoken"),
        courseid: $stateParams.courseid,
        count: 100,
        page: 1
    }
    $ionicLoading.show({
        template: '请等待'
    });
    var promise = httpService.post("apiteach/homeworkqueryteach", param);
    promise.then(function (data) {
        //进行日期的分割
        for (var i = 0; i < data.length; i++) {
            data[i].datestart = subDate.divedeToDay(data[i].datestart);
            data[i].dateend = subDate.divedeToDay(data[i].dateend);
        }
        $scope.items = data;
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
    }, function (err) {
        items = [];
        $scope.items = items;
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        swal("请求失败", err, "error");
    })
    //刷新的动作
    $scope.doRefresh = function () {
        var promise = httpService.post("apiteach/homeworkqueryteach", param);
        promise.then(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].datestart = subDate.divedeToDay(data[i].datestart);
                data[i].dateend = subDate.divedeToDay(data[i].dateend);
            }
            $scope.items = data;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        }, function (err) {
            items = [];
            $scope.items = items;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
            swal("提醒", err, "error");
        })
    }
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
    $scope.editHomeWorkDetail = function (item) {
        $state.go("tab.TeachManagement-OneCourseEditHomeWorkDetail", ({
            id: item.id,
            type: 3,
            courseid: $stateParams.courseid,
            operate: "edit"
        }));
    }
    //新建作业
    $scope.addHomeWork = function () {
        $state.go("tab.TeachManagement-OneCourseEditHomeWorkDetail", ({
            id: null,
            type: 3,
            courseid: $stateParams.courseid,
            operate: "add"
        }));
    }
})
