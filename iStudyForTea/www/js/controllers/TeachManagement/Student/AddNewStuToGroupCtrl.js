/**
 * Created by hcnucai on 2016/11/13.
 */
app.controller("AddNewStuToGroupCtrl",function ($scope,$stateParams,$ionicHistory,httpService) {
    console.log($stateParams.groupid);
    $scope.info = {
        name:"",
        id:"",
    }
    $scope.save = function () {
        var info = $scope.info;
        if(info.name == "")
            swal("提醒","请填写学生的姓名","warning");
      else  if(info.id == "")
            swal("提醒","请填写学生的学号","warning");
        else {
            var param = {
                authtoken:window.localStorage.getItem("authtoken"),
                id:info.id,
                name:info.name
            };
            var promise = httpService.infoPost("apiteach/newstud",param);
            promise.then(function (data) {
                console.log(data);
                swal("恭喜您","新建成功","success");
            },function (err) {
                swal("提醒","新建失败","error");
            })
        }
    }
})