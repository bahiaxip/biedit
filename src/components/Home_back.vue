<template>
	<div style="/*background-color:gray;*/min-height:720px;">
		<div class="md-layout">			
			<div class="banner1 md-xlarge-size-15 md-large-size-25 md-medium-hide md-small-hide">
				<!--<Banner :options="optionsBhBanner"></Banner>-->
			</div>

			<div class="md-layout-item md-xlarge-size-70 md-large-50 md-medium-size-100 m_auto">
				<h2>
					Edita tus imágenes
				</h2>
				<!--<splide :options="primaryOptions" ref="primary" style="background-color:rgba(0,0,0,.6);" class="splide_custom m_auto"  >
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
			-->
			</div>
			<div class="banner2 md-xlarge-size-15 md-large-size-25  md-medium-hide">
				<!--<Banner :options="optionsBhBanner2"></Banner>-->
			</div>
		</div>
	</div>
</template>
<script>
//import Banner from './Banner.vue';
export default {
	name:'Home',
	//components:{Banner},
	data (){
		return {
			optionsBhBanner:{
				orientation:"vertical",
				size:"medium",
				fontSizeDefault:"22px",
				time:8000,
				images:[
					//images element 1
					[
						"img/home/vineta_uva.jpg",
						"img/home/forma_selfie.png",
					],
					//images element 2
					[
						"img/home/pareja.jpg",
						"img/home/road-5724397_640.jpg"
					],
					//images element 3
					[
						"img/home/fun.jpg",
						"img/home/circulo_pareja_sepia.png",
						"img/home/fashion.JPG"
					]
				],
				texts:[
					[
						"Regístrate y",
						"sube tus imágenes...",
						"...descárgalas donde quieras",						
					],
					[
						//"Sube tus imágenes...",
						//"...descárgalas donde quieras",
					],
					[
						"BIEDIT",
						"bahiaxip.com"					
					],
				],
				effects:{
					1:{
					//transitions
						opacity:true,
						//scale
						width:false,
						//scale
						height:false,
						//solo texto
						fontSize:false,
						scaleRotate:false,
						scale:false,
						positionLeft:false,
					//set mode text
						modeText:"true",
					//set width image HTML
						//solo imágenes
						widthHTML:null
					},
					2:{
						opacity:true,
						positionLeft:true,
						widthHTML:null
					},
					3:{						
						modeText:true,
						widthHTML:150,
						scaleRotate:true
					}
				},			
				order:{
					0:[1],
					1:[1],
					2:[1,2],
					3:[1,2,3]
				}
			},
			optionsBhBanner2:{
				orientation:"vertical",
				size:"medium",
				fontSizeDefault:"22px",
				time:4000,
				images:[
					//images element 1
					[
						"img/home/vineta_uva.jpg",
						"img/home/forma_selfie.png",
					],
					//images element 2
					[
						"img/home/pareja.jpg",
						"img/home/road-5724397_640.jpg"
					],
					//images element 3
					[
						"img/home/fun.jpg",
						"img/home/circulo_pareja_sepia.png",
						"img/home/fashion.JPG"
					]
				],
				texts:[
					[
						"Recorta tu imagen",
						"con solo un clic",
						"Dale a tus fotos un toque personal",
						"desde el panel de efectos"
					],
					[
						"Sube tus imágenes...",
						"...descárgalas donde quieras",
					],
					[
						/*
						"Crea tu propia marca de agua",
						"Realiza fusiones con tus imágenes preferidas",
						"Genera una nueva textura"
						*/
						""
					],
				],
				videos:[
					[
						"video/video_cut_biedit.mp4"
					],
					[
						"video/video_cut_biedit.mp4",
						"video/filtro_byn.mp4"
					],
					[
					]
				],
				effects:{
					1:{
						opacity:true,
						//scale
						width:false,
						//scale
						height:false,
						//solo texto
						fontSize:false,
						scaleRotate:false,
						scale:false,
						positionTop:true,
						modeText:true,
						modeVideo:false,
					//solo imágenes
						widthHTML:null,
					//solo textos
						fontSizeStyle:"20px",
					},
					2:{
						opacity:true,
						width:false,
						height:false,
						fontSize:false,
						positionLeft:true,
						widthHTML:150,
						modeVideo:true,
					},
					3:{
						opacity:false,
						modeText:true,
						positionLeft:false,
						scaleRotate:true,					
						fontSizeStyle:"20px"
					}
				},
				order:{
					0:[1,3],
					1:[1,2,3],
					2:[1,3],
					3:[1,2,3],
				}
			},
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
	mounted(){
	//slider vue
		//this.$refs.primary.sync(this.$refs.secondary.splide);
	},
}
</script>