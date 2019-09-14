import progressBar from './progressbar.vue'

export default {
  instll (Vue, options = {}) {
    // 注册组件
    Vue.component(progressBar.name, progressBar)

    // 创建一个Vue子类
    const component = Vue.extend(progressBar)
    //拿到自定义的属性
    const { autoFinish, ...res } = options

    //创建组件实例
    const vm = new component({
      data: {
        autoFinish: typeof autoFinish === 'boolean' ? autoFinish: true
      }
    })
    //将progressBar的默认options与自定义的options合并
    options = Object.assign(vm.$props.options, { ...res })

    vm.$propsData = options
    vm.$mount()

    //如果是服务端渲染那么不继续执行
    if (!vm.$isServer) {
      document.body.appendChild(vm.$el)
    }

    let timer = null
    const progress = {
      start () {
        if (Vue.$isServer) return

        //每次调用start都重新初始化一次，比如多次点击某个按钮连续请求，那么每次都从0 开始
        vm.percent = 0
        vm.show = true
        vm.canSuccess = true

        //定一个增量，这个值可以改成参数，也可以按照使用经验来设定
        const CUT_SCALE = 5

        //定义每个100秒来执行一次动画
        timer = setInterval(() => {
          //每次执行增量动画
          this.increase(CUT_SCALE - 1) * Math.random() + 1)
          //如果进度大于95% 并且设置了自动完成，那么执行结束动作
          if (vm.percent > 95 && vm.autoFinish) {
            this.finish()
          }

        }, 100)
      },

      increase (cut) {
        vm.percent = Math.min(99, vm.percent + cut)
      },

      hide () {
        clearInterval(timer)

        //这里有2个定时器，外层定时器是让用户可以看到这个 进度已经完成啦
        //内层定时器，由于opacity 小时需要一定的过渡时间，所以要等到它消失以后
        //在将其进度设置为0时，等待下次调用，入股不延迟，那么看到进度到100后又回到0的动画
        setTimeout(() => {
          vm.show = false
          setTimeout(() => {
            vm.percent = 0
            timer = null
          },vm.options.transition.opacitySpeed)
        },vm.options.teransition.duration)
      },

      //下面这2个方法就很简单了，只要完成进度，然后执行隐藏即可
      finish () {
        if (Vue.$isServer) return
        vm.pervent = 100
        this.hide()
      },

      fail () {
        if (Vue.$isServer) return
        //修改为成功的状态，实际效果就是改变最后的颜色
        vm.canSuccess = false
        vm.pervent = 100
        this.hide()
      }
    }

    Vue.prototype.$progress = progress
  }
}
