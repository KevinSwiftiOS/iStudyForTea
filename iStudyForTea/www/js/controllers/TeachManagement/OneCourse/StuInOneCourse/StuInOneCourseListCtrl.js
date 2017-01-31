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
  $scope.popItems = [
    {
      "rowName": "新建学生",
    },
  ]
  $scope.popOver = $ionicPopover.fromTemplateUrl("StuListPopOver.html", {
    scope: $scope
  });
  //fromTemplateUrl的方法
  $ionicPopover.fromTemplateUrl("StuListInOneCoursePopOver.html", {
    scope: $scope
  }).then(function (popover) {
    $scope.popOver = popover;
  });
//打开的动作
  $scope.openPopover = function ($event) {
    $scope.popOver.show($event);
  }
  //清除浮动框
  $scope.$on("$destroy", function () {
    $scope.popOver.remove();
  })
  //popItem的一些动作 跳转到不同的界面
  $scope.goToDifferent = function ($index) {
    //首先隐藏popOver
    $scope.popOver.hide();
    switch ($index) {
      case 0:
        //学生库的id要传过去
        $state.go("tab.TeachManagement-AddNewStuToGroup", ({groupid: 1}));
      case 1:
      default:
        break;
    }
  }
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
  $scope.resetPassword = function (id,userno) {
   alert(id);
    //重置密码的操作
  }
  //编辑的操作
  $scope.edit = function (id,userno) {
    //到学生信息界面
    // $state.go("tab.TeachManagement-StudentInf",{id:id});
  alert(id);
  }
  //删除的操作
  $scope.remove = function (id,userno) {
    alert(id);
  }
  //回退的事件
  $scope.goBack = function () {
    $ionicHistory.goBack(-1 * index);
  }
})
