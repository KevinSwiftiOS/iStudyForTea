/**
 * Created by hcnucai on 2016/10/29.
 */
//课程公告模块
app.controller("CourseAnnoucementCtrl", function ($scope, $stateParams, $ionicModal, $state, $ionicHistory, httpService, $ionicLoading, subDate) {
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

  $scope.courseid = $stateParams.courseid;

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
  var ls = window.localStorage;
  var param = {
    authtoken: ls.getItem("authtoken"),
    courseid: $stateParams.courseid,
  }
  $ionicLoading.show({
    template: '请等待'
  });
  var items = [];
  var promise = httpService.post("api/courseinfo", param);
  promise.then(function (data) {
    items = data;
    for (var i = 0; i < items.length; i++) {
      items[i].date = "发布日期 " + subDate.divedeToDay(items[i].date);

    }
    $scope.items = items;
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
  }, function (data) {
    items = [];
    $scope.items = items;
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
    swal("请求失败", data, "error");
  })
  $scope.doRefresh = function () {
    var promise = httpService.post("api/courseinfo", param);
    promise.then(function (data) {
      items = data;
      for (var i = 0; i < items.length; i++) {
        items[i].date = "发布日期 " + subDate.divedeToDay(items[i].date);

      }
      $scope.items = items;

      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    }, function (data) {
      items = [];
      $scope.items = items;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      swal("请求失败", data, "error");
    })
  }

  //定义跳转的动作
  $scope.courseAnnDetailInfo = function ($index) {
    $state.go("tab.TeachManagement-OneCourseAnnoucementDetailInfo", {index: $index, item: $scope.items[$index]});
  }
  //当前是第几个界面 随后界面++
  var index = $stateParams.index;
  index++;
  $scope.index = index;
  //回退的事件
  $scope.goBack = function () {
    $ionicHistory.goBack(-1 * index);
  }
  //删除系统公告
    //删除账号的管理
    $scope.remove = function (item) {
        swal({
                title: "提醒",
                text: "您确认删除该条公告吗?",
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
                        authtoken:window.localStorage.getItem("authtoken"),
                        id:item.id
                    };
                    var promise = httpService.infoPost("apiteach/delnotify",param);
                    promise.then(function () {
                        alert("删除成功");

                        for (var i = 0; i < $scope.items.length; i++) {
                            if (items[i].id == item.id) {
                                $scope.items.splice(i, 1);
                                break;
                            }
                        }
                    },function (err) {
                        swal("删除失败",err,"error");
                    })
                }

            });
    }
  //增加系统公告界面
  $scope.addAnnoucement = function () {
    $state.go("tab.SystemManagement-AddAnnoucement", {courseid: $stateParams.courseid,type:1});

  }
})
