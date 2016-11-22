/**
 * Created by hcnucai on 2016/11/18.
 */
app.controller("DetailNoteCtrl",function ($scope,$state,$stateParams) {
     $scope.content = $stateParams.content;
 console.log($stateParams.content);
    $scope.reply = function () {
        $state.go("tab.TeachManagement-OneCourseNoteReplyList",({id:2}));
    }
})