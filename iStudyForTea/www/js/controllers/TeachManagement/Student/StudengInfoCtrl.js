/**
 * Created by hcnucai on 2016/10/28.
 */
app.controller("StudentInfCtrl",function ($scope,$state,$ionicHistory,$ionicActionSheet,$stateParams) {
    $scope.avatar = "http://dodo.hznu.edu.cn/Upload/editor/776de979-dead-4a60-83ca-a6aa00be839a.jpg";
    $scope.stu = {
        username:"2015001001",

        name:"曹凯强",
        compus:"仓前校区",
        xy:"软工142",
        sex:"男",
        birth:new Date(1995,9,3),
        email:"154985049804@qq.com",
        tel:"2015001001",
        address:"2015001001",
        postcode:315502,
    };
    //点击事件 保存按钮 回退到上一界面
    $scope.save = function () {
        $ionicHistory.goBack();
    }

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
});