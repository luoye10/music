<template>
    <div class="background">
        <ul class="login-box">
            <li class="login">用户登录</li>
            <li class="name">
                <div class="container">
                    <eva-icon name="person" animation="pulse" fill="skyblue" class="icon"></eva-icon>
                    <input type="text" placeholder="账号" v-model="name">
                </div>
            </li>
            <li class="password">
                <div class="container">
                    <eva-icon name="lock" animation="pulse" fill="skyblue" class="icon"></eva-icon>
                    <input type="password" placeholder="密码" v-model="password">
                </div>
            </li>
            <li class="login-container">
                <div class="submit" @click="login">登录</div>
            </li>
        </ul> 
    </div>    
</template>
<script>
import layers from '../utils/zLayer'
import request from '../utils/request'
export default {
    data() {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        login() {
            if(!this.name){
                layers({
                    msg: '请输入用户名'
                })
                return
            }
            if(!this.password){
                layers({
                    msg: '请输入密码'
                })
                return
            }
            var that = this;
            request({
                type: 'get',
                url: 'http://192.168.1.101:3000/login/cellphone',
                data: {
                    phone: this.name,
                    password: this.password
                },
                callback: function(res) {
                    var obj = res;
                    obj = JSON.parse(obj);
                    localStorage.setItem('loginInfo', res);
                    that.$root.loginUser = res;
                    if(obj.code === 200){
                        layers({
                            msg: '登录成功',
                            color: 'success',
                            fn: function(){
                                that.$router.push({
                                    name:'HomePage',
                                    params:{
                                        loginI: res
                                    }
                                });
                            }
                        })
                    }else{
                        layers({
                            msg: obj.message || obj.msg || '登录失败',
                            color: 'error'
                        })
                    }
                } 
            })
        }        
    }
}
</script>
<style lang="less" scoped>
    @width: 400px;
    @height: 300px;
    .background{
        width: 100%;
        height: 100%;
        position: relative;
        background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589184673447&di=a552668961469b8ab40c49a07e3debad&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2Fday_110325%2F110325225516f1575c1ca99d8f.jpg') no-repeat center;
        ul,li{
            margin: 0;
            padding: 0;
        }
        .login-box{
            width: @width;
            height: @height;
            font-family: my;
            background: rgba(192, 227, 255, 0.521);
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border-radius: 3px;
            li{
                list-style: none;
                text-align: center;
                height: 40px;
                cursor: pointer;
                position: relative;
            }
            .container,.login-container{
                position: relative;
                margin: 30px 50px 0;
            }
            .login{
                font-size: 20px;
                line-height: 40px;
                text-align: center;
                color: white;
            }
            .name,.password{ 
                .icon{
                    position: absolute;
                    left: 4px;
                    top: 2px;
                }            
                input{
                    width: 100%;
                    height: 30px;
                    background: rgba(192, 227, 255, 0.521);
                    padding-left: 30px;
                    color: white;
                    font-size: 16px;
                    border-radius: 2px;
                    border: 1px solid rgba(192, 227, 255, 0.521);
                    box-sizing: border-box;
                }               
            }
            .submit{
                font-size: 18px;
                line-height: 40px;
                text-align: center;
                color: white;
                background: rgba(192, 227, 255, 0.521);
                border-radius: 200px;
            }
        }
    }    
    
</style>
