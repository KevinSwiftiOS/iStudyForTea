/**
 * Created by hcnucai on 2016/10/29.
 */
//课程资源模块
app.controller("CourseResourceCtrl", function ($cordovaFileTransfer,$scope, $stateParams, $ionicModal, $ionicHistory, $ionicLoading,httpService,$ionicPlatform, $cordovaFile) {
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
    $scope.user = {

    };
    $scope.removeSearch = function () {
        $scope.user.search = "";
    };

    $scope.courseid = $stateParams.courseid;
    $ionicLoading.show({
        template: '请等待'
    });
    var ls = window.localStorage;
    var param = {
        authtoken: ls.getItem("authtoken"),
        courseid: $stateParams.courseid
    }
    var promise = httpService.post("api/courseresoure", param);
    promise.then(function (data) {
        $scope.items = data;
         console.log(data);
         $ionicLoading.hide();
    }, function (data) {
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        swal("请求失败", data, "error");
    });
    $scope.doRefresh = function () {
        var ls = window.localStorage;
        var param = {
            authtoken: ls.getItem("authtoken"),
            courseid: $stateParams.courseid
        }
        var promise = httpService.infoPost("api/courseresoure", loginparam);
        promise.then(function (data) {
            $scope.items = data;
            $scope.$broadcast('scroll.refreshComplete');
        }, function (data) {
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
            swal("请求失败", data, "error");
        })
    }
    //点击下载文件
    $scope.download = function ($index) {

            // var url = $scope.items[$index].url;
            // var filename = url.split("/").pop();
            // var targetPath = $cordovaFile.externalRootDirectory + filename;
            // var trustHosts = true
            // var options = {};
            // // alert(cordova.file.externalRootDirectory);
            // $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
            //     .then(function(result) {
            //         // Success!
            //         alert("下载成功");
            //
            //     }, function(error) {
            //         // Error
            //         alert("下载失败");
            //     }, function (progress) {
            //         $timeout(function () {
            //             $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            //         })
            //     });
     alert("不支持下载,请到电脑上操作");
    }
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
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
})
