/**
 * Created by hcnucai on 2016/10/28.
 */
app.controller("StudentInfoCtrl",function ($scope,$state,$ionicHistory,$ionicActionSheet,$stateParams,httpService) {
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
     if(data.image == null || data.image == "")
       data.image = "img/head.png";
     $scope.stu = data;
  },(function (err) {
    swal("请求失败",err,"error");
  }))


});
