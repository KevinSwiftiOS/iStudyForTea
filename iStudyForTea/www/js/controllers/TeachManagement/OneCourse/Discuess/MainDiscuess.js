/**
 * Created by hcnucai on 2016/10/29.
 */
//讨论区的主界面
app.controller("MainDiscussCtrl",function ($scope,$stateParams,$ionicModal,$ionicHistory,$ionicPopover) {
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

    $scope.courseid = $stateParams.courseid;
    console.log("Discuss",$scope.id);

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
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
    //置顶与非置顶的列表数据
    $scope.topItems = [{
        title:"计算机原理复习要点",
        time:"张量于2016年12月12日 发表",
        content:"'<p>详细</p>'"

    },
    ]
    $scope.unTopItems = [{
        title:"计算机原理复习要点",
        time:"张量于2016年12月12日 发表",
        content:"'<p>详细</p>'"
    },
        {
            title:"计算机原理复习要点",
            time:"张量于2016年12月12日 发表",
            content:"'<p>呵呵哈哈哈</p>'"
        }]
    //打开的动作
    $scope.popOver = $ionicPopover.fromTemplateUrl("NoteType.html",{
        scope:$scope
    });
    //fromTemplateUrl的方法
    $ionicPopover.fromTemplateUrl("NoteType.html", {
        scope: $scope
    }).then(function (popover) {
        $scope.popOver = popover;
    });
    $scope.openPopover = function ($event) {
        $scope.popOver.show($event);
    }
    //清除浮动框
    $scope.$on("$destroy",function () {
        $scope.popOver.remove();
    })

//popView的一些事件代理x
    $scope.popItems = [{rowName: '我回复的主题'}, {rowName: '我发布的主题'},{rowName: '全部主题'}];
    $scope.goToDifferent = function ($index) {
        $scope.popOver.hide();
        switch ($index){
            case 0:

                break;
            case 1:

                break;
            case 2:

                break;
            default:break;
        }
    }
})
