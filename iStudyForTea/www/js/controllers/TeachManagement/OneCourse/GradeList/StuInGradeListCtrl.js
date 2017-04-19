/**
 * Created by hcnucai on 2016/11/15.
 */
app.controller("StuInGradeListCtrl", function ($scope, $ionicModal, $state, $stateParams, $ionicHistory, httpService) {

    //监听事件 加载菜单栏
    $ionicModal.fromTemplateUrl("Menu.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.$on("$ionicView.beforeLeave", function () {
        $scope.modal.hide();
    })

    $scope.courseid = $stateParams.courseid;

    //显示菜单的事件
    $scope.openModal = function () {
        $scope.modal.show();

    }
    $scope.modalHide = function () {
        $scope.modal.hide();
    }
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    //搜索框的事件
    $scope.user = {};
    $scope.removeSearch = function () {
        $scope.user.search = "";
    }
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
    var homeWorkParam = {
        authtoken: window.localStorage.getItem("authtoken"),
        courseid: $stateParams.courseid,
        count: 100,
        page: 1
    }
    var promise = httpService.post("apiteach/homeworkqueryteach", homeWorkParam);
    promise.then(function (data) {
        $scope.homeWortkItems = data;
        var experWorkParam = {
            authtoken: window.localStorage.getItem("authtoken"),
            courseid: $stateParams.courseid,
            count: 100,
            page: 1
        };
        var experPromise = httpService.post("apiteach/homeworkqueryteach", experWorkParam);
        experPromise.then(function (experData) {
            $scope.experWortkItems = experData;
            console.log(experData);
        }, function (expererr) {
            swal("请求失败", expererr, "error");
        })
    }, function (err) {
        swal("请求失败", err, "error");

    });
    $scope.goToDetailGradeList = function (id) {
        $state.go("tab.TeachManagement-OneCourseDetailGradeList", {id: id});
    };
    //搜索框的事件
    $scope.user = {};
    $scope.removeSearch = function () {
        $scope.user.search = "";
    };
//刷新按钮
    $scope.doRefresh = function () {
        var homeWorkParam = {
            authtoken: window.localStorage.getItem("authtoken"),
            courseid: $stateParams.courseid,
            count: 100,
            page: 1
        }
        var promise = httpService.post("apiteach/homeworkqueryteach", homeWorkParam);
        promise.then(function (data) {
            $scope.homeWortkItems = data;
            var experWorkParam = {
                authtoken: window.localStorage.getItem("authtoken"),
                courseid: $stateParams.courseid,
                count: 100,
                page: 1
            };
            var experPromise = httpService.post("apiteach/homeworkqueryteach", experWorkParam);
            experPromise.then(function (experData) {
                $scope.experWortkItems = experData;
                $scope.$broadcast('scroll.refreshComplete');

            }, function (expererr) {
                swal("请求失败", expererr, "error");
                $scope.$broadcast('scroll.refreshComplete');
            })
        }, function (err) {
            swal("请求失败", err, "error");

        });
    }
})
