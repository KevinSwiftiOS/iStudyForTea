/**
 * Created by hcnucai on 2016/10/28.
 */
//学生列表名单的
app.controller("StudentListCtrl", function ($scope, $rootScope, $stateParams, $state, $ionicPopover, httpService, $ionicLoading) {
    //定义属性
    //搜索框的初始化 避免后面点取消按钮时一直找不到值
    $scope.user = {};
    //模板框数据的定义



//打开的动作
    $scope.openPopover = function ($event) {
        $state.go("tab.TeachManagement-AddNewStuToGroup", ({groupid: $stateParams.groupid,type:1}));
    }
    var param = {
        authtoken: window.localStorage.getItem("authtoken"),
        groupid: $stateParams.groupid,
        count: 100,
        page: 1
    }
    $ionicLoading.show({
        template: '请等待'
    });
    var promise = httpService.post("apiteach/studentlist", param);
    promise.then(function (data) {
        items = data;
        //头像没有
        for (var i = 0; i < items.length; i++) {
            if (items[i].image == null || items[i].image == "")
                items[i].image = "img/head.png";
        }
        $scope.items = items;
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
        var promise = httpService.post("apiteach/studentlist", param);
        promise.then(function (data) {
            items = data;
            for (var i = 0; i < items.length; i++) {
                if (items[i].image == null || items[i].image == "")
                    items[i].image = "img/head.png";
            }
            $scope.items = items;
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
    //搜索框的取消按钮的实现
    $scope.user = {};
    $scope.removeSearch = function () {

        $scope.user.search = "";

    }
    //列表刷新

    //重置密码的操作
    $scope.resetPassword = function (stuid) {
        //重置密码的操作
        swal({
                title: "提醒",
                text: "您确认重置该学生的密码吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    //进行缓存的清理和跳转
                    var param = {
                        authtoken: window.localStorage.getItem("authtoken"),
                        stuid: stuid
                    };

                    var promise = httpService.post("apiteach/resetPwd", param);
                    promise.then(function (data) {
                    alert("重置成功");
                    }, function (err) {
                      alert(err);
                    })
                }

            });
    }

    //删除的操作
    $scope.remove = function (id,itemid) {
        //重置密码的操作
        swal({
                title: "提醒",
                text: "您确认删除该学生吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                closeOnCancel: true
            },

            function (isConfirm) {
                if (isConfirm) {

                    //进行缓存的清理和跳转
                    var param = {
                        authtoken: window.localStorage.getItem("authtoken"),
                        itemid: itemid
                    };
                    var promise = httpService.infoPost("apiteach/delstuInGroup", param);
                    promise.then(function () {
                        alert("删除成功");
                      for (var i = 0; i < $scope.items.length; i++) {
                        if (items[i].id == id) {
                          $scope.items.splice(i, 1);
                          break;
                        }
                      }
                    }, function (err) {
                       alert(err);
                    })
                }
            })
    };
})
