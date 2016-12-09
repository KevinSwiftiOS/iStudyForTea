/**
 * Created by hcnucai on 2016/12/8.
 */
//创建讨论区中的服务
appModel.factory("discussService",function () {
  //全部主题
  var totalItems = [],totalTopItems = [],totalUnTopItems = [];
  //我回复的主题
  var replyItems = [],replyTopItems = [],replyUnTopItems = [];
  //我发布的主题
  var publishItems = [],publishTopItems = [],publishUnTopItems = [];
  //定义讨论区中的班级名称和课程名称
  return {
  setTotalItems:function (outItems,outTopItems,outUnTopItems) {
      totalItems = outItems;
      totalTopItems = outTopItems;
      totalUnTopItems = outUnTopItems;
    },
    getTotalItems:function () {
      return{items:totalItems,topItems:totalTopItems,unTopItems:totalUnTopItems};
    },
    setReplyItems:function (outItems,outTopItems,outUnTopItems) {
      replyItems = outItems;
      replyTopItems = outTopItems;
      replyUnTopItems = outUnTopItems;
    },
    getReplyItems:function () {
      return{items:replyItems,topItems:replyTopItems,unTopItems:replyUnTopItems};
    },
    setPublishItems:function (outItems,outTopItems,outUnTopItems) {
      publishItems = outItems;
      publishTopItems = outTopItems;
      publishUnTopItems = outUnTopItems;
    },
    getPublishItems:function () {
      return{items:publishItems,topItems:publishTopItems,unTopItems:publishUnTopItems};
    },

  courseNames:null,
    //回复列表的信息
    replyItems:null
  }
})
