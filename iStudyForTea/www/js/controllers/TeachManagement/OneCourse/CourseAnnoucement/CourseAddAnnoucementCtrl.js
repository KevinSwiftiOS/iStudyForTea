/**
 * Created by hcnucai on 2016/11/15.
 */
app.controller("CourseAddAnnoucementCtrl",function ($scope,$ionicPopover,$ionicHistory) {
    $scope.$on("$ionicView.beforeEnter",function () {

        $scope.btnWidth = document.body.clientWidth / 3;

    });
    //footerStyle的样式指定
    $scope.btnFooterStyle = {
        "width":"document.body.clientWidth / 3",
        "height":"50",
        "background-color" : "coral",
        "align":"center"
    };
    //选择相册
    $scope.selectImage = function () {
        alert("选择相册");
    }
    $scope.moreShow = function () {
        alert("更多");
    }
    //底部的动作 最右边是打开一个脚本
    $scope.popOver = $ionicPopover.fromTemplateUrl("AddAnnoucement.html",{
        scope:$scope
    });
    //fromTemplateUrl的方法
    $ionicPopover.fromTemplateUrl("AddAnnoucement.html", {
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
    $scope.popItems = [{rowName: '置顶'}, {rowName: '取消'}];
    $scope.goToDifferent = function ($index) {
        $scope.popOver.hide();
        switch ($index){
            case 0:
                //提醒成功置顶
                swal({   title: "恭喜您",
                        text: "置顶成功",
                        type: "success",
                        height:1000,
                        width:100,
                    },
                    function(){



                    });
                break;
            case 1:
                //确认取消
                swal({   title: "提醒",
                        text: "你确认退出编辑吗?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        closeOnConfirm: true,
                        closeOnCancel: true },
                    function(isConfirm){

                        if (isConfirm) {
                            console.log(22);
                            //进行缓存的清理和跳转
                            $ionicHistory.goBack();
                        }

                    });
                break;
            default:break;
        }
    }
})