/**
 * Created by hcnucai on 2016/11/14.
 */
app.controller("CourseAnnoucementDetailInfoCtrl",function ($scope,$stateParams,$ionicLoading,httpService,subDate,showBigImg,$ionicScrollDelegate,$state) {
 var index = $stateParams.index;
  var item = $stateParams.item;
  console.log(item);
  var param = {
    id:item.id,
  }
  $ionicLoading.show({
    template: '请等待'
  });

  var promise = httpService.infoPost("api/notifyinfo",param);
  promise.then(function (data) {
    var info = data.info;
    $ionicLoading.hide();
    info.date =  subDate.divedeToDay(info.date);
    $scope.info = info;
    $ionicLoading.hide();
  },function (err) {
    $ionicLoading.hide();
    swal("请求失败",err,"error");

  })

  $scope.edit = function () {
      $state.go("tab.SystemManagement-EditAnnoucement",{info:$scope.info,id:item.id,istop:item.istop});
  }
  //图片放大的动作
  var zoomed = true;
  $scope.zoomFunction = function () {
    if (zoomed) {// toggle zoom in
      var tap = {x: 0, y: 0};
      var position = showBigImg.getTouchposition(event);
      $ionicScrollDelegate.$getByHandle('content').zoomBy(3, true, position.x, position.y);
      zoomed = !zoomed;

    } else { // toggle zoom out
      $ionicScrollDelegate.$getByHandle('content').zoomTo(1, true);
      zoomed = !zoomed;
    }
  }
})
