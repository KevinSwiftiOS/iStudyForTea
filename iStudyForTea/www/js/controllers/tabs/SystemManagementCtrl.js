/**
 * Created by hcnucai on 2016/10/22.
 */
app.controller('systemManagementCtrl', function($scope,$rootScope,$ionicLoading,$state,httpService,httpService,subDate,NotifyService) {
    //监听进入页面的时候 tabbar显示 进行网络请求
  var items = [];
var ls = window.localStorage;
var param = {
  authtoken:ls.getItem("authtoken"),
  count:100,
  page:1
}
  var promise = httpService.post("/api/notifyquery", param);
  promise.then(function (data) {
    items = data;
    for(var i = 0; i < items.length;i++) {
      items[i].date = "发布日期 " + subDate.divedeToDay(items[i].date);

    }
    $scope.items = items;
    NotifyService.notifyItems = items;
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
  }, function (data) {
    items = [];
    $scope.items = items;
    NotifyService.notifyItems = items;
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
    swal("请求失败", data, "error");
  })
  $scope.doRefresh = function () {
    var promise = httpService.post("/api/notifyquery", param);
    promise.then(function (data) {
      items = data;
      for(var i = 0; i < items.length;i++) {
        items[i].date = "发布日期 " + subDate.divedeToDay(items[i].date);

      }
      $scope.items = items;
      NotifyService.notifyItems = items;

      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    }, function (data) {
      items = [];
      $scope.items = items;
      $ionicLoading.hide();
      NotifyService.notifyItems = items;
      $scope.$broadcast('scroll.refreshComplete');
      swal("请求失败", data, "error");
    })
    }
   //阅读系统公告
   $scope.gotoDetail = function ($index) {
     var id = $scope.items[$index].id;
     $state.go("tab.SystemManagement-DetailInfo",{id:id});
   }

    //增加系统公告的函数
    $scope.addAnnoucement = function () {
        $state.go('tab.SystemManagement-AddAnnoucement');
    }
    //增加账号管理的函数
    $scope.ManageAccount = function () {
        $state.go('tab.SystemManagement-ManageAccount')
    }
});
