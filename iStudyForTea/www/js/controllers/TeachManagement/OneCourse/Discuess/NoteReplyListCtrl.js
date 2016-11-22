/**
 * Created by hcnucai on 2016/11/19.
 */
app.controller("NoteReplyListCtrl",function ($scope,$stateParams) {

    console.log($stateParams.id);
    //内容模块
    $scope.replyItems = [{
        avatar: "img/adam.jpg",
        title: "回复信息",
        date: "张三于2016年12月12日发表",
        content: "<p>回复内容为html格式</p>"
    }]


    $scope.title = "回复(" + $scope.replyItems.length + ")";
});
