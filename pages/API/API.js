// pages/API/API.js
var api = require('../../utils/request.js');
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
function look(res) {
  console.log(res);
}



Page({
  checkIP: function () {
    var userIP = this.data.userIP;
    var url = 'http://api.jisuapi.com/ip/location';
    var data = new Array();
    data['ip'] = userIP;
    data['appkey'] = '';
    api.com_request(url, data, 'get', look);

  },
  IPInput: function (e) {
    this.setData({
      userIP: e.detail.value
    })
  },
  uploadImg: function () {
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: '#',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data;
            wx.showToast({
              icon: 'none',
              title: data,
            })
          },
          fail: function (res) {
            wx.showToast({
              icon: 'none',
              title: res,
            })
          }
        })
      },
    })
  },
  record: function () {
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
      },
      fail: function (res) {
        //录音失败
      }
    })
    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 10000)
  },
  login: function () {
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxf4a7b9c0f5fa3678&secret=d79fbb472c9eadbe1577e5e440913a10&js_code=' + res.code,
          success: function (res) {
            var data = res.data;
            console.log(data.openid);
            wx.showToast({
              icon: 'none',
              title: data.openid,
            })
          }
        })

        console.log(res.code);



      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    videoHidden: true,
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        console.log(res);
        that.setData({
          src: res.tempFilePath,
          videoHidden: false
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
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
    this.videoContext = wx.createVideoContext('myVideo')
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

  }
})