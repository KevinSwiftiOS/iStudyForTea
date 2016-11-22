/**
 * Created by hcnucai on 2016/11/13.
 */
app.controller("AddNewStuToGroupCtrl",function ($scope,$stateParams,$ionicHistory) {
    console.log($stateParams.groupid);
    $scope.stu = {
        name:"ckq",
        no:2014211081,
        compus:"仓前校区",
        xy:"杭州国际服务工程学院",
        class:"软工142",
        tea:"张量",
        sex:"女",
        birth:new Date(1995,9,3),
        email:"17816869731@163.com",
        tel:"88811222",
        address:"杭州"
    }
    $scope.save = function () {
        $ionicHistory.goBack();
    }
    //性别的使用
    if($scope.stu.sex == "男") {
       $scope.woman = {
           show:false
       }
       $scope.man = {
           icon:{
               "margin-left":"50px",
           },
           show:true
       }
    }else{
        $scope.woman = {
            show:true
        }
        $scope.man = {
            icon:{
                "margin-left":"80px",
            },
            show:false
        }
    }
    //选择男女性别
    $scope.selectWoman = function() {
        $scope.woman = {
            show:true
        }
        $scope.man = {
            icon:{
                "margin-left":"80px",
            },
            show:false
        }
    }
    $scope.selectMan = function(){
        $scope.woman = {
            show:false
        }
        $scope.man = {
            icon:{
                "margin-left":"50px",
            },
            show:true
        }
    }
})