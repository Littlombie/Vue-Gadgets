export default {
  toThousands: function (num) {
    let result = []
    let counter = 0
    num = (num || 0).toString().split('')
    for (let i = num.length - 1; i >= 0; i--) {
      counter++
      result.unshift(num[i])
      if (!(counter % 3) && i !== 0) { result.unshift(',') }
    }
    return result.join('')
  },
  toDecimal: function (num) {
    if (num < 1000) return num
    return Number((num / 1000).toString().match(/^\d+(?:\.\d{0,1})?/)) + 'k'
  },
  getTimes: function (time) {
    let dateTimeStamp = new Date(time.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')).getTime()
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    // let halfamonth = day * 15;
    let month = day * 30
    let now = new Date().getTime()
    let diffValue = now - dateTimeStamp
    // console.log(diffValue)
    if (diffValue < 0) { return }
    let monthC = diffValue / month
    let weekC = diffValue / (7 * day)
    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minC = diffValue / minute
    let result = ''
    if (monthC >= 1) {
      // eslint-disable-next-line
      result="" + parseInt(monthC) + " months ago"
    } else if (weekC >= 1) {
      // eslint-disable-next-line
      result = "" + parseInt(weekC) + " weeks ago"
    } else if (dayC >= 1) {
      // eslint-disable-next-line
      result = ""+ parseInt(dayC) +" days ago"
    } else if (hourC >= 1) {
      // eslint-disable-next-line
      result=""+ parseInt(hourC) +" hours ago"
    } else if (minC >= 1) {
      // eslint-disable-next-line
      result = ""+ parseInt(minC) +" minutes ago"
    } else {
      result = `just`
    }
    return result
  },
  scrollTop: function (e) {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.scrollTo(0, c - c / 8)
      window.requestAnimationFrame(e)
    }
  }
}
