// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//注入加载动画的服务
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services']);
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
app.directive('htmlText', function(){
  return {
    'restrict': 'A',
    'require': 'ngModel',
    'link': function(scope,element,attrs,model) {
      model.$formatters.push(function(val){
        return val.htmlField;
      });

      model.$parsers.push(function(val){
        model.$modelValue.htmlField = val;
      });
    }
  };
});
app.exports = function () {
  var _directive =  {
    restrict : 'A',
    scope    : false,
    link     : _link
  };

  function _link(scope, element, attrs) {
    var elWidth, elHeight;

    // mode : 'pinch' or 'swipe'
    var mode = '';

    // distance between two touche points (mode : 'pinch')
    var distance = 0;
    var initialDistance = 0;

    // image scaling
    var scale = 1;
    var relativeScale = 1;
    var initialScale = 1;
    var maxScale = parseInt(attrs.maxScale, 10);
    if (isNaN(maxScale) || maxScale <= 1) {
      maxScale = 3;
    }

    // position of the upper left corner of the element
    var positionX = 0;
    var positionY = 0;

    var initialPositionX = 0;
    var initialPositionY = 0;

    // central origin (mode : 'pinch')
    var originX = 0;
    var originY = 0;

    // start coordinate and amount of movement (mode : 'swipe')
    var startX = 0;
    var startY = 0;
    var moveX = 0;
    var moveY = 0;

    var image = new Image();
    image.onload = function() {
      elWidth = element[0].clientWidth;
      elHeight = element[0].clientHeight;

      element.css({
        '-webkit-transform-origin' : '0 0',
        'transform-origin'         : '0 0'
      });

      element.on('touchstart', touchstartHandler);
      element.on('touchmove', touchmoveHandler);
      element.on('touchend', touchendHandler);
    };

    if (attrs.ngSrc) {
      image.src = attrs.ngSrc;
    } else {
      image.src = attrs.src;
    }

    /**
     * @param {object} evt
     */
    function touchstartHandler(evt) {
      var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

      startX = touches[0].clientX;
      startY = touches[0].clientY;
      initialPositionX = positionX;
      initialPositionY = positionY;
      moveX = 0;
      moveY = 0;
    }

    /**
     * @param {object} evt
     */
    function touchmoveHandler(evt) {
      var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

      if (mode === '') {
        if (touches.length === 1 && scale > 1) {

          mode = 'swipe';

        } else if (touches.length === 2) {

          mode = 'pinch';

          initialScale = scale;
          initialDistance = getDistance(touches);
          originX = touches[0].clientX -
            parseInt((touches[0].clientX - touches[1].clientX) / 2, 10) -
            element[0].offsetLeft - initialPositionX;
          originY = touches[0].clientY -
            parseInt((touches[0].clientY - touches[1].clientY) / 2, 10) -
            element[0].offsetTop - initialPositionY;

        }
      }

      if (mode === 'swipe') {
        evt.preventDefault();

        moveX = touches[0].clientX - startX;
        moveY = touches[0].clientY - startY;

        positionX = initialPositionX + moveX;
        positionY = initialPositionY + moveY;

        transformElement();

      } else if (mode === 'pinch') {
        evt.preventDefault();

        distance = getDistance(touches);
        relativeScale = distance / initialDistance;
        scale = relativeScale * initialScale;

        positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
        positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

        transformElement();

      }
    }

    /**
     * @param {object} evt
     */
    function touchendHandler(evt) {
      var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

      if (mode === '' || touches.length > 0) {
        return;
      }

      if (scale < 1) {

        scale = 1;
        positionX = 0;
        positionY = 0;

      } else if (scale > maxScale) {

        scale = maxScale;
        relativeScale = scale / initialScale;
        positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
        positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

      } else {

        if (positionX > 0) {
          positionX = 0;
        } else if (positionX < elWidth * (1 - scale)) {
          positionX = elWidth * (1 - scale);
        }
        if (positionY > 0) {
          positionY = 0;
        } else if (positionY < elHeight * (1 - scale)) {
          positionY = elHeight * (1 - scale);
        }

      }

      transformElement(0.1);
      mode = '';
    }

    /**
     * @param {Array} touches
     * @return {number}
     */
    function getDistance(touches) {
      var d = Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) +
        Math.pow(touches[0].clientY - touches[1].clientY, 2));
      return parseInt(d, 10);
    }

    /**
     * @param {number} [duration]
     */
    function transformElement(duration) {
      var transition  = duration ? 'all cubic-bezier(0,0,.5,1) ' + duration + 's' : '';
      var matrixArray = [scale, 0, 0, scale, positionX, positionY];
      var matrix      = 'matrix(' + matrixArray.join(',') + ')';

      element.css({
        '-webkit-transition' : transition,
        transition           : transition,
        '-webkit-transform'  : matrix + ' translate3d(0,0,0)',
        transform            : matrix
      });
    }
  }

  return _directive;
};
app.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false);
})
app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive

    .state('tab', {
    url: '/tab',
    abstract:true,
        cache:false,
    templateUrl: 'templates/tabs/tabs.html',
     controller:"tabsCtrl"
  })
//配置侧滑白屏问题

  // Each tab has its own nav history stack:

  .state('tab.SystemManagement', {
    url: '/SystemManagement',
    views: {
      'menuContent': {
        templateUrl: 'templates/tabs/tab-SystemManagement.html',
        controller: 'systemManagementCtrl'
      }
    }
  })

  .state('tab.TeachManagement', {
      url: '/TeachManagement',
      params:{fromLogin:null},
      views: {
        'menuContent': {
          templateUrl: 'templates/tabs/tab-TeachManagement.html',
          controller: 'teachManagementCtrl'
        }
      }
    })


  .state('tab.StationLetter', {
    url: '/StationLetter',
    views: {
      'menuContent': {
        templateUrl: 'templates/tabs/tab-StationLetter.html',
        controller: 'stationLetterCtrl'
      }
    }
  })
    .state('tab.Personal', {
      url: '/Personal',
      views: {
        'menuContent': {
          templateUrl: 'templates/tabs/tab-Personal.html',
          controller: 'PersonalCtrl'
        }
      }
    })
    //注册登录页面
      .state('Login',{
        url:'/Login',
        templateUrl:'templates/LoginAndReset/Login.html',
            controller:'LoginCtrl',


      })
  //忘记密码填写邮箱
  .state('WriteEmail',{
    url:'/WriteEmail',
    templateUrl:'templates/LoginAndReset/WriteEmail.html',
    controller:'LoginWriteEmailCtrl',


  })
      //发送验证码的
      .state('SendIdentity',{
        url:'/SendIdentity',
        params:{email:null},
        templateUrl:'templates/LoginAndReset/SendIdentity.html',
        controller:'SendIdentityCtrl',


      })
  //重置密码
      .state('ResetPassword',{
        url:'/ResetPassword',
        params:{token:null},
        templateUrl:'templates/LoginAndReset/ResetPassword.html',
        controller:'ResetPsswordCtrl',


      })

  //个人中心中的重置密码
      .state('tab.Personal-ResetPassword',{
          url:'/Personal/ResetPassword',
          views:{
              'menuContent': {
                  templateUrl: 'templates/Personal/ResetPassword.html',
                  controller: 'PersonalResetPasswordCtrl',
              }
              }

      })

  //第一个模块 系统管理中的增加系统公告模块
      .state('tab.SystemManagement-AddAnnoucement',{
          url:'/SystemManagement/AddAnnoucement',
          views:{
              'menuContent': {
                  templateUrl: 'templates/SystemManagement/AddAnnoucement.html',
                  controller: 'AddAnnoucementCtrl',
              }
          }

      })
  //第一个模块 账号管理模块
      .state('tab.SystemManagement-ManageAccount',{
          url:'/SystemManagement/ManageAccount',
          views:{
              'menuContent': {
                  templateUrl: 'templates/SystemManagement/ManageAccount.html',
                  controller: 'ManageAccountCtrl',
              }
          }

      })
  //第一个模块 账号管理中的新增账号模块
      .state('tab.SystemManagement-AddNewAccount',{
          url:'/SystemManagement/AddNewAccount',
          views:{
              'menuContent': {
                  templateUrl: 'templates/SystemManagement/AddNewAccount.html',
                  controller: 'AddNewAccountCtrl',
              }
          }

      })
  //第一个模块 详细系统公告的
      .state('tab.SystemManagement-DetailInfo',{

          url:"/SystemManagement/DetailInfo/:chatid",
          views:{
              'menuContent': {
                  templateUrl: 'templates/SystemManagement/DetailInfo.html',
                  controller: 'DetailInfoCtrl',
              }
          }

      })
  //第三个模块 读邮件的
      .state('tab.StationLetter-ReadEmail',{

          url:"/StationLetter/ReadEmail",
        params:{"index":null,"fromIn":null},
          views:{
              'menuContent': {
                  templateUrl: 'templates/StationLetter/ReadEmail.html',
                  controller: 'ReadEmailCtrl',
              }
          }

      })
  //第三个模块 写邮件的
      .state('tab.StationLetter-WriteEmail',{

          url:"/StationLetter/WriteEmail",
          params:{code:null,subject:null,senderid:null,sendername:null},
          views:{
              'menuContent': {
                  templateUrl: 'templates/StationLetter/WriteEmail.html',
                  controller: 'WriteEmailCtrl',
              }
          }

      })
        //第三个模块 写邮件下面的选好图片后的预览
      //图片放大  预览
    .state('tab.StationLette-ShowBigImage',{
      url:'/StationLetter/ShowBigImage',
      params:{index:null,imgs:null},
      views: {
        'menuContent': {
          templateUrl: 'templates/Commons/ShowBigImage.html',
          controller: 'ImageShowBigCtrl',
        }
      }

    })
  //第三个模块 联系人的
      .state('tab.StationLetter-ContactPerson',{

          url:"/StationLetter/ContactPerson",
          views:{
              'menuContent': {
                  templateUrl: 'templates/StationLetter/ContactPerson.html',
                  controller: 'ContactPersonCtrl',
              }
          }

      })
  //第二个模块 教学管理的学生列表
      .state('tab.TeachManagement-StudentList',{

          url:"/TeachManagement/StudentList",
          params:{"groupid":null},
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/Student/StudentList.html',
                  controller: 'StudentListCtrl',
              }
          }

      })
  //第二个模块 教学管理中的学生信息
      .state('tab.TeachManagement-StudentInf',{
          params:{"id":null},
          url:"/TeachManagement/StudentInf",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/Student/StudentInf.html',
                  controller: 'StudentInfCtrl',
              }
          }

      })
      //第二个模块 教学管理中的新建学生到一个学生库中
      .state('tab.TeachManagement-AddNewStuToGroup',{
          params:{"groupid":null},
          url:"/TeachManagement/AddNewStuToGroup",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/Student/AddNewStuToGroup.html',
                  controller: 'AddNewStuToGroupCtrl',
              }
          }

      })
   //第二个模块 教学管理中的新建学生库
      .state('tab.TeachManagement-AddNewStuGroup',{

          url:"/TeachManagement/AddNewStuGroup",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/AddNewStuGroup.html',
                  controller: 'AddNewStuGroupCtrl',
              }
          }

      })
 //第二个模块 教学管理中的新建课程
      .state('tab.TeachManagement-AddNewCourse',{

          url:"/TeachManagement/AddNewCourse",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/AddNewCourse.html',
                  controller: 'AddNewCourseCtrl',
              }
          }

      })
//第二个模块 教学管理中的一门课程中的学习计划界面
      .state('tab.TeachManagement-OneCourseStudyPlan',{
          url:"/TeachManagement/OneCourseStudyPlan",
          params:{courseid:null,index:null},
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/StudyPlan/StudyPlan.html',
                  controller: 'StudyPlanCtrl',
              }
          }

      })
      //第二个模块 教学管理中的一门课程中的学习计划界面中的阅卷列表界面
      .state('tab.TeachManagement-OneCourseStudyPlanGoOver',{
          url:"/TeachManagement/OneCourseStudyPlanGoOver",
          params:{testid:null},
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/StudyPlan/goOver.html',
                  controller: 'GoOverCtrl',
              }
          }

      })
  //第二个模块中 教学管理中的一门课程中的课程属性界面
      .state('tab.TeachManagement-OneCourseProperty',{
          params:{courseid:null,index:null},
          url:"/TeachManagement/OneCourseProperty",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/CourseProperty.html',
                  controller: 'CoursePropertyCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的课程公告界面
      .state('tab.TeachManagement-OneCourseAnnoucement',{
          params:{courseid:null,index:null},
          url:"/TeachManagement/OneCourseAnnoucement",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/CourseAnnoucement/CourseAnnoucement.html',
                  controller: 'CourseAnnoucementCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的课程公告详细界面
      .state('tab.TeachManagement-OneCourseAnnoucementDetailInfo',{
          params:{index:null,items:null},
          url:"/TeachManagement/OneCourseAnnoucementDetainInfo",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/CourseAnnoucement/CourseAnnoucementDetailInfo.html',
                  controller: 'CourseAnnoucementDetailInfoCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的增加课程公告界面
      .state('tab.TeachManagement-OneCourseAddAnnoucement',{
          params:{courseid:null},
          url:"/TeachManagement/CourseAddAnnoucement",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/CourseAnnoucement/AddCourseAnnoucement.html',
                  controller: 'CourseAddAnnoucementCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的学生列表
      .state('tab.TeachManagement-OneCourseStuInOneCourseList',{
          params:{courseid:null,index:null},
          url:"/TeachManagement/OneCourseStuInOneCourseList",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/StuInOneCourse/StuInOneCourseList.html',
                  controller: 'StuInOneCourseListCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的课程资源界面
      .state('tab.TeachManagement-OneCourseResource',{
          params:{courseid:null,index:null},
          url:"/TeachManagement/OneCourseResource",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/CourseResource.html',
                  controller: 'CourseResourceCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的作业列表界面
      .state('tab.TeachManagement-OneCourseHomeWorkList',{
          params:{courseid:null,index:null},
          url:"/TeachManagement/OneCourseHomeWorkList",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/HomeWorkList.html',
                  controller: 'HomeWorkListCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的练习列表界面
      .state('tab.TeachManagement-OneCourseExerciseList',{
          params:{courseid:null,index:null},
          url:"/TeachManagement/OneCourseExerciseList",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/ExerciseList.html',
                  controller: 'ExerciseListCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的实验列表界面
      .state('tab.TeachManagement-OneCourseExprementList',{
          params:{courseid:null,index:null},
          url:"/TeachManagement/OneCourseExprementList",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/ExprementList.html',
                  controller: 'ExprementListCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中编辑课程界面-->
      .state('tab.TeachManagement-OneCourseEditHomeWorkDetail',{
          params:{courseid:null},
          url:"/TeachManagement/OneCourseEditHomeWorkDetail",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/EditHomeWorkDetail.html',
                  controller: 'EditHomeWorkDetailCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的讨论区界面
      .state('tab.TeachManagement-OneCourseDiscuss',{
          params:{courseid:null,index:null},
          url:"/TeachManagement/OneCourseDiscuss",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/Discuss/MainDiscuss.html',
                  controller: 'MainDiscussCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的讨论区的详细信息界面
      .state('tab.TeachManagement-OneCourseDetailNote',{
          params:{selTotal:null,selReply:null,selPublish:null,index:null,isTop:null},
          url:"/TeachManagement/OneCourseNoteDetail",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/Discuss/DetailNote.html',
                  controller: 'DetailNoteCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的讨论区的回复列表界面
      .state('tab.TeachManagement-OneCourseNoteReplyList',{
          //帖子的id 课程id
          params:{id:null},
          url:"/TeachManagement/OneCourseNoteReplyList",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/Discuss/NoteReplyList.html',
                  controller: 'NoteReplyListCtrl',
              }
          }

      })
    //第二个模块中 教学管理中的一门课程中的讨论区的回复单子的详情界面
    .state('tab.TeachManagement-OneCourseNoteReplyDetail',{
      //帖子的id
      params:{index:null},
      url:"/TeachManagement/OneCourseNoteReplyDetail",
      views:{
        'menuContent': {
          templateUrl: 'templates/TeachManagement/OneCourse/Discuss/DetailReplyNote.html',
          controller: 'NoteReplyDetailCtrl',
        }
      }

    })
    .state('tab.TeachManagement-OneCourseNoteWriteTopic',{
      //帖子的id
      params:{courseid:null},
      url:"/TeachManagement/OneCourseNoteReplyWriteTopic",
      views:{
        'menuContent': {
          templateUrl: 'templates/TeachManagement/OneCourse/Discuss/WriteTopic.html',
          controller: 'WriteTopicCtrl',
        }
      }

    })
      //第二个模块中 教学管理中的一门课程中的成绩列表学生列表界面
      .state('tab.TeachManagement-OneCourseStuInGradeList',{
          params:{id:null,index:null},
          url:"/TeachManagement/OneCourseStuInGradeList",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/GradeList/StuInGradeList.html',
                  controller: 'StuInGradeListCtrl',
              }
          }

      })
      //第二个模块中 教学管理中的一门课程中的成绩列表详细成绩界面
      .state('tab.TeachManagement-OneCourseDetailGradeList',{
          params:{id:null},
          url:"/TeachManagement/OneCourseDetailGradeList",
          views:{
              'menuContent': {
                  templateUrl: 'templates/TeachManagement/OneCourse/GradeList/DetailGradeList.html',
                  controller: 'DetailGradeListCtrl',
              }
          }

      })
  ;
  //判断首界面应该加载谁
  var ls = window.localStorage;
  if(ls.getItem("username") == null) {

    $urlRouterProvider.otherwise('/Login');
  }else {

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/TeachManagement');
  }

});
//自定义tab的显示有隐藏的指令
app.directive('showTabs',function ($rootScope) {
  return {
    restrict: 'A',
    link: function ($scope, $sel) {
      $rootScope.hideTabs = false;
    }
  }
});
app.directive('hideTabs',function ($rootScope) {
      return {
        restrict: 'A',
        link:function ($scope,$sel) {
          $rootScope.hideTabs = true;

        }
      }
    })
