/**
 * Created by hcnucai on 2016/10/29.
 */
app.controller("CoursePropertyCtrl", function ($scope, httpService, $rootScope, $state, $stateParams, $ionicModal, $ionicHistory, $ionicActionSheet, $ionicPopup, $cordovaCamera, $cordovaImagePicker) {
    //定义颜色popView
    var listPopup;
    //监听事件 加载菜单栏
    $ionicModal.fromTemplateUrl("Menu.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.$on("$ionicView.beforeLeave", function () {
        $scope.modal.hide();
        $scope.colorListModal.hide();
    })

    $scope.courseid = $stateParams.courseid;
    $scope.divBack = {
        "background-color": "#000000",
        "width": "50%",
        "height": "100px",
        "display": "table",
        "*position": "relative",
        "line-height": "100px",
        "margin-left": "20%",
        "margin-top": "30px",
    }
    $scope.secDivBack = {
        "width": "50%",
        "height": "100px",
        "display": "table",
        "*position": "relative",
        "background-color": "#000000",
        "line-height": "100px",
        "margin-left": "20%",
        "margin-top": "-100px"
    }
    $scope.inputBack = {
        "width": "100px",
        "position": "absolute",
        "background-color": "#000000",
        "color": "white"
    }
    if ($scope.courseid != 0) {
        var param = {
            authtoken: window.localStorage.getItem("authtoken"),
            courseid: $scope.courseid
        }
        var promise = httpService.infoPost("apiteach/courseInfo", param);
        promise.then(function (data) {
            var info = data.info;
            if (info.logo1 == "") {
                info.isDiv = true;
                info.isImg = false;
                $scope.divBack = {
                    "background-color": info.logoBackGroudColor.colorHex(),
                    "width": "50%",
                    "height": "100px",
                    "display": "table",
                    "*position": "relative",
                    "line-height": "100px",
                    "margin-left": "20%",
                    "margin-top": "30px",
                }
                $scope.secDivBack = {
                    "width": "50%",
                    "height": "100px",
                    "display": "table",
                    "*position": "relative",
                    "background-color": info.logoBackGroudColor.colorHex(),
                    "line-height": "100px",
                    "margin-left": "20%",
                    "margin-top": "-100px"
                }
                $scope.inputBack = {
                    "width": "100px",
                    "position": "absolute",
                    "background-color": info.logoBackGroudColor.colorHex(),
                    "color": "white"
                }
            } else {
                info.isImg = true;
                info.isDiv = false;
            }
            $scope.info = info;
        }, function (err) {
            swal("请求失败", err, "error");
        })
    } else {
        $scope.info = {
            isImg: false,
            isDiv: true,
            logo1: "",
            logotext: "",
            logobackgroudcolor: "#FFFFFF",
            intro: "",
            name: ""
        }
    }
    //显示菜单的事件
    $scope.openModal = function () {
        $scope.modal.show();

    }
    $scope.modalHide = function () {
        $scope.modal.hide();
    }
    //当界面消失的时候
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
        $scope.colorListModal.hide();
    });
    //颜色列表
    $ionicModal.fromTemplateUrl("colorList.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.colorListModal = modal;
    });

    //当前是第几个界面 随后界面++
    var index = $stateParams.index;
    index++;
    $scope.index = index;
    //回退的事件
    $scope.goBack = function () {
        $ionicHistory.goBack(-1 * index);
    }
    //监听事件 加载菜单栏
    //课程名称
    //初始化div的背景颜色

    //颜色列表资源
    $scope.listColoritems = [{
        "background-color": "#e7dbcd"
    },
        {
            "background-color": "#000000"
        },
        {
            "background-color": "#0c60ee"
        },
        {
            "background-color": "#4cd964"
        },
        {
            "background-color": "#5eaade"
        },
        {
            "background-color": "#6b46e5"
        }


    ]
    var encodeImageUri = function (imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
            c.width = this.width;
            c.height = this.height;
            ctx.drawImage(img, 0, 0);
            if (typeof callback === 'function') {
                var dataURL = c.toDataURL("image/jpeg");
                callback(dataURL.slice(22, dataURL.length));
            }
        };
        img.src = imageUri;
    }

    function getFileContentAsBase64(path, callback) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);

        function fail(e) {
            alert('Cannot found requested file');
        }

        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
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
                {text: '上传封面'},

            ],
            cancelText: '取消',
            buttonClicked: function (index) {
                //到修改密码的界面
                switch (index) {
                    case 0:
                        //颜色列表出现
                        listPopup = $ionicPopup.show({
                            templateUrl: 'colorList.html',
                            title: '颜色列表',
                            scope: $scope,

                            buttons: [
                                {text: '取消'},
                            ]
                        });
                        break;
                    case 1:
                        document.addEventListener("deviceready", function () {
                            //调取相册
                            var options = {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URI,
                                sourceType: Camera.PictureSourceType.CAMERA,
                                allowEdit: true,
                                encodingType: Camera.EncodingType.JPEG,
                                targetWidth: 50,
                                targetHeight: 50,
                                popoverOptions: CameraPopoverOptions,
                                saveToPhotoAlbum: false,
                                correctOrientation: true
                            };

                            $cordovaCamera.getPicture(options).then(function (imageData) {


                                upload(imageData, function (name, res) {
                                    if (name == "success") {
                                        $scope.info.logo1 = res;
                                        $scope.info.isDiv = false;
                                        $scope.info.isImg = true;
                                        $scope.info.logoText = "";
                                        $scope.info.logoBackGroudColor = "";
                                        $scope.watch('info', function (newValue, oldValue) {
                                            if (newValue != oldValue) {
                                                $scope.info = newValue;
                                            }
                                        }, true);
                                    }
                                });
                                //将base64字符串转化为二进制

                            }, function (err) {
                                //错误的信息
                                swal("上传封面失败", err, "error");
                            });
                        })
                        break;
                    default:
                        break;

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
            $scope.info.logoBackGroudColor = (($scope.listColoritems[$index])["background-color"]).colorRgb();
            $scope.info.isImg = false;
            $scope.info.logo1 = "";
            $scope.info.isDiv = true;
            listPopup.close();
        }
    }
    $scope.submit = function () {
        var intro = "";
        var flag1 = false;
        var flag2 = false;
        var flag3 = false;
        if ($scope.info.intro != null && $scope.info.intro != "") {
            intro = $scope.info.intro.replace(/<.*?>/ig, "");
        }
        if ($scope.info.logo1 == null || $scope.info.logo1 == "")
            flag1 = true;
        if ($scope.info.logoText == null || $scope.info.logoText == "")
            flag2 = true;
        if ($scope.info.logoBackGroudColor == null || $scope.info.logoBackGroudColor == "")
            flag3 = true;
        if (flag1 && flag2 && flag3)
            swal("提醒", "请至少选择一种制作封面方式", "warning");
        else {
            //没有照片 但是封面背景和文字中有一个为空
            if (flag1 && ((flag2 && !flag3) || (!flag2 && flag3)))
                swal("提醒", "请填写封面背景和封面文字", "warning");
            else {
                //课程名称必填
                if ($scope.info.name == null || $scope.info.name == "")
                    swal("提醒", "请填写课程名称", "warning");
                else {
                    //更新还是新建课程 要分清楚
                    if ($stateParams.courseid != 0) {
                        var param = {
                            authtoken: window.localStorage.getItem("authtoken"),
                            courseid: $stateParams.courseid,
                            name: $scope.info.name,
                            intro: intro,
                            logo1: $scope.info.logo1,
                            logotext: $scope.info.logoText,
                            logobackgroudcolor: $scope.info.logoBackGroudColor
                        };
                        var promise = httpService.post("apiteach/updatecourseInfo", param);
                        promise.then(function () {
                            swal({
                                    title: "恭喜您",
                                    text: "更新成功",
                                    type: "success",
                                    height: 10000,
                                    width: 100,
                                },
                                function () {
                                    $ionicHistory.goBack(-1 * index);
                                    return true;
                                });
                        }, function (err) {
                            swal("更新失败", err, "error");
                        })
                    } else {
                        var param = {
                            authtoken: window.localStorage.getItem("authtoken"),
                            name: $scope.info.name,
                            intro: intro,
                            logo1: $scope.info.logo1,
                            logotext: $scope.info.logoText,
                            logoBackGroundColor: $scope.info.logoBackGroudColor
                        };
                        var promise = httpService.post("apiteach/createCourse", param);
                        promise.then(function () {
                            swal({
                                    title: "恭喜您",
                                    text: "新建成功",
                                    type: "success",
                                    height: 10000,
                                    width: 100,
                                },
                                function () {
                                    $ionicHistory.goBack(-1 * index);
                                    return true;
                                });
                        }, function (err) {
                            swal("新建失败", err, "error");
                        })
                    }
                }
            }
        }
    }
//十六进制颜色值域RGB格式颜色值之间的相互转换

//-------------------------------------
//十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    /*RGB颜色转换为16进制*/
    String.prototype.colorHex = function () {
        var that = this;
        if (/^(rgb|RGB)/.test(that)) {
            var aColor = that.replace(/(?:||rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = that;
            }
            return strHex;
        } else if (reg.test(that)) {
            var aNum = that.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return that;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return that;
        }
    };

//-------------------------------------------------

    /*16进制颜色转为RGB格式*/
    String.prototype.colorRgb = function () {
        var sColor = this.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return "RGB(" + sColorChange.join(",") + ")";
        } else {
            return sColor;
        }
    };
})
