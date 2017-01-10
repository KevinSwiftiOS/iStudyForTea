/**
 * Created by hcnucai on 2016/10/29.
 */
//讨论区的主界面
app.controller("MainDiscussCtrl",function ($cordovaProgress,$scope,$stateParams,$ionicModal,$ionicHistory,$ionicPopover,httpService,$ionicLoading,discussService,subDate,$state) {
    //监听事件 加载菜单栏
    $ionicModal.fromTemplateUrl("Menu.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
  $scope.$on("$ionicView.beforeLeave",function () {
        $scope.modal.hide();
    })
   //显示菜单的事件
    $scope.openModal = function () {
        $scope.modal.show();

    }
    $scope.modalHide = function () {
        $scope.modal.hide();
    }
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
  $scope.courseid = $stateParams.courseid;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
    //fromTemplateUrl的方法
    $ionicPopover.fromTemplateUrl("NoteType.html", {
        scope: $scope
    }).then(function (popover) {
        $scope.popOver = popover;
    });
    $scope.openPopover = function ($event) {
        $scope.popOver.show($event);
    }
    //清除浮动框
    $scope.$on("$destroy",function () {
        $scope.popOver.remove();
    })

//popView的一些事件代理x
    $scope.popItems = [{rowName: '我回复的主题'}, {rowName: '我发布的主题'},{rowName: '全部主题'}];
    $scope.goToDifferent = function ($index) {
        $scope.popOver.hide();
        switch ($index){
            case 0:
             //进行跟新
              url = "api/forumreplythread";
              param = {
                authtoken:ls.getItem("authtoken"),
                courseId:$stateParams.courseid,
                count:100,
                page:1,
                type:2
              }
              selTotal = false;
              selReply = true;
              selPublish = false;
                break;
            case 1:
              url = "api/forumreplythread";
              param = {
                authtoken:ls.getItem("authtoken"),
                courseId:$stateParams.courseid,
                count:100,
                page:1,
                type:1
              }
              selTotal = false;
              selReply = false;
              selPublish = true;
                break;
            case 2:
              url = "api/forumquery";
              param = {
                authtoken:ls.getItem("authtoken"),
                count:100,
                page:1,
                projectid:$stateParams.courseid,
                mode:2
              }
              selTotal = true;
              selReply = false;
              selPublish = false;
                break;
            default:break;

        }
      $cordovaProgress.showSimpleWithLabel(true, "正在刷新中");
     headRefresh();
    }
  var ls = window.localStorage;
  var param = {
    authtoken:ls.getItem("authtoken"),
    count:100,
    page:1,
    projectid:$stateParams.courseid,
    mode:2
  }
  $ionicLoading.show({
    template: '请等待'
  });
  var url = "api/forumquery";
  //刚开始进入的时候选择全部的
  var selTotal = true,selReply = false,selPublish = false;
  //刚开始进入页面的时候
  //刚开始进入界面的时候
  var promise = httpService.post(url,param);
  promise.then(function (res) {
    var items = res, topItems = [], unTopItems = [];
    for (var i = 0; i < items.length; i++) {
      //时间的分割
      items[i].AutherAndDate = items[i].author + "于 " + subDate.divedeToDay(items[i].date) + "发表";
      if (items[i].top == 1)
        topItems.push(items[i]);
      else
        unTopItems.push(items[i]);
    }
    $scope.items = items;
    $scope.topItems = topItems;
    $scope.unTopItems = unTopItems;
    discussService.setTotalItems(items,topItems,unTopItems);
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');

  },function (err) {
    swal("请求失败",err,"error");
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
  })



  $scope.courseName = discussService.courseNames;
  //开始刷新
  function headRefresh() {

    var needPost = true;
    if(selTotal == true){
      var dic = discussService.getTotalItems();
      if(dic.items.length != 0) {
        needPost = false;
        $scope.items = dic.items;
        $scope.topItems = dic.topItems;
        $scope.unTopItems = dic.unTopItems;
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
      $cordovaProgress.hide();
      }
    }
    if(selReply == true){
      var dic = discussService.getReplyItems();
      if(dic.items.length != 0) {
        needPost = false;
        $scope.items = dic.items;
        $scope.topItems = dic.topItems;
        $scope.unTopItems = dic.unTopItems;
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
        $cordovaProgress.hide();
      }
    }
    if(selPublish == true){
      var dic = discussService.getPublishItems();
      if(dic.items.length != 0) {
        needPost = false;
        $scope.items = dic.items;
        $scope.topItems = dic.topItems;
        $scope.unTopItems = dic.unTopItems;
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();

       $cordovaProgress.hide();
      }
    }
    if(needPost) {
      var promise = httpService.post(url, param);
      promise.then(function (res) {
        var items = res, topItems = [], unTopItems = [];
        for (var i = 0; i < items.length; i++) {
          //时间的分割
          items[i].AutherAndDate = items[i].author + "于 " + subDate.divedeToDay(items[i].date) + "发表";
          if (items[i].top == 1)
            topItems.push(items[i]);
          else
            unTopItems.push(items[i]);
        }
        $scope.items = items;
        $scope.topItems = topItems;
        $scope.unTopItems = unTopItems;
        if (selTotal == true)
          discussService.setTotalItems(items, topItems, unTopItems);
        if (selReply == true)
          discussService.setReplyItems(items, topItems, unTopItems);
        if (selPublish == true)
          discussService.setPublishItems(items, topItems, unTopItems);
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
       $cordovaProgress.hide();

      }, function (err) {
        var items = [], topItems = [], unTopItems = [];
        swal("请求失败", err, "error");
        $scope.items = items;
        $scope.topItems = topItems;
        $scope.unTopItems = unTopItems;
        if (selTotal == true)
          discussService.setTotalItems(items, topItems, unTopItems);
        if (selReply == true)
          discussService.setReplyItems(items, topItems, unTopItems);
        if (selPublish == true)
          discussService.setPublishItems(items, topItems, unTopItems);
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
        $cordovaProgress.hide();
      })
    }
  }
  //头部刷新
  $scope.doRefresh = function () {
    var promise = httpService.post(url, param);
    promise.then(function (res) {
     $cordovaProgress.hide();
      var items = res, topItems = [], unTopItems = [];
      for (var i = 0; i < items.length; i++) {
        //时间的分割
        items[i].AutherAndDate = items[i].author + "于 " + subDate.divedeToDay(items[i].date) + "发表";
        if (items[i].top == 1)
          topItems.push(items[i]);
        else
          unTopItems.push(items[i]);
      }
      $scope.items = items;
      $scope.topItems = topItems;
      $scope.unTopItems = unTopItems;
      if (selTotal == true)
        discussService.setTotalItems(items, topItems, unTopItems);
      if (selReply == true)
        discussService.setReplyItems(items, topItems, unTopItems);
      if (selPublish == true)
        discussService.setPublishItems(items, topItems, unTopItems);
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');

    }, function (err) {
      $cordovaProgress.hide();
      var items = [], topItems = [], unTopItems = [];
      swal("请求失败", err, "error");
      $scope.items = items;
      $scope.topItems = topItems;
      $scope.unTopItems = unTopItems;
      if (selTotal == true)
        discussService.setTotalItems(items, topItems, unTopItems);
      if (selReply == true)
        discussService.setReplyItems(items, topItems, unTopItems);
      if (selPublish == true)
        discussService.setPublishItems(items, topItems, unTopItems);
      $scope.$broadcast('scroll.refreshComplete');
      $ionicLoading.hide();
    })
  }
  //底部的按钮
$scope.footerRefresh = function () {
  $cordovaProgress.showSimpleWithLabel(true, "正在刷新中");
  $scope.doRefresh();
}
//查看置顶消息详情
  $scope.seeTopDetail = function ($index) {
  //查看是看全部的主题还是置顶和非置顶的
    $state.go("tab.TeachManagement-OneCourseDetailNote",{selTotal:selTotal,selReply:selReply,selPublish:selPublish,index:$index,isTop:true});
  }
  //查看非置顶消息详情
  $scope.seeUnTopDetail = function ($index) {
    $state.go("tab.TeachManagement-OneCourseDetailNote",{selTotal:selTotal,selReply:selReply,selPublish:selPublish,index:$index,isTop:false});
  }
  //发起帖子
  $scope.writeTopic = function () {
    $state.go("tab.TeachManagement-OneCourseNoteWriteTopic",{courseid:$stateParams.courseid});
  }
})
