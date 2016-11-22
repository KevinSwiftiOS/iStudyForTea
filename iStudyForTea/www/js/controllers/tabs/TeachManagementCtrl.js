/**
 * Created by hcnucai on 2016/10/22.
 */
app.controller('teachManagementCtrl', function($scope,Chats,$ionicPopover,$timeout,$state,$rootScope) {
  //选择了学生库列表还是课程列表
    var selectStuList = false;
    //先模拟数据
    $scope.items = [
        {name:"计算机142",
        id:1},
        {name:"VB程序设计",
            id:2}
    ]
$scope.popOver = $ionicPopover.fromTemplateUrl("my-popover.html",{
    scope:$scope
});
  //fromTemplateUrl的方法
    $ionicPopover.fromTemplateUrl("my-popover.html", {
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

//popView的一些事件代理x
    $scope.popItems = [{rowName: '新建学生库'}, {rowName: '新建课程'}];
    $scope.goToDifferent = function ($index) {
        $scope.popOver.hide();
        switch ($index){
            case 0:
                $state.go("tab.TeachManagement-AddNewStuGroup");
                break;
            case 1:
                $state.go("tab.TeachManagement-AddNewCourse");
                break;
            default:break;
        }
    }
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
    //顶部的样式
    $scope.courseTab = "tab-item active";
    $scope.stuTab = "tab-item";
    //增加新课程
    $scope.add = function () {

    }
//选择学生列表
    $scope.selectStu = function () {
        selectStuList = true;
        //顶部的样式
        $scope.stuTab = "tab-item active";
        $scope.courseTab = "tab-item";
    }
    //选择课程列表
    $scope.selectCourse = function () {
        selectStuList = false;
        //顶部的样式
        $scope.stuTab = "tab-item";
        $scope.courseTab = "tab-item active";
    }
    //跳转到学生库列表还是课程列表
    $scope.goToStuListOrCourse = function ($index) {

        if(selectStuList === true){
            //还要传参数将id 也要传进去
            $state.go("tab.TeachManagement-StudentList",{id:($scope.items[$index].id)});
        }
        else{
            //还要穿有几个界面
            $state.go("tab.TeachManagement-OneCourseStudyPlan",{id:($scope.items[$index].id),index:0});
        }

    }
});