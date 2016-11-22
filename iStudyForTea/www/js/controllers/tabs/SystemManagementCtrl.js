/**
 * Created by hcnucai on 2016/10/22.
 */
app.controller('systemManagementCtrl', function($scope,Chats,httpPost,$rootScope,$ionicLoading,$state) {
    //监听进入页面的时候 tabbar显示 进行网络请求


    $scope.$on("$ionicView.beforeEnter",function () {
       $rootScope.hideTabs = false;
        $ionicLoading.show({
            template:"请稍后",
        });
        $scope.chats = Chats.all();
        $ionicLoading.hide();



    })



    $scope.remove = function(chat) {
        Chats.remove(chat);


    };
    //增加系统公告的函数
    $scope.addAnnoucement = function () {
        $state.go('tab.SystemManagement-AddAnnoucement');
    }
    //增加账号管理的函数
    $scope.ManageAccount = function () {
        $state.go('tab.SystemManagement-ManageAccount')
    }
});