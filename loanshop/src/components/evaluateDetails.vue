<template>

  <div class="c">
    <group>
      <x-textarea :max="20" placeholder="评价" ></x-textarea>
      <cell title="评分" >
        <rater v-model="star"></rater>
      </cell>
      
    </group>
    <p class="up"><button>提交</button></p>
  </div>

</template>

<script>

import { XTextarea ,Rater, Group, Cell, Range  } from 'vux'

export default {
  name: 'evaluateDetails',
  components: {
    XTextarea,
    Rater,
    Group,
    Cell,
    Range
  },
  data () {
    return { 
      star: 0,
      
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
    
  }
}
</script>

<style lang="less">

@rem: 200rem;

.up {
  text-align: center;
  padding-top: 100 / @rem;
  button {
    width: 80%;
    padding: 20 / @rem 30 / @rem;
    border-radius: 20 / @rem;
    color: #fff;
    background-color: #0099FF;
  }
}


</style>

