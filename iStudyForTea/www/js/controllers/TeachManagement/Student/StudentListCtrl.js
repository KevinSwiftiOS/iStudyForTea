/**
 * Created by hcnucai on 2016/10/28.
 */
//学生列表名单的
app.controller("StudentListCtrl", function ($scope, $rootScope, $stateParams, $state, $ionicPopover, httpService, $ionicLoading) {
  //定义属性
  //搜索框的初始化 避免后面点取消按钮时一直找不到值
  $scope.user = {};
  //模板框数据的定义
  $scope.popItems = [
    {
      "rowName": "新建学生",
    },
    {
      "rowName": "添加现有学生",
    },
  ]
  $scope.popOver = $ionicPopover.fromTemplateUrl("StuListPopOver.html", {
    scope: $scope
  });
  //fromTemplateUrl的方法
  $ionicPopover.fromTemplateUrl("StuListPopOver.html", {
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
    console.log($scope.items);
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
  $scope.resetPassword = function (id, userno) {
    //重置密码的操作
    alert(userno);
  }
  //编辑的操作
  $scope.edit = function (id, userno) {
    //到学生信息界面
    $state.go("tab.TeachManagement-StudentInf", {id: id});

  }
  //删除的操作
  $scope.remove = function (id, userno) {
    alert(id);
  }
})
