/**
 * Created by hcnucai on 2016/10/27.
 */
app.controller("ManageAccountCtrl",function ($scope,$rootScope,$state) {
    //默认选中的教师
    var selectTea = true;
    //指定顶部的颜色
    var selectStyle = {
        width:85,
        color:"blue",
        "background-color":"white",
    }
    var unSelectStyle = {
        width:85,
        color:"white",
        "background-color":"blue",
    }
    $scope.$on("$ionicView.beforeEnter",function () {
        $scope.teaBtnStyle = selectStyle;
        $scope.stuBtnStyle = unSelectStyle;
    });
    //顶部按钮的切换
    $scope.selectTea = function () {
          selectTea = true;
          $scope.teaBtnStyle = selectStyle;
          $scope.stuBtnStyle = unSelectStyle;
    }
    $scope.selectStu = function () {
        selectTea = false;
        $scope.stuBtnStyle = selectStyle;
        $scope.teaBtnStyle = unSelectStyle;
    }
    //定义属性
    //搜索框的初始化 避免后面点取消按钮时一直找不到值
    $scope.user = {};
    //模板框数据的定义
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
    //添加新的账号
    $scope.addNewAccount = function () {
        $state.go("tab.SystemManagement-AddNewAccount");
    }
})