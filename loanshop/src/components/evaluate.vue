<template>

  <div class="c">

    <scroller lock-x class="scroll" height="-0">
      <ul class="box">

        <li v-for="i in ListData" class="clearfix" v-on:click="go('/evaluateDetails')">

          <div class="img_bar">
            <i class="new">新</i>
            <img :src=i.pic>
          </div>
          
          <div class="m">
            <h2>{{i.name}}<i></i></h2>
            
          </div>

          <div class="r">
            <button>评价</button>
          </div>
        </li>
        
      </ul>
    </scroller>

  </div>
</template>

<script>

import { Scroller, LoadMore} from 'vux'

export default {
  name: 'evaluate',
  components: {
    Scroller,
    LoadMore
  },
  data () {
    return { 
      ListData: {},
      
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



</style>

