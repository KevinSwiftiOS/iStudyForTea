/**
 * Created by hcnucai on 2016/10/28.
 */
app.controller("StudentInfCtrl",function ($scope,$state,$ionicHistory,$ionicActionSheet,$stateParams,httpService) {
  console.log($stateParams.userno);
  console.log($stateParams.groupid);
  var ls = window.localStorage;
  var param = {
    authtoken:ls.getItem("authtoken"),
    text:$stateParams.userno,
    count:100,
    page:1,
    groupid:$stateParams.groupid
  }
var promise = httpService.post("apiteach/searchstudent",param);
  promise.then(function (res) {
    var data = res[0];
     if(data.image == null || data.image == "")
       data.image = "img/head.png";
     $scope.stu = data;
     console.log($scope.stu);
  },(function (err) {
    swal("请求失败",err,"error");
  }))


});