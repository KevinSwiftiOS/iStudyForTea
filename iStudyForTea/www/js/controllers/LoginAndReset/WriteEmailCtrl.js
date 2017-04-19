/**
 * Created by hcnucai on 2016/10/23.
 */
//注入ctrl
app.controller('LoginWriteEmailCtrl', function ($scope, $state, httpService) {

    $scope.writeEmail = function () {
        //正则表达式匹配
        var emailReq = new RegExp("^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$");
        var email = angular.element(document.querySelector('#email')).val();
        //正则表达式匹配看是否写正确
        if (emailReq.exec(email)) {
            var param = {
                email: email
            }
            var promise = httpService.post("api/sendvalidcode", param);
            promise.then(function (res) {
                $state.go('SendIdentity', {email: email});
            }, function (err) {
                swal("发送失败", err, "error");
            })

        } else {
            swal("提醒", "邮箱格式填写错误", "warning");
        }
    }

});
