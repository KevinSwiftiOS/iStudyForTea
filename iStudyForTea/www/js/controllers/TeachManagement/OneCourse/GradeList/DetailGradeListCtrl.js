/**
 * Created by hcnucai on 2016/11/15.
 */
app.controller("DetailGradeListCtrl",function ($ionicLoading,$scope,$stateParams,httpService) {
    $ionicLoading.show({
        template: '请等待'
    });
    $scope.user = {

    };
    $scope.removeSearch = function () {
        $scope.user.search = "";
    };
var param = {
    authtoken:window.localStorage.getItem("authtoken"),
    testid:$stateParams.id
};
var promise = httpService.post("apiteach/homeworkscore",param);
promise.then(function (data) {
    $ionicLoading.hide();
    $scope.items = data;
 
},function (err) {
    $ionicLoading.hide();
    swal("请求失败",err,"error");
});
$scope.doRefresh = function () {
    var param = {
        authtoken:window.localStorage.getItem("authtoken"),
        testid:$stateParams.id
    };
    var promise = httpService.post("apiteach/homeworkscore",param);
    promise.then(function (data) {
        $ionicLoading.hide();
        $scope.items = data;
        $scope.$broadcast('scroll.refreshComplete');
    },function (err) {
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        swal("请求失败",err,"error");
    });
}
})