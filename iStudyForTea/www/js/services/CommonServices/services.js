var appModel = angular.module('starter.services', []);

appModel.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
      }
      }
      return null;
    }
  };
});
//定义服务器地址
appModel.constant("hostip","http://dodo.hznu.edu.cn/");
//定义公有的http服务
appModel.factory("httpService",
function($http, $q,hostip) {
  return {
    post: function (suburl,params) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        params: params,
        url: hostip + suburl,
    }).success(function (data) {
       if(data.retcode == 0) {
         defer.resolve(data.items);
       }
        else
         defer.reject(data.message);
      }).error(function (data) {
        defer.reject(data);
      });
      return defer.promise;
    },
    infoPost: function (suburl,params) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        params: params,
        url: hostip + suburl,
      }).success(function (data) {
        if(data.retcode == 0) {
          defer.resolve(data);
        }
        else
          defer.reject(data.message);
      }).error(function (data) {
        defer.reject(data);
      });
      return defer.promise;
    },

  };

});
appModel.factory("uploadFile",function ($q) {
  return {
    upload: //上传文件
      function upload(fileURL,param) {
        var defer = $q.defer();
        //上传成功
        var success = function (r) {
          var res = angular.fromJson(r["response"]);
          if(res.retcode == 0) {
            var info = res.info;
            if(info["succ"] == true)
            defer.resolve(res.info);
            else
              defer.reject(res.message);
          }
          else{
           defer.reject(res.message);
          }
        }

        //上传失败
        var fail = function (error) {
          defer.reject(error);
        }

        var options = new FileUploadOptions();
        options.fileKey = "file1";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        //options.mimeType = "text/plain";

        //上传参数
        options.params = param;

        var ft = new FileTransfer();
        //上传地址
        var SERVER = "http://dodo.hznu.edu.cn/api/upfile"
        ft.upload(fileURL, encodeURI(SERVER), success, fail, options);
        return defer.promise;
      }
  }
});
//头像的路径
appModel.factory("img",function () {
  return {
    avtarurl: null
  }
});
//时间日期的分割
appModel.factory("subDate",function () {
  return {

    divedeToDay:function (date) {

      var year = date.substr(0,4);
      var month = date.substr(4,2);
      var day = date.substr(6,2);
      //还有精确到秒
      return year + "-" + month + "-" + day;
    }
  }
});
//时间日期的分割 分割精确到分
appModel.factory("subDateToMin",function () {
  return {

    divedeToDay:function (date) {

      var year = date.substr(0,4);
      var month = date.substr(4,2);
      var day = date.substr(6,2);
      var hour = date.substr(8,2);
      var min = date.substr(10,2);
      //还有精确到秒
      return year + "-" + month + "-" + day + " " + hour + ":" + min;
    }
  }
});
//时间返回date形式的
appModel.factory("subDateToDate",function () {
  return {

    divedeToDay:function (date) {

      var year = date.substr(0,4);
      var month = date.substr(4,2);
      var day = date.substr(6,2);
      var hour = date.substr(8,2);
      var min = date.substr(10,2);
      //还有精确到秒
      return new Date(year,month - 1,day,hour,min);
    }
  }
});
appModel.factory("subDateToDateToMin",function () {
  return {

    divedeToDay:function (date) {

      var year = date.substr(0,4);
      var month = date.substr(4,2);
      var day = date.substr(6,2);
      var hour = date.substr(8,2);
      var min = date.substr(10,2);
      //还有精确到秒
      return new Date(year,month - 1,day,hour,min);
    }
  }
});
appModel.factory("showBigImg",function () {
  function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
  }

 return {
   getTouchposition: function (event) {
     var canvasPosition = getPosition(event.gesture.touches[0].target);

     var tap = {x: 0, y: 0};
     if (event.gesture.touches.length > 0) {
       tt = event.gesture.touches[0];
       tap.x = tt.clientX || tt.pageX || tt.screenX || 0;
       tap.y = tt.clientY || tt.pageY || tt.screenY || 0;
     }
     tap.x = tap.x - 0;
     tap.y = tap.y - 0;

     return {x: tap.x, y: tap.y};
   }
 }
});

