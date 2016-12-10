/**
 * Created by hcnucai on 2016/10/29.
 */
//课程公告模块
app.controller("CourseAnnoucementCtrl",function ($scope,$stateParams,$ionicModal,$state,$ionicHistory,httpService,$ionicLoading,subDate) {
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
  var ls = window.localStorage;
var param = {
  authtoken: ls.getItem("authtoken"),
  courseid:$stateParams.courseid,
}
  $ionicLoading.show({
    template: '请等待'
  });
  var items = [];
  var promise = httpService.post("http://dodo.hznu.edu.cn/api/courseinfo", param);
  promise.then(function (data) {
    items = data;
    for(var i = 0; i < items.length;i++) {
      items[i].date = "发布日期 " + subDate.divedeToDay(items[i].date);

    }
    $scope.items = items;
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
    var promise = httpService.post("http://dodo.hznu.edu.cn/api/courseinfo", param);
    promise.then(function (data) {
      items = data;
      for(var i = 0; i < items.length;i++) {
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
        $state.go("tab.TeachManagement-OneCourseAnnoucementDetailInfo",{index:$index,items:$scope.items});
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
