/**
 * Created by hcnucai on 2016/11/13.
 */
app.controller("AddNewStuToGroupCtrl",function ($scope,$stateParams,$ionicHistory,httpService) {
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
            var suburl = "";
            if($stateParams.type == 0) {
              param.courseid = $stateParams.courseid;
              suburl = "apiteach/newstudInCourse";
            }
            else {
              param.groupid = $stateParams.groupid;
               suburl = "apiteach/newstuInGroup";
            }
            var promise = httpService.infoPost(suburl,param);
            promise.then(function (data) {
              swal({
                  title: "恭喜您",
                  text: "添加成功",
                  type: "success",
                  height: 10000,
                  width: 100,
                },
                function () {
                  $ionicHistory.goBack();
                  return true;
                });
            },function (err) {
                swal("新建失败",err,"error");
            })
        }
    }
})
