/**
 * Created by hcnucai on 2016/10/27.
 */
app.controller("WriteEmailCtrl",function ($scope,$stateParams,$rootScope,$state,$ionicPopup,contactPersons) {
//测试
  var code = $stateParams.code;
  var subject = $stateParams.subject;
  var senderid = $stateParams.senderid;
  var sendername = $stateParams.sendername;
//添加联系人的
  $scope.detail = {};
  if(code != null){
    $scope.detail.subject = subject;
  }
    $scope.addContactPerson = function () {
        $state.go('tab.StationLetter-ContactPerson');
    }
    //点击查看联系人
    $scope.showContactPerson = function () {
      var sel = [];
      sel = contactPersons.getSelPersons();
      var persons = contactPersons.getAllPersons();
      var resSel = [];
      if(senderid != null && sel.indexOf(senderid) == -1)
        sel.push(senderid);
      var selNames = [];
      for(var out = 0; out < sel.length;out++) {
        var id = sel[out];
        var flag = false;
        for (var i = 0; i < persons.length; i++) {
          var list = persons[i].ContacterList;
          for (var j = 0; j < list.length; j++) {
            if (list[j].Id == id) {
              selNames.push(list[j].Name);
              flag = true;
              break;
            }
          }
          if (flag)
            break;
        }
      }
      console.log(selNames);
   var alertPopup = $ionicPopup.alert({
       title:"您选择的联系人有",
       template:"kevin,swift,cao",
   });
        alertPopup.then(function (res) {

        })
    }
    //是否添加了联系人



})
