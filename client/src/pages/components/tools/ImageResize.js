import defaultsDeep from"lodash.defaultsdeep";import Quill from"quill";const IconAlignLeft='\n <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZUlEQVR4nO2UMQrAMAwD9f9nxSmlr1KXFDq6jnEJ0YEXLwfCFiB25AJw/iHmmIfjtfOMZYkZmFSxB4nXjprVx2UfpS1LXAYlXqWrGe1vJrxT6MUoMRQ1ao6rJ0TdPGKbKXohMLgBkHj8PWoNvOUAAAAASUVORK5CYII="\n style="margin: 0">\n',IconAlignCenter='\n <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZklEQVR4nO2VMQrAMAwD9f9n1Qmlr1KXDh1NIqc49YHmAyNkoEjABeD8QswnYfSXxBtTiDkYmdhLifOemqvLZQPSA5kH5B/iPlGqqfmkOG5KzDo1gsrVhAWTzye3Wi4PFv2FCii4Ac/P9EXTF9FPAAAAAElFTkSuQmCC"\n style="margin: 0">\n',IconAlignRight='\n <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZklEQVR4nO2USwrAIAxE5/7HahTpqeJKKG5sPoil8yAbITwZhgCExLkBNO9yBaCGkcfueHNhkc6iFPEbKNZPR729XGKUXlniCBSfF3V1tjh8qzVpKF7CqHVXuUpC3Efcapk+Qn5CBwMJ/D3TD9DUAAAAAElFTkSuQmCC"\n style="margin: 0">\n';class ImageResize{constructor(t,i){this.quill=t,this.options=i,this.overlay=null,this.img=null,this.toolbar=null,this.display=null,this.boxes=[],this.quill.root.addEventListener("click",this.handleClick.bind(this),!1),this.quill.root.parentNode.style.position=this.quill.root.parentNode.style.position||"relative"}static DEFAULTS={modules:["DisplaySize","Toolbar","Resize"],overlayStyles:{position:"absolute",boxSizing:"border-box",border:"1px dashed #444"},handleStyles:{position:"absolute",height:"12px",width:"12px",backgroundColor:"white",border:"1px solid #777",boxSizing:"border-box",opacity:"0.80",zIndex:"20"},displayStyles:{position:"absolute",font:"12px/1.0 Arial, Helvetica, sans-serif",padding:"4px 8px",textAlign:"center",backgroundColor:"white",color:"#333",border:"1px solid #777",boxSizing:"border-box",opacity:"0.80",cursor:"default",zIndex:"20"},toolbarStyles:{position:"absolute",top:"-12px",right:"0",left:"0",height:"0",minWidth:"100px",font:"12px/1.0 Arial, Helvetica, sans-serif",textAlign:"center",color:"#333",boxSizing:"border-box",cursor:"default",zIndex:"20"},toolbarButtonStyles:{display:"inline-block",width:"24px",height:"24px",background:"white",border:"1px solid #999",verticalAlign:"middle",zIndex:"20"},toolbarButtonSvgStyles:{fill:"#444",stroke:"#444",strokeWidth:"2"}};currentWidth=null;isDragging=!1;initialize=(t,i={})=>{this.quill=t,this.options=defaultsDeep({},i,ImageResize.DEFAULTS),this.overlay=null,this.img=null,this.toolbar=null,this.display=null,this.boxes=[],this.quill.root.style.userSelect="none",this.quill.root.addEventListener("click",this.handleClick,!1),this.quill.root.parentNode.style.position=this.quill.root.parentNode.style.position||"relative"};handleClick=t=>{if(t.target&&t.target.tagName&&"IMG"===t.target.tagName.toUpperCase()){if(this.img===t.target)return;this.img&&this.hide(),this.show(t.target)}else this.img&&(this.hide(),this.hideOverlay(),this.img=null)};show=t=>{this.img=t,this.currentWidth&&(this.img.style.width=`${this.currentWidth}px`),this.showOverlay(),this.createToolbar(),this.createDisplay(),this.createResizeBoxes()};showOverlay=()=>{this.overlay&&this.hideOverlay(),this.overlay=document.createElement("div"),Object.assign(this.overlay.style,this.options.overlayStyles),this.quill.root.parentNode.appendChild(this.overlay),this.repositionElements()};hideOverlay=()=>{this.overlay&&(this.quill.root.parentNode.removeChild(this.overlay),this.overlay=null)};repositionElements=()=>{if(!this.overlay||!this.img)return;const t=this.quill.root.parentNode,i=this.img.getBoundingClientRect(),e=t.getBoundingClientRect();Object.assign(this.overlay.style,{left:`${i.left-e.left-1+t.scrollLeft}px`,top:`${i.top-e.top+t.scrollTop}px`,width:`${i.width}px`,height:`${i.height}px`}),this.positionBoxes(),this.boxes.forEach(((t,e)=>{const s=t.getBoundingClientRect(),o=[{left:0,top:0},{left:i.width-s.width,top:0},{left:i.width-s.width,top:i.height-s.height},{left:0,top:i.height-s.height}];Object.assign(t.style,{left:`${o[e].left}px`,top:`${o[e].top}px`})}))};hide=()=>{this.hideOverlay(),this.removeToolbar(),this.removeDisplay(),this.removeResizeBoxes(),this.img=null,this.currentWidth=null,this.currentHeight=null};createToolbar(){this.toolbar=document.createElement("div"),Object.assign(this.toolbar.style,this.options.toolbarStyles),this.overlay.appendChild(this.toolbar),this.createToolbarButtons()}createToolbarButtons=()=>{const t=[];[{icon:IconAlignLeft,apply:()=>{this.img.style.float="left",this.img.style.display="block",this.img.style.margin="0px 1em 0px 0em"},isApplied:()=>"left"===this.img.style.float},{icon:IconAlignCenter,apply:()=>{this.img.style.float="none",this.img.style.display="block",this.img.style.margin="auto"},isApplied:()=>"auto"===this.img.style.margin},{icon:IconAlignRight,apply:()=>{this.img.style.float="right",this.img.style.display="inline-block",this.img.style.margin="0px 0em 0px 1em"},isApplied:()=>"right"===this.img.style.float}].forEach(((i,e)=>{const s=document.createElement("span");t.push(s),s.innerHTML=i.icon,s.addEventListener("click",(()=>{t.forEach((t=>t.style.filter="")),i.isApplied()?(this.img.style.float="",this.img.style.margin=""):(this.selectButton(s),i.apply(),this.repositionElements())})),Object.assign(s.style,this.options.toolbarButtonStyles),e>0&&(s.style.borderLeftWidth="0"),Object.assign(s.children[0].style,this.options.toolbarButtonSvgStyles),i.isApplied()&&this.selectButton(s),this.toolbar.appendChild(s)}))};selectButton=t=>{t.style.filter="invert(20%)"};createDisplay=()=>{this.display=document.createElement("div"),Object.assign(this.display.style,this.options.displayStyles),this.overlay.appendChild(this.display),this.updateDisplay()};updateDisplay(){if(!this.display||!this.img)return;const t=this.getCurrentSize();if(this.display.innerHTML=t.join(" &times; "),t[0]>120&&t[1]>30)Object.assign(this.display.style,{right:"4px",bottom:"4px",left:"auto"});else if("right"===this.img.style.float){const t=this.display.getBoundingClientRect();Object.assign(this.display.style,{right:"auto",bottom:`-${t.height+4}px`,left:`-${t.width+4}px`})}else{const t=this.display.getBoundingClientRect();Object.assign(this.display.style,{right:`-${t.width+4}px`,bottom:`-${t.height+4}px`,left:"auto"})}}getCurrentSize=()=>[this.img.width,Math.round(this.img.width/this.img.naturalWidth*this.img.naturalHeight)];createResizeBoxes=()=>{this.boxes=[],["nwse-resize","nesw-resize","nwse-resize","nesw-resize"].forEach((t=>{const i=document.createElement("div");Object.assign(i.style,this.options.handleStyles),i.style.cursor=t,i.style.position="absolute",i.style.width=`${this.options.handleStyles.width}px`,i.style.height=`${this.options.handleStyles.height}px`,i.addEventListener("mousedown",this.handleMousedown.bind(this),!1),this.overlay.appendChild(i),this.boxes.push(i)})),this.positionBoxes()};positionBoxes=()=>{if(!this.boxes.length||!this.overlay)return;const t=this.img.getBoundingClientRect(),i=parseInt(this.options.handleStyles.width);[{left:0,top:0},{left:t.width-i,top:0},{left:t.width-i,top:t.height-i},{left:0,top:t.height-i}].forEach(((t,i)=>{Object.assign(this.boxes[i].style,{left:`${t.left}px`,top:`${t.top}px`})}))};handleMousedown=t=>{const i=parseInt(this.options.handleStyles.width),e=this.img.getBoundingClientRect(),s=[{x:e.left,y:e.top},{x:e.right-i,y:e.top},{x:e.right-i,y:e.bottom-i},{x:e.left,y:e.bottom-i}];for(let i=0;i<s.length;i++)if(Math.abs(t.clientX-s[i].x)<10&&Math.abs(t.clientY-s[i].y)<10){this.dragBox=this.boxes[i],this.dragStartX=t.clientX,this.dragStartY=t.clientY,this.preDragWidth=this.img.width||this.img.naturalWidth,this.preDragHeight=this.img.height||this.img.naturalHeight,this.setCursor(this.dragBox.style.cursor),document.addEventListener("mousemove",this.handleDrag.bind(this),!1),document.addEventListener("mouseup",this.handleMouseup.bind(this),!1);break}this.isDragging=!0};handleMouseup=()=>{this.img&&this.setCursor(""),document.removeEventListener("mousemove",this.handleDrag),document.removeEventListener("mouseup",this.handleMouseup),this.isDragging=!1};handleDrag=t=>{if(this.isDragging){if(!this.img)return;const i=t.clientX-this.dragStartX,e=t.clientY-this.dragStartY;if(this.dragBox===this.boxes[0]||this.dragBox===this.boxes[1]||this.dragBox===this.boxes[2]||this.dragBox===this.boxes[3]){const t=this.preDragWidth+(this.dragBox===this.boxes[0]||this.dragBox===this.boxes[3]?-i:i),s=this.preDragHeight+(this.dragBox===this.boxes[0]||this.dragBox===this.boxes[1]?-e:e);this.currentWidth=t,this.currentHeight=s,this.img.style.width=`${this.currentWidth}px`,this.img.style.height=`${this.currentHeight}px`,this.repositionElements(),this.updateDisplay()}}};setCursor=t=>{[document.body].concat(this.img?[this.img]:[]).forEach((i=>{i.style.cursor=t}))};removeToolbar=()=>{this.toolbar&&(this.toolbar.parentNode.removeChild(this.toolbar),this.toolbar=null)};removeDisplay=()=>{this.display&&(this.display.parentNode.removeChild(this.display),this.display=null)};removeResizeBoxes=()=>{this.boxes.forEach((t=>{t.parentNode.removeChild(t)})),this.boxes=[]};destroy(){document.removeEventListener("mousemove",this.handleDrag),document.removeEventListener("mouseup",this.handleMouseup),this.quill.root.removeEventListener("click",this.handleClick)}}Quill.register("modules/imageResize",ImageResize);export default ImageResize;