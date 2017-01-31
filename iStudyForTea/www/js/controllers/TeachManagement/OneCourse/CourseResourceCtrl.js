/**
 * Created by hcnucai on 2016/10/29.
 */
//课程资源模块
app.controller("CourseResourceCtrl", function ($scope, $stateParams, $ionicModal, $ionicHistory) {
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
  console.log("CourseResource", $scope.courseid);

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
