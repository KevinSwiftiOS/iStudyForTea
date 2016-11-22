/**
 * Created by hcnucai on 2016/11/14.
 */
app.controller("StuInOneCourseListCtrl",function ($scope,$state,$stateParams,$ionicModal,$ionicPopover,$ionicHistory) {
    //监听事件 加载菜单栏
    $ionicModal.fromTemplateUrl("Menu.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.$on("$ionicView.beforeLeave",function () {
        $scope.modal.hide();
    })

    $scope.id = $stateParams.id;
    console.log("CourseProperty",$scope.id);

    //显示菜单的事件
    $scope.openModal = function () {
        $scope.modal.show();

    }
    $scope.modalHide = function () {
        $scope.modal.hide();
    }
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    //定义属性
    //搜索框的初始化 避免后面点取消按钮时一直找不到值
    $scope.user = {};
    //模板框数据的定义
    $scope.popItems = [
        {"rowName":"新建学生",
        },

    ]
    $scope.popOver = $ionicPopover.fromTemplateUrl("StuListPopOver.html",{
        scope:$scope
    });
    //fromTemplateUrl的方法
    $ionicPopover.fromTemplateUrl("StuListInOneCoursePopOver.html", {
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

    });

    //重置密码的操作
    $scope.resetPassword = function ($index) {
        //重置密码的操作
    }
    //编辑的操作
    $scope.edit = function (id) {
        //到学生信息界面
       // $state.go("tab.TeachManagement-StudentInf",{id:id});

    }
    //删除的操作
    $scope.remove = function ($index) {
    }
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
})