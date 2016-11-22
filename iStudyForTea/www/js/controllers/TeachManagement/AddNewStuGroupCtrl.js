/**
 * Created by hcnucai on 2016/11/11.
 */
app.controller("AddNewStuGroupCtrl",function ($scope,$ionicHistory) {
$scope.submit = function () {
    //返回上一个界面
    $ionicHistory.goBack();
}
})