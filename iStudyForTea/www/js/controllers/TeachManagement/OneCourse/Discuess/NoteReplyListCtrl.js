/**
 * Created by hcnucai on 2016/11/19.
 */
app.controller("NoteReplyListCtrl",function ($scope,$stateParams,httpService,$ionicLoading,subDate,discussService,$state) {

    console.log($stateParams.id);
    //内容模块
  $ionicLoading.show({
    template: '请等待'
  });
  var ls = window.localStorage;
  var param = {
    authtoken:ls.getItem("authtoken"),
    count:100,
    page:1,
    tag:$stateParams.id
  };
  $scope.view = {
    title:"回复"
  };
var promise = httpService.post("http://dodo.hznu.edu.cn/api/forumcommentquery",param);
  promise.then(function (res) {
    var items = res;
    for(var i = 0; i < items.length;i++) {
      if(items[i].avatar_url == null)
        items[i].avatar_url = "img/head.png";
    }
    $scope.items = items;
    $ionicLoading.hide();
    discussService.replyItems = items;
    $scope.$broadcast('scroll.refreshComplete');
    $scope.view = {
      title: "回复(" + items.length + ")"
    };

  },function (err) {
    swal("请求失败",err,"error");
    var items = [];
    $scope.items = items;
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
    $scope.view = {
      title: "回复(" + items.length + ")"
    };
  })
 //刷新的动作
  $scope.doRefresh = function () {
    var promise = httpService.post("http://dodo.hznu.edu.cn/api/forumcommentquery",param);
    promise.then(function (res) {
      var items = res;
      for(var i = 0; i < items.length;i++) {
        if(items[i].avatar_url == null)
          items[i].avatar_url = "img/head.png";
        items[i].date = "于" + subDate.divedeToDay(items[i].date) + " 发表";
      }
      $scope.items = items;
      $ionicLoading.hide();
      discussService.replyItems = items;
      $scope.$broadcast('scroll.refreshComplete');
      $scope.view = {
        title: "回复(" + items.length + ")"
      };
    },function (err) {
      swal("请求失败",err,"error");
      var items = [];
      $scope.items = items;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      $scope.view = {
        title: "回复(" + items.length + ")"
      };
    })
  }
 //查看详情回复界面
  $scope.seeDetailRepyNote = function ($index) {
   $state.go("tab.TeachManagement-OneCourseNoteReplyDetail",{index:$index});
  }

});
