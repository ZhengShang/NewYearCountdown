//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    today: '',
    remaining: '',
    tips: '',
    des: '',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    var today = new Date()
    var thisYear = today.getFullYear()
    var thisMonth = today.getMonth()

    var remain = Math.ceil((new Date(thisYear + 1, 0, 1).getTime() - today.getTime()) / (24 * 60 * 60 * 1000))

    let current = new Date()
    let chineseNewYear = -1
    const MILLiSOCOND_IN_A_DAY = 86400000

    const chineseNewYearValid = cur => /(年1月1日$)|(\/1\/1$)/.test(cur.toLocaleDateString('ja-JP-u-ca-chinese'))

    if (chineseNewYearValid(current) && chineseNewYear === -1) {
      current = new Date(current.valueOf() + MILLiSOCOND_IN_A_DAY)
    }

    while (!chineseNewYearValid(current)) {
      chineseNewYear++
      current = new Date(current.valueOf() + MILLiSOCOND_IN_A_DAY)
    }

    var tipsContent;
    if (remain <= 31) {
      tipsContent = "很快了,再苟一个月就可以过年啦😝"
    } else if (remain <= 7) {
      tipsContent = "只剩一个星期了, 就算死也要苟住😠 😠 😠 😠 "
    } else if (remain <= 1) {
      tipsContent = "🧨🧨🧨🧨🧨🧨🧨🧨🧨\n明天就过年啦~~~超开心😘"
    } else {
      tipsContent = "只要我掰着指头数的够快\n很快就过年了...🙃"
    }

    var desContent = "距离" + (thisYear + 1) + "年还有" + remain + "天.\n当这个数字降到0的时候,就可以过元旦啦~"

    this.setData({
      today: thisYear + "-" + (thisMonth + 1) + "-" + today.getDate(),
      remaining: remain,
      tips: tipsContent,
      des: desContent,
      chineseNewYear: chineseNewYear,
    })
  },

  onShareAppMessage: function() {
    var year = new Date().getFullYear() + 1
    return {
      title: "距离" + year + "年剩余天数",
      desc: "一心想着过年🥺",
      path: "pages/index/index",
    }
  }
})