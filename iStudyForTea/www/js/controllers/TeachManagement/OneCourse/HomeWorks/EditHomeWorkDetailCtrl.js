/**
 * Created by hcnucai on 2016/11/15.
 */
app.controller("EditHomeWorkDetailCtrl", function ($ionicModal, $scope, $ionicPopup, $stateParams, $ionicHistory, $ionicLoading, httpService, subDateToDate, subDateToDateToMin, subDateToMin) {
    //抽题策略列表
    var listPopup;
    var suburl = null;
    var type = $stateParams.type;
//根据作业种类来请求不同的url
    $scope.hasHuping = false;
    $scope.hasScore = true;
    $scope.temp = {
      title:"",
      score:"",
      memo:"",
    }
    if ($stateParams.type == 3) {
        $scope.hasHuping = true;
    }
    //有无分数
    if ($stateParams.type == 2) {
        $scope.hasScore = false;
    }
    if ($stateParams.operate == "edit") {
        switch (type) {
            case 3:
                suburl = "apiteach/homeworkinfo";
                break;
            case 4:
                suburl = "apiteach/exprementinfo";
                break;
            case 2:
                suburl = "apiteach/exerciseinfo";
                break;
        }
        $ionicLoading.show({
            template: '请等待'
        });

        var param = {
            authtoken: window.localStorage.getItem("authtoken"),
            id: $stateParams.id
        }
        var promise = httpService.infoPost(suburl, param);
        promise.then(function (data) {
            //进行日期的分割
            var info = data.info;
            if ($stateParams.type == 3) {
                info.datestart = subDateToDate.divedeToDay(info.datestart);
                info.dateend = subDateToDate.divedeToDay(info.dateend);
                info.enableMutualJudgeEndTime = subDateToDate.divedeToDay(info.enableMutualJudgeEndTime);
            } else {
                info.datestart = subDateToDateToMin.divedeToDay(info.datestart);
                info.dateend = subDateToDateToMin.divedeToDay(info.dateend);
            }
            $scope.info = info;

            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        }, function (err) {
            items = [];
            $scope.items = items;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
            swal("请求失败", err, "error");
        })
    } else {
        //进行初始化
        $scope.info = {
            title: "",
            memo: "",
            datestart: new Date(),
            dateend: new Date(),
            score: 0,
            enableClientJudge: false,
            keyVisible: false,
            viewOneWithAnswerKey: false,
            forbiddenMouseReightMenu: false,
            forbiddenCopy: false,
            drawplotid: 0,
            drawplotname: "",
            bancopy: false,
            banright: false,
            ishupin: false
        }
        if ($stateParams.type == 3) {
            $scope.info.enableMutualJudgeEndTime = new Date();
            $scope.info.enableMutualJudge = false;
        }
      console.log($scope.temp);
    }
    //获取抽题策略
    $scope.editdrawplot = function () {
        var param = {
            authtoken: window.localStorage.getItem("authtoken")
        }
        var promise = httpService.post("apiteach/getDrawplot", param);
        promise.then(function (data) {
            $scope.drawplotItems = data;
            listPopup = $ionicPopup.show({
                templateUrl: 'Drawpolet.html',
                title: '抽题策略列表',
                scope: $scope,
                buttons: [
                    {text: '取消'},
                ]
            });
        }, function (err) {
            $scope.drawplotItems = [];
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
            swal("请求失败", err, "error");
        })
    }
    $scope.selectDrawplot = function ($index) {
        $scope.info.drawplotname = $scope.drawplotItems[$index].name;
        $scope.info.drawplotid = $scope.drawplotItems[$index].id;
        listPopup.close();
    }
    //输入框中暂时的分数 名称和描述
    $scope.editTitle = function () {
      $scope.temp.title = $scope.info.title;
      $scope.temp.score = $scope.info.score;
      $scope.temp.memo = $scope.info.memo;
      console.log($scope.temp);
        var myPopup = $ionicPopup.show({
            template: "<input type = 'text' ng-model = 'temp.title'>",
            title: "请输入作业名称",
            scope: $scope,
            buttons: [
                {text: "取消"},
                {
                    text: '<b>保存</b>',
                    type: "button-positive",
                    onTap: function (e) {
                        var title = $scope.temp.title;
                        //要保证作业名字不能为空
                        if (title == "") {
                            swal("提醒", "请填写作业名称", "warning");
                            e.preventDefault();
                        }
                        else
                            $scope.info.title = $scope.temp.title;
                    }
                }
            ]
        });
        myPopup.then(function () {

        });
    }
    //编辑分数
    $scope.editScore = function () {
      $scope.temp.title = $scope.info.title;
      $scope.temp.score = $scope.info.score;
      $scope.temp.memo = $scope.info.memo;
        var myPopup = $ionicPopup.show({
            template: "<input type = 'text' ng-model = 'temp.score'>",
            title: "请输入分数",
            scope: $scope,
            buttons: [
                {text: "取消"},
                {
                    text: '<b>保存</b>',
                    type: "button-positive",
                    onTap: function (e) {
                        var score = $scope.temp.score;
                        //要保证作业名字不能为空
                        if (score == "") {
                            swal("提醒", "请填写作业分数", "warning");
                            e.preventDefault();
                        }
                        else
                            $scope.info.score = $scope.temp.score;
                    }
                }
            ]
        });
        myPopup.then(function () {

        });
    }
    //编辑作业说明
    $scope.editMemo = function () {
      $scope.temp.title = $scope.info.title;
      $scope.temp.score = $scope.info.score;
      $scope.temp.memo = $scope.info.memo;
        var myPopup = $ionicPopup.show({
            template: "<textarea  style='height: 200px;width: 100%;' ng-model = 'temp.memo'></textarea>",
            title: "请输入作业说明",
            scope: $scope,
            buttons: [
                {text: "取消"},
                {
                    text: '<b>保存</b>',
                    type: "button-positive",
                    onTap: function (e) {
                        $scope.info.memo = $scope.temp.memo;
                    }
                }
            ]

        });
        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
    }
    $scope.save = function () {
      console.log($scope.temp);
        //保存修改后的数据
        var info = $scope.info;
        var starttime = info.datestart;
        var endtime = info.dateend;
        var starttimeStr, endTimeStr, hupingTime, hupingTimeStr;
        starttimeStr = combineString(starttime.getFullYear()) + "" + combineString(starttime.getMonth() + 1) + "" + combineString(starttime.getDate()) + "" + combineString(starttime.getHours()) + "" + combineString(starttime.getMinutes()) + "" + combineString(starttime.getSeconds()) + "";
        endTimeStr = combineString(endtime.getFullYear()) + "" + combineString(endtime.getMonth() + 1) + "" + combineString(endtime.getDate()) + "" + combineString(starttime.getHours()) + "" + combineString(endtime.getMinutes()) + "" + combineString(endtime.getSeconds()) + "";
        if ($stateParams.type == 3) {
            hupingtime = ($scope.info.enableMutualJudgeEndTime);
            hupingTimeStr = combineString(hupingtime.getFullYear()) + "" + combineString(hupingtime.getMonth() + 1) + "" + combineString(hupingtime.getDate()) + "" + combineString(starttime.getHours()) + "" + combineString(hupingtime.getMinutes()) + "" + combineString(hupingtime.getSeconds()) + "";
        } else
            hupingTimeStr = "00000000000000";
        if (starttime.valueOf() > endtime.valueOf()) {
            swal("提醒", "截止时间不能小于开始时间", "warning");
        }
        else if (info.title == "")
            swal("提醒", "请填写作业名称", "warning");
        else if (info.drawplotid == "")
            swal("提醒", "请选择抽题策略", "warning");


        else if ($stateParams.operate == "edit") {

            var type = $stateParams.type;
            var suburl, param;
            switch (type) {
                case 3:
                    //开始时间和截止时间的获取
                    param = {
                        authtoken: window.localStorage.getItem("authtoken"),
                        id: $stateParams.id,
                        name: $scope.info.title,
                        drawplotid: $scope.info.drawplotid,
                        memo: $scope.info.memo,
                        starttime: starttimeStr,
                        endtime: endTimeStr,
                        ishupin: $scope.info.enableMutualJudge,
                        hupinend: hupingTimeStr,
                        score: $scope.info.score,
                        bancopy: $scope.info.forbiddenCopy,
                        banright: $scope.info.forbiddenMouseRightMenu,
                        enableClientJudge: $scope.info.enableClientJudge,
                        keyVisible: $scope.info.keyVisible,
                        viewOneWithAnswerKey: $scope.info.viewOneWithAnswerKey,
                    }
                    suburl = "apiteach/updatehomework";
                    break;
                case 4:
                    param = {
                      authtoken: window.localStorage.getItem("authtoken"),
                      id: $stateParams.id,
                      name: $scope.info.title,
                      drawplotid: $scope.info.drawplotid,
                      memo: $scope.info.memo,
                      starttime: starttimeStr,
                      endtime: endTimeStr,
                      score: $scope.info.score,
                      bancopy: $scope.info.forbiddenCopy,
                      banright: $scope.info.forbiddenMouseRightMenu,
                      enableClient: $scope.info.enableClientJudge,
                      keyVisible: $scope.info.keyVisible,
                      viewWithOneAnswerKey: $scope.info.viewOneWithAnswerKey,
                    }
                    suburl = "apiteach/updateexprement";
                    break;
                case 2:
                    param = {
                        authtoken: window.localStorage.getItem("authtoken"),
                        id: $stateParams.id,
                        name: $scope.info.title,
                        drawplotid: $scope.info.drawplotid,
                        memo: $scope.info.memo,
                        starttime: starttimeStr,
                        endtime: endTimeStr,
                        bancopy: $scope.info.forbiddenCopy,
                        banright: $scope.info.forbiddenMouseRightMenu,
                        enableClientJudge: $scope.info.enableClientJudge,
                        keyVisible: $scope.info.keyVisible,
                      viewOneWithAnswerKey: $scope.info.viewOneWithAnswerKey,
                    }
                    suburl = "apiteach/updateExer";
                    break;
              default:break;
            };
               console.log(param);
            var promise = httpService.post(suburl, param);
            promise.then(function (data) {
                swal({
                        title: "恭喜您",
                        text: "更新成功",
                        type: "success",
                        height: 10000,
                        width: 100,
                    },
                    function () {
                        $ionicHistory.goBack();
                        return true;
                    });
            }, function (data) {
                swal("更新失败", data, "error");
            })
        } else if ($stateParams.operate == "add") {
            //组织参数
            var param = {
                authtoken: window.localStorage.getItem("authtoken"),
                mode: $stateParams.type,
                courseId: $stateParams.courseid,
                name: info.title,
                drawplotId: info.drawplotid,
                startDate: starttimeStr,
                endDate: endTimeStr,
                memo: info.memo,
                ishupin: info.ishupin,
                hupinendDate: hupingTimeStr,
                setScore: info.score,
                bancopy: info.bancopy,
                banright: info.banright,
                enableClient: info.enableClientJudge,
                keyVisible: info.keyVisible,
            };
            var promise = httpService.post("apiteach/createTest", param);
            promise.then(function () {
                swal({
                        title: "恭喜您",
                        text: "更新成功",
                        type: "success",
                        height: 10000,
                        width: 100,
                    },
                    function () {
                        $ionicHistory.goBack();
                        return true;
                    });
            }, function (err) {
                swal("创建失败", err, "error");
            })
        }
    }
    //结合日期的字符串
    function combineString(old) {
        if (old < 10)
            return "0" + old;
        else
            return old + "";
    }
})
