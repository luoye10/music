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
                    <span class="text-word">{{text}}</span>  
                    <div class="content" :style="{display: isShow ? 'block' : 'none'}">
                        <div class="box"></div>
                        <div class="title">
                            <img :src="src">
                            <div class="name">{{text}}</div>
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
        <div class="play-list">
            <ul class="lists">
                <li class="play-item" @click="getListDetail(play.id)" v-for="play in playLists" :key="play.id" :title="play.name">{{play.name}}</li>
            </ul>
        </div>
        <div class="song-list">
            <ul class="songs" ref="songs">
                <li class="song-item" :class="{active: index === playIndex}" @click="startPlay(song.id, index)" v-for="(song, index) in songs" :key="song.id">
                    <div class="num">{{song.num}}</div>
                    <div class="name">{{song.name}}</div>
                    <div class="singer">{{song.singer}}</div>
                    <div class="album">{{song.album}}</div>
                    <div class="time">{{song.time}}</div>
                </li>
            </ul>
        </div>
        <div class="play-bar">
            <div class="prev-play-next">
                <eva-icon name="skip-back" fill="aqua" @click="previous" width="24" height="24"></eva-icon>
                <div @click="playOrPaused">
                    <eva-icon name="play-circle" width="30" height="30" fill="aqua" v-show="!isPlay"></eva-icon>
                    <eva-icon name="pause-circle" width="30" height="30" fill="aqua" v-show="isPlay"></eva-icon>
                </div>                
                <eva-icon name="skip-forward" fill="aqua" @click="next" width="24" height="24"></eva-icon>
            </div>
            <div class="center-bar">
                <div class="current-time">{{currentTime}}</div>
                <div class="bar-percentage" @click="widthchange" ref="bar">
                    <div class="play-time" :style="{width: percentage + '%'}"></div>
                </div>
                <div class="total-time">{{totalTime}}</div>
            </div>
            <div class="play-type">

            </div>
        </div>
        <audio :src="playSrc" ref="audio" @timeupdate="timechange"></audio>
    </div>   
</template>
<script>
import avatar from '../img/z.jpg'
import request from '../utils/request'
import layer from '../utils/zLayer'
export default {
    data(){
        return {
            src: avatar,
            text: '',
            isShow: false,
            playLists: [
                {}
            ],
            songs: [],
            playSrc: '',
            isPlay: false,
            playIndex: null,
            currentTime: '00:00',
            percentage: '0',
            totalTime: '00:00'
        }
    },
    mounted() {        
        this.getInfo();
        let info = this.$route.params.loginI
        info = JSON.parse(info)
        let avatarUrl = info.profile.avatarUrl
        this.src = avatarUrl
        let name = info.profile.nickname
        this.text = name
        console.log(info)
    },
    methods: {
        handleClick(){
            this.isShow = !this.isShow
        },
        getInfo() {
            let info = localStorage.getItem('loginInfo')
            info = JSON.parse(info)
            let uid = info.profile.userId
            let url = 'http://192.168.1.3:3000/user/playlist?uid=' + uid
            let that = this
            request({
                url: url,
                data: {},
                type: 'get',
                callback: function(res) {
                    let list = JSON.parse(res).playlist
                    that.playLists = list
                    // console.log(res)
                }
            })
        },
        getListDetail(id) {
            let url = 'http://192.168.1.3:3000/playlist/detail?id=' + id
            request({
                type: 'get',
                url: url,
                callback: (res) => {
                    let songs = JSON.parse(res)
                    songs = songs.playlist.tracks
                    let arr = songs.map((item,index) => {
                        index++
                        return {
                            id: item.id,
                            num: index < 10 ? '0' + index : index,
                            name: item.name,
                            singer: item.ar[0].name,
                            album: item.al.name,
                            time: this.timeDeal(item.dt),
                            totalTime: item.dt
                        }
                    })
                    this.songs = arr
                    // debugger
                    console.log(this.songs)
                }
            })
        },
        timeDeal(time) {
            let m = '',s = ''
            m = Math.floor(time / 1000 / 60)
            s = String(time % 60000).slice(0,2)
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            return m + ':' + s;
        }, 
        startPlay(id, index) {
            this.playIndex = index
            let url = 'http://192.168.1.3:3000/song/url?id=' + id;
            request({
                url: url,
                type: 'get',
                callback: (res) => {
                    let link = JSON.parse(res).data[0] || {}
                    if (!link.url) {
                        layer({
                            msg: '该歌曲暂无版权',
                            time: 1500,
                            color: 'error'
                        })
                        this.next();
                        return
                    }
                    this.$refs.audio.src = link.url
                    this.$refs.audio.play();
                    this.isPlay = true;
                    this.totalTime = this.songs[index].time
                }
            })
        },
        playOrPaused() {
            this.isPlay = !this.isPlay
            if (this.isPlay) {
                this.$refs.audio.play();
            } else {
                this.$refs.audio.pause();
            }
        },
        previous(){
            if(this.playIndex === 0){
                this.playIndex = this.songs.length - 1
            }else{
                this.playIndex--
            }           
            let index = this.playIndex
            let song = this.songs[index]
            this.startPlay(song.id, index)
            console.log(song)

        },
        next(){
            if (this.playIndex === this.songs.length - 1) {
                this.playIndex = 0
                this.$refs.songs.scrollIntoView({behavior: 'smooth'})
            }else {
                this.playIndex++
            }
            let index = this.playIndex
            let song = this.songs[index]
            this.startPlay(song.id, index)
            console.log(song)
        },
        timechange(e) {
            let time = e.target.currentTime, per
            time = Math.floor(time)
            let minute, second, str
            minute = Math.floor(time / 60)
            second = Math.floor(time % 60)
            per = time * 1000 / this.songs[this.playIndex].totalTime * 100
            minute = minute < 10 ? '0' + minute : minute
            second = second < 10 ? '0' + second : second
            str = minute + ':' + second
            this.currentTime = str
            this.percentage = per
            this.isEnded()
        },
        widthchange(e){
            let x = e.offsetX
            let width = parseInt(this.getStyle(this.$refs.bar).width)
            let per = x / width * 100
            this.percentage = per
            let currentTime = this.songs[this.playIndex].totalTime * per / 100
            let ct = this.timeDeal(currentTime)
            this.$refs.audio.currentTime = currentTime / 1000;
            this.currentTime = ct
        },
        getStyle(el) {
            return window.getComputedStyle(el, null)
        },
        isEnded(){
            if(this.$refs.audio.ended){
                this.next()
            }
        }
    }
}
</script>
<style lang="less" scoped>
    @head: 100px;
    @leftWidth: 220px;
    @barHeight: 40px;
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
            height: @head;
            background: red;
            color: white;
            position: relative;
            .music{
                font-family: my;
                margin-left: 10px;
                position: relative;
                .music-icon{
                    margin-left: 10px;
                    margin-top: 30px;
                }
                .word{
                    font-size: 20px;
                    position: absolute;
                    left: 50px;
                    top: 30px;
                    letter-spacing: .3em;
                }
            }
            .information{
                position: absolute;
                right: 200px;
                top: 0;
                .img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-top: 30px;
                }
                .my-name{  
                    cursor: pointer;                
                    .text-word{
                        width: 100px;
                        height: 30px;
                        font-size: 16px;
                        position: absolute;
                        left: 40px;
                        top: 30px;
                    }
                    .content{
                        width: 300px;
                        height: 300px;
                        background: whitesmoke;
                        position: absolute;
                        left: -100px;
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
        .play-list{
            font-family: my;
            position: absolute;
            left: 0;
            top: @head;
            width: @leftWidth;
            bottom: @barHeight;
            overflow-x: hidden;
            overflow-y: auto;
            background: rgba(8, 253, 253, .5);
            .play-item{
                cursor: pointer;
                padding: 10px 20px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
        .song-list{
            font-size: 14px;
            position: absolute;
            top: @head;
            left: @leftWidth;
            right: 0;
            bottom: @barHeight;
            overflow-x: hidden;
            overflow-y: auto;
            &::-webkit-scrollbar{
                width: 5px;
                background: aquamarine;
            }
            &::-webkit-scrollbar-track{
                width: 5px;
            }
            &::-webkit-scrollbar-thumb{
                width: 5px;
                height: 100px;
                background: grey;
                border-radius: 3px;
            }
            .song-item{
                border-top: 1px dotted #6cf;
                padding: 10px 20px;
                cursor: pointer;
                &.active{
                    background: #e4dfdf;
                }
                div{
                    display: inline-block;
                    color: grey;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    text-align: left;
                }
                .num{
                    width: 100px;
                }
                .name{
                    width: 300px;
                    color: black;
                }
                .singer{
                    width: 200px;
                }
                .album{
                    width: 200px;
                    margin-right: 40px;
                }
                .time{
                    width: 60px;
                }
            }
        }
        .play-bar{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 3;
            height: @barHeight;
            background: #6cf;
            display: flex;
            .prev-play-next,.center-bar,.play-type{
                height: @barHeight;
            }
            .prev-play-next{
                width: 220px;
                text-align: center;
                div{
                    display: inline-block;
                    margin: 5px 25px 0;
                }
            }
            .play-type{
                width: 200px;
            }
            .center-bar{
                flex: 1;
                display: flex;
                @timeWidth: 50px;
                @barH: 6px;
                .current-time,.total-time{
                    width: @timeWidth;
                    line-height: @barHeight;
                    margin: 0 10px;
                }
                .bar-percentage{
                    flex: 1;
                    height: @barH;
                    background: turquoise;
                    border-radius: @barH / 2;
                    margin: (@barHeight - @barH) / 2;
                    .play-time{
                        height: @barH;
                        background: red;
                        border-radius: @barH / 2;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>