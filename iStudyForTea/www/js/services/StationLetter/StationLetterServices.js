/**
 * Created by hcnucai on 2016/12/6.
 */
//站内信中的发信邮件和收信邮件
appModel.factory("lettersInAndOut",function () {
  var inItems = [],outItems = [];
  return{
    setInItems:function (_items) {
      inItems = _items;
    },
    setOutItems:function (_items) {
      outItems = _items;
    },
    getInItems:function (index) {
      return inItems[index];
    },
    getOutItems:function (index) {
      return outItems[index];
    },
    getInItemsAll:function () {
      return inItems;
    },
    getOutItemsAll:function () {
      return outItems;
    },
    removeInItems:function (index) {
      inItems.splice(index,1);
    },
    removeOutItems:function (index) {
      outItems.splice(index,1);
    },
    setReadInItems:function (index) {
      inItems[index].isread = true;
    }
  }
});
//联系人
appModel.factory("contactPersons",function () {
  var contactPersons = [],selectPerons = [];
  return {
    setAllPersons:function (_items) {
      contactPersons = _items;
    },
    getAllPersons:function () {
      return contactPersons;
    },
    addPerson:function (id) {
      selectPerons.push(id);
    },
    removePerson:function (id) {
      var index = selectPerons.indexOf(id);
      selectPerons.splice(index,1);
    },
    getSelPersons:function () {
      return selectPerons;
    }
  }
})
