/**
 * Created by hcnucai on 2016/10/25.
 */
app.controller('PersonalCtrl', function(img,$scope,$rootScope,$state,$ionicHistory,$ionicActionSheet,$cordovaCamera,httpService,uploadFile,base64){
  //初始化值
  $scope.tea = {};
  var ls = window.localStorage;

  //监听页面进入的时候 进行初始化值 避免没保存值的时候退出该界面后 值发生变化
    $scope.$on("$ionicView.beforeEnter",function () {
      var info = angular.fromJson(ls.getItem("info"));
      $scope.tea = {
        username: ls.getItem("username"),
        name: info["name"],
        gender: info["gender"],
        email: info["email"],
        phone: info["phone"],
        qq: info["qq"],
        addr: info["addr"],
        zipcode: info["zipcode"],
        avtarurl: info["avtarurl"],
      };
      //性别的使用
      if ($scope.tea.gender == "男") {
        $scope.woman = {
          show: false
        }
        $scope.man = {
          icon: {
            "margin-left": "50px",
          },
          show: true
        }
      } else {
        $scope.woman = {
          show: true
        }
        $scope.man = {
          icon: {
            "margin-left": "80px",
          },
          show: false
        }
      }
    });
    //选择男女性别
    $scope.selectWoman = function() {
      $scope.tea.gender = "女";
      console.log($scope.tea);
        $scope.woman = {
            show:true
        }
        $scope.man = {
            icon:{
                "margin-left":"80px",
            },
            show:false
        }
    }
    $scope.selectMan = function(){
      $scope.tea.gender = "男";
      console.log($scope.tea);
        $scope.woman = {
            show:false
        }
        $scope.man = {
            icon:{
                "margin-left":"50px",
            },
            show:true
        }
    }
  //进行保存的操作
  $scope.save = function () {
    //进行保存
    var  data = {
      name:  $scope.tea.name,
      gender: $scope.tea.gender,
      cls:"",
      phone: $scope.tea.phone,
      email: $scope.tea.email,
      avtarurl:$scope.tea.avtarurl,
      qq:$scope.tea.qq,
      addr:$scope.tea.addr,
      zipcode:$scope.tea.zipcode,
    };
    var param = {
      authtoken:ls.getItem("authtoken"),
      data:base64.encode(angular.toJson(data)),
    }
    var promise = httpService.login("http://dodo.hznu.edu.cn/api/saveprofile",param);
    promise.then(function (res) {
      swal("恭喜您","保存成功","success");
      ls.setItem("info",angular.toJson(data));
    },function (err) {
      console.log(err);
      swal("保存失败",err,"error");
    });
  }
  //更改头像的动作
    $scope.selectHead = function () {
        $ionicActionSheet.show({
            buttons: [
                {text: '相册'},
                {text: '相机'}
                ],
            cancelText: '取消',
            buttonClicked: function (index) {
                //根据不同的情况来进行选择
                switch(index){
                    case 0:
                        document.addEventListener("deviceready", function () {
                          //调取相册
                          var options = {
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URI,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.JPEG,
                            targetWidth: 100,
                            targetHeight: 100,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false,
                            correctOrientation: true
                          };
                          $cordovaCamera.getPicture(options).then(function (imageData) {
                            var param = {
                              authtoken: ls.getItem("authtoken"),
                              type: 1
                            }
                            //首先上传头像 随后保存个人信息
                          var promise =  uploadFile.upload(imageData,param);
                           promise.then(function (res) {
                             //保存个人信息
                             var  data = {
                               name:  $scope.tea.name,
                                     gender: $scope.tea.gender,
                                    cls:"",
                                    phone: $scope.tea.phone,
                                    email: $scope.tea.email,
                                    avtarurl:res["uploadedurl"],
                                    qq:$scope.tea.qq,
                                    addr:$scope.tea.addr,
                                    zipcode:$scope.tea.zipcode,
                             };
                        var params = {
                       authtoken:ls.getItem("authtoken"),
                       data:base64.encode(angular.toJson(data))
                     }
                     var pro = httpService.login("http://dodo.hznu.edu.cn/api/saveprofile",params);
                             pro.then(function (res1) {
                               ls.setItem("info",angular.toJson(data));
                               img.avtarurl = res["uploadedurl"];
                             });
                           },function (err) {
                            swal("头像上传失败",err,"error");
                           },function (err1) {
                             swal("头像上传失败",err1,"error");
                           })
                          },function (e) {
                            swal("头像上传失败","","error");
                          })
                        });
                        break;
                    case 1:
                        document.addEventListener("deviceready", function () {

                            var options = {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URI,
                                sourceType: Camera.PictureSourceType.CAMERA,
                                allowEdit: true,
                                encodingType: Camera.EncodingType.JPEG,
                                targetWidth: 100,
                                targetHeight: 100,
                                popoverOptions: CameraPopoverOptions,
                                saveToPhotoAlbum: false,
                                correctOrientation:true
                            };
                            $cordovaCamera.getPicture(options).then(function (imageData) {
                              var param = {
                                authtoken: ls.getItem("authtoken"),
                                type: 1
                              }
                              //首先上传头像 随后保存个人信息
                              var promise =  uploadFile.upload(imageData,param);
                              promise.then(function (res) {
                                //保存个人信息
                                var  data = {
                                  name:  $scope.tea.name,
                                  gender: $scope.tea.gender,
                                  cls:"",
                                  phone: $scope.tea.phone,
                                  email: $scope.tea.email,
                                  avtarurl:res["uploadedurl"],
                                  qq:$scope.tea.qq,
                                  addr:$scope.tea.addr,
                                  zipcode:$scope.tea.zipcode,
                                };
                                var params = {
                                  authtoken:ls.getItem("authtoken"),
                                  data:base64.encode(angular.toJson(data))
                                }
                                var pro = httpService.login("http://dodo.hznu.edu.cn/api/saveprofile",params);
                                pro.then(function (res1) {
                                  ls.setItem("info",angular.toJson(data));
                                  img.avtarurl = res["uploadedurl"];
                                });
                              },function (err) {
                                swal("头像上传失败",err,"error");
                              },function (err1) {
                                swal("头像上传失败",err1,"error");
                              })
                            },function (e) {
                              swal("头像上传失败","","error");
                            })
                        });
                        break;
                  default:break;
                }
                return true;
            },
        })
    }
//账号的设置
  $scope.accountSetting = function () {
    $ionicActionSheet.show({
      buttons: [
        {text: '修改密码'},

      ],
      destructiveText: '退出登录',
      cancelText: '取消',
      buttonClicked: function (index) {
        //到修改密码的界面
        $state.go('tab.Personal-ResetPassword');
        return true;
      },
      destructiveButtonClicked:function () {
        //退出的动作
            swal({ title: "提醒",
            text: "你确认退出吗?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            closeOnCancel: true },
          function(isConfirm){
            if (isConfirm) {
              //进行缓存的清理和跳转
              ls.removeItem("info");
              ls.removeItem("authtoken");
              ls.removeItem("username");
              ls.removeItem("password");
              $state.go('Login');
            }

          });
        return true;
      }

    });
  }
});
