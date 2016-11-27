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
//定义公有的http服务
appModel.factory("httpService",
function($http, $q) {
  return {
    post: function (url,params) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        params: params,
        url: url,
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
    }
  };

});
appModel.factory("swalService",function () {
  return {
  cusSwal:function (type,message) {

  }
}
})

