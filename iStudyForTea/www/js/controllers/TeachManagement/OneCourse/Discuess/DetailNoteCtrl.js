/**
 * Created by hcnucai on 2016/11/18.
 */
app.controller("DetailNoteCtrl",function ($scope,$state,$stateParams,showBigImg,discussService,$ionicScrollDelegate) {
  //获取到是选择了全部主题 回复主题还是我发布的主题 随后看是否是置顶的
  var isTotal = $stateParams.selTotal;
  var isReply = $stateParams.selReply;
  var isPublish = $stateParams.selPublish;
  var index = $stateParams.index;
  var isTop = $stateParams.isTop;
  var items = [];
  var dic = {};
  if(isTotal)
    dic = discussService.getTotalItems();
  if(isReply)
  dic = discussService.getReplyItems();
if(isPublish)
dic = discussService.getPublishItems();
  if(isTop)
    items = dic.topItems;
  else
    items = dic.unTopItems;
  $scope.content = items[index].content;
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
    $scope.reply = function () {
        $state.go("tab.TeachManagement-OneCourseNoteReplyList",{id:items[index].id});
    }

})
