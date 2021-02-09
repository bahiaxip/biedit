<template>
	<div >		
		<!--<div class="back-effect-panel" :style="{'padding-top':'10px'}" v-if="ima.width!=null && !displayLoading" >-->
		<div class="" :style="{'padding-top':'10px'}" v-if="ima.width!=null && !displayLoading" >
			<div style="margin:auto;text-align:center" >
				<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="rotate('left')" title="Rotación Izquierda">
					<md-icon class="">rotate_left</md-icon>
				</md-button>
				<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="rotate('top_bottom')" title="Rotación Vertical">
					<md-icon class="">loop</md-icon>
				</md-button>
				<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="rotate('right')" title="Rotación Derecha">
					<md-icon class="">rotate_right</md-icon>
				</md-button>
				<md-menu class="" md-align-trigger>
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger title="Filtros">
						<md-icon class="">settings_brightness</md-icon>
					</md-button>
					<md-menu-content class="menu_filter" :style="{'max-height':imaEffect.height+'px'}">
						<md-menu-item @click="filter('none')" title="Desactivar filtro">
							<md-icon class="">clear</md-icon>						
						</md-menu-item>

						<md-menu-item @click="confirmChange('filter')" title="Aplicar filtro" v-if="filterActivated" >
							<md-icon class="">check</md-icon>
						</md-menu-item>

						<md-menu-item @click="filter('grayscale')" class="byn" title="Blanco y negro">
							<md-icon class="">filter_b_and_w</md-icon>	
						</md-menu-item>

						<md-menu-item @click="filter('sepia')" class="sepia" title="Sepia">
							<md-icon class="">filter_b_and_w</md-icon>					
						</md-menu-item>

						<md-menu-item @click="filter('brightness')" title="Brillo">
							<md-icon class="">brightness_5</md-icon>	
						</md-menu-item>

						<md-menu-item @click="filter('contrast')" title="Contraste">
							<md-icon class="">brightness_6</md-icon>					
						</md-menu-item>
						
					</md-menu-content>
				</md-menu>
				<md-menu class=" " md-align-trigger style="margin-left:10px">
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger title="Formas">
						<md-icon class="">exposure</md-icon>
					</md-button>
					<md-menu-content class="menu_filter" :style="{'max-height':imaEffect.height+'px'}">					
						<md-menu-item title="Desactivar forma" @click="deleteDrawCanvas()">
							<md-icon>clear</md-icon>	
						</md-menu-item>
						<md-menu-item @click="confirmChange('shapes')" title="Aplicar recorte"  v-if="polygonActivated">
							<md-icon>check</md-icon>	
						</md-menu-item>
						<md-menu-item title="Cuadrado" @click="poligono(polygon.square)">
							<md-icon style="transform:rotate(45deg)" md-src="img/shapes/square.svg"></md-icon>	
						</md-menu-item>
						<md-menu-item title="Círculo" @click="poligono(polygon.circle)">
							<md-icon md-src="img/shapes/circle.svg"></md-icon>
						</md-menu-item>
						<md-menu-item title="Triángulo" @click="poligono(polygon.triangle)">
							<md-icon md-src="img/shapes/triangle.svg"></md-icon>
						</md-menu-item>
						<md-menu-item title="Estrella" @click="poligono(polygon.star)">
							<md-icon>star</md-icon>
						</md-menu-item>
						<md-menu-item title="Pentágono" @click="poligono(polygon.penta)">
							<md-icon md-src="img/shapes/pentagon.svg"></md-icon>
						</md-menu-item>
						<md-menu-item title="Hexágono" @click="poligono(polygon.hexa)">
							<md-icon md-src="img/shapes/hexagon.svg"></md-icon>	
						</md-menu-item>
						<md-menu-item title="Heptágono" @click="poligono(polygon.hepta)">
							<md-icon md-src="img/shapes/heptagon.svg"></md-icon>	
						</md-menu-item>
						<md-menu-item title="Octágono" @click="poligono(polygon.octa)">
							<md-icon md-src="img/shapes/octagon.svg"></md-icon>	
						</md-menu-item>
						<!--
						<md-menu-item>
							<md-icon md-src="shapes/nonagon.png"></md-icon>	
						</md-menu-item>
					-->
						<md-menu-item title="Nonágono" @click="poligono(polygon.nona)">
							<md-icon>
								<img src="img/shapes/nonagon.png">
							</md-icon>
						</md-menu-item>
						
					</md-menu-content>
				</md-menu>
				<md-menu class="" md-align-trigger style="margin-left:10px">
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger>
						<md-icon class="">adjust</md-icon>
					</md-button>
					<md-menu-content class="menu_filter" :style="{'max-height':imaEffect.height+'px'}">
					<!--
						<md-menu-item>
							<md-icon></md-icon>
						</md-menu-item>
						<md-menu-item>
							<md-icon>Vignete</md-icon>
						</md-menu-item>
						<md-menu-item>Horizontal</md-menu-item>
						<md-menu-item>Viñeta</md-menu-item>
						<md-menu-item>Remolino</md-menu-item>
						<md-menu-item>Oleo</md-menu-item>
						<md-menu-item>Redondear</md-menu-item>
						<md-menu-item>Onda</md-menu-item>
					-->
						<md-menu-item title="Polaroid" @click="setEffect('polaroid')">
							<md-icon md-src="img/effect/polaroid.svg"></md-icon>	
						</md-menu-item>
						<md-menu-item title="Reflejo Vertical" @click="setEffect('vertical')">
							<md-icon md-src="img/effect/vertical.svg"></md-icon>
						</md-menu-item>
						<md-menu-item title="Reflejo Horizontal" @click="setEffect('horizontal')">
							<md-icon>swap_horiz</md-icon>
						</md-menu-item>
						<md-menu-item title="Viñeta" @click="setEffect('vignette')">
							<md-icon>vignette</md-icon>
						</md-menu-item>
						<md-menu-item title="Remolino" @click="setEffect('remolino')">
							<md-icon>toys</md-icon>	
						</md-menu-item>
						<md-menu-item title="Onda" @click="setEffect('onda')">
							<md-icon>waves</md-icon>	
						</md-menu-item>
						<md-menu-item title="Oleo" @click="setEffect('oleo')">
							<md-icon>toys</md-icon>	
						</md-menu-item>
						<md-menu-item title="Redondear" @click="setEffect('esquinas')">
							<md-icon>supervised_user_circle</md-icon>	
						</md-menu-item>
						<md-menu-item title="Gaussiano" @click="setEffect('gaussiano')">
							<md-icon >grain</md-icon>	
						</md-menu-item>

						<!--
						<md-menu-item>
							<md-icon md-src="shapes/nonagon.png"></md-icon>	
						</md-menu-item>
					-->
						<md-menu-item>
							<md-icon>
								<img src="shapes/nonagon.png">
							</md-icon>
						</md-menu-item>
						
					</md-menu-content>
				</md-menu>
				<!--<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="setHeightCanvas()">
					<md-icon class="">adjust</md-icon>
				</md-button>-->


				<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="reflex('vertical')" title="Reflejo Vertical">
					<md-icon class="">swap_vert</md-icon>
				</md-button>

				<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="reflex('horizontal')" title="Reflejo Horizontal">
					<md-icon class="">swap_horiz</md-icon>
				</md-button>
				<!--<div style="margin:auto;text-align:center" >-->
			</div>	
					
					
					<!--
					<md-button class="md-icon-button floatL md-raised md-accent" @click="filtro('image','sepia')">
						<md-icon class="sepia">exposure</md-icon>
					</md-button>
					<md-button class="md-icon-button floatR md-raised md-accent" @click="filtro('image','brillo')">
						<md-icon class="brillo">brightness_5</md-icon>
					</md-button>
					<md-button class="md-icon-button floatR md-raised md-accent" @click="filtro('image','contraste')">
						<md-icon class="contraste">brightness_6</md-icon>
					</md-button>
				-->			
					<!--<md-menu md-align-trigger>
						<md-button md-menu-trigger class="md-raised md-accent">
							Efectos
						</md-button>
						<md-menu-content class="list-effects">
							<md-menu-item>Polaroid</md-menu-item>
							<md-menu-item>Vertical</md-menu-item>
							<md-menu-item>Horizontal</md-menu-item>
							<md-menu-item>Viñeta</md-menu-item>
							<md-menu-item>Remolino</md-menu-item>
							<md-menu-item>Oleo</md-menu-item>
							<md-menu-item>Redondear</md-menu-item>
							<md-menu-item>Onda</md-menu-item>
						</md-menu-content>
					</md-menu>-->



					<!--
					<md-switch class="colorB" v-model="resizeSwitch" title="Mostrar interfaz">
					</md-switch>
					-->
					
				<!--</div>
				<div style="margin:auto;text-align:center" v-if="resizeSwitch">
					
				</div>-->
		<!-- transition muy parecido al panel principal
				<transition name="fade" >
					<div id="div-main" class="div-main no-selectable" :style="{width:ima.width+'px',height:ima.height+'px'}" ref="divmain" v-if="imgTrans">
						<div class="main-panel">
							<canvas id="canvas" class="no-selectable" :width="ima.width" :height="ima.height" ></canvas>

							<img :src="ima.name" id="image" class="main-img no-selectable" :width="ima.width" :height="ima.height" :class="{'main-img-resize':resizeSwitch}" ref="image" style="position:relative"/>						
						</div>					
					</div>
				</transition>
		-->
				

				<!--<transition name="fade">
					
						<div id="" class="" style="width:100%;margin:20px auto;height:100%;display:flex"  v-if="imgTrans">				<div style="width:60%;margin:auto">
								<canvas id="canvas" class=""  :style="{'margin':'auto'}" :width="imaEffect.width" :height="imaEffect.height" ref="canvas"></canvas>

								<img :src="ima.name" id="image" class="" ref="image" style="width:100%;height:100%;max-width:600px"/>
							</div>
							<div class="sidebar" style="margin:10px auto;width:40%;border:black 1px solid;padding:10px;display:flex">
								<div style="width:100%">
								
									<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger >
										<md-icon class="">adjust</md-icon>
									</md-button>
								</div>
								<div style="width:100%">
									<md-speed-dial md-event="click" md-direction="bottom">
										<md-speed-dial-target class="md-icon-button">
											<md-icon class="md-morph-initial">add</md-icon>
											<md-icon class="md-morph-final">edit</md-icon>
										</md-speed-dial-target>

										<md-speed-dial-content>
											<md-button class="md-icon-button">
												<md-icon>note</md-icon>
											</md-button>

											<md-button class="md-icon-button">
												<md-icon>event</md-icon>
											</md-button>
										</md-speed-dial-content>
									</md-speed-dial>
									<md-speed-dial md-event="click" md-direction="bottom">
										<md-speed-dial-target class="md-icon-button">
											<md-icon class="md-morph-initial">add</md-icon>
											<md-icon class="md-morph-final">edit</md-icon>
										</md-speed-dial-target>

										<md-speed-dial-content>
											<md-button class="md-icon-button">
												<md-icon>note</md-icon>
											</md-button>

											<md-button class="md-icon-button">
												<md-icon>event</md-icon>
											</md-button>
										</md-speed-dial-content>
									</md-speed-dial>
								</div>
							</div>
							
						</div>
						
					
				</transition>-->

<transition name="fade">
	<div class="md-layout md-gutter" style="margin-top:30px">		
			<div class="md-layout-item md-large-size-15 md-medium-size-10 md-small-size-5" >
			</div>

			<div  class="md-layout-item md-small-size-45 div_effect_image"   v-if="imgTrans" :style="{'text-align':'initial','width':imaEffect.width+'px','height':imaEffect.height+'px','display':'flex'}" ref="div_effect_image">				

					<canvas id="canvas" class=""  :style="{'margin':'auto','display':'flex'}" :width="imaEffect.width" :height="imaEffect.height" ref="canvas"></canvas>
					<div class="image_effect" :style="{'display':'block','backgroundImage':'url('+ima.name+')','width':imaEffect.width+'px','height':imaEffect.height+'px','position':'relative','background-size':'100%','background-repeat':'no-repeat','background-position':'center'}" ref="image_effect">
						
					</div>
					<!-- mantenemos la imagen para obtener las medidas, ya que el md-layout redimensiona el elemento img pero no el elemento div aunque tenga una imagen incrustada con url en los estilos CSS-->
					<!-- ya no es necesario-->
					<!--<img :src="ima.name" id="image" class="" ref="image" style="min-width:200px;opacity:0"/>-->
					
			</div>
			<!--botones de sidebar -->
			<div class="md-layout-item md-layout md-gutter md-small-size-45" >

				<div class="md-layout-item md-xlarge-size-50 md-medium-size-50 md-small-size-100" style="">
						<!--<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="reflex('vertical')">
							<md-icon class="">swap_vert</md-icon>
						</md-button>
						<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="reflex('horizontal')">
							<md-icon class="">swap_horiz</md-icon>
						</md-button>
						<div style="clear:left"></div>-->
												
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="showRangeCompress()" >
						<md-icon md-src="img/effect/zip-box.svg" ></md-icon>
						<md-tooltip>Compresión</md-tooltip>
					</md-button>
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="showRangeTexturize()" >
						<md-icon class="">texture</md-icon>
						<md-tooltip>Texturizar</md-tooltip>
					</md-button>

					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger  @click="showSpaceColor()">
						<md-icon md-src="img/effect/monitor-eye.svg"></md-icon>
						<md-tooltip>Espacio de color</md-tooltip>
					</md-button>						
				<!--espacio de color -->
					<div style="margin-top:10px;" v-if="spaceColorActive">
						<md-field style="">
							<label for="spaceColor">Espacio de Color</label>
							<md-select  v-model="spaceColorSelected" name="spaceColor" id="spaceColor" @input="selectSpaceColor()">
								<md-option v-for="spacecolor in spacecolors" :key="spacecolor" :value="spacecolor">{{spacecolor}}
									
								</md-option>
								
								
							</md-select>
						</md-field>
						
						<div style="clear:left"></div>								
					</div>
				<!-- range compression -->
					<div style="margin-top:10px;display:block" v-if="rangeCompressActive">

						<label for="range_compress" title="Tipo de compresión"><span style="color:blue;font-weight:bold">{{rangeCompress}}</span></label>

						<div style="clear:left"></div>
						<!--detectar si es png o jpg para mostrar minimo y máximo distinto-->
						<input name="range_compress" type="range" min="1" max="100" v-model="rangeCompress" v-if="this.ext=='jpg'"/>
						<input name="range_compress" type="range" min="0" max="4" v-model="rangeCompress" v-if="this.ext=='png'"/>

						<div style="clear:left"></div>

						<!--<md-button class="md-icon-button md-raised md-dense md-accent"  md-menu-trigger @click="compress(0)">
							<md-icon class="">cancel</md-icon>
						</md-button>-->

						<md-button class="md-icon-button md-raised md-dense md-primary"  md-menu-trigger @click="setCompress(rangeCompress)">
							<md-icon class="">check_circle_outline</md-icon>
							<md-tooltip>Comprimir imagen</md-tooltip>
						</md-button>
					</div>
				<!-- range texturize -->
					<div style="margin-top:10px;display:block" v-if="rangeTexturizeActive">

						<label for="range_texturize" style="color:blue;font-weight:bold">{{'x'+rangeTexturize}}</label>
						<div style="clear:left"></div>
						<input name="range_texturize" type="range" min="1" max="10" step="1" v-model="rangeTexturize" @change="texturize(rangeTexturize)"/>

						<div style="clear:left"></div>

						<md-button class="md-icon-button md-raised md-dense md-accent"  md-menu-trigger @click="texturize(0)">
							<md-icon class="">cancel</md-icon>
							<md-tooltip>Deshacer</md-tooltip>
						</md-button>

						<md-button class="md-icon-button md-raised md-dense md-primary"  md-menu-trigger @click="texturize(rangeTexturize)">
							<md-icon class="">check_circle_outline</md-icon>
							<md-tooltip>Aplicar texturización</md-tooltip>
						</md-button>
					</div>
					<div style="clear:left"></div>
				<!-- composite -->
				<div class="" style="margin-top:20px">
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="showComposite()">
						<md-icon md-src="img/effect/layers-plus_white.svg"></md-icon>
						<md-tooltip>Composición</md-tooltip>
					</md-button>							
					<md-button class="md-icon-button  md-raised md-accent md-dense"  md-menu-trigger @click="cancelComposite()"  style="margin-top:5px" v-if="compositeActive">
						<md-icon >clear</md-icon>
						<md-tooltip>Deshacer Composición</md-tooltip>
					</md-button>
					<md-button class="md-icon-button  md-raised md-primary md-dense"  md-menu-trigger @click="setComposite()" title="Crear composición" style="margin-top:5px" v-if="this.compositeSelectedId">
						<md-icon class="">check</md-icon>
					</md-button>
				</div>
					<div style="clear:left"></div>							
					<!--composite -->
					<div style="margin-top:10px;" v-if="compositeActive">
						<md-list :md-expand-single="expandSingle">
							<md-list-item md-expand :md-expanded.sync="expandCompositeSelect">
								<span v-html="compositeSelectedHtml"></span>
								<md-list slot="md-expand" >
									<md-list-item v-for="image in filteredImages" :key="image.id" @click="selectComposite(image)" >
										<span   :title="image.title" > 
											<md-avatar>
												<img :src="url+'get-image/'+image.thumb"/>
											</md-avatar>
											{{image.title}}
										</span>
								</md-list-item>										
								</md-list>
							</md-list-item>
						</md-list>
					</div>
				</div>
				<!-- botones de reflejo horizontal y vertical -->

				<div class="md-layout-item md-xlarge-size-50 md-medium-size-50 md-small-size-100">
						<md-speed-dial md-event="click" md-direction="bottom">
							<md-speed-dial-target class="md-icon-button md-dense">
								<md-icon class="md-morph-initial ">add</md-icon>
								<md-icon class="md-morph-final">edit</md-icon>
							</md-speed-dial-target>

							<md-speed-dial-content>
								<md-button class="md-icon-button ">
									<md-icon>note</md-icon>
								</md-button>

								<md-button class="md-icon-button">
									<md-icon>event</md-icon>
								</md-button>
							</md-speed-dial-content>
						</md-speed-dial>
						<md-speed-dial md-event="click" md-direction="bottom">
							<md-speed-dial-target class="md-icon-button md-dense">
								<md-icon class="md-morph-initial">add</md-icon>
								<md-icon class="md-morph-final">edit</md-icon>
							</md-speed-dial-target>

							<md-speed-dial-content>
								<md-button class="md-icon-button">
									<md-icon>note</md-icon>
								</md-button>

								<md-button class="md-icon-button">
									<md-icon>event</md-icon>
								</md-button>
							</md-speed-dial-content>
						</md-speed-dial>
				</div>
			</div>

			<div class=" md-layout-item md-large-size-15 md-medium-size-10 md-small-size-5">

			</div>
		
	</div>	
</transition>

				<md-dialog-confirm class="confirmEffect"
				:md-active.sync="dialogConfirmActive"
				:md-title = "dialog_selected"
				md-confirm-text="OK"
				md-cancel-text="Cancelar"
				@md-cancel="cancelChange"
				@md-confirm="setChange" />
	<!--
				<md-dialog-alert class="confirmDialog"
				:md-active.sync="dialogErrorActive"
				md-title = "Ocurrió un error"
				:md-content = "msgeDialogAlert"
				md-confirm-text="OK" />

				<md-dialog-alert class="confirmDialog"
				:md-active.sync="dialogSuccessActive"
				md-title = "Creado correctamente"
				:md-content = "msgeDialogAlert"
				md-confirm-text="OK" />
			-->
				
		</div>
		<md-dialog :md-active.sync="dialogImage" class="effect_dialog" >
			<img :src="url+'get-image/'+tmpImage.random_name" v-if="tmpImage" :width="ima.width" :height="ima.height"/>
			<!-- colocar una transición o un interruptor para aparezca un poquito
				después que la imagen -->
			<div style="position:absolute;top:50%;left:50%;margin:auto;background-color:white;padding:20px;transform:translate(-50%,-50%)" v-if="tmpImage">
				<p>¿Cargar la nueva imagen?</p>
				<md-button style="" class="md-raised md-accent" @click="setTmpImage()">
					OK
				</md-button>
				<md-button @click="cancelLoadImage()">
					Cancelar
				</md-button>				
			</div>
			
			<div v-else style="text-align:center;"><!--aquí el md-spinner-->
				<md-progress-spinner class="md-accent" :md-diameter="100" md-mode="indeterminate" ></md-progress-spinner >
			</div>
			
		</md-dialog>
	</div>
</template>
<script>
import methodsMixin from '../mixins/methodsMixin';
import Global from '../Global.js';
import axios from 'axios';
export default {
	name:'Effect',
	props:['ima'],
	mixins:[methodsMixin],
	data(){
		return{			
			url:Global.url,
			imaEffect:{
				width:null,
				height:null
			},
			images:null,
			ext:null,
			resizeSwitch:false,
			imgTrans:false,
			dialogConfirmActive:false,
			dialog_title:{
				filter:"¿Aplicar el filtro seleccionado?",
				shapes:"¿Aplicar el recorte con la forma seleccionada?",
			},
			dialog_selected:null,
			type:null,			
			minWidthHeight:Global.minWidthHeight,			
			filterActivated:false,
			filterProp:null,			
			polygonActivated:false,
			polygon:{
				square:4,
				circle:0,
				triangle:3,
				star:14,
				penta:5,
				hexa:6,
				hepta:7,
				octa:8,
				nona:9
			},
			polygonProp:null,
			effectActivated:false,
			effectProp:null,
			dialogImage:false,
			tmpImage:null,
			displayLoading:false,
			rangeTexturizeActive:false,
			rangeTexturize:1,
			texturizeActivated:false,
			rotateActivated:false,
			rangeCompressActive:false,
			rangeCompress:80,
			spaceColorActive:true,
			spaceColor:null,
			spaceColorSelected:null,
			spacecolors:["RGB","CMYK","SRGB"],
			compositeActive:false,
			compositeSelectedHtml:"Seleccionar",
			compositeSelectedId:null,
			expandSingle:true,
			expandCompositeSelect:false



		}
	},
	computed:{
		selectedSpaceColor(){
			console.log(this.spaceColorSelected);
			return this.spaceColor =="rgb" ? "":this.spaceColor;
			
		},
		filteredImages(){			
			return this.images.filter(image=>
				image.random_name != this.ima.src
			)
		}
	},
	created(){
		
	},
	mounted(){
		if(this.ima){
			console.log("llega this.ima: ",this.ima);
			window.addEventListener("resize", this.updateSizeCanvas);
		}

		//error al establecer width, height y problemas con
		if(this.ima && this.ima.width){
			this.getTotalImages();
			console.log("llega this.ima y this.ima.width");	
			console.log("mounted: ",this.ima);
			//activación de efecto transición
			this.imgTrans=true;
			//asignamos el colorspace
			this.spaceColorSelected=this.ima.spaceColor;
			console.log("spacecolor: ",this.spaceColorSelected);
	
	//anulado, esto no hace nada, se mantienen las medidas por el md-layout
			
			//obtenemos las medidas
			/*		
			let sizes=this.setSizeToMainPanel(this.ima.widthInitial,this.ima.heightInitial,this.minWidthHeight,this.ima.widthDefault);
			this.ima.width=sizes.width;
			this.ima.height=sizes.height;
			console.log(this.ima.widthDefault);
			console.log(sizes);	
			console.log("thisima2: ",this.ima);
			*/
		}
		//actualizamos canvas y el div con setTimeout, ya que estamos recuperando el 
		//width y el height del template una vez obtenido por la redimensión del 
		//md-layout y no se puede obtener hasta que no se carga la vista, por ello se encierra en un setTimeout
		setTimeout(() => {
				this.updateSizeCanvas();
		},100)
	},
	updated(){
		//asignamos en la variable this.ext la extensión de la imagen para mostrar un 
		//tipo de input (range) u otro.
		if(this.ima.src){
			let ext=this.ima.src.split(".").pop();			
			console.log("desde updated: ",ext)
			if(ext.toLowerCase()=="png")
				ext="png";
			else if(ext.toLowerCase()=="gif")
				ext="gif";
			else
				ext="jpg";
			
			this.ext=ext;
		}
		console.log(this.ext);
		
	/*
		let width=this.$refs.image.clientWidth;
		let height=this.$refs;		
		console.log(width);
		console.log(height);		
		this.$refs.canvas.width=width;
	*/
	},
	destroyed(){
		//detectamos si existe un filtro seleccionado antes de salir
		if(this.filterActivated){
			alert("Desea descartar el filtro seleccionado?");
		}
	},
	methods:{
		getTotalImages(){
			if(sessionStorage.getItem("biedit_apitoken")){
				let api_token=sessionStorage.getItem("biedit_apitoken");
				let email=sessionStorage.getItem("biedit_email");
				let data={
					params:{
						api_token:api_token,
						email:email,
						total:"true"
					}
				};
				let headers={
					headers: {
						Authorization: 'Bearer '+sessionStorage.getItem("biedit_apitoken")
					}
				};
				axios.get(this.url+'images',data,headers).then(res=>{
					this.images=res.data.images;
					console.log("las imagenes: ",this.images);
				})
			}
		},
		selectComposite(image){
			console.log("hola: ",image);			
			//añadimos el span al select
			this.compositeSelectedHtml=
			`<span title=`+image.title+`>
				<md-avatar>
					<img width="48" src=`+this.url+'get-image/'+image.thumb+`/>
				</md-avatar>`
			+image.title+`</span>`;
			//asignamos id para poder identificar la imagen en el server
			this.compositeSelectedId=image.id;
			//replegamos el select 
			this.expandCompositeSelect=false;
		},
		cancelComposite(){
			this.compositeSelectedHtml="Seleccionar";
			this.compositeSelectedId=null;
			this.compositeActive=false;
		},
		selectSpaceColor(){			
			console.log("spaceColorSelected: ",this.spaceColor);
		},
		showComposite(){
			if(this.compositeActive){
				this.compositeActive=false;
			}else{
				this.compositeActive=true;	
			}
			
		},
		showSpaceColor(){
			if(this.rangeCompressActive || this.rangeTexturizeActive){
				this.rangeCompressActive=false;
				this.rangeTexturizeActive=false;
			}
			if(this.spaceColorActive){
				this.spaceColorActive=false;
			}else{
				this.spaceColorActive=true;
			}
		},
		//mostrar/ocultar input range de texturize
		showRangeTexturize(){
			if(this.rangeCompressActive || this.spaceColorActive)
				this.rangeCompressActive=false;
				this.spaceColorActive=false;
			if(this.rangeTexturizeActive){
				this.rangeTexturizeActive=false;
				console.log(this.rangeTexturize);
			}else{
				this.rangeTexturizeActive=true;
			}
		},
		showRangeCompress(){
			if(this.rangeTexturizeActive || this.spaceColorActive)
				this.rangeTexturizeActive=false;
				this.spaceColorActive=false;
			if(this.rangeCompressActive){
				this.rangeCompressActive=false;
				//console.log(this.rangeTexturize);
			}else{
				this.rangeCompressActive=true;
			}
		},

		//crea un efecto de textura 
		//oculta el image y genera un background con la imagen, el range 0,
		//está destinado a la cancelación y vuelve al estado anterior.
		texturize(range){
			let imaStyle=this.$refs.image_effect.style;
			//let imaStyle2=this.$refs.div_effect_image.style;
						
				//imaStyle.width=this.imaEffect.width+"px";
				//imaStyle.height=this.imaEffect.height+"px";
			
			if(range==0 || range==1){				
				imaStyle.backgroundSize="100%";
				imaStyle.backgroundRepeat="no-repeat";
				this.rangeTexturize=1;
				
			}else{
				//asignamos las medidas de la repetición en función del rango que se 
				//pasa como parámetro
				let width=this.imaEffect.width/range;				
				let height=this.getNewHeight(width,this.imaEffect.width,this.imaEffect.height);
				console.log("imaEffectwidth: ",this.imaEffect.width);
				console.log("imaEffectheight: ",this.imaEffect.height);
		//anulado
		/*
				//si el efecto de rotación está activado y no es la rotación vertical, 
				//es decir, está volcado para uno de los lados, se invierte el ancho x 
				//el alto en el div padre y se establece un margin al div hijo
				if(this.rotateActivated && imaStyle2.transform!="rotate(180deg)"){
					imaStyle2.width=this.imaEffect.height+"px";
					imaStyle2.height=this.imaEffect.width+"px";
					imaStyle.width=this.imaEffect.width+"px";
					imaStyle.height=this.imaEffect.height+"px";
					//imaStyle.width=this.imaEffect.height+"px";
					let newMargin=this.getMarginToCenter(this.imaEffect.width,this.imaEffect.height);

					imaStyle.margin=newMargin+"px auto";
					
				}else{
					//
				}
				//imaStyle2.width=this.imaEffect.width+"px";
				//imaStyle2.height=this.imaEffect.width+"px";
				//imaStyle.width=this.imaEffect.width+"px";
				//imaStyle.height=this.imaEffect.height+"px";
				//imaStyle.width=this.imaEffect.height+"px";
				//let newMargin=this.getMarginToCenter(this.imaEffect.width,this.imaEffect.height);
		*/
				//heightBackground=this.getNewHeight(this.imaEffect.width,)
					imaStyle.width=this.imaEffect.width+"px";
					imaStyle.height=this.imaEffect.height+"px";
				//imaStyle.margin="auto";
				imaStyle.backgroundSize=width+"px "+height+"px";
				//imaStyle.backgroundImage="url(http://localhost/biedit_backend/api/get-image/"+this.ima.src+")";
				imaStyle.backgroundRepeat="repeat";
				//this.$refs.image.style.opacity="0";	
				//imaStyle.display="block";
			}
			(imaStyle.backgroundRepeat!="no-repeat") ? 
				this.texturizeActivated=true:this.texturizeActivated=false;
			console.log(this.texturizeActivated);
			
		},
		setCompress(range){
			if(this.testToken){
				let apitoken=sessionStorage.getItem("biedit_apitoken");
				let email=sessionStorage.getItem("biedit_email");
				let data={
					range:range,
					email:email,
					image:this.ima.src
				}
				let headers={
					headers:{
						Authorization: 'Bearer '+apitoken
					}
				}
				axios.post(this.url+'compress',data,headers).then((res)=> {
					console.log(res);
					if(res.data.image){
						this.dialogImage=true;						
						this.tmpImage=res.data.image;
						console.log("tmpImage2: ",this.tmpImage);
						//console.log(this.tmpImage);
						console.log("dialog_image",res.data.image);
					}else{
						//console.log(res.data.data);
						console.log("hubo un error");
					}
				});
				
			}
			
			

		},
		testToken:()=>{
			if(sessionStorage){
				if(!sessionStorage.getItem("biedit_apitoken") || !sessionStorage.getItem("biedit_email"))
					return "El usuario no ha iniciado sesión";
				return true;
				
			}else{
				return "El navegador no soporta sessionStorage";
			}

		},
		cancelTexturize(){

		},
		//método devuelve el margin para centrar un elemento dentro de un div
		getMarginToCenter(totalSize,sizeToCenter){
			return (parseInt(totalSize)-sizeToCenter)/2;

		},
		//rotación con transform de todo el div e intercambiando el width por el 
		//height del div si la rotación es lateral, para que no se solape
		rotate(side){			
			
			//detectamos primero si existe algún efecto activado y si no ...

			let d=this.$refs.image_effect.style;
			let d2=this.$refs.div_effect_image.style;
			
			if(side=="left" || side=="right"){
				if(side=="left"){					
					if(d2.transform=="rotate(270deg)"){						
						d2.transform="rotate(0deg)";
						//establecemos ancho y alto al div padre
						d2.width=this.imaEffect.width+"px";
						d2.height=this.imaEffect.height+"px";
						//devolvemos el margin anterior
						d.margin="auto";				
						this.$refs.canvas.style.margin='auto';
						
					}else{
						d2.transform="rotate(270deg)";
						//establecemos ancho y alto inverso al div padre
						d2.width=this.imaEffect.height+"px";
						d2.height=this.imaEffect.width+"px";
						
						//obtenemos el margin de cada lado para centrar el canvas
						let newMargin=this.getMarginToCenter(this.imaEffect.width,this.imaEffect.height);		console.log(newMargin);
						d.margin=newMargin+"px auto";
						this.$refs.canvas.style.margin=newMargin+'px auto';
					}
				}else if(side=="right"){
					if(d2.transform=="rotate(90deg)"){
						d2.transform="rotate(0deg)";
						//devolvemos el ancho y alto del div padre
						d2.width=this.imaEffect.width+"px";
						d2.height=this.imaEffect.height+"px";
						d.margin="auto";
						//devolvemos el margin anterior						
						this.$refs.canvas.style.margin='auto';
					}else{
						d2.transform="rotate(90deg)";
						//establecemos ancho y alto inverso al div padre
						d2.width=this.imaEffect.height+"px";
						d2.height=this.imaEffect.width+"px";						
						//obtenemos el margin de cada lado para centrar el canvas
						let newMargin=this.getMarginToCenter(this.imaEffect.width,this.imaEffect.height);		console.log(newMargin);
						d.margin=newMargin+"px auto";				
						this.$refs.canvas.style.margin=newMargin+'px auto';
					} 
						
				}				
				
				
			}else{

				(d2.transform=="rotate(180deg)" || side==null) ? 
					d2.transform="rotate(0deg)": d2.transform="rotate(180deg)";
					//devolvemos margin y dimensiones anteriores
				d.margin="auto";
				d2.width=this.imaEffect.width+"px";
				d2.height=this.imaEffect.height+"px";
				this.$refs.canvas.style.margin='auto';
			}
			//activamos/desactivamos rotate
			(d2.transform=="rotate(0deg)") ? 
				this.rotateActivated=false:this.rotateActivated=true;
			console.log(this.rotateActivated);
			
		},
		reflex(type){
			let d=this.$refs.div_effect_image.style;
			if(type=="vertical"){
				(d.transform=="scaleY(-1)") ?
					d.transform="scaleY(1)": d.transform="scaleY(-1)";
				d.width=this.imaEffect.width+"px";
				d.height=this.imaEffect.height+"px";
			}else{
				(d.transform=="scaleX(-1)") ?
					d.transform="scaleX(1)":d.transform="scaleX(-1)";
			}

			
			

		},
		//prueba redondeo esquinas, sin acabar
		roundCorners(){
			let canvas=this.$refs.canvas;

			if(canvas && canvas.getContext){
				var ctx= canvas.getContext("2d");
				if(ctx){
					//ctx.fillStyle = "#6ab150";
					//relleno
					ctx.fillStyle = "rgba(0,0,0,.1)";
					//ctx.strokeStyle="black";
					//borde
					ctx.strokeStyle="rgba(0,0,0)";
					ctx.lineWidth=3;
					//radio
					var r=10;
					//coordenadas del rectángulo
					let x0=50, y0=50,
						x1=200,y1=50,
						x2=200,y2=150,
						x3=50,y3=150;
					ctx.beginPath();
					ctx.moveTo(x3,y3-r);
					ctx.arcTo(x0,y0,x1,y1,r);
					ctx.arcTo(x1,y1,x2,y2,r);
					ctx.arcTo(x2,y2,x3,y3,r);
					ctx.arcTo(x3,y3,x0,y0,r);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
				}
			}
		},
		//actualiza las medidas destinadas al canvas y al div image_effect, una vez se 
		//ha cargado la vista y el md-layout ha asignado automáticamente una medida 
		//al elemento img
		updateSizeCanvas(){
			console.log("desde updateSizeCanvas: ",this.ima);
			this.deleteDrawCanvas();
			
			let width=this.$refs.div_effect_image.clientWidth;
			//let width=document.querySelector(".div_effect_image").clientWidth;
			
			let height=this.getNewHeight(width,this.ima.width,this.ima.height);
			//let height=parseInt(this.$refs.div_effect_image.clientHeight);
			this.imaEffect.width=width;
			this.imaEffect.height=height;
			//si el efecto rotate está activado no actualizamos, ya que al estar
			//las dimensiones invertidas se descoloca la imagen
			if(this.rotateActivated ){
				this.rotate(null);
			}

			this.spaceColorActive=false;
				
			
				
			
			

			
		},
		handleCSS(elemento){
			var prop=[];
			if(document.defaultView && document.defaultView.getComputedStyle){   
			var a=["width","height","top","left","margin-top","margin-left","margin-right","right","border-right-width","border-left-width","border-top-width","border-bottom-width"];
				for(var i in a){    
					prop[i]=parseInt(document.defaultView.getComputedStyle(elemento,null).getPropertyValue(a[i]));
				}
				return prop;
			}
			else{
				//falta currentStyle para IE
				alert("Error document.defaultView (handleCSS method)");
			}
		},	
		cancelLoadImage(){
			//pasamos a null para que se muestre el spinner
			this.tmpImage=null;
			this.dialogImage=false;
		},
		confirmChange(type_effect){
			//Activamos el modal de confirmación de filtro
			
			if(type_effect=='filter'){				
				this.dialog_selected=this.dialog_title.filter;
			}
			else if(type_effect=='shapes'){
				this.dialog_selected=this.dialog_title.shapes;	
			}
			this.dialogConfirmActive=true;
			//asignando datos para setChange()
			this.type=type_effect;
			
			
			console.log("Confirmando...");
		},
		//método al dar OK en la confirmación de un filtro, o recorte de forma
		setChange(){
			if(this.type=="filter"){
				this.setFilter();
			}else if(this.type=="shapes"){
				this.setPolygon()
			}
			console.log("estableciendo cambios en imagen");
			//this.type=null;
			//this.filterProp=null;
		},
		cancelChange(){
			console.log("cancelado");
			this.filter('none');
		},
		//asignamos el filtro solo en pantalla
		filter(prop){
			//asignamos la existencia de una activación de filtro
			this.filterActivated=true;
			console.log("llega afiltro");
			//let ima=document.getElementById('image');
			let ima=this.$refs.image_effect;
			this.filterProp=prop;    
			switch (prop){
				case "grayscale":
					ima.style.filter="grayscale(100%)";					
				break;
				case "sepia":
					ima.style.filter="sepia(150%)";
				break;
				case "brightness":
					ima.style.filter="brightness(150%)";
				break;
				case "contrast":
					ima.style.filter="contrast(150%)";
				break;
				case "none":
					ima.style.filter=prop;
					this.filterActivated=false;
				break;
				default:
					ima.style.filter='none';
					this.filterActivated=false;
			}
		},
		setFilter(){
			console.log("llega a setFilter");
			if(sessionStorage.getItem("biedit_apitoken")){
				let api_token=sessionStorage.getItem("biedit_apitoken");
				let email=sessionStorage.getItem("biedit_email");
				let headers={
					headers:{
						Authorization:'Bearer '+api_token
					}
				}
				let data={
					name:this.ima.src,
					filter:this.filterProp,
					email:email
				};
				console.log(this.filterProp);				
				//desactivamos el filtro de la imagen creado con JavaScript
				this.filter();
				//let d = JSON.stringify(data);
				//solicitar confirmación de ajuste
				axios.post(this.url+'filter',data,headers).then(res=>{
					if(res.data.image){
						this.dialogImage=true;
						this.tmpImage=res.data.image;
						console.log(this.tmpImage);
					}else{
						console.log("hubo un error");
					}
					
				})
			}			
		},
		//Al establecer una nueva imagen arpovechamos el método de recargar la imagen 
		//desde el padre con reloadImage() creado para el componente Collections.
		//Para el filtro no sería necesario, ya que las medidas no cambian
		setTmpImage(){
			//Recordar, el ima.src o image.src es solo el nombre aleatorio y la 
			//extensión, mientras que el ima.name o image.name es la imagen en base64 
			//o la ruta completa redirigiendo a la api ("http://.../get-image/nombrealeatorio.extensión")
			console.log("image desde effect: ",this.tmpImage);			
			this.dialogImage=false;
			this.imgTrans=false;
			//this.$emit("reload",dato);
			//pasamos un callback para que cuando recargue los datos de la imagen 
			//vuelva a crear la transición (aunque no se aprecia en local)
			this.$emit("reload",this.tmpImage,()=>{

					this.imgTrans=true;
					//pasamos a null para que se muestre el spinner
					this.tmpImage=null;
			});
		},
		//sustituido, método está destinado al ancho y alto del panel principal
		//función poligono dibuja un canvas en forma de polígono
	/*
		poligono(sides)
		{  
			if(this.polygonActivated==true){
				//elimina el dibujo canvas, por si existía uno anteriormente
				this.deleteDrawCanvas();
				console.log("llega a deleteDrawCanvas");			
			}else{
				this.polygonActivated=true;
			}
			this.polygonProp=sides;

			
			//elimina el atributo que se haya podido asignar, por si se ha seleccionado uno
			//anteriormente
			//deleteDataPolygon("menu3");

			//var id=data;
			//id.setAttribute("data-polygon",sides);
			//var foto=document.getElementById("foto");
			//deleteDataPolygon("menu3");
			var radio;
			//definimos el radio en función del ancho o el alto más corto
			if(this.ima){
				if(this.ima.width<=this.ima.height)
				{
					radio =this.ima.width/2;
				}
				else
				{
					radio=this.ima.height/2;
				}	
			}
			
			var canvas = document.getElementById("canvas");

			if(canvas && canvas.getContext){
				var ctx= canvas.getContext("2d");
				if(ctx){
					//ctx.fillStyle = "#6ab150";
					//relleno
					ctx.fillStyle = "rgba(0,0,0,.1)";
					//ctx.strokeStyle="black";
					//borde
					ctx.strokeStyle="rgba(0,0,0)";
					ctx.lineWidth=3;

					//var X= canvas.width/2;
					var X= 0;
					//var Y= canvas.height/2;
					var Y= 0;
					var R= radio;
					//el número de lados del polígono
					var L=sides;

					//en caso de circumferencia usamos el método arc(x,y,radio,0,2*Math.PI,false)            
					if(L==0)
					{                
						ctx.translate(canvas.width/2,canvas.height/2);
						ctx.rotate(3*Math.PI/2);
						ctx.beginPath();
						ctx.arc(X,Y,R,0,2*Math.PI,false);
					}
					//en caso de estrella 
					else if(L==14)
					{
						ctx.fillStyle = "rgba(0,0,0,0.1)";
						//en este caso seleccionamos el paso 3 y el lado 7 ya que coincide con el lado 14 al
						//hacer el recorte con PHP
						var paso =3;

						var estrella=7/paso;
						let rad=(2*Math.PI)/estrella;
						ctx.translate(canvas.width/2,canvas.height/2);
						ctx.rotate(3*Math.PI/2);
						ctx.beginPath();
						for(var i=0;i<7;i++)
						{
							const x=X+R*Math.cos(rad*i);
							const y=Y+R*Math.sin(rad*i);
							ctx.lineTo(x,y);
						}
						console.log("estrella");
					}
					else
					{
						//si L==6 el ángulo es de 2PI/6 o sea 60º
						//let rad=(2*Math.PI)/L;
						let rad=(2*Math.PI)/L;
						//parte opcional (rotación del polígono)
						//traslada el contexto en el centro del canvas
						//para poder girar el contexto alrededor del centro
						//ctx.translate(canvas.width/2,canvas.height/2);
						ctx.translate(canvas.width/2,canvas.height/2);
						//ctx.translate(canvas.height/2,canvas.width/2);
						//gira el contexto unos 270deg
						console.log("llega aui");				
						if(L==4)
							//si no se asigna nada o se asigna lo siguiente 		
							//crea un cuadrado invertido
							ctx.rotate(Math.PI/2);

							//cuadrado centrado
							//ctx.rotate(Math.PI/4);
							//ctx.rotate(135*Math.PI/180);
							//ctx.rotate(45*Math.PI/180)

							//igual que cuadrado centrado
							//ctx.rotate(3*Math.PI/4);
						else
							ctx.rotate(3*Math.PI/2);
							//triángulo al revés
							//ctx.rotate(2*Math.PI/4);

						//dibuja el trazado
						ctx.beginPath();
						for(let i=0;i<L;i++)
						{
							const x=X+R*Math.cos(rad*i);
							const y=Y+R*Math.sin(rad*i);
							ctx.lineTo(x,y);
							console.log(x+"->"+y);
						}
					}

				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				}
			}
			else
			{
				console.log("No soporta canvas");return;
			}
		},
	*/
		poligono(sides)
		{  
			if(this.polygonActivated==true){
				//elimina el dibujo canvas, por si existía uno anteriormente
				this.deleteDrawCanvas();
				console.log("llega a deleteDrawCanvas");			
			}else{
				this.polygonActivated=true;
			}
			this.polygonProp=sides;

			
			//elimina el atributo que se haya podido asignar, por si se ha seleccionado uno
			//anteriormente
			//deleteDataPolygon("menu3");

			//var id=data;
			//id.setAttribute("data-polygon",sides);
			//var foto=document.getElementById("foto");
			//deleteDataPolygon("menu3");
			var radio;
			//definimos el radio en función del ancho o el alto más corto
			if(this.imaEffect){
				if(this.imaEffect.width<=this.imaEffect.height)
				{
					radio =this.imaEffect.width/2;
				}
				else
				{
					radio=this.imaEffect.height/2;
				}	
			}
			
			var canvas = document.getElementById("canvas");

			if(canvas && canvas.getContext){
				var ctx= canvas.getContext("2d");
				if(ctx){
					//ctx.fillStyle = "#6ab150";
					//relleno
					ctx.fillStyle = "rgba(0,0,0,.1)";
					//ctx.strokeStyle="black";
					//borde
					ctx.strokeStyle="rgba(0,0,0)";
					ctx.lineWidth=3;

					//var X= canvas.width/2;
					var X= 0;
					//var Y= canvas.height/2;
					var Y= 0;
					var R= radio;
					//el número de lados del polígono
					var L=sides;

					//en caso de circumferencia usamos el método arc(x,y,radio,0,2*Math.PI,false)            
					if(L==0)
					{                
						ctx.translate(canvas.width/2,canvas.height/2);
						ctx.rotate(3*Math.PI/2);
						ctx.beginPath();
						ctx.arc(X,Y,R,0,2*Math.PI,false);
					}
					//en caso de estrella 
					else if(L==14)
					{
						ctx.fillStyle = "rgba(0,0,0,0.1)";
						//en este caso seleccionamos el paso 3 y el lado 7 ya que coincide con el lado 14 al
						//hacer el recorte con PHP
						var paso =3;

						var estrella=7/paso;
						let rad=(2*Math.PI)/estrella;
						ctx.translate(canvas.width/2,canvas.height/2);
						ctx.rotate(3*Math.PI/2);
						ctx.beginPath();
						for(var i=0;i<7;i++)
						{
							const x=X+R*Math.cos(rad*i);
							const y=Y+R*Math.sin(rad*i);
							ctx.lineTo(x,y);
						}
						console.log("estrella");
					}
					else
					{
						//si L==6 el ángulo es de 2PI/6 o sea 60º
						//let rad=(2*Math.PI)/L;
						let rad=(2*Math.PI)/L;
						//parte opcional (rotación del polígono)
						//traslada el contexto en el centro del canvas
						//para poder girar el contexto alrededor del centro
						//ctx.translate(canvas.width/2,canvas.height/2);
						ctx.translate(canvas.width/2,canvas.height/2);
						//ctx.translate(canvas.height/2,canvas.width/2);
						//gira el contexto unos 270deg
						console.log("llega aui");				
						if(L==4)
							//si no se asigna nada o se asigna lo siguiente 		
							//crea un cuadrado invertido
							ctx.rotate(Math.PI/2);

							//cuadrado centrado
							//ctx.rotate(Math.PI/4);
							//ctx.rotate(135*Math.PI/180);
							//ctx.rotate(45*Math.PI/180)

							//igual que cuadrado centrado
							//ctx.rotate(3*Math.PI/4);
						else
							ctx.rotate(3*Math.PI/2);
							//triángulo al revés
							//ctx.rotate(2*Math.PI/4);

						//dibuja el trazado
						ctx.beginPath();
						for(let i=0;i<L;i++)
						{
							const x=X+R*Math.cos(rad*i);
							const y=Y+R*Math.sin(rad*i);
							ctx.lineTo(x,y);
							console.log(x+"->"+y);
						}
					}

				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				}
			}
			else
			{
				console.log("No soporta canvas");return;
			}
		},
		//almacenar imagen con la forma geométrica seleccionada
		setPolygon(){
			console.log("llega a setPolygon");
			if(sessionStorage.getItem("biedit_apitoken")){
				let api_token=sessionStorage.getItem("biedit_apitoken");
				let email=sessionStorage.getItem("biedit_email");
				let headers={
					headers:{
						Authorization:'Bearer '+api_token
					}
				}
				let data={
					name:this.ima.src,
					polygon:this.polygonProp,
					email:email
				};
				console.log("lados: ",this.polygonProp);
				//desactivamos el polígono mostrado en el canvas creado con JavaScript
				this.deleteDrawCanvas();				
				this.dialogImage=true;
				console.log("tmpImage: ",this.tmpImage);
				axios.post(this.url+'polygon',data,headers).then(res=>{
					
					if(res.data.image){
						
						this.tmpImage=res.data.image;
						console.log("tmpImage2: ",this.tmpImage);
						//console.log(this.tmpImage);
						console.log("dialog_image",res.data.image);
					}else{
						//console.log(res.data.data);
						console.log("hubo un error");
					}
					
				})
			}
		},
		//elimina un dibujo en canvas
		deleteDrawCanvas(){
			//pasamos a null polygonProp
			this.polygonProp=null;
			var canvas = document.getElementById("canvas");
			var ctx= canvas.getContext("2d");
			ctx.beginPath();
			//cambiamos this.ima.width por el 
			//canvas.width=this.ima.width; 
			canvas.width=this.imaEffect.width;
			//tb se puede usar el método clearrect pero no funciona en este caso
		},

		setEffect(type_effect){			
			if(sessionStorage){
				if(sessionStorage.getItem("biedit_apitoken")){
					let api_token=sessionStorage.getItem("biedit_apitoken");
					let email=sessionStorage.getItem("biedit_email");
					let headers={
						headers:{
							Authorization:'Bearer '+api_token
						}
					};
					let data={
						name:this.ima.src,
						effect:type_effect,
						email:email
					};
					axios.post(this.url+'effect',data,headers).then(res=>{
						console.log(res);
						if(res.data.image){
							this.dialogImage=true;
							this.tmpImage=res.data.image;
							//console.log(this.tmpImage);
							console.log(res.data.image);
						}else{
							//console.log(res.data.data);
							console.log("hubo un error");
						}
					});
					//console.log(email);		
				}
			}
		}
	},

}
</script>
<style>

.list-effects .md-list{
	background-color:darkblue;	
}
.list-effects .md-list-item-content{
	color:orange;
	text-transform:uppercase;
	cursor:pointer;
}
.list-effects .md-list-item-content:hover{
	color:yellow;

}

.menu_filter {
	box-shadow:none;
	min-width:50px;
	/*max-height:none;*/
}
.menu_filter .md-menu-content {
	margin:auto !important;
	text-align:center !important;
}
.menu_filter .md-list{
	
	/*background:rgba(0,0,0,.2) ;*/
	cursor:pointer;
	/*border-radius:30px;*/
}
.menu_filter .md-list-item .md-icon {	
	margin:auto ;
}
.menu_effect .md-list-item .md-icon {
	margin:auto !important;
	text-align:center !important;
}
.byn .md-icon{
	color:#000 !important;
}
.sepia .md-icon{
	color:#9e5b40 !important;
}

/*spinner*/
.md-progress-spinner{

}

.md-dialog.effect_dialog{
	background-color:rgba(0,0,0,.5);


	/*z-index:5;*/
}

.md-dialog.effect_dialog>:first-child {
	background:transparent !important;
	box-shadow:none;
}

.div_effect_image{
	padding:0px !important;
}

</style>