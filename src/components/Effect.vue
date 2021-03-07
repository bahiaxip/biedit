<template>
	<div >		
		<!--<div class="back-effect-panel" :style="{'padding-top':'10px'}" v-if="ima.width!=null && !displayLoading" >-->
		<div class="" :style="{'padding-top':'10px'}" v-if="ima.width!=null && !displayLoading" >
			<div class="m_auto t_center" >
				<md-button class="md-icon-button  md-raised" :class="btnActive.rotateLeft ? 'accent' : 'md-accent'"  md-menu-trigger @click="rotate('left')" title="Rotación Izquierda">
					<md-icon class="">rotate_left</md-icon>
				</md-button>
				<md-button class="md-icon-button  md-raised md-accent" :class="btnActive.rotateBottom ? 'accent' : 'md-accent'"  md-menu-trigger @click="rotate('top_bottom')" title="Rotación Vertical">
					<md-icon class="">loop</md-icon>
				</md-button>
				<md-button class="md-icon-button  md-raised md-accent" :class="btnActive.rotateRight ? 'accent' : 'md-accent'" md-menu-trigger @click="rotate('right')" title="Rotación Derecha">
					<md-icon class="">rotate_right</md-icon>
				</md-button>

				<div class="btn_clear_check" style="" >
					<md-button class="md-icon-button md-raised md-accent md-dense btn_selected" @click="confirmChange('undoAll')">
						<md-icon>clear</md-icon>
						<md-tooltip>Deshacer todo</md-tooltip>
					</md-button>
					<md-button class="md-icon-button md-raised md-accent md-dense btn_selected" @click="confirmChange('processAll')">
						<md-icon>check</md-icon>
						<md-tooltip>Aplicar cambios</md-tooltip>
					</md-button>
				</div>
		
				<!--<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="setHeightCanvas()">
					<md-icon class="">adjust</md-icon>
				</md-button>-->


				<md-button class="md-icon-button  md-raised " :class="btnActive.reflexVertical ? 'accent' : 'md-accent'" md-menu-trigger @click="reflex('vertical')" title="Reflejo Vertical">
					<md-icon class="c_white">swap_vert</md-icon>
				</md-button>

				<md-button class="md-icon-button  md-raised " :class="btnActive.reflexHorizontal ? 'accent' : 'md-accent'"  md-menu-trigger @click="reflex('horizontal')" title="Reflejo Horizontal">
					<md-icon class="c_white">swap_horiz</md-icon>
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
	<div class="md-layout md-gutter m_top30" v-if="imgTrans">		
			<div class="md-layout-item md-large-size-15 md-medium-size-10 md-small-size-5" >
			</div>

			<div  class="md-layout-item md-medium-size-40 md-small-size-45 div_effect_image"    :style="{'text-align':'initial','width':imaEffect.width+'px','height':imaEffect.height+'px','display':'flex'}" ref="div_effect_image">

					<canvas id="canvas" class=""  :style="{'margin':'auto','display':'flex'}" :width="imaEffect.width" :height="imaEffect.height" ref="canvas" v-if="!loadingImage"></canvas>
					<div class="image_effect" :style="{'display':'block','backgroundImage':'url('+ima.name+')','width':imaEffect.width+'px','height':imaEffect.height+'px','position':'relative','background-size':'100%','background-repeat':'no-repeat','background-position':'center'}" ref="image_effect" v-if="!loadingImage">
					</div>
					<md-progress-spinner md-mode="indeterminate" class="m_auto" v-else></md-progress-spinner>
					<!-- mantenemos la imagen para obtener las medidas, ya que el md-layout redimensiona el elemento img pero no el elemento div aunque tenga una imagen incrustada con url en los estilos CSS-->
					<!-- ya no es necesario-->
					<!--<img :src="ima.name" id="image" class="" ref="image" style="min-width:200px;opacity:0"/>-->
					
			</div>
		<!--botones de sidebar -->
			<div class="md-layout-item md-layout md-gutter md-medium-size-40 md-small-size-50" >

				<div class="md-layout-item md-xlarge-size-50 md-medium-size-50 md-small-size-100" style="">
					<md-menu class="md_menu_custom" md-align-trigger style="">
						<md-button class="md-icon-button  md-raised" :class="btnActive.filter ? 'accent':'md-accent'"  md-menu-trigger @click="btnActive.filter=true;testGButton1('filter')">
							<md-icon class="c_white">settings_brightness</md-icon>
						</md-button>
						<md-tooltip md-direction="top">Filtros</md-tooltip>
						<md-menu-content class="menu_filter" :style="{'max-height':imaEffect.height+'px'}">
							<md-menu-item @click="filter('none')" >
								<md-icon class="">clear</md-icon>
								<md-tooltip md-direction="left">Desactivar filtro</md-tooltip>
							</md-menu-item>

							<md-menu-item @click="confirmChange('filter')" v-if="filterActivated">
								<md-icon class="">check</md-icon>
								<md-tooltip md-direction="left">Aplicar filtro</md-tooltip>
							</md-menu-item>

							<md-menu-item @click="filter('grayscale')" class="byn" >
								<md-icon class="">filter_b_and_w</md-icon>
								<md-tooltip md-direction="left">Escala de grises</md-tooltip>
							</md-menu-item>

							<md-menu-item @click="filter('sepia')" class="sepia" >
								<md-icon class="">filter_b_and_w</md-icon>
								<md-tooltip md-direction="left">Sepia</md-tooltip>	
							</md-menu-item>

							<md-menu-item @click="filter('brightness')">
								<md-icon class="">brightness_5</md-icon>
								<md-tooltip md-direction="left">Brillo</md-tooltip>
							</md-menu-item>

							<md-menu-item @click="filter('contrast')" >
								<md-icon class="">brightness_6</md-icon>
								<md-tooltip md-direction="left">Contraste</md-tooltip>	
							</md-menu-item>

							
						</md-menu-content>
					</md-menu>
					<md-menu class=" md_menu_custom p_auto" md-align-trigger >
						<md-button class="md-icon-button  md-raised " :class="btnActive.polygon ? 'accent':'md-accent'"  md-menu-trigger @click="btnActive.polygon=true;testGButton1('polygon')">
							<md-icon class="">exposure</md-icon>
							<md-tooltip md-direction="top">Formas</md-tooltip>
						</md-button>
						<md-menu-content class="menu_filter" :style="{'max-height':imaEffect.height+'px'}">					
							<md-menu-item @click="btnActive.polygon=false;deleteDrawCanvas()">
								<md-icon>clear</md-icon>
								<md-tooltip md-direction="left">Deshacer</md-tooltip>	
							</md-menu-item>
							<md-menu-item @click="confirmChange('polygon')"   v-if="polygonActivated">
								<md-icon>check</md-icon>
								<md-tooltip md-direction="left">Aplicar recorte</md-tooltip>
							</md-menu-item>
							<md-menu-item @click="drawPolygon(polygon.square)">
								<md-icon style="transform:rotate(45deg)" md-src="img/shapes/square.svg"></md-icon>
								<md-tooltip md-direction="left">Cuadrado</md-tooltip>	
							</md-menu-item>
							<md-menu-item @click="drawPolygon(polygon.circle)">
								<md-icon md-src="img/shapes/circle.svg"></md-icon>
								<md-tooltip md-direction="left">Cículo</md-tooltip>
							</md-menu-item>
							<md-menu-item @click="drawPolygon(polygon.triangle)">
								<md-icon md-src="img/shapes/triangle.svg"></md-icon>
								<md-tooltip md-direction="left">Triángulo</md-tooltip>
							</md-menu-item>
							<md-menu-item @click="drawPolygon(polygon.star)">
								<md-icon>star</md-icon>
								<md-tooltip md-direction="left">Estrella</md-tooltip>
							</md-menu-item>
							<md-menu-item @click="drawPolygon(polygon.penta)">
								<md-icon md-src="img/shapes/pentagon.svg"></md-icon>
								<md-tooltip md-direction="left">Pentágono</md-tooltip>
							</md-menu-item>
							<md-menu-item @click="drawPolygon(polygon.hexa)">
								<md-icon md-src="img/shapes/hexagon.svg"></md-icon>
								<md-tooltip md-direction="left">Hexágono</md-tooltip>
							</md-menu-item>
							<md-menu-item @click="drawPolygon(polygon.hepta)">
								<md-icon md-src="img/shapes/heptagon.svg"></md-icon>
								<md-tooltip md-direction="left">Heptágono</md-tooltip>	
							</md-menu-item>
							<md-menu-item @click="drawPolygon(polygon.octa)">
								<md-icon md-src="img/shapes/octagon.svg"></md-icon>
								<md-tooltip md-direction="left">Octógono</md-tooltip>
							</md-menu-item>
							<!--
							<md-menu-item>
								<md-icon md-src="shapes/nonagon.png"></md-icon>	
							</md-menu-item>
						-->
							<md-menu-item title="Nonágono" @click="drawPolygon(polygon.nona)">
								<md-icon>
									<img src="img/shapes/nonagon.png">
								</md-icon>
								<md-tooltip md-direction="left">Nonágono</md-tooltip>
							</md-menu-item>
							
						</md-menu-content>
				</md-menu>
				<md-menu class="md_menu_custom" style="padding:auto" md-align-trigger >
					<md-button class="md-icon-button  md-raised" :class="btnActive.effect ? 'accent': 'md-accent'"  md-menu-trigger @click="btnActive.effect=true;testGButton1('effect')">
						<md-icon class="c_white">adjust</md-icon>
						<md-tooltip md-direction="top">Efectos</md-tooltip>
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
						<md-menu-item title="Polaroid" @click="confirmChange('polaroid')">
							<md-icon md-src="img/effect/polaroid.svg"></md-icon>
							<md-tooltip md-direction="left">Polaroid</md-tooltip>
						</md-menu-item>
					<!--
						<md-menu-item title="Reflejo Vertical" @click="setEffect('vertical')">
							<md-icon md-src="img/effect/vertical.svg"></md-icon>
						</md-menu-item>

						<md-menu-item title="Reflejo Horizontal" @click="setEffect('horizontal')">
							<md-icon>swap_horiz</md-icon>
						</md-menu-item>
					-->
						<md-menu-item title="Viñeta" @click="confirmChange('vignette')">
							<md-icon>vignette</md-icon>
							<md-tooltip md-direction="left">Viñeta</md-tooltip>
						</md-menu-item>
						<md-menu-item title="Remolino" @click="confirmChange('remolino')">
							<md-icon md-src="img/effect/fan.svg"></md-icon>
							<md-tooltip md-direction="left">Remolino</md-tooltip>	
						</md-menu-item>
						<md-menu-item title="Onda" @click="confirmChange('onda')">
							<md-icon>waves</md-icon>
							<md-tooltip md-direction="left">Onda</md-tooltip>	
						</md-menu-item>
						<md-menu-item title="Oleo" @click="confirmChange('oleo')" >
							<md-icon md-src="img/effect/postage-stamp.svg"></md-icon>
							<md-tooltip md-direction="left">Oleo</md-tooltip>	
						</md-menu-item>
						<md-menu-item title="Redondear" @click="confirmChange('esquinas')">
							<md-icon>supervised_user_circle</md-icon>
							<md-tooltip md-direction="left">Redondear</md-tooltip>	
						</md-menu-item>
						<md-menu-item title="Gaussiano" @click="confirmChange('gaussiano')">
							<md-icon >grain</md-icon>
							<md-tooltip md-direction="left">Gaussiano</md-tooltip>	
						</md-menu-item>
					</md-menu-content>
				</md-menu>
						<!--<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="reflex('vertical')">
							<md-icon class="">swap_vert</md-icon>
						</md-button>
						<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="reflex('horizontal')">
							<md-icon class="">swap_horiz</md-icon>
						</md-button>
						<div style="clear:left"></div>-->
												
					<!--<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="showRangeCompress()" >
						<md-icon md-src="img/effect/zip-box.svg" ></md-icon>

						<md-tooltip md-direction="top">Compresión</md-tooltip>
					</md-button>
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger @click="showRangeTexturize()" >
						<md-icon class="">texture</md-icon>
						<md-tooltip md-direction="top">Texturizar</md-tooltip>
					</md-button>

					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger  @click="showSpaceColor()">
						<md-icon md-src="img/effect/monitor-eye.svg"></md-icon>
						<md-tooltip md-direction="top">Espacio de color</md-tooltip>
					</md-button>-->
		<!--espacio de color -->
					<!--<div style="margin-top:10px;" v-if="spaceColorActive">
						<md-field style="">
							<label for="spaceColor">Espacio de Color</label>
							<md-select  v-model="spaceColorSelected" name="spaceColor" id="spaceColor" @input="selectSpaceColor()">
								<md-option v-for="spacecolor in spacecolors" :key="spacecolor" :value="spacecolor">{{spacecolor}}
									
								</md-option>
								
								
							</md-select>
						</md-field>
						
						<div style="clear:left"></div>								
					</div>-->
		<!-- range compression -->
			<!--
					<div style="margin-top:10px;display:block" v-if="rangeCompressActive">

						<label for="range_compress" title="Tipo de compresión"><span style="color:blue;font-weight:bold">{{rangeCompress}}</span></label>

						<div style="clear:left"></div>
			-->
						<!--detectar si es png o jpg para mostrar minimo y máximo distinto-->
			<!--
						<input name="range_compress" type="range" min="1" max="100" v-model="rangeCompress" v-if="this.ext=='jpg'"/>
						<input name="range_compress" type="range" min="0" max="4" v-model="rangeCompress" v-if="this.ext=='png'"/>

						<div style="clear:left"></div>
			-->
						<!--<md-button class="md-icon-button md-raised md-dense md-accent"  md-menu-trigger @click="compress(0)">
							<md-icon class="">cancel</md-icon>
						</md-button>-->
			<!--
						<md-button class="md-icon-button md-raised md-dense md-primary"  md-menu-trigger @click="setCompress(rangeCompress)">
							<md-icon class="">check_circle_outline</md-icon>
							<md-tooltip>Comprimir imagen</md-tooltip>
						</md-button>
					</div>
			-->
		<!-- range texturize -->
			<!--		<div style="margin-top:10px;display:block" v-if="rangeTexturizeActive">

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
			-->
		<!-- select -->
				<div class="md_menu_custom" style="margin-top:20px">
					<md-button class="md-icon-button  md-raised buttons_composite "  md-menu-trigger @click="showListImage('fussion')" :class="fussionActivated ? 'accent':'md-accent'">
						<md-icon md-src="img/effect/layers-plus_white.svg"></md-icon>
						<md-tooltip>Fusión</md-tooltip>
					</md-button>
					<md-button class="md-icon-button  md-raised md-accent buttons_composite "  md-menu-trigger @click="showListImage('watermark')" :class="wmActivated ? 'accent':'md-accent'">
						<md-icon md-src="img/effect/watermark-white.svg"></md-icon>
						<md-tooltip>Marca de Agua</md-tooltip>
					</md-button>
					<md-button class="md-icon-button  md-raised md-accent buttons_composite "  md-menu-trigger @click="showListImage('create-watermark')" :class="createWmActivated ? 'accent':'md-accent'">
						<md-icon md-src="img/effect/format-annotation-plus-white.svg"></md-icon>
						<md-tooltip>Crear marca de agua</md-tooltip>
					</md-button>							
					
				</div>
					<div class="clearL"></div>
				<!-- cancel botón -->
					<div class="m_top10" v-if="compListActive || wmInputActive||rangeTexturizeActive||rangeCompressActive||spaceColorActive || channelActive">
						<md-button class="md-icon-button  md-raised accent md-dense m_top5"  md-menu-trigger @click="cancelAll()"  >
							<md-icon class="c_white">clear</md-icon>
							<md-tooltip>Deshacer</md-tooltip>
						</md-button>
				<!-- check botón -->
						<md-button class="md-icon-button  md-raised md-primary md-dense m_top5"  md-menu-trigger @click="confirmChange(typeAction)" title="Crear composición" v-if="compositeSelectedId || inputWm || rangeTexturize!=1 || rangeCompressActive || spaceColorSelected!=spaceColor || channelActive" >
							<md-icon class="c_white">check</md-icon>
						</md-button>
					</div>
					<div class="clearL"></div>						
			<!--composite -->
			<!--position-->
					<div class="m_top10;" v-if="compPosListActive">
						<md-list :md-expand-single="expandSingle">
							<md-list-item md-expand :md-expanded.sync="expandCompPos">
								<md-icon v-html="compPosSelectedHtml"></md-icon>
								{{compPosStr}}
								<md-tooltip md-direction="right">Posición {{compPosStr}}</md-tooltip>
							<!--<md-icon :md-src="'img/effect/'+compositePositionIconSelected.center+'.svg'">
								
							</md-icon>-->
							
								<md-list slot="md-expand" >
									<md-list-item @click="selectCompositePosition('center')">
										<md-icon>crop_square</md-icon>
										Centrado
									</md-list-item>
									<md-list-item @click="selectCompositePosition('topLeft')">
										<md-icon style="transform:rotate(180deg)">branding_watermark</md-icon>
										Sup. izquierda
									</md-list-item>
									<md-list-item @click="selectCompositePosition('topRight')">
										<md-icon class="icon_rotate" >branding_watermark</md-icon>
										Sup. derecha
									</md-list-item>
									<md-list-item @click="selectCompositePosition('bottomLeft')">
										<md-icon style="transform:scale(-1,1)">branding_watermark</md-icon>
										Inf. izquierda
									</md-list-item>
									<md-list-item @click="selectCompositePosition('bottomRight')">
										<md-icon>branding_watermark</md-icon>
										Inf. derecha
									</md-list-item>										
								</md-list>
							</md-list-item>
						</md-list>
					</div>
			<!--image-->
					<div class="m_top10;" v-if="compListActive">
						<md-list :md-expand-single="expandSingle">
							<md-list-item md-expand :md-expanded.sync="expandCompositeList">
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
			<!-- input create watermark -->
					<div class="m_top10;" v-if="wmInputActive">
						<md-field>
							<label>Texto</label>
							<md-input v-model="inputWm" maxlength="50"></md-input>
						</md-field>
						<!--<label for="range_fontsize" style="font-family:usuzi">Tamaño de fuente</label>
						<div style="clear:left"></div>-->
					</div>
					<div v-if="wmInputActive" class="inputFontSize">
						<md-chip class="md-primary p_top2">{{rangeWmFontSize}}</md-chip>
						<div class="clearL"></div>
						<md-icon class="d_in_block" md-src="img/effect/format-size.svg"></md-icon>
						
						<input type="range" v-model="rangeWmFontSize" name="range_fontsize" min="1" max="100" />
						<md-tooltip md-direction="left">Tamaño de letra</md-tooltip>
					</div>
					<div class="m_top10" v-if="wmInputActive">

						<md-list :md-expand-single="expandSingle" >
							
							<md-list-item md-expand :md-expanded.sync="expandFontFamily"  >

								<md-icon md-src="img/effect/format-font.svg" class="d_in_block"></md-icon>
								
								<span :style="{'font-family':fontFamilySelected}"> {{fontSelected}}</span>
								
								<md-list slot="md-expand" class="md-scrollbar expand_wmInput">
									<md-list-item >Ubuntu</md-list-item>

									<md-list-item style="font-family:ubuntu" @click="setFontFamily('ubuntu')" >Ubuntu</md-list-item>
									<md-list-item style="font-family:timesnewroman" @click="setFontFamily('timesnewroman')">Times New Roman</md-list-item>
									<md-list-item style="font-family:nikaia" @click="setFontFamily('nikaia')">Nikaia</md-list-item>
									<md-list-item style="font-family:usuzi" @click="setFontFamily('usuzi')">Usuzi</md-list-item>
									<md-list-item style="font-family:abduction" @click="setFontFamily('abduction')">Abduction</md-list-item>
									<md-list-item style="font-family:corporate" @click="setFontFamily('corporate')">Corporate</md-list-item>
									<md-list-item style="font-family:designer" @click="setFontFamily('designer')">Designer</md-list-item>
									<md-list-item style="font-family:zerogirl" @click="setFontFamily('zerogirl')">Zerogirl</md-list-item>
									<md-list-item style="font-family:yanone" @click="setFontFamily('yanone')">Yanone</md-list-item>
									<md-list-item style="font-family:glsnecb" @click="setFontFamily('glsnecb')">Glsnecb</md-list-item>
									<md-list-item style="font-family:futura" @click="setFontFamily('futura')">Futura</md-list-item>
									<md-list-item style="font-family:fontanero" @click="setFontFamily('fontanero')">Fontanero</md-list-item>
									
								</md-list>
								<md-tooltip md-direction="left">Tipo de letra</md-tooltip>
							</md-list-item>
						
						</md-list>
						
					</div>
					<div class="colorpicker" v-if="wmInputActive">
						<span  class="floatL m_left15">
							<md-icon style="">color_lens</md-icon>
							
						</span>
						<div class="m_top10 d_in_block m_auto" >
							<verte v-model="color" picker="square" model="rgb" menuPosition="top">
							</verte>
							
						</div>
						<md-tooltip md-direction="left">Color de texto</md-tooltip>
					</div>

				<!--espacio de color -->
					<div class="m_top10" v-if="spaceColorActive">
						<md-field style="">
							<label for="space_color" v-if="spaceColorSelected==spaceColor">Espacio de Color actual</label>
							<label for="space_color" v-else>Convertir a</label>
							<md-select  v-model="spaceColorSelected" name="space_color" id="space_color" @input="selectSpaceColor()">
								<md-option v-for="spacecolor in spacecolors" :key="spacecolor" :value="spacecolor">{{spacecolor}}
									
								</md-option>
								
								
							</md-select>
						</md-field>
						
						<div class="clearL"></div>								
					</div>
				<!-- separar canales en escala de grises -->
					<div class="m_top10" v-if="channelActive">
						<md-field style="">
							<label for="channels">Canales</label>
							<!--si el space color original es RGB o SRGB-->
							<md-select  v-model="channelSelected" name="channels" id="channels" @input="selectChannel()" v-if="spaceColor=='RGB' || spaceColor=='SRGB'">
								<md-option value="RED">
									RED
								</md-option>
								<md-option value="GREEN">
									GREEN
								</md-option>
								<md-option value="BLUE">
									BLUE
								</md-option>
							</md-select>
							<md-select  v-model="channelSelected" name="channels" id="channels" @input="selectChannel()" v-else-if="spaceColor=='CMYK'">
								<md-option value="CYAN">
									CYAN
								</md-option>
								<md-option value="MAGENTA">
									MAGENTA
								</md-option>
								<md-option value="YELLOW">
									YELLOW
								</md-option>
								<md-option value="BLACK">
									BLACK
								</md-option>
							</md-select>
						</md-field>
						
						<div class="clearL"></div>								
					</div>
				<!-- range compression -->
					<div class="m_top10 d_block" v-if="rangeCompressActive">

						<label for="range_compress" title="Tipo de compresión"><span class="range">{{rangeCompress}}</span></label>

						<div class="clearL"></div>
						<!--detectar si es png o jpg para mostrar minimo y máximo distinto-->
						<input name="range_compress" type="range" min="1" max="100" v-model="rangeCompress" v-if="this.ext=='jpg'"/>
						<input name="range_compress" type="range" min="0" max="4" v-model="rangeCompress" v-if="this.ext=='png'"/>

						<div class="clearL"></div>
						<!--<md-button class="md-icon-button md-raised md-dense md-primary"  md-menu-trigger @click="setCompress(rangeCompress)">
							<md-icon class="">check_circle_outline</md-icon>
							<md-tooltip>Comprimir imagen</md-tooltip>
						</md-button>-->
					</div>
					<div class="m_top10 d_block" v-if="rangeTexturizeActive">

						<label for="range_texturize" class="range">{{'x'+rangeTexturize}}</label>
						<div class="clearL"></div>
						<input name="range_texturize" type="range" min="1" max="10" step="1" v-model="rangeTexturize" @change="texturize(rangeTexturize)"/>

						<div class="clearL"></div>

						<!--<md-button class="md-icon-button md-raised md-dense md-accent"  md-menu-trigger @click="texturize(0)">
							<md-icon class="">cancel</md-icon>
							<md-tooltip>Deshacer</md-tooltip>
						</md-button>-->

						<!--<md-button class="md-icon-button md-raised md-dense md-primary"  md-menu-trigger @click="texturize(rangeTexturize)">
							<md-icon class="">check_circle_outline</md-icon>
							<md-tooltip>Aplicar texturización</md-tooltip>
						</md-button>-->
					</div>
					<div class="clearL"></div>
					
				</div>
				

				<div class="md-layout-item md-xlarge-size-50 md-medium-size-50 md-small-size-100">
						<md-speed-dial md-event="click" md-direction="bottom" ref="dial">
							<md-speed-dial-target class="md-icon-button md-dense" :class="{'accent':dial}"  @click="hideDials('dial');testGButton1('dials')">
								<md-icon class="md-morph-initial" >miscellaneous_services</md-icon>
								<md-icon class="md-morph-final">edit</md-icon>
							</md-speed-dial-target>

							<md-speed-dial-content>
								<md-button class="md-icon-button " @click="showInput('compress')">
									<md-icon md-src="img/effect/zip-box.svg"></md-icon>
									<md-tooltip>Comprimir imagen</md-tooltip>
								</md-button>

								<md-button class="md-icon-button" @click="showInput('texturize')">
									<md-icon>texture</md-icon>
									<md-tooltip>Efecto Texturizar</md-tooltip>
								</md-button>
							</md-speed-dial-content>
						</md-speed-dial>
						<md-speed-dial md-event="click" md-direction="bottom" ref="dial2">
							<md-speed-dial-target class="md-icon-button md-dense " :class="{'accent':dial2}" @click="hideDials('dial2');testGButton1('dials')">
								<md-icon class="md-morph-initial">workspaces</md-icon>
								<md-icon class="md-morph-final" >edit</md-icon>
							</md-speed-dial-target>

							<md-speed-dial-content>
								<md-button class="md-icon-button" @click="showInput('space_color')">
									<md-icon md-src="img/effect/monitor-eye_black.svg"></md-icon>
									<md-tooltip>Convertir a otro espacio de color</md-tooltip>
								</md-button>

								<md-button class="md-icon-button" @click="showInput('separate_channel')">
									<md-icon>event</md-icon>
									<md-tooltip>Extraer canal</md-tooltip>
								</md-button>
							</md-speed-dial-content>
						</md-speed-dial>
				</div>
			</div>

			<div class=" md-layout-item md-large-size-15 md-medium-size-10 md-small-hide">

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

				<!--<md-dialog-confirm class="confirmEffect"
				:md-active.sync="dialogConfirmActive2"
				:md-title = "'Se han detectado otros cambios sin aplicar. ¿Continuar?'"
				md-confirm-text="OK"
				md-cancel-text="Cancelar"
				@md-cancel="cancelChange"
				@md-confirm="setChange" />-->
	
				<md-dialog-alert class="confirmDialog"
				:md-active.sync="dialogInfoActive"
				md-title = "Nada que actualizar"
				md-content = "No se han detectado cambios"
				md-confirm-text="OK" />
	
				<md-dialog-alert class="confirmDialog"
				:md-active.sync="dialogErrorActive"
				md-title = "Error al procesar la imagen"
				:md-content = "msgeDialogAlert"
				md-confirm-text="OK" />

				<md-dialog-alert class="confirmDialog"
				:md-active.sync="dialogNotChannelsActive"
				md-title = "No disponible"
				md-content = "La extracción de canales no se encuentra disponible para esta imagen"
				md-confirm-text="OK" />
			
				
		</div>
		
		<!-- modal dialog de vista previa con imagen y solicitud de carga como imagen
			principal-->

		<md-dialog :md-active.sync="dialogImage" class="effect_dialog" >
			<img :src="url+'get-image/'+tmpImage.random_name" v-if="tmpImage" :width="ima.width" :height="ima.height"/>
			<!-- colocar una transición o un interruptor para aparezca un poquito
				después que la imagen -->
			<div class="load_new_image" style="" v-if="tmpImage">
				<p>¿Cargar la nueva imagen?</p>
				<md-button style="" class="md-raised md-accent" @click="setTmpImage()">
					OK
				</md-button>
				<md-button @click="cancelLoadImage()">
					Cancelar
				</md-button>				
			</div>
			
			<div v-else class="t_center m_auto;"><!--aquí el md-spinner-->
				<md-progress-spinner class="md-accent" :md-diameter="100" md-mode="indeterminate" ></md-progress-spinner >
			</div>
			
		</md-dialog>
	</div>
</template>
<script>
import methodsMixin from '../mixins/methodsMixin';
import servicesMixin from '../mixins/servicesMixin';
import effectsMixin from '../mixins/effectsMixin';
import buttonsMixin from '../mixins/effectsButtonsMixin';
import Global from '../Global.js';
//import axios from 'axios';
export default {
	name:'Effect',
	props:['ima'],
	mixins:[methodsMixin,servicesMixin,effectsMixin, buttonsMixin],
	data(){
		return{
			hola:true,
			dial:null,
			dial2:null,
			//ruta global		
			url:Global.url,
			//dimensiones determinadas para panel effect (div,img,canvas...)
			imaEffect:{
				width:null,
				height:null
			},
			images:null,			
			ext:null,
			resizeSwitch:false,
			//identificador transición
			imgTrans:false,
			//confirmación modal dialog
			dialogConfirmActive:false,
			//dialog para errores
			dialogErrorActive:false,
			dialogNotChannelsActive:false,
			//contenido de dialog para errores
			//(actualizado durante los errores de los efectos: servicesMixin)
			msgeDialogAlert:null,			

			//dialogConfirmActive2:false,
			//textos modal dialog
			dialog_title:{
				filter:"¿Aplicar el filtro seleccionado?",
				polygon:"¿Aplicar el recorte con la forma seleccionada?",
				undoAll:"¿Desea deshacer todos los cambios?",
				processAll:"¿Desea aplicar todos los efectos seleccionados?",
				effect: "¿Desea aplicar el efecto seleccionado?",
				pendentTasks:"Se han detectado tareas pendientes. ¿Desea continuar con el efecto seleccionado?",
				fussion:"¿Desea aplicar la fusión con la imagen seleccionada?",
				watermark:"¿Desea aplicar la marca de agua con la imagen seleccionada?",
				createWatermark:"¿Desea crear la marca de agua?",
				compress: "¿Desea comprimir la imagen?",
				texturize:"¿Desea texturizar la imagen con el valor seleccionado?",
				separateChannel:"¿Desea extraer el canal seleccionado en escala de grises?",
				spaceColor:"¿Desea convertir la imagen al espacio de color seleccionado?"

			},
			dialog_selected:null,
			//type utilizado para confirmación de filtro y de forma
			type:null,
			//identificador de múltiples efectos con el método processAll()
			effectMultiple:false,
			//dimensiones mínimas globales		
			minWidthHeight:Global.minWidthHeight,
			//filter			
			filterActivated:false,
			filterProp:null,
			//polygon
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
			//effects
			effectActivated:false,
			effectProp:null,
			//modal dialog que muestra una vista previa de la imagen con los efectos que 
			//ya se ha guardado en el server			
			dialogImage:false,

			dialogInfoActive:false,

			//almacena la imagen que devuelve el server al procesar un efecto
			tmpImage:null,
			//efecto de carga
			displayLoading:false,
		//texturize
			//identificador del efecto texturizar			
			texturizeActivated:false,
			//identificador de visibilidad del input type range de texturize
			rangeTexturizeActive:false,
			//valor por defecto de range de texturize
			rangeTexturize:1,
			
		//rotate
			//identificador del efecto de rotate
			rotateActivated:false,
			//orientación para la rotación (left||right||top_bottom)
			rotateSide:null,
		//reflex
			//identificador del efecto reflex
			reflexActivated:false,
			//tipo de reflex (horizontal||vertical)
			typeReflex:null,
		//compress
			//identificador del efecto de compresión
			compressActivated:false,
			//identificador del input range de compresión
			rangeCompressActive:false,
			//valor input range
			rangeCompress:null,	
			rangeCompressAssigned:null,		
		//spacecolor
			//falta comprobar identificador
			//identificador del efecto convertir a espacio de color (RGB||CMYK||SRGB)

			spaceColorActivated:false,
			//identificador de desplegable de espacio de color
			spaceColorActive:false,			
			//espacio de color de la imagen registrado en la db, asignado en mounted()
			spaceColor:null,
			//option seleccionado en el select
			spaceColorSelected:null,
			spacecolors:["RGB","CMYK","SRGB","GRAY"],
		//separate_channel
			//identificador de separar canales
			channelActivated:false,
			channelActive:false,
			
			channelSelected:null,
		//fussion
			//identificador del efecto fussion 
			fussionActivated:false,
			//identificador del desplegable (List-Material) de imágenes para composición (composite de imagick)
			compListActive:false,
			//
			compositeSelectedHtml:"Seleccionar",
			compositeSelectedId:null,
			//list material
			expandSingle:true,
			expandCompositeList:false,
			//tipo de composite (fussion||watermark||create-watermark)
			typeAction:null,
		//watermark (composición de marca de agua)
			//identificador del efecto watermark
			wmActivated:false,
			//position watermark
			compPosListActive:null,
			expandCompPos:false,
			//identificador seleccionado en formato string standar para pasar al server
			//center por defecto (topLeft||topRight||bottomLeft||bottomRight)
			compPos:"center",
			//valor de desplegable position, Centrado por defecto
			compPosStr:"Centrado",
			//opciones posibles de position del desplegable
			compPosStrOptions:{
				center:"Centrado",
				topRight:"Sup. derecha",
				topLeft: "Sup. izquierda",
				bottomRight: "Inf. derecha",
				bottomLeft: "Inf. izquierda"
			},
			//compPosSelected:false,
			compPosSelectedHtml:'<md-icon>crop_square</md-icon>',
			compPosIconSelected:{
				center:'<md-icon >crop_square</md-icon>',
				topRight:'<md-icon style="transform:scale(1,-1)">branding_watermark</md-icon>',
				topLeft:'<md-icon style="transform:rotate(180deg)">branding_watermark</md-icon>',
				bottomRight:'<md-icon>picture_in_picture_alt</md-icon>',
				bottomLeft:'<md-icon>branding_watermark</md-icon>'
			},
		//create watermark (creación marca de agua)
			//identificador del efecto create-watermark
			createWmActivated:false,
			//identificador de visibilidad de input text, input range, desplegable (list)
			//y colorpicker (verte)
			wmInputActive:false,
			//valor de texto introducido para creación marca de agua
			inputWm:null,
			//rango de tamaño de letra para la nueva marca de agua
			rangeWmFontSize:30,
			//tipo de letra seleccionada
			fontFamilySelected:"ubuntu",
			fontSelected:"Ubuntu",
			color:null,
			expandFontFamily:false,
			//lista de tareas en formato string para poder referenciarlas y actualizarlas
			tasks:["rotateActivated","reflexActivated","filterActivated","polygonActivated","effectActivated"],
			//tasks2 siempre devuelve un solo efecto activado
			tasks2:["fussionActivated","wmActivated","createWmActivated","compressActivated","texturizeActivated","spaceColorActivated","channelActivated"],
			//efecto de carga mientras carga la imagen
			loadingImage:false,
			btnActive:{
				rotateLeft:false,
				rotateRight:false,
				rotateBottom:false,
				reflexHorizontal:false,
				reflexVertical:false,
				filter:false,
				polygon:false,
				effect:false,
				fussion:false,
				watermark:false,
				createWatermark:false,
				compress:false,
				texturize:false,
				spaceColor:false,
				channel:false
			},


		}
	},
	computed:{
		/*
		selectedSpaceColor(){
			console.log(this.spaceColorSelected);
			return this.spaceColor =="rgb" ? "":this.spaceColor;
			
		},
		*/
		//filtra el array de imágenes y devuelve todas menos la imagen principal
		//destinado al desplegable de imágenes para fussion y watermark 
		filteredImages(){			
			return this.images.filter(image=>
				image.random_name != this.ima.src
			)
		}
	},

	mounted(){
		//nexttick hace un efecto similar al setTimeout, espera al callback(), de esa
		//forma permite acceder desde el mounted a propiedades en $refs
		this.$nextTick(() => {
			this.dial=this.$refs.dial.MdSpeedDial.active;
			this.dial2=this.$refs.dial2.MdSpeedDial.active;	
		});
		
				
		//this.loadingImage=true;
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
		//al utilizar un método raro: updateSizeCanvas() para obtener las medidas, no
		// se muestra el efecto de transición			
				this.imgTrans=true;
			//acualizando spaceColor para desplegables spacecolor y channels
				//asignamos el colorspace (el colorspace no es nativo de image, se crea
				//en el método reloadImage() para el origen en Collections y la carga de 
				//imagen al procesar efectos, tb en uploadImageServer() para el origen en 
				//la subida de imagen)
				this.spaceColor=this.ima.spaceColor;
				this.spaceColorSelected=this.ima.spaceColor;
				
				//comprobamos spaceColor para asignar una opción por defecto en el select
				//de separate_channel, ya que si es RGB o SRGB el desplegable de canales  
				//es distinto que el de CMYK
				//falta por crear el GRAY y realizar esta comprobación si se carga la 
				//nueva imagen en el mismo effect, quizás sea mejor sacarlo a un método
				this.setChannelSelected();
				console.log("spacecolor: ",this.ima);

				
				//this.updateSizeCanvas();
				//actualizamos canvas y el div con setTimeout, ya que estamos 
				//recuperando el width y el height del template una vez obtenido por 
				//la redimensión del md-layout y no se puede obtener hasta que no se 
				//carga la vista, por ello se encierra en un setTimeout
			



			/*
			this.imgTrans=true;
		//acualizando spaceColor para desplegables spacecolor y channels
			//asignamos el colorspace (el colorspace no es nativo de image, se crea
			//en el método reloadImage() para el origen en Collections y la carga de 
			//imagen al procesar efectos, tb en uploadImageServer() para el origen en 
			//la subida de imagen)
			this.spaceColor=this.ima.spaceColor;
			this.spaceColorSelected=this.ima.spaceColor;
			
			//comprobamos spaceColor para asignar una opción por defecto en el select
			//de separate_channel, ya que si es RGB o SRGB el desplegable de canales  
			//es distinto que el de CMYK
			//falta por crear el GRAY y realizar esta comprobación si se carga la 
			//nueva imagen en el mismo effect, quizás sea mejor sacarlo a un método
			this.setChannelSelected();
			console.log("spacecolor: ",this.ima);
			
			//actualizamos canvas y el div con setTimeout, ya que estamos 
			//recuperando el width y el height del template una vez obtenido por 
			//la redimensión del md-layout y no se puede obtener hasta que no se 
			//carga la vista, por ello se encierra en un setTimeout
			

			*/
			setTimeout(() => {
				this.updateSizeCanvas();				
				//this.imgTrans=false;	
			},100)
			setTimeout(()=> {

				//this.imgTrans=true;
			},1000)

		}else{
			//mostrar dialog
			console.log("no hay width")
		}
		//comprobamos si la imagen es png o jpg para mostrar el input range
		//de la función compress con el rango de valores correspondiente.
		this.updateExtAndReset();
		
	},
	
		
	
	destroyed(){
		//detectamos si existe un filtro seleccionado antes de salir
		if(this.filterActivated){
			alert("Desea descartar el filtro seleccionado?");
		}
		window.removeEventListener("resize", this.updateSizeCanvas);
	},
	methods:{
		//oculta uno de los speed-dial (incluido color del botón) según el parámetro 
		//pasado o los 2 si no hay parámetro
		hideDials(type_dial){
			//color del botón
				//se asignan los valores de dial y dial2 para cambiar el color del 
				//botón con :class
			this.dial=this.$refs.dial.MdSpeedDial.active			
			this.dial2=this.$refs.dial2.MdSpeedDial.active;
			//cerrar desplegable
				//si se llama a hideDials (sin parámetro) desde otro botón distinto 
				//se cierran y se despintan los 2
			if(!type_dial){
				this.$refs.dial.MdSpeedDial.active=false;
				this.$refs.dial2.MdSpeedDial.active=false;
				this.dial=false;
				this.dial2=false;
			}
				//se comprueba el otro dial y si tiene el desplegable abierto 
				//se cierra
			if(type_dial=='dial' && this.dial2){
				this.$refs.dial2.MdSpeedDial.active=false;
				this.dial2=false;
			}else if(type_dial=='dial2' && this.dial){				
				this.$refs.dial.MdSpeedDial.active=false;
				this.dial=false;
			}
		},
		
		setChannelSelected(){
			if(this.spaceColor=="CMYK")
				this.channelSelected="CYAN";
			else
				this.channelSelected="RED";
		},

		//asigna la extensión de la imagen para mostrar un input range con un rango
		//de mínimo y máximo si es jpg y con otro rango distinto si es png, 
		//destinado al efecto de compresión y ejecutado en mounted()
		updateExtAndReset(){
			//asignamos en la variable this.ext la extensión de la imagen para mostrar un 
		//tipo de input (range) de compresión u otro y asignamos valor por defecto.
			if(this.ima.src){
				let ext=this.ima.src.split(".").pop();				
				if(ext.toLowerCase()=="png"){
					ext="png";
					this.rangeCompress=4;					
				}
				else if(ext.toLowerCase()=="gif"){
					//no necesario
					ext="gif";
				}else{
					ext="jpg";
					this.rangeCompress=80;
				}
				this.ext=ext;
				this.rangeCompressAssigned=this.rangeCompress;
				//console.log("llega a updateExtAndReset");
			}			
		},
		//filtramos los efectos que están activados en formato string pasando
		//como parámetro el array del grupo 1 o del grupo 2
		testActivatedTasks(tasksList){			
			let list=tasksList;
			let listActivated=list.filter((effect,index)=>this[list[index]]);
			if(listActivated.length<=0)
				return;
			return listActivated
		},
		//desactiva todas las tareas del primer grupo y cancela el efecto activo del
		//segundo grupo
		undoAll(){

			//comprueba si no existe ningún efecto activado de ninguno de los 2 grupos
			if(!this.testActivatedTasks(this.tasks) && !this.testActivatedTasks(this.tasks2))
				return
			//si hay, desactiva los efectos activados del primer grupo
			if(this.testActivatedTasks(this.tasks))
				this.testActivatedTasks(this.tasks).forEach((val)=>{
					let split=val.split("A");
					this.undoTask(split[0]);
				})
			//si hay, desactiva el efecto (solo puede haber uno) del segundo grupo
			if(this.testActivatedTasks(this.tasks2) && this.testActivatedTasks(this.tasks2).length==1)
				this.testActivatedTasks(this.tasks2).forEach((val) => {
					let split=val.split("A");					
					this.undoTask(split[0]);
				})
			//cancelar el efecto del segundo grupo si hubiere
		},
		//desactiva la tarea pasada por parámetro 
		undoTask(task){
			if(task=="rotate"){
				//desactivar rotate
				this.rotate(0);
			}else if(task=="filter"){
				this.filter();
			}else if(task=="polygon"){
				this.deleteDrawCanvas();
			}else if(task=="reflex"){
				this.reflex();
			}else{
				//desactiva todos los efectos del segundo grupo
				this.cancelAll();
			}
		},
		//procesa los efectos seleccionados uno a uno utilizando el resultado del 
		//último efecto para el siguiente, por ejemplo, primero realiza el efecto rotate
		//y con la ruta de la imagen rotada realiza el seugndo proceso, por ejemplo de 
		//filtro sepia y una vez devuelta la imagen sepia realiza un tercer proceso de 
		//recorte circular, y así consecutivamente en el mismo for 
		
		async processAll(){
			if(!this.testActivatedTasks(this.tasks))
				return
			
			//lista de efectos activados del primer grupo
			let listAll=this.testActivatedTasks(this.tasks);
			let imgTmp=[]; 
			this.effectMultiple=true;
			//usamos el for loop en lugar del foreach para que funcione la promesa con
			//async (async processAll()) y await (await this.processTask(data))
				//listAll.forEach( async (data)=> {
			//para obtener el key(index) para imgTmp cambiamos de for...of a for 
			//sencillo for (let data of listAll){
			for(var i=0;i<listAll.length;i++){
				//con await espera a resolver la promesa para devolver el resultado,
				//de esa manera permite disponer de los datos devueltos para manejarlos
				//antes de seguir el recorrido del for

				//si existe más de un efecto la variable imgTmp se utiliza para enviar
				//la imagen del resultado del server (con efectos realizados) y no la 
				//inicial (sin efectos). Se compone de un modal con una solicitud de 
				//de confirmación para cargar la imagen en el componente actual y con 
				//vista previa de la nueva imagen
				let result;
				if(imgTmp.length>0){
					result=await this.processTask(listAll[i],imgTmp[i-1]);	
				}else{
					result=await this.processTask(listAll[i]);	
				}
				
				/*
				.then((data)=>{
					console.log("después del processTask: ",data)
					imgTmp.push(data);
				});
				*/
				
				imgTmp.push(result);
			}
			

			//elemento final (se eliminan las imágenes creadas en cada efecto menos la
			//última)
			let final;
			//si hay más de 1 efecto extraemos el último con pop() y pasamos el resto
			if(imgTmp.length>1){
				//extraemos y almacenamos el último elemento del array (para que no 
				//se elimine)
				final=imgTmp.pop();
				//pasamos el array de objetos Image que se deben eliminar, (con 
				//.pop() queda excluido el último elemento en el array imgTmp)
				this.deleteImages(imgTmp);
			}else{
			//si solo hay un efecto, seleccionamos el único elemento de la lista
				final=imgTmp[0];
			}
			this.dialogImage=true;
			this.tmpImage=final;
			console.log("final: ",final);
			console.log("IMGTMP: ",imgTmp);
			this.effectMultiple=false;
			this.undoAll();
			//aquí resultado final y asignación de última imagen 

		},
		
		//switch case que devuelve una promesa y que permite desde el loop for del método
		//processAll() (y con la ayuda de async y await) esperar a que se resuelva la //promesa para continuar el for, y así, poder disponer de los datos devueltos
		//en el siguiente case dentro del mismo loop for, para ello utilizamos el parámetro imgTmp
		processTask(data, imgTmp=null){
			return new Promise((resolve)=>{
				let split=data.split("A");
				var name="";
				switch(split[0]){
					case "rotate":
						
				//al ser el rotate y el reflex el primer efecto (ya que uno desactiva 
				//el otro y, por tanto, no se pueden realizar los dos a la vez) del 
				//array no es necesario añadir el condicional de imgTmp, pero por si 
				//se añaden más efectos lo incluimos

						var params={ angle:this.rotateSide }
						if(imgTmp)
							params.name=imgTmp.random_name;
							//params.src=imgTmp.src;
						console.log("params :",params);
						//imgTmp.push(this.setEffect('rotate',params));
						resolve(this.setEffect('rotate',params));
						//var datus=await this.setEffect('rotate',params);
						//console.log("res desde processTask: ",datus);
						
						//console.log(datus);

						console.log("this.rotateSide: ",this.rotateSide);
						//llamar método rotate con los lados asignados	
						
						break;
					case "reflex":
						if(imgTmp)
							name=imgTmp.random_name
						resolve(this.setEffect(this.typeReflex,name));
						console.log("this.typeReflex: ",this.typeReflex);
						break;
					case "filter":						
							//pasamos solo el random_name del objeto imagen
							if(imgTmp)
								name=imgTmp.random_name;
							console.log("this.filterProp: ",this.filterProp);
							resolve(this.setFilter(name));
						
						break;
					case "polygon":						
						if(imgTmp)
							name=imgTmp.random_name
						resolve(this.setPolygon(name));
						name=null
						//console.log("this.polygonProp: ",this.polygonProp);
				}
				name=null;
			
			})
		},
		
		//selección de imagen del desplegable (list "material") destinada al efecto de fusión o al efecto de watermark
		selectComposite(image){						
			//añadimos el span al select
			this.compositeSelectedHtml=
			`<span title=`+image.title+`>
				<md-avatar>
					<img width="48" src=`+this.url+'get-image/'+image.thumb+`/>
				</md-avatar>`
			+image.title+`</span>`;
			//asignamos id para poder identificar la imagen en el server
			this.compositeSelectedId=image.id;
			//replegamos el desplegable 
			this.expandCompositeList=false;			
		},
		//selección en el desplegable(list "material") de la posición de la marca de agua (watermark)
		selectCompositePosition(position){
			//asignamos valores para mostrar en el desplegable
			this.compPosSelectedHtml=this.compPosIconSelected[position];
			this.compPosStr=this.compPosStrOptions[position];
			this.compPos=position;
			console.log("position desde selectCompositePosition: ",position);

			//this.compPosSelected=true;
			this.expandCompPos=false;
		},
		//desactiva el efecto activado del segundo grupo (solo puede haber uno), si 
		//por algún error hubiera más de uno cancela todos los efectos del segundo 
		//grupo (de uno en uno)
		cancelAll(){			
			let listActivated=this.testActivatedTasks(this.tasks2);			

			if(listActivated && listActivated.length==1){
				let split=listActivated[0].split("A");
				console.log("cancelar todo: ",split[0]);
				this.cancelTask(split[0])
			}else if(listActivated){
				this.tasks2.forEach((task)=> {
					let split=task.split("A");
					//console.log(split[0])
					this.cancelTask(split[0]);
				})
				//método anterior que desactiva todo a la vez
				//this.cancelSelect();
			}
		},

		//desactiva el efecto pasado por parámetro y asigna los valores iniciales
		cancelTask(action){
			switch(action){
				case "fussion":
					//desactiva desplegable que sirve para fussion y watermark 
					this.compListActive=false;
					this.compositeSelectedHtml="Seleccionar";
					this.compositeSelectedId=null;
					this.fussionActivated=false;
					break;
				case "wm":
					//desactiva desplegable que sirve para fussion y watermark
					this.compListActive=false;
					this.compositeSelectedHtml="Seleccionar";
					this.compositeSelectedId=null;					
					//desactiva desplegable de posición (watermark)
					this.compPosListActive=false;
					//this.compPosSelected=false;
					//establecida la opción de centrado, por defecto
					this.compPosStr=this.compPosStrOptions.center;
					this.compPosSelectedHtml=this.compPosIconSelected.center;
					this.compPos="center";
					this.wmActivated=false;
					break;
				case "createWm":
					//desactiva el input text, el input range,el desplegable (list) y el colorpicker
					//de create-watermark
					this.wmInputActive=false;
					//reinicia el valor del input para create-watermark
					this.inputWm=null;
					this.createWmActivated=false;
					break;
				case "compress":					
					this.rangeCompressActive=false;
					this.updateExtAndReset();
					this.compressActivated=false;
					break;
				case "texturize":
					//desactiva el range texturize
					this.rangeTexturizeActive=false;
					//reincia el valor del input range de texturize
					this.texturize(0);
					this.texturizeActivated=false;
					break;
				case "spaceColor":
					//desactiva el select de espacio de color
					this.spaceColorActive=false;
					this.spaceColorSelected=this.ima.spaceColor;
					this.spaceColorActivated=false;
					break;
				case "channel":
					//desactiva el desplegable de canales
					this.channelActive=false;
					this.channelActivated=false;
					break;
			}
		},
	//anulado (sutituido por cancelAll() y cancelTask())
		//Cancela las selecciones iniciadas del efecto fusión, watermark y create-watermark
		//En lugar de desactivar todo directamente se podría comprobar cual
		//está activado, sobre todo en el segundo grupo, ya que solo puede haber uno activado
		cancelSelect(){
		//reinicia la acción seleccionada (fussion|watermark|create-watermark)	
			this.typeAction=null;

		//desactiva desplegable que sirve para fussion y watermark
			this.compositeSelectedHtml="Seleccionar";
			this.compositeSelectedId=null;
			this.compListActive=false;
		
		//desactiva desplegable de posición (watermark)
			this.compPosListActive=false;
			//this.compPosSelected=false;
			//establecida la opción de centrado, por defecto
			this.compPosStr=this.compPosStrOptions.center;
			this.compPosSelectedHtml=this.compPosIconSelected.center;
			this.compPos="center";
		//desactiva los identificadores (fussion, watermark, create-watermark, channels, spaceColor)
			this.fussionActivated=false;		
			this.wmActivated=false;
			this.createWmActivated=false;
			this.channelActivated=false;
			this.spaceColorActivated=false;
			this.compressActivated=false;
			this.texturizeActivated=false;
		//desactiva el input text, el input range,el desplegable (list) y el colorpicker
		//de create-watermark
			this.wmInputActive=false;
			//reinicia el valor del input para create-watermark
			this.inputWm=null;
		//desactiva el range texturize
			this.rangeTexturizeActive=false;
			//reincia el valor del input range de texturize
			this.texturize(0);
		//desactiva el range de compresión
			this.rangeCompressActive=false;
			//asignar el valor por defecto (80 para jpg, 4 para png)
			this.updateExtAndReset();
		//desactiva el desplegable de canales
			this.channelActive=false;			
		//desactiva el select de espacio de color
			this.spaceColorActive=false;
			this.spaceColorSelected=this.ima.spaceColor;
		},
		selectSpaceColor(){
			console.log("spaceColor: ",this.spaceColor);
			console.log("channelSelected: ",this.channelSelected)
			console.log("spaceColorSelected: ",this.spaceColorSelected);
		},
		selectChannel(){
			console.log("spaceColor: ",this.spaceColor);
			console.log("channelSelected: ",this.channelSelected)
			console.log("spaceColorSelected: ",this.spaceColorSelected);
			

		},
		//muestra las opciones de selección de los efectos fusión, watermark y 
		//create-watermark cancelando anteriores selecciones de algunos de los 3
		showListImage(action){
		//se comprueban los dials (desplegables) dial abierto	
		this.hideDials();
		//si hay desplegable visible...
			if(this.compListActive || this.wmInputActive || this.rangeTexturizeActive || this.rangeCompressActive){				
				if(action=="fussion"){
					if(!this.fussionActivated){
						this.cancelAll();					
						this.fussionActivated=true;
						this.compListActive=true;
						//pasar a null el archivo seleccionado si lo hubiera de otra 
						//acción y así resetearlo (opcional)
					}
				}else if(action=="watermark"){
					if(!this.wmActivated){
						this.cancelAll();
						this.wmActivated=true;
						this.compPosListActive=true;
						this.compListActive=true;
						//pasar a null el archivo seleccionado si lo hubiera de otra 
						//acción y así resetearlo (opcional)
					}
				}else if(action=="create-watermark"){					
					if(!this.createWmActivated){
						this.cancelAll()
						this.createWmActivated=true;
						this.wmInputActive=true;						
					}
				}				
				this.typeAction=action;
		//si no hay desplegable visible ni input de texto, (destinado a crear la marca de agua) se hace visible el que se haya seleccionado (fussion, watermark o create-watermark) 
			}else{
				if(action=="fussion"){
					this.fussionActivated=true;
					this.compListActive=true;
				}else if(action=="watermark"){
					this.wmActivated=true;
					this.compListActive=true;
					this.compPosListActive=true;
				}else if(action=="create-watermark"){
					//wmInputActive en true muestra el input, el range, el list y el 
					//componente verte (paleta interactiva)
					this.createWmActivated=true;
					this.wmInputActive=true;
					//entrada de texto
				}
				this.typeAction=action;
			}
			//pasamos 'all' para que no compruebe ni rotate ni reflex que no tienen
			//desplegable y se activan automáticamente al pulsar
			this.testGButton1('all');
		},
		
		//establece el font family actualizando la vista para el efecto 
		//create-watermark (creación marca de agua)
		setFontFamily(font){
			
			this.fontFamilySelected=font;
			this.fontSelected=font[0].toUpperCase()+font.slice(1);
			if(font=="timesnewroman")
				this.fontSelected="Times New Roman";
			this.expandFontFamily=false;
			
		},
		
		//mostrar range-texturize o range-compress o list-spacecolor o list-channels
		showInput(action){
			//se comprueban los desplegables dials
			this.hideDials();
			
			if(action=="texturize" && !this.rangeTexturizeActive){				
				this.cancelAll();
				this.rangeTexturizeActive=true;
				this.texturizeActivated=true;
				this.typeAction=action;					
			}else if(action=="compress" && !this.rangeCompressActive){				
				this.cancelAll();
				this.rangeCompressActive=true;
				this.compressActivated=true;
				this.typeAction=action;
			}else if(action=="separate_channel" && !this.channelActive){
				//si el espacio de color es distinto se muestra un dialog
				if(this.spaceColor != "RGB" && this.spaceColor !="SRGB" 
					&& this.spaceColor != "CMYK"){
					
					this.dialogNotChannelsActive=true;
					return;
				}
				this.cancelAll();				
				this.channelActivated=true;
				this.channelActive=true;
				this.typeAction=action;
			}else if(action=="space_color" ){				
				this.cancelAll();
				this.spaceColorActivated=true;
				this.spaceColorActive=true;
				this.typeAction=action;
			}
			
			console.log("llega: ",this.spaceColor)
		},
		
	//anulado, sustituido por session()
		testToken:()=>{
			if(sessionStorage){
				if(!sessionStorage.getItem("biedit_apitoken") || !sessionStorage.getItem("biedit_email"))
					return "El usuario no ha iniciado sesión";
				return true;
				
			}else{
				return "El navegador no soporta sessionStorage";
			}
		},
		
		//actualiza las medidas destinadas al canvas y al div image_effect, una vez se 
		//ha cargado la vista y el md-layout ha asignado automáticamente una medida 
		//al elemento img. Es una forma de obtener los px de un div que se ha establecido
		//en porcentaje
		updateSizeCanvas(){
			console.log("desde updateSizeCanvas: ",this.ima);
			this.deleteDrawCanvas();
			
			//let width=this.$refs.div_effect_image.clientWidth;
			let prop=this.handleCSS(this.$refs.div_effect_image);
			let width=prop[0];
			//console.log("solo refs: ",this.$refs.div_effect_image);
			//se podría asignar el tamaño real si es más pequeño que el resultado
			//que asigna el md-layout
		//revisar asignar la misma medida si es más pequeña que la creada por el 
		//md-layout y establecer un margin, pero al crear efecto rotate falla
		//es necesario profundizar más para añadir esta característica, ya que,
		//en el efecto rotate se intercambia el width  por el height, de momento,
		//ignoramos
			/*
			if(this.ima.width<width){
				console.log("medida estandar:",this.ima.width);
				width=this.ima.width
			}
			*/			
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
			//this.spaceColorActive=false;
		},
			
		cancelLoadImage(){
			//pasamos a null para que se muestre el spinner
			//this.tmpImage=null;
			//desactivamos y reiniciamos el efecto 
			this.cancelAll();
			this.dialogImage=false;
			this.tmpImage=null;
		},
		//muestra modal con un mensaje de confirmación o de información, detectando
		//si existen otras tareas pendientes (activadas) del grupo 1  
		confirmChange(type_effect){
			
			//se asigna el tipo de efecto (filter,polygon,polaroid...) a type para
			//después desde el método setChange() (que es llamado al pulsar OK en el 
			//modal de confirmación) llamara al efecto correspondiente
			this.type=type_effect;
			let list=this.testActivatedTasks(this.tasks);
			//si no existen cambios pendientes y se ha pulsado el botón de deshacer todo
			//o procesar todo se envia un dialog-alert en lugar de un dialog-confirm
			if(!list && type_effect=="undoAll" ||
				!list && type_effect=="processAll" ){
				this.dialogInfoActive=true;
				return;
			}
		
			//(tareas posibles del grupo1: rotate o reflex, solo uno de los dos, 
			//filter y polygon)
			//En caso de que se use el método de actualización propio de filter o de 
			//polygon (que se encuentran con el icono de check en el desplegable) se 
			//comprueba que haya tareas pendientes del primer grupo que no sea la 
			//propia, es decir, si pulsamos el botón de procesar filtro comprobamos que 
			//exista otra tarea además de filter o si pulsamos el botón de procesar 
			//forma que exista otra tarea además de polygon, ya que entonces no tendría 
			//sentido incluir el aviso de que existen tareas pendientes

		//Para lo descrito anteriormente creamos un array e incluimos todos los efectos 
		//activados del primer grupo exceptuando el propio 
		let pendentTasks=[];
		if(list){
			list.forEach((item)=> {
				let split=item.split("A");
				if(split[0]!=type_effect)
					pendentTasks.push(split[0]);
				
			})
		}
		//se comprueba si existen otros efectos pendientes (del primer grupo) 
		//y se asigna un mensaje que incluye un aviso de esas tareas pendientes,
		//exceptuando los métodos processAll() y undoAll()
			if(list && type_effect!="undoAll" && type_effect!="processAll" && pendentTasks.length>0){

					this.dialog_selected=this.dialog_title.pendentTasks;
			}else{
			
				switch(type_effect){
					case "filter":
						this.dialog_selected=this.dialog_title.filter;
						break;
					case "polygon":
						this.dialog_selected=this.dialog_title.polygon;
						break;
					case "undoAll":
							this.dialog_selected=this.dialog_title.undoAll;
						break;
					case "processAll":
						this.dialog_selected=this.dialog_title.processAll;
						break;
					case "fussion":
						this.dialog_selected=this.dialog_title.fussion;
						break;
					case "watermark":
						this.dialog_selected=this.dialog_title.watermark;
						break;
					case "create-watermark":
						this.dialog_selected=this.dialog_title.createWatermark;
						break;
					case "compress":
						this.dialog_selected=this.dialog_title.compress;
						break;					
					case "texturize":
						this.dialog_selected=this.dialog_title.texturize;
						break;
					case "separate_channel":
						this.dialog_selected=this.dialog_title.separateChannel;
						break;
					case "space_color":
						this.dialog_selected=this.dialog_title.spaceColor;
						break;
					default:
						this.dialog_selected=this.dialog_title.effect;
				}
			}			
			this.dialogConfirmActive=true;
			console.log("Confirmando...",this.typeAction);
		},
		//método al dar OK en la confirmación de un efecto de filtro, o recorte de
		// forma o efecto
		setChange(){
			//this.desactiveBtnByType();
			if(this.type){
				switch(this.type){
					case "filter":
						this.setFilter()
						break;
					case "polygon":
						this.setPolygon()
						break;
					case "undoAll":
						//obtenemos la lista de botones pintados como activados
						var list=this.testBtn('activated');
						//si testBtn() devuelve algún elemento despintamos con desactiveBtn()
						if(list)
							this.desactiveBtn(list);
						//llamamos al ḿétodo deshacer todo
						this.undoAll()
						break;
					case "processAll":
						//obtenemos la lista de botones pintados como activados
						var list2=this.testBtn('activated');
						//si testBtn() devuelve algún elemento despintamos con desactiveBtn()
						if(list2)
							this.desactiveBtn(list2);
						this.processAll()
						break;
					case "texturize":
						this.setEffect(this.type,{valTexturize:this.rangeTexturize});
						break;
					case "fussion":
					case "watermark":
					case "create-watermark":
						this.setComposite()
						break;
					case "compress":
						this.setCompress(this.rangeCompress);
						break;
					case "separate_channel":
						this.setEffect(this.type,{channel:this.channelSelected});
						break;
					case "space_color":
						this.setEffect(this.type,{spaceColor:this.spaceColorSelected});
						break;
					default:
						this.setEffect(this.type)
				}
				//console.log("desde setChange: ",this.type);
				
				//this.dialogImage=true;
				//this.tmpImage=effect.data.image;

			}
		},
		//deshace el filtro, necesario identificar desactivado
		cancelChange(){
			//desactivamos color de botón de efectos
			if(this.btnActive.effect)
				this.btnActive.effect=false;			
		},
		
		
		//Al establecer una nueva imagen arpovechamos el método de recargar la imagen 
		//desde el padre con reloadImage() creado para el componente Collections.
		//Este método establece una vista previa al procesar un efecto o conjunto de 
		//efectos apoyándose en la variable tmpImage, añadiendo tb una solicitud de 
		//carga de imagen
		//Para el filtro solamente no sería necesario, ya que las medidas no cambian
		setTmpImage(){
			//Recordar, el ima.src o image.src es solo el nombre aleatorio y la 
			//extensión, mientras que el ima.name o image.name es la imagen en base64 
			//o la ruta completa redirigiendo a la api ("http://.../get-image/nombrealeatorio.extensión")
			console.log("image desde effect: ",this.tmpImage);
			//ocultamos modal
			this.dialogImage=false;
			//pasamos a false para que realice la transición
			this.imgTrans=false;
		//con undoAll() desactivamos y reiniciamos las tareas activadas del primer 
		//grupo y la tarea activada del segundo grupo
		this.undoAll();		
			//this.$emit("reload",dato);
			//recargamos la nueva imagen
			//pasamos un callback para que cuando recargue los datos de la imagen 
			//vuelva a crear la transición (aunque no se aprecia, por lo menos, en local)
			this.$emit("reload",this.tmpImage,()=>{
					console.log("llega al callback: ",this.type);
					//comprobamos si el efecto es space_color y asignamos el nuevo
					//spaceColor para reiniciar el desplegable de spaceColorActive y
					//de esa forma muestra el botón de check cuando corresponde
					//Nota: Recordar que la propiedad spaceColor no es nativa del 
					//objeto image si no que se crea sobre la marcha:
					//desde el componente Collections con un emit similar a éste y en 
					//el headerComponent desde uploadServer()
					if(this.type=="space_color"){
						this.spaceColor=this.tmpImage.space_color;
						this.setChannelSelected();
					}
					console.log("después de spaceColor: ",this);
					this.updateSizeCanvas();
					setTimeout(()=> {
						this.imgTrans=true;	
					},100)
					
					//pasamos a null para que se muestre el spinner
					this.tmpImage=null;
			});
		},
	},
}
</script>
<style>
/*
.fade-enter-active{
	transition:opacity 5s
}
.fade-leave-active{
	opacity:1;
}
.fade-enter, .fade-leave-to{
	opacity:0;
}
*/
.md_menu_custom{
	padding:0;
}
.md_menu_custom>.md-button{
	margin:0 6px;
}

/*fonts*/
@font-face{
    font-family:usuzi;
    src:url(../assets/fonts/usuzi.ttf);
}
@font-face{
    font-family:abduction;
    src:url(../assets/fonts/abduction2002.ttf);
}
@font-face{
    font-family:corporate;
    src:url(../assets/fonts/corporateroundedextrabold.ttf);
}
@font-face{
    font-family:designer;
    src:url(../assets/fonts/designer-block.regular.ttf);
}
@font-face{
    font-family:fontanero;
    src:url(../assets/fonts/Fontanero-FFP.ttf);
}
@font-face{
    font-family:futura;
    src:url(../assets/fonts/FUTURAB.ttf);
}
@font-face{
    font-family:glsnecb;
    src:url(../assets/fonts/GLSNECB.TTF);
}
@font-face{
    font-family:nikaia;
    src:url(../assets/fonts/Nikaia_Medium.ttf);
}
@font-face{
    font-family:timesnewroman;
    src:url(../assets/fonts/timesbd.ttf);
}
@font-face{
    font-family:ubuntu;
    src:url(../assets/fonts/Ubuntu-Title.ttf);
}
@font-face{
    font-family:yanone;
    src:url(../assets/fonts/Yanone-Bold.otf);
}
@font-face{
    font-family:zerogirl;
    src:url(../assets/fonts/ZEROGIRL.TTF);
}
</style>