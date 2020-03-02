<template>
  <div id="app">
		<div class="start" @click='play' v-if='visible' ref='s'></div>
		<douyin :lists="videoList" ref='dy'></douyin>
  </div>
</template>

<script>
import douyin from './components/douyin.vue'
import getVideo from './http'
export default {
  name: 'App',
  components: {
    douyin
  },
  mounted(){
	this.timer = setInterval(() => {
      this.time++
    }, 1000);
	this.initGif()
  },
	async created(){
		let {data}=await getVideo();
		if(data.code==200){
			this.videoList=data.newslist;
		}
	},
	data(){
		return {
			videoList:[],
			time:0,
			visible:true,
			g:'red',
			img:require('./assets/loading.gif'),
			time:0
		}
	},
	methods:{
		play(){
			 if(this.time>5){
				this.visible=false;
				this.timer && window.clearInterval(this.timer)
				this.$refs.dy.playVideo();
			 }
		},
		initGif(){
			 let time=new Date().getTime();
			 this.$refs.s.style.background=`url(${this.img}?t=${time}) center/cover`
		}
	}
}
</script>
<style lang='stylus' scoped>
	.start
		width 100%
		height 100%
		position absolute	
		z-index 999
		top 0
		left 0
</style>


