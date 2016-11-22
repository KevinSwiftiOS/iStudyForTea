/**
 * Created by hcnucai on 2016/10/28.
 */
//学生列表名单的
app.controller("StudentListCtrl",function ($scope,$rootScope,$stateParams,$state,$ionicPopover) {
    //定义属性
    //搜索框的初始化 避免后面点取消按钮时一直找不到值
   $scope.user = {};
   //模板框数据的定义
    $scope.popItems = [
        {"rowName":"新建学生",
        },
        {"rowName":"添加现有学生",
        },
    ]
    $scope.popOver = $ionicPopover.fromTemplateUrl("StuListPopOver.html",{
        scope:$scope
    });
    //fromTemplateUrl的方法
    $ionicPopover.fromTemplateUrl("StuListPopOver.html", {
        scope: $scope
    }).then(function (popover) {
        $scope.popOver = popover;
    });

//打开的动作
    $scope.openPopover = function ($event) {
        $scope.popOver.show($event);
    }
    //清除浮动框
    $scope.$on("$destroy",function () {
        $scope.popOver.remove();
    })
   //popItem的一些动作 跳转到不同的界面
    $scope.goToDifferent = function ($index) {
        //首先隐藏popOver
         $scope.popOver.hide();
        switch ($index){
            case 0:
                //学生库的id要传过去
           $state.go("tab.TeachManagement-AddNewStuToGroup",({groupid:1}));
            case 1:
            default:break;
        }
    }
    $scope.items = [{
        userno:"2014211081",
        username:"曹凯强",
        sex:"男",
        email:"17816869731@163.com",
        number:"17816869731",
        image:"http://dodo.hznu.edu.cn/Upload/editor/776de979-dead-4a60-83ca-a6aa00be839a.jpg"
    },
        {
            userno:"2015001001",
            username:"李四",
            sex:"女",
            email:"17816869731@163.com",
            number:"17816869731",
            image:"http://dodo.hznu.edu.cn/Upload/editor/776de979-dead-4a60-83ca-a6aa00be839a.jpg"
        },
        {
            userno:"2016001001",
            username:"王五",
            sex:"男",
            email:"17816869731@163.com",
            number:"17816869731",
            image:"http://dodo.hznu.edu.cn/Upload/editor/776de979-dead-4a60-83ca-a6aa00be839a.jpg"
        }]
    //搜索框的取消按钮的实现
    $scope.removeSearch = function(){

       $scope.user.search = "";

    }
    $scope.$on("$ionicView.beforeEnter",function () {
        //打印参数是否获取到
        console.log($stateParams.id);

        $rootScope.hideTabs = true;
    });

    //重置密码的操作
    $scope.resetPassword = function ($index) {
      //重置密码的操作
    }
    //编辑的操作
    $scope.edit = function (id) {
        //到学生信息界面
        $state.go("tab.TeachManagement-StudentInf",{id:id});

    }
    //删除的操作
    $scope.remove = function ($index) {
    }
})