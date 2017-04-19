/**
 * Created by hcnucai on 2016/10/22.
 */
app.controller('stationLetterCtrl', function ($scope, Chats, $state, $rootScope, $ionicPopover, httpService, subDate, $ionicLoading, lettersInAndOut) {
  $scope.popOver = $ionicPopover.fromTemplateUrl("station-popover.html", {
    scope: $scope
  });
  //fromTemplateUrl的方法
  $ionicPopover.fromTemplateUrl("station-popover.html", {
    scope: $scope
  }).then(function (popover) {
    $scope.popOver = popover;
  });

//打开的动作
  $scope.openPopover = function ($event) {
    $scope.popOver.show($event);
  }
  //清除浮动框
  $scope.$on("$destroy", function () {
    $scope.popOver.remove();
  })

  $scope.popItems = [
    {
      rowName: '收件箱',
      iconName: "icon ion-email"
    },
    {
      rowName: '发件箱',
      iconName: "icon ion-email"
    }];

  var ls = window.localStorage;
  var inParam = {
    authtoken: ls.getItem("authtoken"),
    unreadonly: 2,
    count: 100,
    page: 1
  }
  var outParam = {
    authtoken: ls.getItem("authtoken"),
    count: 100,
    page: 1
  }

  var inItems = [], outItems = [], selectInBox = true;
  $ionicLoading.show({
    template: '请等待'
  });
  var promise = httpService.post("api/messagereceivequery", inParam);
  promise.then(function (data) {
    inItems = data;
    for (var i = 0; i < inItems.length; i++) {
      inItems[i].date = subDate.divedeToDay(inItems[i].date);
      if (inItems[i].isread == true)
        inItems[i].img = "img/hasRead.png";
      else
        inItems[i].img = "img/unRead.png";
    }
    lettersInAndOut.setInItems(inItems);
    $scope.items = lettersInAndOut.getInItemsAll();
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
  }, function (err) {
    inItems = [];
    lettersInAndOut.setInItems(inItems);
    $scope.items = lettersInAndOut.getInItemsAll();
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
    swal("请求失败", err, "error");
  })


  $scope.doRefresh = function () {

    if (selectInBox == true) {
      var promise = httpService.post("api/messagereceivequery", inParam);
      promise.then(function (data) {
        inItems = data;
        for (var i = 0; i < inItems.length; i++) {
          inItems[i].date = subDate.divedeToDay(inItems[i].date);
          if (inItems[i].isread == true)
            inItems[i].img = "img/hasRead.png";
          else
            inItems[i].img = "img/unRead.png";
        }
        lettersInAndOut.setInItems(inItems);
        $scope.items = lettersInAndOut.getInItemsAll();
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
      }, function (err) {
        inItems = [];
        lettersInAndOut.setInItems(inItems);
        $scope.items = lettersInAndOut.getInItemsAll();
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        swal("请求失败", err, "error");
      })
    }
    else {
      var promise = httpService.post("api/messagesendquery", outParam);
      promise.then(function (data) {
        outItems = data;
        for (var i = 0; i < outItems.length; i++) {
          outItems[i].date = subDate.divedeToDay(outItems[i].date);

          outItems[i].img = "img/hasRead.png";

        }
        lettersInAndOut.setOutItems(outItems);
        $scope.items = lettersInAndOut.getOutItemsAll();
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
      }, function (err) {
        outItems = [];
        lettersInAndOut.setOutItems(outItems);
        $scope.items = lettersInAndOut.getOutItemsAll();
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        swal("请求失败", err, "error");
      })
    }
  }
  //定义名称
  $scope.title = "收件箱";
  //选择不同的信件
  $scope.selectStation = function ($index) {
    $scope.popOver.hide();
    if ($index == 0) {
      $scope.title = "收件箱";
      selectInBox = true;
      $scope.items = lettersInAndOut.getInItemsAll();
    } else {
      $scope.title = "发件箱";
      selectInBox = false;
      if ((lettersInAndOut.getOutItemsAll()).length == 0) {
        $ionicLoading.show({
          template: '请等待'
        });
        var promise = httpService.post("api/messagesendquery", outParam);
        promise.then(function (data) {
          outItems = data;
          for (var i = 0; i < outItems.length; i++) {
            outItems[i].date = subDate.divedeToDay(outItems[i].date);
            outItems[i].img = "img/hasRead.png";
          }
          lettersInAndOut.setOutItems(outItems);
          $scope.items = lettersInAndOut.getOutItemsAll();
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
        }, function (err) {
          outItems = [];
          lettersInAndOut.setOutItems(outItems)
          $scope.items = lettersInAndOut.getOutItemsAll();
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
          swal("请求失败", err, "error");
        })
      } else {
        $scope.items = lettersInAndOut.getOutItemsAll();
      }
    }
  }
  //写邮件的
  $scope.writeEmail = function () {
    $state.go('tab.StationLetter-WriteEmail');
  }
  //删除信件
  $scope.removeLetter = function ($index) {
    //删除收件箱
    var param = {
      authtoken: ls.getItem("authtoken"),
    }
    if (selectInBox == true) {
      param["msgid"] = lettersInAndOut.getInItems($index).id;
      var promise = httpService.post("api/messagedelete", param);
      promise.then(function (res) {
        lettersInAndOut.removeInItems($index);
        $scope.items = lettersInAndOut.getInItemsAll();
      }, function (err) {
        swal("信件删除失败", err, "error");
      })

    } else {
      param["msgid"] = lettersInAndOut.getOutItems($index).id;
      var promise = httpService.post("api/messagedelete", param);
      promise.then(function (res) {
        lettersInAndOut.removeOutItems($index);
        $scope.items = lettersInAndOut.getOutItemsAll();
      }, function (err) {
        swal("信件删除失败", err, "error");
      })

    }
  }
  //读邮件
  $scope.goToRead = function ($index) {
    if (selectInBox == true) {
      $state.go("tab.StationLetter-ReadEmail", {index: $index, fromIn: true});
    } else {
      $state.go("tab.StationLetter-ReadEmail", {index: $index, fromIn: false});
    }
  }
});
