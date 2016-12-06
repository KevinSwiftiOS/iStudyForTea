/**
 * Created by hcnucai on 2016/10/28.
 */
app.controller("ContactPersonCtrl",function ($scope,$ionicListDelegate,httpService,contactPersons,$ionicHistory) {
var ls = window.localStorage;
var param = {
  authtoken:ls.getItem("authtoken")
},persons = [],list = [];
var promise = httpService.post("http://dodo.hznu.edu.cn/api/messagecontact",param);
  promise.then(function (res) {
    persons = res;
    //进行遍历
    for(var i = 0; i < persons.length;i++){
      persons[i].isShow = false;
      persons[i].icon = "ion-ios-circle-outline";
      list = persons[i].ContacterList;
      for(var j = 0; j < list.length;j++) {
        list[j].icon = "ion-ios-circle-outline";
        if(list[j].Face == null)
          list[j].Face = "img/head.png";
      }
      persons[i].ContacterList = list;

    }
    contactPersons.setAllPersons(persons);
    $scope.items = contactPersons.getAllPersons();
  })
    //隐藏属性
    $scope.hide = function ($index) {
     var persons = contactPersons.getAllPersons();
        if (persons[$index].isShow == true) {

          persons[$index].isShow = false;
        } else {
          persons[$index].isShow = true;
        }
        contactPersons.setAllPersons(persons);
        $scope.items = contactPersons.getAllPersons();
    };
    //选了一个人的
    $scope.selectPerson = function (id,label) {
      //数组遍历 寻找
      var persons = contactPersons.getAllPersons();
        var i;
        for( i = 0 ; i < persons.length;i++)
            if (persons[i].Label === label)
                break;
        var lists = persons[i].ContacterList;
        for(var j = 0; j < lists.length;j++) {
            if(lists[j].Id == id) {
                if (lists[j].icon == "ion-ios-circle-outline") {
                    lists[j].icon = "ion-checkmark";
                    contactPersons.addPerson(id);
                }
                else {
                    lists[j].icon = "ion-ios-circle-outline";
                  contactPersons.removePerson(id);
                }
            break;
            }
            persons[i].ContacterList = lists;
        }
        contactPersons.setAllPersons(persons);
        $scope.items = contactPersons.getAllPersons();
};
//选了整组的
    $scope.selectGroup = function (label) {
      var persons = contactPersons.getAllPersons();
        for(var  i = 0; i < persons.length;i++){
            if(label === persons[i].Label){
                var lists = [];
                if(persons[i].icon == "ion-ios-circle-outline"){
                  persons[i].icon = "ion-checkmark";
                  //这组中的每一位进行添加
                   lists = persons[i].ContacterList;
                  for(j = 0; j < lists.length;j++){
                    lists[j].icon = "ion-checkmark";
                    contactPersons.addPerson(list[j].Id);
                  }
                }else{
                  persons[i].icon = "ion-ios-circle-outline";
                   lists = persons[i].ContacterList;
                  for(j = 0; j < lists.length;j++){
                    lists[j].icon = "ion-ios-circle-outline";
                    contactPersons.removePerson(list[j].Id);
                  }
                }
                persons[i].ContacterList = lists;

                break;
            }
        }
       contactPersons.setAllPersons(persons);
      $scope.items = contactPersons.getAllPersons();
    }
    //结束选择联系人
  $scope.finish = function () {
    $ionicHistory.goBack();
  }
});
