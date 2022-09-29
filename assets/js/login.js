$(function () {
    $('#go2Reg').on('click', function () {
        $('.login-wrap').hide()
        $('.reg-wrap').show()
    })

    $('#go2Longin').on('click', function () {
        $('.reg-wrap').hide()
        $('.login-wrap').show()

    })

    //从layui获取form
    let form = layui.form
    let layer = layui.layer
    // 通过form.verify()
    form.verify({
        // 自定义了一个叫pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 这是校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 然后进行一次等于判断
            // 如果判断失败，则retur一个提示消息
            if ($('#password').val() !== value) {
                return '两次密码不一致，请重新输入'
            }
        }
    })
    // 将key=value形式的数据，转成json格式的字符串

    // 监听注册表单的提交事件 (会默认刷新浏览器，阻止默认事件)
    $('#from_reg').on('submit', function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault()
        // 2.发起Ajax的POST请求
        // 经过分析需要修改：1、Content-Type 2、需要将参数转成json 格式
        $.ajax({
            method: 'POST',
            contentType: 'application/json',
            url: '/api/reg',
            data: $(this).serialize(),
            success(res) {
                if (res.code !== 0) return layer.msg(res.message)
                // 注册成功后，给go2Longin模拟一个点击事件
                $('#go2Longin').click()
                layer.msg('注册成功')
            }
        })



    })


    // 监听登录表单的点击事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success(res) {
                if (res.code !== 0) return layer.msg(res.message)
                // 跳转到主页
                // token 意思是令牌的意思（去请求有权限的接口）
                localStorage.setItem('big_new_token', res.token)
                location.href = `/home.html`

            }
        })

    })




})