/**
 * Created by hcnucai on 2016/10/27.
 */
app.controller("DetailInfoCtrl",function (httpService,$ionicLoading,$scope,$stateParams,$rootScope,$timeout,NotifyService,subDate) {
  //请求数据
  var ls = window.localStorage;
  var param = {
    id:$stateParams.id,
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


}
// $scope.$watch('myHtml',function (newValue,oldValue) {
//   if(newValue != oldValue)
//     alert("change");
// });
});
