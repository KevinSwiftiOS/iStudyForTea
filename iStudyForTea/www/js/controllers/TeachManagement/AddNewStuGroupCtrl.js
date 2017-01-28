/**
 * Created by hcnucai on 2016/11/11.
 */
app.controller("AddNewStuGroupCtrl", function ($scope, $ionicHistory, httpService) {
  $scope.submit = function () {
    //返回上一个界面
    var stuGroupName = angular.element(document.querySelector('#stuGroupName')).val();
    if (stuGroupName == "") {
      swal("提醒", "请输入学生库名称", "warning");
    } else {
      var ls = window.localStorage;
      var param = {
        authtoken: ls.getItem("authtoken"),
        name: stuGroupName,
      }
      var promise = httpService.post("apiteach/newstudentgroup", param);
      promise.then(function (data) {
        swal({
            title: "恭喜您",
            text: "创建成功",
            type: "success",
            height: 100,
            width: 100,
          },
          function () {
            $ionicHistory.goBack();
            return true;
          });
      }, function (data) {
        swal("提醒", data, "创建失败");
      })
    }
   }
});
