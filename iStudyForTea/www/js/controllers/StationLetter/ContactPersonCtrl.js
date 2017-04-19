/**
 * Created by hcnucai on 2016/10/28.
 */
app.controller("ContactPersonCtrl", function ($scope, $ionicListDelegate, httpService, contactPersons, $ionicHistory) {
    var ls = window.localStorage;
    var param = {
        authtoken: ls.getItem("authtoken")
    }, persons = [], list = [];

    //监听页面进入的时候
    $scope.$on("$ionicView.beforeEnter", function () {
        persons = contactPersons.getAllPersons();
        if (persons.length == []) {
            var promise = httpService.post("api/messagecontact", param);
            promise.then(function (res) {
                persons = res;
                //进行遍历
                for (var i = 0; i < persons.length; i++) {
                    persons[i].isShow = false;
                    persons[i].icon = "ion-ios-circle-outline";
                    list = persons[i].ContacterList;
                    for (var j = 0; j < list.length; j++) {
                        list[j].icon = "ion-ios-circle-outline";
                        if (list[j].Face == null)
                            list[j].Face = "img/head.png";
                    }
                    persons[i].ContacterList = list;
                    $scope.$broadcast('scroll.refreshComplete');
                }
                contactPersons.setAllPersons(persons);
                $scope.items = contactPersons.getAllPersons();
            }, function (err) {
                swal("请求失败", err, "error");
                $scope.items = [];
                $scope.$broadcast('scroll.refreshComplete');

            })
        } else {
            //说明有联系人 随后已经选择的联系人要把他置为打钩符号
            $scope.items = contactPersons.getAllPersons();
        }
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
    $scope.selectPerson = function (id, label) {
        alert(id, label);
        //数组遍历 寻找
        var persons = contactPersons.getAllPersons();
        var i;
        for (i = 0; i < persons.length; i++)
            if (persons[i].Label === label)
                break;
        var lists = persons[i].ContacterList;
        for (var j = 0; j < lists.length; j++) {
            if (lists[j].Id == id) {
                if (lists[j].icon == "ion-ios-circle-outline") {
                    lists[j].icon = "ion-checkmark";
                    contactPersons.addPerson(lists[j].Id, lists[j].Name);
                }
                else {
                    lists[j].icon = "ion-ios-circle-outline";
                    contactPersons.removePerson(lists[j].Id, lists[j].Name);
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
        for (var i = 0; i < persons.length; i++) {
            if (label === persons[i].Label) {
                var lists = [];
                if (persons[i].icon == "ion-ios-circle-outline") {
                    persons[i].icon = "ion-checkmark";
                    //这组中的每一位进行添加
                    lists = persons[i].ContacterList;
                    for (j = 0; j < lists.length; j++) {
                        lists[j].icon = "ion-checkmark";
                        //加入的时候要看有没有去重
                        contactPersons.addPerson(lists[j].Id, lists[j].Name);
                    }
                } else {
                    persons[i].icon = "ion-ios-circle-outline";
                    lists = persons[i].ContacterList;
                    for (j = 0; j < lists.length; j++) {
                        lists[j].icon = "ion-ios-circle-outline";
                        contactPersons.removePerson(lists[j].Id, lists[j].Name);
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
    //刷新的动作
    $scope.doRefresh = function () {
        var promise = httpService.post("api/messagecontact", param);
        promise.then(function (res) {
            persons = res;
            //进行遍历
            for (var i = 0; i < persons.length; i++) {
                persons[i].isShow = false;
                persons[i].icon = "ion-ios-circle-outline";
                list = persons[i].ContacterList;
                for (var j = 0; j < list.length; j++) {
                    list[j].icon = "ion-ios-circle-outline";
                    if (list[j].Face == null)
                        list[j].Face = "img/head.png";
                }
                persons[i].ContacterList = list;

            }
            $scope.$broadcast('scroll.refreshComplete');
            contactPersons.setAllPersons(persons);
            $scope.items = contactPersons.getAllPersons();
        }, function (err) {
            swal("请求失败", err, "error");
            $scope.items = [];

        })
    }
});
