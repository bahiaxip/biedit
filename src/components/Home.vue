<template>
	<div style="background-color:gray;min-height:720px">
	<!-- md-card
	<div>
		<md-card style="width:320px;margin:4px;display:inline-block;vertical-align: top;box-shadow:none">
			<md-card-media>
				<img src="img/home/redondear_oso_polar.png">
			</md-card-media>
		</md-card>
	-->
		<div class="md-layout md-gutter m_auto">
			
				<div class="md-layout-item">
					<div class="image_home0" >
					</div>
				</div>

				<div class="md-layout-item">
					<div class="image_home1" >
					</div>
				</div>

				<div class="md-layout-item" >
					<div class="image_home2"></div>
				</div>

				<div class="md-layout-item">
					<div class="image_home3"></div>
				</div>
				<div class="md-layout-item">
					<div class="image_home4">
					</div>
				</div>
				<div class="md-layout-item">
					<div class="image_home5">
					</div>
				</div>
				<div class="md-layout-item">
					<div class="image_home6">
					</div>
		</div>
		<div class="md-layout md-gutter">
				
				</div>
			</div>
		
		


		<!--<div class="video">
			<video id="video" playsinline autoplay></video>
		</div>
		<div class="controller">
			<button id="snap" @click="clic()">Capture</button>
			<button id="snap2" @click="init()">Capture</button>
		</div>
		<canvas id="canvas" width="640" height="480"></canvas>
	-->
	</div>
	
</template>
<script>
export default {
	name:'Home',
	data (){
		return {
			video:null,
			canvas:null,
			snap:null,
			errorMsge:null,
			constraints:{
				audio:true,
				video:{
					width:1280,height:720
				}
			},
			context:null,
			mediaSource:null,

		}
	},
	mounted(){
		/*
		this.video=document.querySelector("#video");
		this.canvas=document.querySelector("#canvas");
		this.snap=document.querySelector("#snap");
		this.errorMsge=document.querySelector("span#errorMsge");
		this.context=this.canvas.getContext("2d");
		*/
		//this.mediaSource=new MediaSource();

		//this.init();

	},
	methods:{
		/*
		async init(){
			let stream =await navigator.mediaDevices.getUserMedia(this.constraints);

			this.handleSuccess(stream);

		},
		*/

	//opción 1 acceso a cámara
		async init(){
			let stream =await navigator.mediaDevices.getUserMedia(this.constraints);
			console.log(stream);
			this.setCam(stream);
			//this.(stream);
		},
		
		setCam(stream){
			try{
				this.video.srcObject=stream;
				
			}catch(error){
				this.video.src=URL.createObjectURL(stream)	
				console.log("No disponible srcObject");
			}
			//window.stream=stream;
			
		},
		/* promesa con then */
		
	//opción 2 acceso a cámara
	/*
		init(){
			if(navigator.mediaDevices.getUserMedia){
				navigator.mediaDevices.getUserMedia(this.constraints)
				.then((stream)=>{
					this.video.srcObject=stream;
				}).catch(function(error){
					console.log(error);
				})
			}
		},
	*/	
		
		clic(){
			this.context.drawImage(this.video,0,0,640,480);
		}


	}
}
</script>