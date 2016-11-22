/**
 * Created by hcnucai on 2016/10/28.
 */
app.controller("ContactPersonCtrl",function ($scope,$ionicListDelegate) {
    var names = [{
        label: "计算机141",
        list: [{name: "曹凯强",
        image:"http://dodo.hznu.edu.cn/Upload/editor/776de979-dead-4a60-83ca-a6aa00be839a.jpg",
        icon:"ion-ios-circle-outline",
            id:1,
        }],
        isShow: true,
        icon:"ion-ios-circle-outline",
    },
        {
            label: "计算机142",
            list: [{name: "曹凯强",
                image:"http://dodo.hznu.edu.cn/Upload/editor/776de979-dead-4a60-83ca-a6aa00be839a.jpg",
                icon:"ion-ios-circle-outline",
                id:2,
            },
                {name: "啊啊水水水水",
                    image:"http://dodo.hznu.edu.cn/Upload/editor/776de979-dead-4a60-83ca-a6aa00be839a.jpg",
                    icon:"ion-ios-circle-outline",
                    id:3,
                },
            ],
            isShow: true,
            icon:"ion-ios-circle-outline",
        },

    ];
    $scope.names = names;
    //隐藏属性
    $scope.hide = function ($index) {

        if (names[$index].isShow == true) {

           names[$index].isShow = false;
        } else {
            names[$index].isShow = true;

        }
        $scope.names = names;
    };
    //选了一个人的
    $scope.selectPerson = function (id,label) {

          //数组遍历 寻找
        var i;
        for( i = 0 ; i < names.length;i++)
            if (names[i].label === label)
                break;
        var lists = names[i].list;
        for(var j = 0; j < lists.length;j++) {
            if(lists[j].id == id) {
                if (lists[j].icon == "ion-ios-circle-outline") {
                    lists[j].icon = "ion-checkmark";
                }
                else {
                    lists[j].icon = "ion-ios-circle-outline";
                }
            break;
            }
        }
        $scope.names = names;
};
//选了整组的
    $scope.selectGroup = function (label) {
        for(var  i = 0; i < names.length;i++){
            if(label === names[i].label){
                if(names[i].icon == "ion-ios-circle-outline"){
                    names[i].icon = "ion-checkmark";
                }else{
                    names[i].icon = "ion-ios-circle-outline";
                }
                break;
            }
        }

    }
});