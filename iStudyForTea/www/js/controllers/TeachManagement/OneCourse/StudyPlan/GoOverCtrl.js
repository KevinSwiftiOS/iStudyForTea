/**
 * Created by hcnucai on 2016/11/14.
 */
//定义阅卷的ctrl
app.controller("GoOverCtrl",function ($scope,$stateParams,httpService,$ionicLoading) {
  console.log($stateParams.testid);
  $ionicLoading.show({
    template: '请等待'
  });
  var items = [];
  var ls = window.localStorage;
  var param = {
    authtoken: ls.getItem("authtoken"),
    testid: $stateParams.testid,
    count: 100,
    page: 1
  };
  console.log(param);
  var promise = httpService.post("apiteach/examlist", param);
  promise.then(function (res) {
    items = res;
    console.log(items);
    for (var i = 0; i < items.length; i++) {
      items[i].img = "img/head.png";
      if (items[i].issubmit == 1)
        items[i].submit = "已提交";
      else
        items[i].submit = "未提交";
      if (items[i].ischeck == 1)
        items[i].check = "已批阅";
      else
        items[i].check = "未批阅";
    }
    $scope.items = items;
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
  }, function (err) {
    swal("请求失败", err, "error");
    items = [];
    $scope.items = items;
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
  })
  $scope.doRefresh = function () {
    var promise = httpService.post("apiteach/examlist", param);
    promise.then(function (res) {
      items = res;
      console.log(items);
      for (var i = 0; i < items.length; i++) {
        items[i].img = "img/head.png";
        if (items[i].issubmit == 1)
          items[i].submit = "已提交";
        else
          items[i].submit = "未提交";
        if (items[i].ischeck == 1)
          items[i].check = "已批阅";
        else
          items[i].check = "未批阅";
      }
      $scope.items = items;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    }, function (err) {
      swal("请求失败", err, "error");
      items = [];
      $scope.items = items;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    })
  };
});
