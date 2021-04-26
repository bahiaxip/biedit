<template>

	<div style="min-height:720px;">		
	<!--1-->	
		<div class="md-layout md-alignment-center-center"  style="background:linear-gradient(to bottom, rgba(38, 173, 167,.8) 0%, rgba(38, 173, 167,.1) 100%);" :style="{'height':divHeight+'px'}">			
			<!--<div class="md-layout-item md-size-100">Biedit</div>-->
			<div class="md-layout-item md-size-12"></div>
			<div class="md-layout-item md-size-35 " >				
				<div class="div_home1 " style="margin:auto;">
					
					<h2 style="font-family:corporate;color:black;letter-spacing: 1px;font-weight: normal;line-height:150%" :style="{'font-size':font+'px'}"
					>
					Edita tus imágenes con Biedit						
					</h2>					
					<p style="font-size:20px;font-family:corporate;color:#5a5a5a;line-height:120%">Edita tus imágenes de una forma práctica y sencilla. Biedit permite redimensionar, recortar, reflejar y aplicar distintos ajustes a tu imagen. </p>
				</div>
			</div>
			<div class="md-layout-item md-size-6"></div>
			<div class="md-layout-item md-size-35" >
					<img src="img/home/adult.jpg" />
			</div>
			<div class="md-layout-item md-size-12"></div>
		</div>		
		<div class="clearfix" style="height:40px;background-color:white"></div>
	<!--2-->
	<div class="md-layout md-alignment-center-center" style="background-color:lightblue;padding-top:50px;padding-bottom:50px" >
			<div class="md-layout-item md-size-12"></div>
			<div class="md-layout-item md-size-35" style="height:100%">			
				
				<!--<img style="position:absolute;margin-left:50px;" src="img/home/oleo_labrador.jpg"/>-->
				<!--<img style="position:absolute;margin-left:100px" src="img/home/redondear_oso_polar.png"/>-->
				<img  src="img/home/oleo_labrador.jpg" />
				
			</div>
			<div class="md-layout-item md-size-6"></div>
			<div class="md-layout-item md-size-35">
				<h2 style="color:#ff1e55;font-family:corporate;line-height:150%;letter-spacing: 1px;font-weight: normal;" :style="{'font-size':font+'px'}">Efectos originales</h2>
						<p style="color:#5a5a5a;font-family:corporate;font-size:20px">Accede al panel de efectos y dale a tu imagen un estilo original</p>												
				
			</div>
			<div class="md-layout-item md-size-12"></div>
		</div>
		<div class="clearfix" style="height:40px;background-color:white"></div>
	<!--
		<div class="md-layout md-alignment-center-center" style="background-color:lightblue;padding-top:50px;padding-bottom:50px" >
			<div class="md-layout-item md-size-12"></div>
			<div class="md-layout-item md-size-35">			
				
				<img src="img/home/oleo_labrador.jpg"/>
				
			</div>
			<div class="md-layout-item md-size-6"></div>
			<div class="md-layout-item md-size-35">
				<h2 style="color:#ff1e55;font-family:corporate;line-height:150%;letter-spacing: 1px;font-weight: normal;" :style="{'font-size':font+'px'}">Organiza tus imágenes</h2>
						<p style="color:#5a5a5a;font-family:corporate;font-size:20px">Administra tus imágenes favoritas y descárgalas desde cualquier lugar</p>												
				
			</div>
			<div class="md-layout-item md-size-12"></div>
		</div>
		<div class="clearfix" style="height:40px;background-color:white"></div>
	-->
	<!--3-->
		<div class="md-layout md-alignment-center-center"  style="background-color:rgba(55,255,157,.4);padding-top:50px;padding-bottom:50px" >
			<div class="md-layout-item md-size-12"></div>
			<div class="md-layout-item md-size-35 " >				
				<div class="div_home1 " style="margin:auto;">
					<h2 style="font-family:corporate;color:black;letter-spacing: 1px;font-weight: normal;line-height:150%" :style="{'font-size':font+'px'}"
					>
					Optimiza y ahorra espacio
					</h2>					
					<p style="font-size:20px;font-family:corporate;color:#5a5a5a">Cambia las dimensiones de tu foto, recorta o realiza una compresión liberando espacio en tu dispositivo</p>
				</div>
			</div>
			<div class="md-layout-item md-size-6"></div>
			<div class="md-layout-item md-size-35 " style="margin:auto;">
				<div class="div_video" ref="div_video" style="display:inline-flex">
					<video class="img_banner" autoplay muted ref="video" >
						<source :src="videoSelected" >
							<!--<source src="video/redimension.mp4" >-->
					</video>
				</div>
			</div>
			<div class="md-layout-item md-size-12"></div>
		</div>		
		<div class="clearfix" style="height:40px;background-color:white"></div>
	<!--4-->	
		<div class="md-layout md-alignment-center-center" style="background-color:lightblue;padding-top:50px;padding-bottom:50px">
			<div class="md-layout-item md-size-12"></div>
			<div class="md-layout-item md-size-35">			
				<div class="div_home1" style="margin:auto">
					<img src="img/home/ensalada.png"/>					
				</div>
			</div>
			<div class="md-layout-item md-size-6"></div>
			<div class="md-layout-item md-size-35">
					<h2 style="font-family:corporate;color:#ff1e55;font-size:45px;line-height:150%;font-weight: normal" :style="{'font-size':font+'px'}">Crea tu marca de agua
					</h2>
					<p style="font-size:20px;font-family:corporate;color:#5a5a5a">Introduce tu texto y crea tu propia marca de agua</p>					
			</div>
			<div class="md-layout-item md-size-12"></div>
		</div>
		<div class="md-layout md-alignment-center-center" style="padding-top:50px;padding-bottom:50px">
		<splide :options="primaryOptions" ref="primary" style="background-color:rgba(0,0,0,.6);" class="splide_custom m_auto"  >
					<splide-slide >
						<div class="m_top30" >
							<img src="img/home/adult.jpg" style="" />
						</div>
						<div class="text_description"><p>Filtro escala de grises</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/vineta_uva.jpg" />
						</div>
						<div class="text_description"><p>Efecto Viñeta</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/oleo_labrador.jpg" />
						</div>
						<div class="text_description"><p>Efecto Óleo</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/redondear_oso_polar.png" />
						</div>
						<div class="text_description"><p>Redondear esquinas</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/ensalada.png" />
						</div>
						<div class="text_description"><p>Marca de agua</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/circulo_pareja_sepia.png" />
						</div>
						<div class="text_description"><p>Forma circular</p></div>
					</splide-slide>
				</splide>
				<splide :options="secondaryOptions" ref="secondary" class="splide_custom m_auto">
					<splide-slide class="c_pointer">
						<img src="img/home/adult.jpg" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/vineta_uva.jpg" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/oleo_labrador.jpg" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/redondear_oso_polar.png" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/ensalada.png" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/circulo_pareja_sepia.png" />
					</splide-slide>
				</splide>
			</div>
	</div>
</template>
<script>
//import Banner from './Banner.vue';
import servicesMixin from '../mixins/servicesMixin.js';
export default {
	name:'Home',
	//components:{Banner},
	mixins:{servicesMixin},
	data (){
		return {
			divHeight:null,
			font:null,
			videoSelected:null,
			videos:[
				"video/redimension.mp4",
				"video/video_cut_biedit.mp4",
				"video/filtro_byn.mp4"
			],
			counterVideo:0,
			focus:true,	
			
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

		//opciones slider vue
			primaryOptions: {
				type      : 'loop',
				width     : 800,
				pagination: false,
			},
			secondaryOptions: {
				type        : 'slide',
				rewind      : true,
				width       : 800,
				gap         : '1rem',
				pagination  : false,
				fixedWidth  : 110,
				fixedHeight : 70,
				cover       : true,
				focus       : 'center',
				isNavigation: true,
			},
		}
	},
	created(){		
		window.addEventListener("resize",this.setHeightDiv);
		this.setHeightDiv();
		
		
	},
	mounted(){
		window.addEventListener("focus",()=> {
			console.log("foco antes: ",this.focus)
			this.focus=true;
			console.log("foco después: ",this.focus)
		})
		window.addEventListener("blur",()=> {
			this.focus=false
		})
		let vid=this.$refs.video;
		this.videoSelected=this.videos[0];
		let playPromise=vid.play();

		if(playPromise !== undefined){
			playPromise.then(() =>  {
				console.log("dentro video")
			}).catch(error => {
				console.log("error  promise: ",error)
			})
		}	
		
		this.loopVideo();
		//slider vue
		this.$refs.primary.sync(this.$refs.secondary.splide);
	},
	methods:{
		setHeightDiv(){
			let b=document.body;
			this.divHeight=b.clientHeight;
			if(b.clientWidth<1300)
				this.font=30;
			else if(b.clientWidth<800)
				this.font=20;
			else
				this.font=40;
		},

		loopVideo(){
			
			let vid=this.$refs.video;
			let parentVid=this.$refs.div_video;
			//let vid=this.$refs.video;			

			setInterval(()=>{								
				
				parentVid.style.width=parentVid.clientWidth+"px";
				parentVid.style.height=parentVid.clientHeight+"px";
				//hide
				setTimeout(()=> {
					//console.log("en hide: ",this.counterVideo)
					vid.style.opacity="0";
					vid.pause();
				},100);
				
				
				//show
				//Importante: Para que el método show no de error en la transición es
				//necesario asignar un style.width/style.height fijos al padre del video
				setTimeout(()=> {

				//si es la primera vez modificamos el index a uno para poder 
				//cambiar al segundo, ya que, el primero ya se ha asignado al inicio.
				//añadimos la condición lista.length por si la lista solo tiene una 
					if(this.counterVideo==0 && this.videos.length>1)
						this.counterVideo=1;
					//si ha llegado al último reseteamos al primero
					else if(this.videos.length==this.counterVideo)
						this.counterVideo=0;
				//seleccionamos el siguiente de la lista y sumamos uno al index
				//tmp[num].selected=list[tmp[num].index];
					//console.log("en show: ",this.counterVideo)									
					//this.videoSelected=this.videos[this.counterVideo];
					vid.src=this.videos[this.counterVideo];
					//si se está dentro de la pestaña del navegador (focus=true)
					if(this.focus)
						vid.play();
					this.counterVideo=this.counterVideo+1;
					
					vid.style.opacity="1";
					
				},700);
				
				
				
				//vid.style.opacity="0";
				
				//vid.play();
				//this.counterVideo++;
				//vid.style.opacity="1";
			},8000);
				
		},
		
	}
}
</script>
<style>
.div_video{
	transition:all 0.5s linear;
}
.img_banner{
	transition:all 0.5s linear;	
}
</style>