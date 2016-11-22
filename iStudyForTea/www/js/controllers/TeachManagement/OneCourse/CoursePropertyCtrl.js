/**
 * Created by hcnucai on 2016/10/29.
 */
app.controller("CoursePropertyCtrl",function ($scope,$rootScope,$state,$stateParams,$ionicModal,$ionicHistory,$ionicActionSheet,$ionicPopup,$cordovaCamera,$cordovaImagePicker) {
    //定义颜色popView
    var listPopup;
    //监听事件 加载菜单栏
    $ionicModal.fromTemplateUrl("Menu.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.$on("$ionicView.beforeLeave",function () {
        $scope.modal.hide();
        $scope.colorListModal.hide();
    })

    $scope.id = $stateParams.id;
    console.log("CourseProperty",$scope.id);

    //显示菜单的事件
    $scope.openModal = function () {
        $scope.modal.show();

    }
    $scope.modalHide = function () {
        $scope.modal.hide();
    }
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
        $scope.colorListModal.hide();
    });
    //颜色列表
    $ionicModal.fromTemplateUrl("colorList.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.colorListModal = modal;
    });

    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //回退的事件
    console.log("CourseProperty",index);
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
    //监听事件 加载菜单栏



    //课程名称
    var cou = {
        title:"VB程序设计",
        des:"这门课很简单",
        pictit:"课程封面",
        picbg:[233,222,222],
        pic:"img/adam.jpg",
        isDiv:true,
        isImg:false,
    }
    $scope.cou = cou;
    //初始化div的背景颜色
    $scope.divBack = {
        "background-color":"#e7dbcd",
        "width":"50%",
    "height":"100px",
    "display":"table",
    "*position":"relative",
    "line-height": "100px",
    "margin-left": "20%",
    "margin-top": "30px",
}
$scope.secDivBack = {
    "width":"50%",
    "height":"100px",
    "display":"table",
    "*position":"relative",
    "background-color":"#e7dbcd",
    "line-height":"100px",
    "margin-left": "20%",
    "margin-top": "-100px"
}
$scope.inputBack = {
    "width":"100px",
    "position": "absolute",
    "background-color": "#e7dbcd",
    "color":"white"
}
    //颜色列表资源
    $scope.listColoritems = [{
        "background-color":"#e7dbcd"
    },
        {
            "background-color":"#000000"
        },
        {
            "background-color":"#0c60ee"
        },
        {
            "background-color":"#4cd964"
        },
        {
            "background-color":"#5eaade"
        },
        {
            "background-color":"#6b46e5"
        }


        ]
    var encodeImageUri = function(imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function() {
            c.width = this.width;
            c.height = this.height;
            ctx.drawImage(img, 0, 0);

            if(typeof callback === 'function'){
                var dataURL = c.toDataURL("image/jpeg");
                callback(dataURL.slice(22, dataURL.length));
            }
        };
        img.src = imageUri;
    }
    function getFileContentAsBase64(path,callback){
        window.resolveLocalFileSystemURL(path, gotFile, fail);

        function fail(e) {
            alert('Cannot found requested file');
        }

        function gotFile(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    var content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    }

    //制作课程封面的背景颜色
    $scope.editpicbg = function () {
     //底部选择器
        $ionicActionSheet.show({
            buttons: [
                {text: '制作封面'},
                {text:'上传封面'},

            ],
            cancelText: '取消',
            buttonClicked: function (index) {
                //到修改密码的界面
            switch(index){
                case 0:
                    //颜色列表出现
                     listPopup = $ionicPopup.show({
                        templateUrl: 'colorList.html',
                        title: '颜色列表',
                        scope: $scope,

                        buttons: [
                            { text: '取消' },
                        ]
                    });
                    break;
                case 1:
                    document.addEventListener("deviceready", function () {
                        //调取相册
                        var options = {
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.JPEG,
                            targetWidth: 100,
                            targetHeight: 100,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false,
                            correctOrientation:true
                        };

                        $cordovaCamera.getPicture(options).then(function (imageData) {

                            var image = document.getElementById('myImage');
                            $scope.cou.pic = "data:image/jpeg;base64," + imageData;
                            console.log(imageData);
                            $scope.cou.isDiv = false;
                            $scope.cou.isImg = true;
                            //将base64字符串转化为二进制

                        }, function (err) {
                            //错误的信息

                        });
                    })
                    break;
                default:break;

            }
                return true;
            },

        });
        //点击了颜色列表
        $scope.selectColor = function ($index) {
           //选择颜色之后 把背景颜色改掉
            $scope.inputBack["background-color"] = ($scope.listColoritems[$index])["background-color"];
            $scope.secDivBack["background-color"] = ($scope.listColoritems[$index])["background-color"];
            $scope.divBack["background-color"] = ($scope.listColoritems[$index])["background-color"];
            cou.isImg = false;
            cou.isDiv = true;
            listPopup.close();
        }
    }
    $scope.finish = function () {
        console.log($scope.cou);
    }
})