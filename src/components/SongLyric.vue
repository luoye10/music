<template>
    <div class="songlyric">
        <div class="container">
            <div class="top">
                <div class="animate"></div>
                <div class="lyric-show">
                    <ul class="word-list">
                        <div>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <li class="line-word" v-for="(w, i) in lyrics" :key="i">{{w}}</li>
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <ul class="comments">
                    <li class="comment-item" v-for="c in hotComments" :key="c.commentId">
                        <div class="avatar-img">
                            <img :src="c.user.avatarUrl" alt="">
                        </div>
                        <div class="nickname-content">
                            <div class="name-content"><a href="#">{{c.user.nickname}}</a>：{{c.content}}</div>
                            <div class="time-publish">{{new Date(c.time).format('yyyy年MM月dd日 hh:mm:ss')}} <span class="like">喜欢({{c.likedCount || 0}})</span></div>
                        </div>
                    </li>
                    <div class="total">最新评论({{total}})</div>
                    <li class="comment-item" v-for="c in comments" :key="c.commentId">
                        <div class="avatar-img">
                            <img :src="c.user.avatarUrl" alt="">
                        </div>
                        <div class="nickname-content">
                            <div class="name-content"><a href="#">{{c.user.nickname}}</a>：{{c.content}}</div>
                            <div class="time-publish">{{new Date(c.time).format('yyyy年MM月dd日 hh:mm:ss')}} <span class="like">喜欢({{c.likedCount || 0}})</span></div>
                        </div>
                    </li>
                </ul>
                <Pagination @pageChange="changeComment" :size="size" :total="total"></Pagination>
            </div>
        </div>
    </div>
</template>
<script>
import request from '../utils/request'
import Pagination from './Pagination'
export default {
    props: ['playId'],
    components: {
        Pagination
    },
    data(){
        return {
            lyrics: [],
            comments: [],
            hotComments: [],
            base:'http://192.168.0.105:3000/',
            total: 0,
            size: 20,
            page: 1,
            pageKey: this.getKey()
        }
    },
    mounted(){
        if (this.playId) {
            this.getLyric(this.playId)
            this.getComments(this.playId)
        }
    },
    methods: {
        getKey() {
            return Math.random().toString(16).slice(2)
        },
        getLyric(id) {
            request({
                type: 'get',
                data: {},
                url: `${this.base}lyric?id=${id}`,
                callback: (res) => {
                    res = JSON.parse(res)
                    let lrc = res.lrc.lyric
                    let lrcs = lrc.split('\n')
                    let times = [], texts = []
                    let reg = /\[(\d{2}:\d{2})\.\d+\]/g
                    lrcs.map(l => {
                        let v = l.replace(reg, function(match, $1){
                            times.push($1)
                            return ''
                        })
                        texts.push(v)
                    })
                    this.lyrics = texts
                }
            })
        },
        getComments(id, page) {
            page = page || 1
            request({
                type: 'get',
                data: {},
                url: `${this.base}comment/music?id=${id}&offset=${(page - 1) * 20}`,
                callback: (res) => {
                    res = JSON.parse(res)
                    this.comments = res.comments
                    this.hotComments = page === 1 ? res.hotComments : []
                    this.total = res.total
                    page === 1 && (this.pageKey = this.getKey())
                    console.log(res)
                }
            })
        },
        changeComment(page) {
            this.getComments(this.playId, page)
        }
    }
}
</script>
<style lang="less" scoped>
    .songlyric{
        position: absolute;
        left: 0;
        top: 100px;
        right: 0;
        bottom: 40px;
        background: #fff;
        overflow-y: auto;
        @h: 400px;
        .container{
            width: 80%;
            margin: 0 auto;
            .top{
                display: flex;
                div{
                    flex: 1;
                    height: @h;
                }
                .word-list{
                    height: 100%;
                    overflow-x: hidden;
                    overflow-y: auto;
                    li{
                        list-style: none;
                    }
                }
            }
            .bottom{
                .comment-item{
                    list-style: none;
                    font-size: 13px;
                    margin: 20px 0;
                    a{
                        color: #6cf;
                    }
                    .avatar-img{
                        width: 100px;
                        float: left;
                    }
                    .nickname-content{
                        margin-left: 100px;
                    }
                    img{
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                    }
                    .time-publish{
                        margin-top: 10px;
                        position: relative;
                        .like{
                            position: absolute;
                            top: 0;
                            right: 0;
                        }
                    }
                }
            }
        }
    }    
</style>