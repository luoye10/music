<template>
    <div class="page">
        <div class="head">
            <div class="music">
                <eva-icon width="30" height="30" name="music" animation="pulse" fill="white" class="music-icon"></eva-icon>
                <div class="word">网易云音乐</div>
            </div>
            <div class="information">
                <img :src="src" class="img">
                <div class="my-name" @click='handleClick'>
                    <span class="text">零落成图</span>  
                    <div class="content" :style="{display: isShow ? 'block' : 'none'}">
                        <div class="box"></div>
                        <div class="title">
                            <img :src="src">
                            <div class="name">零落成图</div>
                            <div class="right">
                                <eva-icon width="15" height="15" name="layers" animation="pulse" fill="grey" class="layers"></eva-icon>
                                <div class="check">签到</div>
                            </div>
                        </div>
                        <div class="state">
                            <ul>
                                <li class="dynamic">
                                    <div class="number">0</div>
                                    <div class="words">动态</div>
                                </li>
                                <li class="follow">
                                    <div class="number">0</div>
                                    <div class="words">关注</div>
                                </li>
                                <li class="fans">
                                    <div class="number">0</div>
                                    <div class="words">粉丝</div>
                                </li>
                            </ul>
                        </div>
                        <div class="equity">
                            <ul>
                                <li class="member">
                                    <eva-icon width="20" height="20" name="radio-button-on" animation="pulse" fill="grey" class="icons"></eva-icon>
                                    <div>会员中心</div>
                                </li>
                                <li class="grade">
                                    <eva-icon width="20" height="20" name="award" animation="pulse" fill="grey" class="icons"></eva-icon>
                                    <div>等级</div>
                                </li>
                                <li class="mall">
                                    <eva-icon width="20" height="20" name="shopping-cart" animation="pulse" fill="grey" class="icons"></eva-icon>
                                    <div>商城</div>
                                </li>
                            </ul>
                        </div>
                        <div class="message">
                            <ul>
                                <li class="personal">
                                    <eva-icon width="20" height="20" name="settings" animation="pulse" fill="grey" class="icons"></eva-icon>
                                    <div>个人信息设置</div>
                                </li>
                                <li class="account">
                                    <eva-icon width="20" height="20" name="smartphone" animation="pulse" fill="grey" class="icons"></eva-icon>
                                    <div>绑定社交账号</div>
                                </li>
                            </ul>
                        </div>
                        <div class="sign">
                            <eva-icon width="20" height="20" name="power" animation="pulse" fill="grey" class='power'></eva-icon>
                            <div>退出登录</div>
                        </div>
                    </div>
                </div>            
            </div>        
        </div>
    </div>   
</template>
<script>
import avatar from '../img/z.jpg'

export default {
    data(){
        return {
            src: avatar,
            isShow: false
        }
    },
    methods: {
        handleClick(){
            this.isShow = !this.isShow
        }
    }
}
</script>
<style lang="less" scoped>
    ul,li{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .page{
        width: 100%;
        height: 100%;
        .head{
            width: 100%;
            height: 10%;
            background: red;
            color: white;
            position: relative;
            .music{
                margin-left: 10px;
                position: relative;
                .music-icon{
                    margin-left: 10px;
                    margin-top: 15px;
                }
                .word{
                    font-family: my;
                    font-size: 20px;
                    position: absolute;
                    left: 50px;
                    top: 12px;
                    letter-spacing: .3em;
                }
            }
            .information{
                position: absolute;
                right: 150px;
                top: 0;
                .img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-top: 20px;
                }
                .my-name{  
                    cursor: pointer;                  
                    .text{
                        width: 100px;
                        font-size: 16px;
                        position: absolute;
                        left: 40px;
                        top: 23px;
                    }
                    .content{
                        width: 300px;
                        height: 300px;
                        background: whitesmoke;
                        position: absolute;
                        left: -150px;
                        top: 80px;                        
                        .box{
                            width: 0;
                            height: 0;
                            border: 20px solid whitesmoke;
                            border-color: transparent transparent whitesmoke transparent;
                            position: absolute;
                            left: 140px;
                            top: -40px;
                        }
                        .title{
                            width: 100%;
                            height: 50px;
                            position: relative;
                            img{
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                margin-left: 10px;
                                margin-top: 10px;
                            }
                            .name{
                                width: 80px;
                                height: 30px;
                                font-size: 16px;
                                line-height: 30px;
                                text-align: left;
                                color: black;
                                position: absolute;
                                left: 50px;
                                top: 10px;
                            }
                            .right{
                                width: 60px;
                                height: 20px;
                                border: 1px solid grey;
                                border-radius: 3px;
                                position: absolute;
                                right: 15px;
                                top: 15px;
                                .layers{
                                   margin-left: 5px;
                                   margin-top: 2px;
                                }
                                .check{
                                    font-size: 12px;
                                    color: black;
                                    position: absolute;
                                    right: 5px;
                                    top: 2px;
                                }
                            }
                        }
                        .state{
                            width: 100%;
                            height: 50px;
                            li{
                                width: 100px;
                                height: 40px;
                                float: left;
                                color: black;
                                box-sizing: border-box;
                                .number{
                                    font-size: 16px;
                                    line-height: 20px;
                                    text-align: center;
                                }
                                .words{
                                    font-size: 14px;
                                    color: grey;
                                    margin-left: 35px;
                                }
                            }
                            .follow,.fans{
                                border-left: 1px solid rgba(128, 128, 128, 0.2);
                            }
                        }
                        .equity,.message{
                            border-bottom: 1px solid rgba(128, 128, 128, 0.37);
                            li{
                                width: 100%;
                                height: 30px;
                                position: relative;
                                .icons{
                                    margin-left: 10px;
                                    margin-top: 5px;
                                }
                                div{
                                    position: absolute;
                                    left: 50px;
                                    top: 0;
                                    font-size: 14px;
                                    line-height: 30px;
                                    text-align: center;
                                    color: black;
                                }
                            }
                        }
                        .sign{
                            position: relative;
                            .power{
                                margin-left: 10px;
                                margin-top: 15px;
                            }
                            div{
                                position: absolute;
                                left: 50px;
                                top: 0;
                                font-size: 14px;
                                line-height: 50px;
                                text-align: center;
                                color: black;
                            }
                        }
                    }
                }
            }
        }
    }
</style>