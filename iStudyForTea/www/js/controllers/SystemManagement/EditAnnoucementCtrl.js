/**
 * Created by hcnucai on 2017/2/20.
 */
app.controller("EditAnnoucementCtrl", function ($scope, httpService, base64, $ionicHistory, showBigImg, $stateParams, $state) {

    var info = $stateParams.info;
    $scope.ann = {
        title: info.title,
        content: info.content,
        istop: $stateParams.istop
    };
//是否置顶这个参数还没有加上去
    var height = document.body.scrollHeight;
    $scope.textAreaStyle = {
        "width": "98%",
        "height": height * 0.5 + "px",
        "margin-left": "5px",
        "margin-right": "5px",
        "border-style": "solid",
        "border-width": "1px",
        "border-color": "darkgray",
    };
    $scope.pinStyle = {
        "font-size": "30px",
        "color": "gray"
    };
    //选择是否置顶
    var isTop = $stateParams.istop;
    $scope.selectTop = function () {
        if (isTop) {
            isTop = false;
            $scope.pinStyle = {
                "font-size": "30px",
                "color": "gray"
            }
        } else {
            isTop = true;
            $scope.pinStyle = {
                "font-size": "30px",
                "color": "blue"
            }
        }
    }
    //完成按钮
    $scope.finish = function () {
        var ann = $scope.ann;
        if (ann.title == "")
            swal("提醒", "公告标题必填", "warning");
        else if (ann.content == "")
            swal("提醒", "公告内容必填", "warning");
        else {
            var ls = window.localStorage;
            ann.content = (ann.content).replace(/<.*?>/ig, "");
            //进行http响应
            var param = {
                id: $stateParams.id,
                authtoken: ls.getItem("authtoken"),
                title: ann.title,
                content: ann.content,
                istop: isTop
            }
            var promise = httpService.infoPost("apiteach/editnotify", param);
            promise.then(function () {
                swal({
                        title: "恭喜您",
                        text: "更新成功",
                        type: "success",
                        height: 10000,
                        width: 100,
                    },
                    function () {
                        $ionicHistory.goBack(-2);
                        return true;
                    });
            }, function (err) {
                swal("编辑失败", err, "error");
            })
        }

    }
})
