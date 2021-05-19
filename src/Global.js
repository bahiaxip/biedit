//url: url de api
//widthDefault: ancho establecido para el panel principal (MainPanel)
//widthDefault es modificado si la imagen tiene un ancho menor
//maxWidthDefault y maxHeightDefault: máximos ancho y alto para panel de recorte (CutPanel) 
//y collections (Collections)
//maxWidthDefault no es vinculante ya que es actualizado según la resolución del dispositivo,
//maxHeightDefault si es necesario, pero se puede asignar otro ya que el alto no 
//altera el diseño de la aplicación.
var Global = {
	//live_server
	//url: "http://localhost:8000/api/",
	url: "http://localhost/biedit_backend/api/",
	widthDefault: 600,
	maxWidthDefault: 1280,
	maxHeightDefault: 1920,
	minWidthHeight: 50,
	maxSizeFile:20000000
}
export default Global;