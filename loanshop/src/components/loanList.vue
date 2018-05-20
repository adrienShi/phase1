<template>

  <div class="c">

    <div class="banner">
      <swiper :aspect-ratio="300/800" auto loop>
      <swiper-item class="swiper-demo-img" v-for="(item, index) in imgList" :key="index"><img :src="item"></swiper-item>
      </swiper>
    </div>

    <swiper auto loop height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
      <swiper-item><p>义务爱了 完成传奇世界H5-王者归来任务 获得20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
      <swiper-item><p>零哥章魚 完成传奇世界H5-王者归来任务 获得30金币</p></swiper-item>
      <swiper-item><p>做迎而為 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>只知道不知道 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
    </swiper>

    <grid>
      <grid-item link="his" :label="'贷款历史'"  >
        <x-icon type="ios-search" size="30" slot="icon"></x-icon>
      </grid-item>
      <grid-item link="evaluate" :label="'贷款评价'">
        <x-icon type="ios-star-outline" size="30" slot="icon"></x-icon>
      </grid-item>
    </grid>

    <scroller lock-x class="scroll" height="-250">
      <ul class="box">

        <li v-for="i in ListData" class="clearfix">

          <div class="img_bar">
            <i class="new">新</i>
            <img :src=i.pic>
          </div>
          
          <div class="m">
            <h2>{{i.name}}<i></i></h2>
            <p>{{i.title}}</p>
            <p>日息率：<b class="blue">{{i.interest}}</b>&nbsp&nbsp&nbsp&nbsp 额度：<b class="red">{{i.quota}}</b></p>
          </div>

          <div class="r">
            <button>查看额度</button>
          </div>
        </li>
        
      </ul>
    </scroller>

  </div>
</template>

<script>

import { Scroller, LoadMore, Swiper, SwiperItem, Grid, GridItem} from 'vux'

export default {
  name: 'loanList',
  components: {
    Scroller,
    LoadMore,
    Swiper,
    SwiperItem,
    Grid,
    GridItem
  },
  data () {
    return { 
      ListData: {},
      imgList: [
        'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
        'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
        'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
      ],
    }
  },
  mounted () {

  },
  methods: {
    go: function(url){
      this.$router.push({ path: url });
    }
  },
  created: function(){
    let _this = this;
    this.$axios.get("/static/test.json",{"id":123}).then(res=>{
      _this.ListData = res.data.result;
      console.log(res.data);
      if (res.data.status == "1") {
        
      } else {

      }
    });
  }
}
</script>

<style lang="less">

@rem: 200rem;

.banner {

}

.hd {
  height: 15%;
  background-color: red;
}
.box {
  text-align: center;
  padding-top: 20 / @rem;
  >li {
    display: inline-block;
    height: 180 / @rem;
    line-height: 180 / @rem;
    width: 93%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    margin-bottom: 20 / @rem;
    .img_bar {
      position: relative;
      width: 120 / @rem;
      height: 120 / @rem;
      margin: 0 30 / @rem 0 50 / @rem;
      margin-top: 30 / @rem;
      float: left;
      img {
        display: block;
        width: 120 / @rem;
        height: 120 / @rem;
        border-radius: 10px;
      }
      .new {
        position: absolute;
        width: 30 / @rem;
        height: 30 / @rem;
        line-height: 30 / @rem;
        right: -10 / @rem;
        top: -10 / @rem;
        background: red;
        color: #fff;
        font-size: 12 / @rem;
        border-radius: 50%;
      }
    }
    
    .m {
      float: left;
      width: 50%;
      overflow: hidden;
      p,h2 {
        text-align: left;
        height: 35 / @rem;
        line-height: 35 / @rem;
        overflow: hidden;/*内容超出后隐藏*/
        text-overflow: ellipsis;/* 超出内容显示为省略号*/
        white-space: nowrap;/*文本不进行换行*/
      }
      h2 {
        font-size: 28 / @rem;
        color: #4e4e4e;
        font-weight: normal;
        margin-top: 35 / @rem;
        margin-bottom: 6 / @rem;
      }
      p {
        font-size: 20 / @rem;
        color: #888;
      }
    }

    .r {
      float: right;
      margin-right: 30 / @rem;
      button {
        padding: 10 / @rem 15 / @rem;
        color: #fff;
        background-color: #FF6666;
        border-radius: 15px;
        font-size: 20 / @rem;
      }
    }
  }
}

.blue {
  color: #0066FF;
}

.red {
  color: #FF3333;
}

.scroll {
  background-color: #f7f6fb;
}

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}

.text-scroll {
  line-height: 30px;
  text-align: center;
}

</style>

