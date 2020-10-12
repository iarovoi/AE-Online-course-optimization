﻿function buildGUI(thisObj){    thisObj.w = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Whiteboard", undefined, {resizeable:true});    var CompsGroup = thisObj.w.add("panel{text: 'Composition:', justify: 'center', orientation: 'row', alignment:['left','top'], properties:{borderStyle: 'black'}}");    CompsGroup.margins = [3,15,3,3];    var AnimationGroup = thisObj.w.add("panel{text: 'Animation:', justify: 'center', orientation: 'row', alignment:['left','top'], properties:{borderStyle: 'black'}}");    AnimationGroup.margins = [3,15,3,3];    var TextAnimationGroup = thisObj.w.add("panel{text: 'Text animation:', justify: 'center', orientation: 'row', alignment:['left','top'], properties:{borderStyle: 'black'}}");    TextAnimationGroup.margins = [3,15,3,3];    var AllCompFunc = CompsGroup.add("button",undefined, "All");    AllCompFunc.preferredSize = [30,25];    var BasicCompFunc = CompsGroup.add("button",undefined, "Basic");    BasicCompFunc.preferredSize = [50,25];        var InCompFunc = CompsGroup.add("button",undefined, "In");    InCompFunc.preferredSize = [30,25];    var TwitterCompFunc = CompsGroup.add("button",undefined, "Twitter");    TwitterCompFunc.preferredSize = [60,25];    var OutCompFunc = CompsGroup.add("button",undefined, "Out");    OutCompFunc.preferredSize = [30,25];    var InAnimFunc = AnimationGroup.add("button",undefined, "In");    InAnimFunc.preferredSize = [30,25];    var UpAnimFunc = AnimationGroup.add("button",undefined, "Up");      UpAnimFunc.preferredSize = [30,25];    /*      var JumpAnimFunc = AnimationGroup.add("button",undefined, "Jump");      JumpAnimFunc.preferredSize = [40,25];	 */      var YellowTextAnimationFunc = TextAnimationGroup.add("button",undefined, "Yellow");      YellowTextAnimationFunc.preferredSize = [60,25];      var TypeTextAnimationFunc = TextAnimationGroup.add("button",undefined, "Type");      TypeTextAnimationFunc.preferredSize = [40,25];        AllCompFunc.onClick = function()        {            AllComp();        }    BasicCompFunc.onClick = function()        {            app.beginUndoGroup("Create Basic Comp");            var project = app.project;            var curentItem = project.activeItem;            var curentLayers = curentItem.selectedLayers;            BasicComp(project, curentItem, curentLayers);            app.endUndoGroup();        }    InCompFunc.onClick = function()        {            app.beginUndoGroup("Create In-Comp");            var project = app.project;            var curentItem = project.activeItem;            var curentLayers = curentItem.selectedLayers;            InComp(project, curentItem, curentLayers);            app.endUndoGroup();        }    TwitterCompFunc.onClick = function()        {            app.beginUndoGroup("Create Twitter-Comp");            var project = app.project;            var curentItem = project.activeItem;            var curentLayers = curentItem.selectedLayers;            TwitterComp(project, curentItem, curentLayers);            app.endUndoGroup();        }    OutCompFunc.onClick = function()        {            app.beginUndoGroup("Create Out-Comp");            var project = app.project;            var curentItem = project.activeItem;            var curentLayers = curentItem.selectedLayers;            OutComp(project, curentItem, curentLayers);            app.endUndoGroup();        }    InAnimFunc.onClick = function()        {            InAnim();        }    UpAnimFunc.onClick = function()        {            UpAnim();        }  /*    JumpAnimFunc.onClick = function()        {            JumpAnim();        }	*/    YellowTextAnimationFunc.onClick = function()        {            YellowTextAnimation();        }    TypeTextAnimationFunc.onClick = function()        {            TypeTextAnimation();        }    if (thisObj.w instanceof Window)        {            thisObj.w.center();            thisObj.w.show();        }  else thisObj.w.layout.layout(true);}buildGUI(this);// Button Functions -------------------------------------------------------------function AllComp(){    app.beginUndoGroup("Prepare all comps");    try {        var proj = app.project;        var curItem = proj.activeItem;        var curLayers = curItem.selectedLayers;        var curProjItem, logoCompItem;                // Changiging Comps        var slicedLayersOne = mySlice(curLayers, 0, 1);        OutComp(proj, curItem, slicedLayersOne);        var slicedLayersTwo = mySlice(curLayers, 1, 1);        TwitterComp(proj, curItem, slicedLayersTwo);        var slicedLayersThree = mySlice(curLayers, 2, curLayers.length - 3);        BasicComp(proj, curItem, slicedLayersThree);        var slicedLayersFour = mySlice(curLayers, curLayers.length - 1, 1);        InComp(proj, curItem, slicedLayersFour);        //Adding Logo        for (var j = 1; j <= proj.numItems; j++) {                  curProjItem = proj.item(j);                  if(curProjItem.name == "Logo_Comp")                  {                      logoCompItem = curProjItem;                  }               }        logoCompItem.layer(1).copyToComp(curItem);        curItem.layer(1).startTime = curItem.workAreaStart;        LayerCrop(curItem.layer(1));    }catch(err) {        alert("Error at line #" + err.line.toString() + "\r" + err.toString());    }    app.endUndoGroup();}function BasicComp(proj, curItem, curLayers){    try {        var curProjItem;        for (var i=0; i < curLayers.length; i++)        {            var workSceneComp = curLayers[i].source;            var workSceneLayers = workSceneComp.layers;            if(workSceneLayers.length < 2)            {               // Work area correcting               workSceneLayers[1].inPoint = curLayers[i].inPoint;               workSceneLayers[1].outPoint = curLayers[i].outPoint;               workSceneComp.workAreaStart = workSceneLayers[1].inPoint;               workSceneComp.workAreaDuration = workSceneLayers[1].outPoint - workSceneLayers[1].inPoint;               // Copy Animation_BG in our comp               var shadowBGItem, shadowBGLayer;               for (var j = 1; j <= proj.numItems; j++) {                  curProjItem = proj.item(j);                  if(curProjItem.name == "Shadow_BG")                  {                      shadowBGItem = curProjItem;                  }               }               shadowBGItem.layer(1).copyToComp(workSceneComp);               shadowBGLayer = workSceneLayers[1];               LayerCrop(shadowBGLayer);               // Creating new Controller_In               //controllerIn = CreateInController(workSceneComp);               // Creating new InOut_Controller               inOutLayer = CreateInOutController(workSceneComp);               //Parenting Controller_In to InOut_Controller               //controllerIn.parent = inOutLayer;            }            else            {                alert("You have more than 1 layer in the comp");            }        }    }catch(err) {        alert("Error at line #" + err.line.toString() + "\r" + err.toString());    }}function InComp(proj, curItem, curLayers){    try {            var curProjItem;        for (var i=0; i < curLayers.length; i++)        {            var workSceneComp = curLayers[i].source;            var workSceneLayers = workSceneComp.layers;            if(workSceneLayers.length < 2)            {               // Work area correcting               workSceneLayers[1].inPoint = curLayers[i].inPoint;               workSceneLayers[1].outPoint = curLayers[i].outPoint;               workSceneComp.workAreaStart = workSceneLayers[1].inPoint;               workSceneComp.workAreaDuration = workSceneLayers[1].outPoint - workSceneLayers[1].inPoint               //diselect selected layers to make .copyToComp() work properly               workSceneLayers[1].selected = false;               // Copy In_Comp layers in our comp               var inCompItem, inCompLayer;               for (var j = 1; j <= proj.numItems; j++) {                  curProjItem = proj.item(j);                  if(curProjItem.name == "In_Comp")                  {                      inCompItem = curProjItem;                  }               }               for(var k = inCompItem.layers.length; k > 0 ; k--)               {                  inCompItem.layer(k).copyToComp(workSceneComp);                  inCompLayer = workSceneLayers[1];                  inCompLayer.startTime = workSceneComp.workAreaStart;                  LayerCrop(inCompLayer);               }               //Parenting Controllers to InOut_Controller               curItem.time = 0;               workSceneLayers[6].parent = workSceneLayers[1];               workSceneLayers[4].parent = workSceneLayers[1];               workSceneLayers[2].parent = workSceneLayers[1];               workSceneLayers[7].parent = workSceneLayers[6];               workSceneLayers[5].parent = workSceneLayers[4];               workSceneLayers[3].parent = workSceneLayers[2];            }            else            {                alert("You have more than 1 layer in the comp");            }        }    }catch(err) {        alert("Error at line #" + err.line.toString() + "\r" + err.toString());    }}function TwitterComp(proj, curItem, curLayers){        try {            var curProjItem;        for (var i=0; i < curLayers.length; i++)        {            var workSceneComp = curLayers[i].source;            var workSceneLayers = workSceneComp.layers;            if(workSceneLayers.length < 2)            {               // Work area correcting               workSceneLayers[1].inPoint = curLayers[i].inPoint;               workSceneLayers[1].outPoint = curLayers[i].outPoint;               workSceneComp.workAreaStart = workSceneLayers[1].inPoint;               workSceneComp.workAreaDuration = workSceneLayers[1].outPoint - workSceneLayers[1].inPoint               //diselect selected layers to make .copyToComp() work properly               workSceneLayers[1].selected = false;               // Copy In_Comp layers in our comp               var twitterCompItem, twitterCompLayer;               for (var j = 1; j <= proj.numItems; j++) {                  curProjItem = proj.item(j);                  if(curProjItem.name == "Twitter_Comp")                  {                      twitterCompItem = curProjItem;                  }               }               for(var k = twitterCompItem.layers.length; k > 1 ; k--)               {                  twitterCompItem.layer(k).copyToComp(workSceneComp);                  twitterCompLayer = workSceneLayers[1];                  twitterCompLayer.startTime = workSceneComp.workAreaStart;                  LayerCrop(twitterCompLayer);               }               // Creating new InOut_Controller               inOutLayer = CreateInOutController(workSceneComp);               //Parenting Controllers to InOut_Controller               curItem.time = 0;               workSceneLayers[13].parent = workSceneLayers[12];               workSceneLayers[12].parent = workSceneLayers[11];               workSceneLayers[11].parent = workSceneLayers[1];               workSceneLayers[10].parent = workSceneLayers[9];               workSceneLayers[9].parent = workSceneLayers[8];               workSceneLayers[8].parent = workSceneLayers[1];               workSceneLayers[7].parent = workSceneLayers[6];               workSceneLayers[6].parent = workSceneLayers[1];               workSceneLayers[5].parent = workSceneLayers[4];               workSceneLayers[4].parent = workSceneLayers[1];               workSceneLayers[3].parent = workSceneLayers[2];               workSceneLayers[2].parent = workSceneLayers[1];            }            else            {                alert("You have more than 1 layer in the comp");            }        }    }catch(err) {        alert("Error at line #" + err.line.toString() + "\r" + err.toString());    }}function OutComp(proj, curItem, curLayers){    try {            var curProjItem;        for (var i=0; i < curLayers.length; i++)        {            var workSceneComp = curLayers[i].source;            var workSceneLayers = workSceneComp.layers;            if(workSceneLayers.length < 2)            {               // Work area correcting               workSceneLayers[1].inPoint = curLayers[i].inPoint;               workSceneLayers[1].outPoint = curLayers[i].outPoint;               workSceneComp.workAreaStart = workSceneLayers[1].inPoint;               workSceneComp.workAreaDuration = workSceneLayers[1].outPoint - workSceneLayers[1].inPoint               //diselect selected layers to make .copyToComp() work properly               workSceneLayers[1].selected = false;               // Copy In_Comp layers in our comp               var outCompItem, outCompLayer;               for (var j = 1; j <= proj.numItems; j++) {                  curProjItem = proj.item(j);                  if(curProjItem.name == "Out_Comp")                  {                      outCompItem = curProjItem;                  }               }               for(var k = outCompItem.layers.length; k > 1 ; k--)               {                  outCompItem.layer(k).copyToComp(workSceneComp);                  outCompLayer = workSceneLayers[1];                  outCompLayer.startTime = workSceneComp.workAreaStart;                  LayerCrop(outCompLayer);               }               // Creating new InOut_Controller               inOutLayer = CreateInOutController(workSceneComp);               //Parenting Controllers to InOut_Controller               curItem.time = 0;               workSceneLayers[9].parent = workSceneLayers[1];               workSceneLayers[8].parent = workSceneLayers[7];               workSceneLayers[7].parent = workSceneLayers[1];               workSceneLayers[6].parent = workSceneLayers[5];               workSceneLayers[5].parent = workSceneLayers[4];               workSceneLayers[4].parent = workSceneLayers[1];               workSceneLayers[3].parent = workSceneLayers[2];               workSceneLayers[2].parent = workSceneLayers[1];            }            else            {                alert("You have more than 1 layer in the comp");            }        }    }catch(err) {        alert("Error at line #" + err.line.toString() + "\r" + err.toString());    }}function InAnim(){    app.beginUndoGroup("Add In-Animation");    try {        var proj = app.project;        var curItem = proj.activeItem;        var curLayers = curItem.selectedLayers;        var createdInController, curProjItem, inOutController;        for (var j = 1; j <= curItem.layers.length; j++) {                  curProjItem = curItem.layer(j);                  if(curProjItem.name == "InOut_Controller")                  {                      inOutController = curProjItem;                  }        }        for(var i=0; i < curLayers.length; i++)        {            createdInController = CreateInController(curItem);            createdInController.moveBefore(curLayers[i]);            curLayers[i].parent = createdInController;            createdInController.parent = inOutController;        }    }catch(err) {        alert("Error at line #" + err.line.toString() + "\r" + err.toString());    }    app.endUndoGroup();}function UpAnim(){    app.beginUndoGroup("Add Up-animation");    try {        var proj = app.project;        var curItem = proj.activeItem;        var curLayers = curItem.selectedLayers;        var curTime = curItem.time;        var easeIn = new KeyframeEase(0,100);        var easeOut = new KeyframeEase(0,100);        var workLayer;      for(var i=0; i < curLayers.length; i++)        {            var curObjPos = curLayers[i].property("Transform").property("Position").value;            curLayers[i].property("Transform").property("Position").addKey(curTime);            curLayers[i].property("Transform").property("Position").addKey(curTime + 15/24);            curLayers[i].property("Transform").property("Position").setValueAtKey(1, [curObjPos[0], curObjPos[1] + 1080]);            curLayers[i].property("Transform").property("Position").setTemporalEaseAtKey(1,[easeIn],[easeOut]);            curLayers[i].property("Transform").property("Position").setTemporalEaseAtKey(2,[easeIn],[easeOut]);            var shapeLayer = curItem.layers.addShape(); // adding a shape layer to the pipComp            var contents = shapeLayer.property("ADBE Root Vectors Group"); // Accessing the contents of the shape layer            var shapeRect = contents.addProperty("ADBE Vector Shape - Rect"); // Adding a rectangle to the shape layer            var shapeFill = contents.addProperty("ADBE Vector Graphic - Fill");            shapeRect = contents.property("ADBE Vector Shape - Rect"); // adding fill invalidates shapeRect            var rectSize = shapeRect.property("ADBE Vector Rect Size");            var rectPosition = shapeRect.property("ADBE Vector Rect Position");            rectSize.setValue([1920, 1080]);            shapeLayer.property("Transform").property("Position").setValue([curObjPos[0], curObjPos[1] + 1080]);            // Adding track matte and parenting            shapeLayer.moveBefore(curLayers[i]);            curLayers[i].trackMatteType = TrackMatteType.ALPHA_INVERTED;        }    }catch(err) {        alert("Error at line #" + err.line.toString() + "\r" + err.toString());    }    app.endUndoGroup();}function YellowTextAnimation(){    app.beginUndoGroup("Yellow text animation");    try {        var proj = app.project;        var curItem = proj.activeItem;        var curLayers = curItem.selectedLayers;    	var curTime = curItem.time;    	var easeIn = new KeyframeEase(0,100);    	var easeOut = new KeyframeEase(0,100);    	var workLayer;    	for(var i=0; i < curLayers.length; i++)        {        	workLayer = curLayers[i];        	workLayer.Effects.addProperty("ADBE Fill")("Color").addKey(curTime);        	workLayer.Effects.property("ADBE Fill")("Color").addKey(curTime + 1);        	workLayer.Effects.property("ADBE Fill")("Color").setValueAtKey(1,[255/255,255/255,255/255,255/255]);        	workLayer.Effects.property("ADBE Fill")("Color").setValueAtKey(2,[255/255,221/255,0/255,255/255]);        	workLayer.Effects.property("ADBE Fill")("Color").setTemporalEaseAtKey(1,[easeIn],[easeOut]);        	workLayer.Effects.property("ADBE Fill")("Color").setTemporalEaseAtKey(2,[easeIn],[easeOut]);        }    }catch(err) {        alert("Error at line #" + err.line.toString() + "\r" + err.toString());    }    app.endUndoGroup();}function TypeTextAnimation(){    app.beginUndoGroup("Type text animation");    try {        var proj = app.project;        var curItem = proj.activeItem;        var curLayers = curItem.selectedLayers;      var curTime = curItem.time;      var easeIn = new KeyframeEase(0,100/3);      var easeOut = new KeyframeEase(0,100/3);      var workLayer;      for(var i=0; i < curLayers.length; i++)        {          workLayer = curLayers[i];          var animator = workLayer.Text.Animators.addProperty("ADBE Text Animator");          var opacity = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity");          var rangeSelector = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");          opacity.setValue(0);          rangeSelector("Start").addKey(curTime);          rangeSelector("Start").addKey(curTime + 15/24);          rangeSelector("Start").setValueAtKey(1,0);          rangeSelector("Start").setValueAtKey(2,100);          rangeSelector("Start").setTemporalEaseAtKey(1,[easeIn],[easeOut]);          rangeSelector("Start").setTemporalEaseAtKey(2,[easeIn],[easeOut]);        }    }catch(err) {        alert("Error at line #" + err.line.toString() + "\r" + err.toString());    }    app.endUndoGroup();}// Other functions ------------------------------------------------------------- function LayerCrop(funcLayer){    funcLayer.inPoint = funcLayer.containingComp.workAreaStart;    funcLayer.outPoint = funcLayer.containingComp.workAreaStart + funcLayer.containingComp.workAreaDuration;}function CreateInController(sceneComp){  sceneLayers = sceneComp.layers;  controllerIn = sceneLayers.addNull();  controllerIn.name = "Controller_In";  LayerCrop(controllerIn);  var easeIn = new KeyframeEase(0,100/3);  var easeOut = new KeyframeEase(0,100/3);  var controllerInPos = controllerIn.property("Transform").property("Position").value;  var expInPos = "amp = .005; //Чем больше значение, тем больше амблитуда\            freq = 1; //Чем больше значение, тем больше частота \            decay = 4; //Чем больше значение, тем меньше время колебания \            layerWithMarkers = thisComp.layer('InOut_Controller');\            markerInTime = layerWithMarkers.marker.key('In').time;\            newTime = time - (markerInTime - thisLayer.inPoint);\            \            newValue = valueAtTime(newTime);\            \            n = 0;\            if (numKeys > 0){\            n = nearestKey(newTime).index;\            if (key(n).time > newTime){n--;}\            }\            if (n == 0) {t = 0;}\            else {t = newTime - key(n).time;}\            if (n > 0){\            v = velocityAtTime(key(n).time - thisComp.frameDuration/10);\            newValue + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t)\            }\            else {newValue;}";                      controllerIn.property("Transform").property("Position").addKey(sceneComp.workAreaStart);  controllerIn.property("Transform").property("Position").addKey(sceneComp.workAreaStart + 5/24);  controllerIn.property("Transform").property("Position").setValueAtKey(1, [controllerInPos[0]*3,controllerInPos[1]]);  controllerIn.property("Transform").property("Position").setTemporalEaseAtKey(1,[easeIn],[easeOut]);  controllerIn.property("Transform").property("Position").expression = expInPos;  return controllerIn;}function CreateInOutController(sceneComp){  sceneLayers = sceneComp.layers;  inOutLayer = sceneLayers.addNull();  inOutLayer.name = "InOut_Controller";  LayerCrop(inOutLayer);  var InOutNullPos = inOutLayer.property("Transform").property("Position").value;  inOutLayer.property("Transform").property("Position").addKey(-1);  inOutLayer.property("Transform").property("Position").addKey(10/24-1);  inOutLayer.property("Transform").property("Position").setValueAtKey(2, [InOutNullPos[0]*3,InOutNullPos[1]]);  var InMarker = new MarkerValue("In");  var OutMarker = new MarkerValue("Out");  var expInOut = "/* ---------- Flow Function Declarations ---------- */\                  function customBezier(t,tMin,tMax,value1,value2,bezierPoints){if(arguments.length!==6)return value;var a=value2-value1;var b=tMax-tMin;var c=clamp((t-tMin)/b,0,1);if(!(bezierPoints instanceof Array)||bezierPoints.length!==4)bezierPoints=[0,0,1,1];return a*h(c,bezierPoints)+value1;function h(f,g){var x=3*g[0];var j=3*(g[2]-g[0])-x;var k=1-x-j;var l=3*g[1];var m=3*(g[3]-g[1])-l;var n=1-l-m;var d=f;for(var i=0;i<5;i++){var z=d*(x+d*(j+d*k))-f;if(Math.abs(z)<1e-3)break;d-=z/(x+d*(2*j+3*k*d));}return d*(l+d*(m+d*n));}}\                  /* ---------- Flow Function Declarations ---------- */\                  \                  /* ---------- Flow Expression Template ------------ */\                  layerWithMarkers= thisLayer;\                  shadowSlider = thisComp.layer('Animation_BG').effect('Black')('Checkbox');\                  \                  markerOutTime = layerWithMarkers.marker.key('Out').time - 1;\                  keyOneTime = key(1).time;\                  keyTwoTime = key(2).time;\                  keyOneValue = key(1).value;\                  keyTwoValue = key(2).value;\                  \                  if(shadowSlider == true)\                  {\                  customBezier(time,markerOutTime,keyTwoTime + (markerOutTime - keyOneTime),keyOneValue,keyTwoValue, [0.6, 0, 1, 1]);\                  }\                  else\                  {\                  customBezier(time - framesToTime(14),markerOutTime,keyTwoTime + (markerOutTime - keyOneTime),keyOneValue,keyTwoValue, [0.6, 0, 0.6, 1]);\                  }";  inOutLayer.property("Marker").setValueAtTime(inOutLayer.inPoint, InMarker);  inOutLayer.property("Marker").setValueAtTime(inOutLayer.outPoint, OutMarker);  inOutLayer.property("Transform").property("Position").expression = expInOut;  return inOutLayer;}function mySlice(inputArray, startIndex, sliceLength){//this returns two arrays: first a slice of the original containing//sliceLength elements from the input starting with startIndex//and a second containing the rest of the original array  outPutArray=[];  sliceArray = [];  for(var f=0; f < inputArray.length; f++){    if((f < startIndex) | (f >= startIndex + sliceLength)){      outPutArray.push(inputArray[f]);    } else {      sliceArray.push(inputArray[f]);    }  }  return sliceArray;}