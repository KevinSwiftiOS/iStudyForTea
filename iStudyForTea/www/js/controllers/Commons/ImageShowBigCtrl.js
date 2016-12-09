/**
 * Created by hcnucai on 2016/12/9.
 */
app.controller("ImageShowBigCtrl",function ($scope,$stateParams) {
    var index = $stateParams.index;
     var imgs = $stateParams.imgs;
     $scope.img =imgs[index];
  $scope.current = (index + 1) + "/" + imgs.length;
  $scope.leftImg = function () {
    if(index < imgs.length - 1 )
      index += 1;
      $scope.img =imgs[index];
    $scope.current = (index + 1) + "/" + imgs.length;
  }
  $scope.rightImg = function () {
    if(index > 0)
      index -= 1;
      $scope.img =imgs[index];
    $scope.current = (index + 1) + "/" + imgs.length;
  }

})
