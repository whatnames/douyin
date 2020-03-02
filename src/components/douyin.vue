<template>
	<swiper class='box':options="swiperOption" @slideChange='change' ref='mySwiper'>
		<swiper-slide v-for='(list,index) in lists' :key='index'>
			<div class="video-container">
				<video 
				preload
				ref='video'
				loop
				:src="list.playaddr"
				webkit-playsinline
				playsinline
				x5-video-player-type="h5-page"
				x5-video-player-fullscreen="true"
				@click='pauseVideo'
				@timeupdate="time"
				:class="{landscape:landscape}"
				></video>
				<transition name='boom'>
					<div class="bg" @click="playVideo" v-show="!playing">
						<img class="icon-play" src='../assets/play.svg'/>
					</div>
				</transition>
				<div class="description">
					<p class="author">@{{list.author}}</p>
					<p class="text">{{list.title}}</p>
				</div>
				<div class="jy">
					<div class="cont">
						<span class="txt">武汉加油，中国加油！此时此刻，心系武汉，共战疫情，万众一心！</span>
						<span class="txt">武汉加油，中国加油！此时此刻，心系武汉，共战疫情，万众一心！</span>
					</div>
				</div>
				<div class="progress" :style='{width:progress}'></div>
				<ul class="tab">
					<li class="active">首页</li>
					<li>成都</li>
					<li><img src="../assets/dyicon.png" alt="dy"></li>
					<li>消息</li>
					<li>我</li>
				</ul>
			</div>
		</swiper-slide>
	</swiper>
</template>

<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		components:{
			swiper,
			swiperSlide
		},
		props:{
			lists:Array
		},
		data() {
			return {
				swiperOption: {
					direction: 'vertical'
				},
				current:0,
				playing:false,
				progress:0,
				landscape:false
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			},
			player(){
				return this.video[this.current];
			}
		},
		watch: {
			lists(newValue, oldValue) {
				this.$nextTick(()=>{
					this.video=this.$refs.video;
				})	
			}
		},
		methods:{
			change(){
				this.landscape=false;
				let index=this.swiper.activeIndex;
				this.playing ? this.player.pause():this.playing=!this.playing;
				this.current=index;
				this.player.play();	
				this.isLandscape()
			},
			playVideo(){
				this.playing=true;
				this.player.play();
			},
			pauseVideo(){
				this.playing=false;
				this.player.pause()
			},
			time(){
				let h=this.player.videoHeight;
				let w=this.player.videoWidth;
				if(h&&w){
					h>w? this.landscape=0 :this.landscape=true
				}	
				let duration=this.player.duration;
				let currentTime=this.player.currentTime;
				this.progress=((currentTime/duration).toFixed(2))*100+'%';
			}
		}
	}
</script>

<style lang='stylus' scoped>
	.box
		width 100vw
		height 100vh
		background #000
		overflow hidden
		.video-container
			position relative
			width 100%
			height 85%
			overflow hidden
			.jy
				position fixed
				font-size .25rem
				margin-left .2rem
				width 50%
				bottom 10.5%
				height 3%
				overflow hidden
				color #ffffff
				.cont
					width 15.5rem
					animation loop 14s infinite linear
					.txt
						display inline-block
						width 7.75rem
						font-size .25rem
			video
				width 100%
				position absolute
				top 0
				left 0
				object-fit fill
				&.landscape
					position absolute
					top 50%
					left 50%
					transform translate(-50%,-50%)
			.description
				.author
					font-size .3rem
				.text
					font-size .3rem
				position absolute
				width 80%
				bottom 3%
				padding-left .2rem
				left 0
				color #fff
			.progress 
				width: 0
				height: 1px
				background #ffff
				position: fixed
				left:0
				bottom 10%
			.tab
				border-radius .02rem
				position fixed
				color rgba(255, 255, 255, 0.6)
				background #000
				bottom 0
				left 0
				width 100%
				height 10%
				display flex
				justify-content space-around
				align-items center
				li
					&.active
						color #ffffff
					img
						width 1rem
			.bg
				position absolute
				left 0
				top 0
				width 100%
				height 100%
				display flex 
				align-items center
				justify-content center
				background rgba(0,0,0,.1)
				&.boom-enter-active
					.icon-play
						animation zoom .1s
				.icon-play
					width 1.5rem
					opacity .3
	@keyframes loop{
		from{transform: translateX(0);}
		to{transform: translateX(-50%);}
	}
	@keyframes zoom
		0%
			transform scale(1.5)
		100%
			transform scale(1)	
</style>
