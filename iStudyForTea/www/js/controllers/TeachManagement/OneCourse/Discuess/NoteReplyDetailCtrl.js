/**
 * Created by hcnucai on 2016/12/9.
 */
app.controller("NoteReplyDetailCtrl",function ($scope,discussService,$stateParams,showBigImg,$ionicScrollDelegate) {
  var index = $stateParams.index;
  $scope.content = discussService.replyItems[index].content;
  //放大和缩小
  //图片放大的动作
  var zoomed = true;
  $scope.zoomFunction = function(){
    if(zoomed){// toggle zoom in
      var tap = {x:0, y:0};
      var position = showBigImg.getTouchposition(event);
      $ionicScrollDelegate.$getByHandle('content').zoomBy(3, true, position.x, position.y);
      zoomed = !zoomed;

    }else{ // toggle zoom out
      $ionicScrollDelegate.$getByHandle('content').zoomTo(1, true);
      zoomed = !zoomed;
    }
  }
})
