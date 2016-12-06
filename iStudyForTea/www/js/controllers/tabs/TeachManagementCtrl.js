/**
 * Created by hcnucai on 2016/10/22.
 */
app.controller('teachManagementCtrl', function(img,$scope,$ionicPopover,$timeout,$state,$ionicLoading,httpService,$stateParams) {
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

//popView的一些事件代理
    $scope.popItems = [{rowName: '新建学生库'}, {rowName: '新建课程'}];
    $scope.goToDifferent = function ($index) {
        $scope.popOver.hide();
        switch ($index){
            case 0:
                $state.go("tab.TeachManagement-AddNewStuGroup");
                break;
            case 1:
               //和课程属性一样 只不过传过去的参数为0即可
                $state.go("tab.TeachManagement-OneCourseProperty",{id:0,index:0});
                break;
            default:break;
        }
    }
//初始化选项
 var selectStuList = false,courseItems = [],stuGroupItems = [];

  //顶部的样式
  $scope.courseTab = "tab-item active";
  $scope.stuTab = "tab-item";

var param = {
  authtoken:window.localStorage.getItem("authtoken"),
  count:100,
  page:1
}
//第一次加载
  //监听服务
  $ionicLoading.show({
    template: '请等待'
  });
  var ls = window.localStorage;
  var loginparam = {
      username:ls.getItem("username"),
      password:ls.getItem("password"),
      devicetoken:"",
      number:"",
      os:"",
      clienttype:2
    }
    var promise =   httpService.infoPost("http://dodo.hznu.edu.cn/api/login",loginparam);
    promise.then(function (data) {
      ls.setItem("authtoken",data.authtoken);
      var info = data["info"];
      if(info.avtarurl == null) {
        //头像的设置
        info.avtarurl = "img/head.png";
        img.avtarurl = "img/head.png";
      }else{
        img.avtarurl = info.avtarurl;
      }
      ls.setItem("info",angular.toJson(info));
      ls.setItem("username",ls.getItem("username"));
      ls.setItem("password",ls.getItem("password"));
      var promise1 = httpService.post("http://dodo.hznu.edu.cn/apiteach/courselist", param);
      promise1.then(function (data1) {
        courseItems = data1;
        $scope.items = courseItems;
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
      }, function (err) {
        courseItems = [];
        $scope.items = courseItems;
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        swal("请求失败", err, "error");
      })
    },function (data) {
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      swal("请求失败",data,"error");
    })

//刷新按钮
  $scope.doRefresh = function () {

     if(selectStuList == false) {
       var promise = httpService.post("http://dodo.hznu.edu.cn/apiteach/courselist", param);
       promise.then(function (data) {
         courseItems = data;
         $scope.items = courseItems;
         $ionicLoading.hide();
         $scope.$broadcast('scroll.refreshComplete');
       }, function (data) {
         courseItems = [];
         $scope.items = courseItems;
         $ionicLoading.hide();
         $scope.$broadcast('scroll.refreshComplete');
         swal("请求失败", data, "error");
       })
     }
    else{
       var promise = httpService.post("http://dodo.hznu.edu.cn/apiteach/studentgrouplist", param);
       promise.then(function (data) {
         stuGroupItems = data;
         $scope.items = stuGroupItems;
         $ionicLoading.hide();
         $scope.$broadcast('scroll.refreshComplete');
       }, function (data) {
         stuGroupItems = [];
         $scope.items = stuGroupItems;
         $ionicLoading.hide();
         $scope.$broadcast('scroll.refreshComplete');
         swal("请求失败", data, "error");
       })
     }
  }
  //选择学生列表
    $scope.selectStu = function () {
 if(stuGroupItems.length == "") {
   //第一次加载
   $ionicLoading.show({
     template: '请等待'
   });
   var promise = httpService.post("http://dodo.hznu.edu.cn/apiteach/studentgrouplist", param);
   promise.then(function (data) {
     stuGroupItems = data;
     $scope.items = stuGroupItems;
     $ionicLoading.hide();
     $scope.$broadcast('scroll.refreshComplete');
   }, function (data) {
     stuGroupItems = [];
     $scope.items = stuGroupItems;
     $ionicLoading.hide();
     $scope.$broadcast('scroll.refreshComplete');
     swal("请求失败", data, "error");
   })
 }
 $scope.items = stuGroupItems;
        selectStuList = true;
        //顶部的样式
        $scope.stuTab = "tab-item active";
        $scope.courseTab = "tab-item";
    }
  //选择课程列表
    $scope.selectCourse = function () {
        selectStuList = false;
     $scope.items = courseItems;
        //顶部的样式
      $scope.stuTab = "tab-item";
      $scope.courseTab = "tab-item active";
    }
    //跳转到学生库列表还是课程列表
    $scope.goToStuListOrCourse = function ($index) {
      if(selectStuList === true){
            //还要传参数将id 也要传进去
            $state.go("tab.TeachManagement-StudentList",{groupid:(stuGroupItems[$index].id)});
        }
        else{
            //还要穿有几个界面
            $state.go("tab.TeachManagement-OneCourseStudyPlan",{courseid:(courseItems[$index].id),index:0});
        }}
});
