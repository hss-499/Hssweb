$(function(){
    $('#go2Reg').on('click',function(){
        $('.login-wrap').hide()
        $('.reg-wrap').show()
    })

    $('#go2Longin').on('click',function(){
        $('.reg-wrap').hide()
        $('.login-wrap').show()

    })
  

    //从layui
    let form =layui.form
    // 通过form.verify()
    form.verify({
        pwd:[ /^[\S]{6,12}$/ ,'密码必须6到12位，且不能出现空格'] 
    })
})