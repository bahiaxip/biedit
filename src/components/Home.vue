<template>

	<div style="background-color:black">
		<div class="md-layout md-alignment-center md-size-100 div_text" :class="{title_biedit:titleBiedit}" style="">
				<span 
					data-aos="fade-right"
					data-aos-delay="500"
					>
					B
				</span>
				<span 
					data-aos="fade-down"
					data-aos-delay="1000"					
					>
					I
				</span>
				<span 
					data-aos="fade-left"
					data-aos-delay="1500"					
					>
					E
				</span>
				<span 
					data-aos="fade-right"
					data-aos-delay="2000"										
					>
					D
				</span>
				<span 
					data-aos="fade-down"
					data-aos-delay="2500"										
					>
					I
				</span>
				<span 
					data-aos="fade-left"
					data-aos-delay="3000"					
					>
					T
				</span>
			</div>
	<!--1-->	
		<div class="md-layout md-alignment-center-center div_layout_first">
			
			<!--<div class="md-layout-item md-size-100">Biedit</div>-->
			<div class="md-layout-item md-size-8 md-small-hide" ></div>
			<div class="md-layout-item md-size-40 md-small-size-80">			
				<div class="div_home m_auto">
					
					<h2 class="c_white" :style="{'font-size':fontH2+'px'}"
					
					data-aos="fade-down"
					data-aos-easing="linear"
					data-aos-offset="200"
					data-aos-duration="500"
					>
						Edita tus imágenes con Biedit						
					</h2>					
					<p class="c_white" :style="{'font-size':fontText +'px'}"
					
					data-aos="fade-right" 
					data-aos-easing="linear"
					data-aos-delay="600"
					data-aos-duration="1000">
						Edita tus imágenes de una forma práctica y sencilla. Biedit permite redimensionar, recortar y una amplia variedad de ajustes y efectos.
					</p>
				</div>
			</div>
			<div class="md-layout-item md-size-4 md-small-hide"></div>
			<div class="md-layout-item md-size-40 md-small-size-80" >
					<img src="img/home/adult.jpg"
					data-aos="zoom-out-up"
					data-aos-delay="500"
					data-aos-duration="2000"
					data-aos-anchor-placement="center-bottom"
					/>
			</div>
			<div class="md-layout-item md-size-8 md-small-hide "></div>
		</div>		
		<div class="div_clear "></div>

		<div class="div_clear2" v-if="fontH2<=960 && divHeight<=800"></div>
		<div class="div_clear2" v-if="fontH2<=960 && divHeight<=720"></div>
		<div class="div_clear2" v-if="fontH2<=960 && divHeight<=640"></div>
		<div class="div_clear2" v-if="fontH2<=960 && divHeight<=570"></div>

	<!--2-->
		<div class="md-layout md-alignment-center-center div_layout back_black">
			<div class="md-layout-item md-size-8 md-small-hide"></div>
			<div class="md-layout-item md-size-40 md-small-size-80" >			
				
				<!--<img style="position:absolute;margin-left:50px;" src="img/home/oleo_labrador.jpg"/>-->
				<!--<img style="position:absolute;margin-left:100px" src="img/home/redondear_oso_polar.png"/>-->
				<img  src="img/home/oleo_labrador.jpg" 
				data-aos="flip-up" 
				data-aos-duration="2000"
				data-aos-mirror="true"
				/>
				
			</div>
			<div class="md-layout-item md-size-4 md-small-hide"></div>
			<div class="md-layout-item md-size-40 md-small-size-80 ">
				<div class="div_home" 
				
				>
					<h2 class="c_white" :style="{'font-size':fontH2+'px'}"
					data-aos="fade-up" 
					data-aos-duration="1500"
					data-aos-mirror="true"
					>
					Efectos originales</h2>
					<p class="c_white" :style="{'font-size':fontText +'px'}"
					data-aos="zoom-in-right"
					data-aos-duration="500"
					data-aos-mirror="true"
					>Accede al panel de efectos y dale a tu imagen un estilo original</p>
				</div>
				
			</div>
			<div class="md-layout-item md-size-8 md-small-hide"></div>
		</div>
		<div class="div_clear"></div>

		<div class="md-layout md-alignment-center-center div_layout back_black"   ref="div_wheel" style="cursor:default;height:300px">
			<h2 ref="child_wheel" class="c_white biedit_wheel" :class="{title_biedit:titleBiedit}"  style="position:relative;display:inline-block;">
				<span>
					Biedit
				</span>
			</h2>

		</div>
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
		<div class="md-layout md-alignment-center-center div_layout back_black"   >
			<div class="md-layout-item md-size-8 md-small-hide"></div>
			<div class="md-layout-item md-size-40 md-small-size-80" >				
				<div class="div_home m_auto" data-aos="fade-right" data-aos-duration="2000">
					<h2 class="c_white" :style="{'font-size':fontH2+'px'}"
					>
						Optimiza y ahorra espacio
					</h2>					
					<p class="c_white" :style="{'font-size':fontText +'px'}">
						Cambia las dimensiones de tu foto, recorta o realiza una compresión liberando espacio en tu dispositivo
					</p>
				</div>
			</div>
			<div class="md-layout-item md-size-4 md-small-hide"></div>
			<div class="md-layout-item md-size-40 md-small-size-80 m_auto" >
				<div class="div_video" ref="div_video"  data-aos="fade-left"  data-aos-duration="2000">
					<video class="img_banner" autoplay muted ref="video">
						<source :src="videoSelected" >
							<!--<source src="video/redimension.mp4" >-->
					</video>
				</div>
			</div>
			<div class="md-layout-item md-size-8 md-small-hide"></div>
		</div>		
		<div class="div_clear"></div>
	<!--4-->
		<div class="md-layout md-alignment-center-center div_layout">
			<div class="md-layout-item md-size-70 md-small-size-80">
				<div class="div_home m_auto" >
					<h2 class="c_white" :style="{'font-size':fontH2+'px'}"
					data-aos="zoom-in-out" 
					data-aos-delay="1000"
					data-aos-duration="1000"
					>
								Editar tus fotos nunca fue tan fácil
					</h2>
					<div style="margin:auto;width:50%">
						<p class="c_white" :style="{'font-size':fontText +'px'}" 
						data-aos="fade-up"
						data-aos-delay="1200"
						>
							Regístrate en Biedit y prueba todas las opciones que te ofrece. Puedes realizar efectos sencillos como rotar y reflejar tu imagen o aplicar efectos avanzados como efecto óleo, efecto remolino, generar texturas o redondear las esquinas de tu imagen
						</p>
					</div>
				</div>
			</div>
		</div>
	<!--5-->	
		<div class="md-layout md-alignment-center-center div_layout back_black">
			<div class="md-layout-item md-size-8 md-small-hide"></div>
			<div class="md-layout-item md-size-40 md-small-size-80">			
				<div class="m_auto" 
				data-aos="flip-right" 
				data-aos-duration="1500"
				data-aos-delay="1000"
				>
					<img src="img/home/ensalada.png"  />					
				</div>
			</div>
			<div class="md-layout-item md-size-4 md-small-hide"></div>
			<div class="md-layout-item md-size-40 md-small-size-80">
				<div class="div_home" >
					<h2 class="c_white" :style="{'font-size':fontH2+'px'}"
					data-aos="zoom-in-out" 
					data-aos-delay="1000"
					data-aos-duration="1000"
					>
						Crea marcas de agua
					</h2>
					<p class="c_white" :style="{'font-size':fontText +'px'}"
					data-aos="fade-up"
					data-aos-delay="1500"
					>
						Introduce tu texto y crea tu propia marca de agua
					</p>
				</div>				
			</div>
			<div class="md-layout-item md-size-8 md-small-hide"></div>
		</div>
	<!--6-->
		<div class="md-layout md-alignment-center-center div_layout">
			<div class="md-layout-item md-size-70 md-small-size-80">
				<div class="div_home m_auto"  >
					<h2 class="c_white" :style="{'font-size':fontH2+'px'}"
					data-aos="zoom-in-out" 
					data-aos-delay="1000"
					data-aos-duration="1000"
					>
								También para profesionales
					</h2>
					<div style="margin:auto;width:50%">
						<p class="c_white" :style="{'font-size':fontText +'px'}" 
						data-aos="fade-up"
						data-aos-delay="1200"
						>
							Si te dedicas al sector de la fotografía o a las artes gráficas ya no necesitas encender tu ordenador, tampoco necesitas un programa de edición profesional como Photoshop o Krita. Con Biedit puedes subir tu imagen y convertirla en CMYK con un solo clic o extraer todos los canales en escala de grises y descargarlas desde tu dispositivo.
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="md-layout md-alignment-center-center md-xsmall-hide">
			<div class="md-layout-item md-size-70 md-small-size-80">
				<div class="div_home m_auto" >
					<h2 class="c_white" :style="{'font-size':fontH2+'px'}"
					data-aos="fade-right" 
					data-aos-delay="1200"
					data-aos-duration="1000"
					data-aos-anchor-placement="top-center"
					>
								DEMO
					</h2>
				</div>
			</div>
		</div>
		<div class="md-layout md-alignment-center-center md-xsmall-hide div_layout">
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
import AOS from 'aos';
//no necesario
//import 'aos/dist/aos.css';
export default {
	name:'Home',
	//components:{Banner},
	mixins:{servicesMixin},
	props:["device"],
	data (){
		return {
			titleBiedit:false,
			divHeight:null,
			fontH2:null,
			fontText:null,
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
					//anulamos
					/*width:1280,height:720*/
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
			counter:null,
			sign:null,
		}
		
	},
	created(){
		window.addEventListener("resize",this.setHeightDiv);
		this.setHeightDiv();
		if(this.device)
			console.log(this.device);
	},
	mounted(){
		AOS.init();
		//ejemplo de carga de un script js en Vue 
		/*
		let externalScript = document.createElement('script')
		externalScript.setAttribute('src', 'https://unpkg.com/aos@2.3.1/dist/aos.js')
		document.head.appendChild(externalScript)
		*/
		
		this.$refs.child_wheel.style.left="1px";
		//window.add
		/*
		window.addEventListener("focus",()=> {
			//console.log("foco antes: ",this.focus)
			this.focus=true;
			//console.log("foco después: ",this.focus)
		})
		window.addEventListener("blur",()=> {
			this.focus=false
		});
		*/
		this.$refs.div_wheel.addEventListener("wheel",(e)=>  {
			console.log(e)
			//detenemos scroll
			//let wheel=this.$refs.div_wheel;
			let childWheel=this.$refs.child_wheel;
			
			
			//Math.sign devuelve 1 es positivo, si es -1 es negativo
			//si es 1 sumamos counter, si no restamos
			if(Math.sign(e.deltaY)==1){
				this.sign=true;
				//this.counter=this.counter+25;
			}else{
				this.sign=false;
				//this.counter=this.counter-25;
			}
			console.log(this.counter)
			console.log(e.deltaY);			
			if(parseInt(childWheel.style.left)<150 && this.sign){				
				e.preventDefault();
				if(parseInt(childWheel.style.left)+25 >150){
					let rest=parseInt(childWheel.style.left)-150;
					console.log("rest: ",rest)
					childWheel.style.left=parseInt(childWheel.style.left)-rest+"px";
				}else{
					childWheel.style.left=parseInt(childWheel.style.left)+25+"px";	
				}
			}else if(parseInt(childWheel.style.left)>0 && parseInt(childWheel.style.left)<=150 && !this.sign){
				e.preventDefault();
					childWheel.style.left=parseInt(childWheel.style.left)-25+"px";
			}
			/*if(parseInt(childWheel.style.left)<100 && this.sign ||
				parseInt(childWheel.style.left)>0 ){
				e.preventDefault();
				childWheel.style.left=parseInt(childWheel.style.left)+this.counter+"px";	
			}
			*/
		})
		let vid=this.$refs.video;
		this.videoSelected=this.videos[0];
		let playPromise=vid.play();

		if(playPromise !== undefined){
			playPromise.then(() =>  {
				//console.log("dentro video")
			}).catch(error => {
				console.log("error  promise: ",error)
			})
		}	
		
		this.loopVideo();
		//slider vue
		this.$refs.primary.sync(this.$refs.secondary.splide);
	},
	methods:{
		//si device es true (es movil) damos otra font-size distinta
		setHeightDiv(){
			let b=document.body;
			this.divHeight=b.clientHeight;
			console.log(b.clientWidth)
			if(b.clientWidth<1400 && b.clientWidth>1200){
				if(this.device){
					this.fontH2=50;				
					this.titleBiedit=true;
					this.fontText=22;
				}else{
					this.fontH2=50;				
					this.titleBiedit=true;
					this.fontText=22;					
				}
			}else if(b.clientWidth<1200 && b.clientWidth>959){
				if(this.device){
					this.fontH2=45;
					this.titleBiedit=true;
					this.fontText=20;
				}else{
					this.fontH2=45;
					this.titleBiedit=true;
					this.fontText=20;
				}
			}else if(b.clientWidth<960 && b.clientWidth>800){
				if(this.device){
					this.fontH2=40;
					this.titleBiedit=true;
				}else{
					this.fontH2=40;
					this.titleBiedit=false;
					this.fontText=18;
				}
			}else if(b.clientWidth<800){
				if(this.device){
					this.fontH2=38;
					this.titleBiedit=true;
				}else{
					this.fontH2=40;
					this.titleBiedit=true;
					this.fontText=16;
				}
			}else{
				if(this.device){
					this.fontH2=50;
					this.titleBiedit=false;
					this.fontText=24;

				}else{
					this.fontH2=50;
					this.titleBiedit=false;
					this.fontText=24;
				}
			}
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
	margin:auto;
	height:100%;
	display:inline-flex;
	transition:all 0.5s linear;
}
.div_video video{
	display:inline-flex;
}
.img_banner{
	transition:all 0.5s linear;	
}
</style>