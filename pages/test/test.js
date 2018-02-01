// pages/test/test.js
var util = require('../../utils/util.js');
var utilMd5 = require('../../utils/md5.js');
var api = require('../../utils/request.js');
function alert(res) {
  console.log(res.data);
  
  if (res.data.ret == 0) {
    wx.showModal({
      title: '登录成功',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../API/API'
          })
        }
      }
    })
  } else {
    wx.showToast({
      icon: 'none',
      title: '登录失败',
    })
  }
}
function success(res)
{
  console.log(res.data.msg);
  if(res.data.msg == '成功！'){
    wx.showModal({
      title: '注册成功',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../API/API'
          })
        }
      }
    })
  }else{
    showRequestInfo()
    wx.showToast({
      icon: 'none',
      title: '注册失败！',
    })
  }
  
}
Page({
  clickMe: function () {
    var username = this.data.userName;
    var password = utilMd5.hexMD5(this.data.userPwd);
    var aaa = new Array();
    aaa['api'] = 'user/login';
    aaa['username'] = username;
    aaa['password'] = password;
    showRequestInfo()
    api.api_request(aaa, alert);
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  //获取用户输入的密码
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  //跳转下一个视频页面
  jumpVideo: function () {
    wx.navigateTo({
      url: '../API/API'
    })
  },
  //跳转下一个日志页面
  jumplog: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  jumperweima: function() {
    wx.navigateTo({
      url: '../alert/alert'
    })
  },
  

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPwd: '',
    name: '',
    password: '',
    email: '',
    phone: '',
    showModalStatus: false,
    tip :'',
  },
  getName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  getPwd: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  getEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
    }.bind(this), 200)
    //关闭  
    if (currentStatu == "close") {
      this.setData({ showModalStatus: false });
    }
    //注册
    if (currentStatu == "reg") {
      var name = this.data.name;
      var password = this.data.password;
      var repwd = this.data.email;
      var phone = this.data.phone;
      if (password != repwd){
        this.setData({ tip: '两次密码不一致' });
      }else{
      var data = new Array();
      data['api'] = 'user/reg';
      data['name'] = name;
      data['pwd'] = utilMd5.hexMD5(password);
      data['phone'] = phone;
      api.api_request(data, success);
      }
    }
    // 显示  
    if (currentStatu == "open") {
      this.setData({ showModalStatus: true })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return this.data.shareData
  }
}) 