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

    var info = angular.fromJson(ls.getItem("info"));
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
    //正则表达式的匹配
    //手机正则表达式
var ChinaMobile = new RegExp("(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\\d{8}$)|(^1705\\d{7}$)");
var ChinaUnicom = new RegExp("(^1(3[0-2]|4[5]|5[56]|7[6]|8[56])\\d{8}$)|(^1709\\d{7}$)");
var ChinaTelecom = new RegExp("(^1(33|53|77|8[019])\\d{8}$)|(^1700\\d{7}$)");
var email =  new RegExp("^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$");
var QQ =  new RegExp("^" + "\\" + "d{5,10}$");
var postCode = new RegExp("^[1-9][0-9]{5}$");
//比较是保存了哪一份
   //设置bool值
    var flags = [true,true,true,true];
    var errorMes = ["手机","邮箱","QQ","邮编"];
    var flag = true;
    if(info.phone != data.phone) {
      if (!((ChinaMobile.exec(data.phone)) || (ChinaUnicom.exec(data.phone)) || (ChinaTelecom.exec(data.phone)))) {
        flag = false;
        flags[0] = false;
      }
    }
    if(info.email != data.email) {
      if (!(email.exec(data.email))) {
        flag = false;
        flags[1] = false;
      }
    }
    if(info.qq != data.qq) {
      if (!(QQ.exec(data.qq))) {
        flag = false;
        flags[2] = false;
      }
    }

    if(info.zipcode != data.zipcode) {
      if (!(postCode.exec(data.zipcode))) {
        flag = false;
        flags[3] = false;
      }
    }
  if(!flag){
    var err = ""
    for(var i = 0; i < 4;i++) {
      if(flags[i] == false)
        err += errorMes[i] + ",";
    }
    swal("提醒",err + "填写格式错误","warning");
  }
    else{
          var param = {
            authtoken: ls.getItem("authtoken"),
            data: base64.encode(angular.toJson(data)),
          }
          console.log(param);
          var promise = httpService.infoPost("api/saveprofile", param);
          promise.then(function (res) {
            swal("恭喜您", "保存成功", "success");
            ls.setItem("info", angular.toJson(data));
          }, function (err) {
            swal("保存失败", err, "error");
          });
        }

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
                     var pro = httpService.infoPost("api/saveprofile",params);
                             pro.then(function (res1) {
                               swal("恭喜您","头像上传成功","success");
                               ls.setItem("info",angular.toJson(data));
                               img.avtarurl = res["uploadedurl"];
                               $scope.tea.avtarurl =  res["uploadedurl"];

                             });
                           },function (err) {
                            swal("头像上传失败",err,"error");
                           },function (err1) {
                             swal("头像上传失败",err1,"error");
                           })
                          },function (e) {

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
                                var pro = httpService.infoPost("api/saveprofile",params);
                                pro.then(function (res1) {
                                  swal("恭喜您","头像上传成功","success");
                                  ls.setItem("info",angular.toJson(data));
                                  img.avtarurl = res["uploadedurl"];
                                  $scope.tea.avtarurl =  res["uploadedurl"];
                                });
                              },function (err) {
                                swal("头像上传失败",err,"error");
                              },function (err1) {
                                swal("头像上传失败",err1,"error");
                              })
                            },function (e) {

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
