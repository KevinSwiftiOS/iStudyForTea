/**
 * Created by hcnucai on 2016/11/14.
 */
app.controller("StuInOneCourseListCtrl", function ($scope, $state, $stateParams, $ionicModal, $ionicPopover, $ionicHistory, $ionicLoading, httpService) {
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
  //定义属性
  //模板框数据的定义

//打开的动作
  $scope.openPopover = function () {
      $state.go("tab.TeachManagement-AddNewStuToGroup", ({groupid: 0}));
  }
  //清除浮动框
  $scope.$on("$destroy", function () {
    $scope.popOver.remove();
  })
  // //popItem的一些动作 跳转到不同的界面
  // $scope.goToDifferent = function ($index) {
  //   //首先隐藏popOver
  //   $scope.popOver.hide();
  //   switch ($index) {
  //     case 0:
  //       //学生库的id要传过去
  //
  //     case 1:
  //     default:
  //       break;
  //   }
  // }
  //搜索框的初始化 避免后面点取消按钮时一直找不到值
  $scope.user = {};
  $scope.removeSearch = function () {
    $scope.user.search = "";
  }
  var items = [];
  //第一次进入的时候拿数据
  var index = $stateParams.index;
  index++;
  $scope.index = index;
  $scope.courseid = $stateParams.courseid;
  var param = {
    authtoken: window.localStorage.getItem("authtoken"),
    courseid: $stateParams.courseid,
    count: 100,
    page: 1
  }
  $ionicLoading.show({
    template: '请等待'
  });
  var promise = httpService.post("apiteach/stulistbycourseid", param);
  promise.then(function (data) {
    items = data;
    for (var i = 0; i < items.length; i++) {
      if (items[i].image == null)
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
    var promise = httpService.post("apiteach/stulistbycourseid", param);
    promise.then(function (data) {
      items = data;
      for (var i = 0; i < items.length; i++) {
        if (items[i].image == null)
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


  //重置密码的操作
  $scope.resetPassword = function (id) {

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
            authtoken:window.localStorage.getItem("authtoken"),
            stuid:id
          };
          var promise = httpService.infoPost("apiteach/resetPwd",param);
          promise.then(function () {
          alert("重置密码成功");
          },function (err) {
            swal("重置失败",err,"error");
          })
        }

      });
  }
  //编辑的操作
  $scope.edit = function (id) {
    //到学生信息界面
    // $state.go("tab.TeachManagement-StudentInf",{id:id});

  }
  //删除的操作
  $scope.remove = function (id) {
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
            authtoken:window.localStorage.getItem("authtoken"),
            stuid:id
          };
          var promise = httpService.infoPost("apiteach/delstudent",param);
          promise.then(function () {
            alert("删除成功");

            for (var i = 0; i < $scope.items.length; i++) {
              if (items[i].id == id) {
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
  //回退的事件
  $scope.goBack = function () {
    $ionicHistory.goBack(-1 * index);
  }
})
