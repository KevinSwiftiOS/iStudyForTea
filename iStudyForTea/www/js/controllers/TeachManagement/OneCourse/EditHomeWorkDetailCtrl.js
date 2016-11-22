/**
 * Created by hcnucai on 2016/11/15.
 */
app.controller("EditHomeWorkDetailCtrl",function ($scope,$ionicPopup,$stateParams,$ionicHistory) {
    //作业的信息
   //输入框的信息
    //作业详情
    var date = new Date(2013,9,12);
    if($stateParams.id == null){
        $scope.data = {
            title: "",
            strategy: "",
            datestart: "",
            dateend: "",
            memo: "",
            score: "",
            copy: false,
            canGoOver: false,
            canSee: false
        }
        console.log(date);
    }else {
        $scope.data = {
            title: "2013B卷",
            strategy: "计算机原理作业第三章",
            datestart: new Date(2013,9,12),
            dateend: new Date(2013,9,12,12,12),
            memo: "本次作业很简单",
            score: "100分",
            copy: true,
            canGoOver: false,
            canSee: false
        }
    }
    //初始化值 保存临时变量
    $scope.info = $scope.data;
    $scope.editTitle = function () {

       var myPopup = $ionicPopup.show({
           template:"<input type = 'text' ng-model = 'info.title'>",
           title:"请输入作业名称",
           scope:$scope,
           buttons:[
               {text:"取消"},
               {text:'<b>保存</b>',
                type:"button-positive",
                 onTap:function (e) {
                   var title = $scope.info.title;
                  //要保证作业名字不能为空
                     if(title == "")
                         e.preventDefault();
                    else
                        $scope.data.title = title;
                 }
               }
           ]
       });
        myPopup.then(function() {

        });
    }
    //编辑作业说明
    $scope.editMemo = function () {

        var myPopup = $ionicPopup.show({
            template:"<textarea  style='height: 200px;width: 100%;' ng-model = 'info.memo'></textarea>",
            title:"请输入作业说明",
            scope:$scope,
            buttons:[
                {text:"取消"},
                {text:'<b>保存</b>',
                    type:"button-positive",
                    onTap:function (e) {
                       $scope.data.memo = $scope.info.memo;
                    }
                }
            ]

        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }
//日期选择器的使用
//     var currentDate = new Date();
//     var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 23);
//     $scope.date = date;
//     $scope.myFunction = function (date) {
//         alert(date);
//     };
//
//     $scope.onezoneDatepicker = {
//         date: date,
//         mondayFirst: false,
//         months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
//         daysOfTheWeek: ["日", "一", "二", "三", "四", "五", "六"],
//         startDate: new Date(1989, 1, 26),
//         endDate: new Date(2024, 1, 26),
//         disablePastDays: false,
//         disableSwipe: false,
//         disableWeekend: false,
//         disableDates: [new Date(date.getFullYear(), date.getMonth(), 15), new Date(date.getFullYear(), date.getMonth(), 16), new Date(date.getFullYear(), date.getMonth(), 17)],
//         showDatepicker: false,
//         showTodayButton: true,
//         calendarMode: false,
//         hideCancelButton: false,
//         hideSetButton: true,
//         callback: $scope.myFunction
//     };
//
//     $scope.showDatepicker = function () {
//
//     };
     $scope.save = function () {

         console.log($scope.data);
      $ionicHistory.goBack();
    }
})