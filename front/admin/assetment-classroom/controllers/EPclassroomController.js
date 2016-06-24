/**
 * Created by Erik.
 */

var dependencies = [
    'EP.admin.assetment.classroom.services',
];

angular.module('EP.admin.assetment.classroom.controllers', dependencies)

    .controller(
        'EPclassroomController', ['$rootScope', '$scope', '$cookieStore', 'EPclassroomService', '$state', function($rootScope, $scope, $cookieStore,EPclassroomService, $state) {

            $scope.shapeDescription = "";
            $scope.studentNumbers = []
            $scope.drawingControl = {}; // This is Controller E

            var shapeObjectsList = [],
            currentRoomShape = 0;

            var isDragging = false;
            $scope.$on('$viewContentLoaded', function () 
            {
                // javascript code here
            });
            
            $scope.init = function(){
                $state.go('admin.assetment.startclassroom');
            }

            $scope.begin = function(){
                $state.go('admin.assetment.classroom');
                $state.go('admin.assetment.classroom.roomshape');
                $scope.shapeDescription = "Select a room shape that matches your room. Don't worry about strange curves or corners, just approximate.";
                addStudentItemList();
            }

            // Sidebar tool box
            $scope.changeRoomShape = function(){
                $scope.shapeDescription = "Select a room shape that matches your room. Don't worry about strange curves or corners, just approximate.";
                $state.go('admin.assetment.classroom.roomshape');   
            }

            $scope.changeFurniture = function(){
                $scope.shapeDescription = "Pick out some furniture to dress up your room, If you have unique furniture, try the basic shapes tab.";
                $state.go('admin.assetment.classroom.furniture');   
            }

            $scope.changeDesks = function(){
                $scope.shapeDescription = "Select a desk shape and start to lay them out in the classroom. Make sure you have enough room between the tables for chairs and space to walk.";
                $state.go('admin.assetment.classroom.desks');   
            }

            $scope.changeStudents = function(){
                $scope.shapeDescription = "Add students' name to the seating chart, then drag and drop them into place.";
                $state.go('admin.assetment.classroom.students');   
            }

            function addStudentItemList(){
                for(var i = 0; i < 30; i++) $scope.studentNumbers.push(i+1);
            }

            // Room Shape Select
            $scope.onSelectSquareRoom = function(){
                $scope.drawingControl.drawRoom('square');
                currentRoomShape = 1;
            }

            $scope.onSelectTallRoom = function(){
                $scope.drawingControl.drawRoom('tall');
                currentRoomShape = 2;
            }

            $scope.onSelectWideRoom = function(){
                $scope.drawingControl.drawRoom('wide'); 
                currentRoomShape = 3;
            }

            $scope.scaleZoomIn = function(){
                $scope.drawingControl.scaleObject(true);
            }

            $scope.scaleZoomOut = function(){
                $scope.drawingControl.scaleObject(false);
            }

            $scope.trashObject = function(){
                $scope.drawingControl.deleteObject();
            }

            $scope.saveClassroom = function(){
                var info = $scope.drawingControl.getClassroom();
                EPclassroomService.save(info).then(function(response){
                    console.log('successfully saved');
                });
            }

            // Dragging Shape
            handleDragStart = function (evt) {
                evt.dataTransfer.setData("shapeObjectId", evt.target.id);
            }

            handleDragOver = function (evt) {
                evt.dataTransfer.dropEffect = "copy";
                evt.stopPropagation();
                evt.preventDefault();
            }

            handleDrop = function (evt) {
                evt.preventDefault(); 
                evt.stopPropagation(); 
                var target = evt.target;
                var shapeId = evt.dataTransfer.getData("shapeObjectId");
                $scope.drawingControl.drawShape(shapeId,
                 {x:evt.clientX -document.getElementById('canvas').getBoundingClientRect().left, // Mouse Cursor Position in Canvas
                  y:evt.clientY - document.getElementById('canvas').getBoundingClientRect().top}
                  );
            }
            
        }
    ])

    .directive('drawing', function factory() {
        return {
            restrict: 'E',
            replace: true,
            template: '<canvas class="drawingCanvas" drawing id="canvas" width="600" height="500" dropzone="copy s:text/plain s:text/html" ondrop="handleDrop(event)" ondragover="handleDragOver(event)"></canvas>',
            scope: {
            control: '='
            },
            link: function(scope, element, attrs) {
                scope.internalControl = scope.control || {};
                var ctx = element[0].getContext('2d');
                var isDragging = false;
                var shapeList = [];
                var selectedObjectId = -1;
                var isEdit = false;
                // Shape Object to store information of each shape
                var ShapeObject = function(sort, type) {
                    this.sort = sort;
                    this.type = type;
                    this.pos = {};
                    this.text = "";
                    this.bounding = {width:0, height:0};
                    this.textBounding = {width:0, height:0};
                    this.sizeScale = 1;
                    this.scaleOffset = 5;
                }

                var lastX, lastY;
                
                element.bind('mousedown', function(event){

                    lastX = event.offsetX;
                    lastY = event.offsetY;
                    var xPos = event.offsetX, yPos = event.offsetY;
                    if (shapeList.length == 1) return;
                    for (var i = 1; i < shapeList.length; i++) {
                        var item = shapeList[i];
                        var bWidth = item.bounding['width'], bHeight = item.bounding['height'], tHeight = item.textBounding['height'], tWidth = item.textBounding['width'];
                        if((xPos < item.pos.x + bWidth / 2) && (xPos > item.pos.x - bWidth / 2) 
                            && (yPos < item.pos.y + bHeight / 2) && (yPos > item.pos.y - bHeight / 2)){
                            selectedObjectId = i;
                            isDragging = true;
                            break;
                        }
/*                        if((xPos < item.pos.x + tWidth / 2) && (xPos > item.pos.x -  tWidth / 2) 
                            && (yPos < item.pos.y + tHeight ) && (yPos > item.pos.y +  bHeight / 2 )){
                            $('.tempInput').attr({
                                type: 'text',
                                value: '',
                                id: 'tempInput',
                                style: 'position:absolute; top:'+ (item.pos.y + bHeight / 2) +'px; left:'+ (item.pos.x - item.bounding.width / 2)+'px;'+
                                ' zindex:2; display:block; background:#CCFFFF; border-style:none;' + 
                                'font-size:'+(tHeight - bHeight / 2) + 'px'
                            });
                            selectedObjectId = i;
                            break;
                        }*/
                    }

                    // Make text below of shape editable.
/*                    if(document.getElementById('tempInput').value == ""){
                        document.getElementById('tempInput').value = shapeList[selectedObjectId].text;    
                    }
                    if(!((xPos < shapeList[selectedObjectId].pos.x + tWidth / 2) && (xPos > shapeList[selectedObjectId].pos.x -  tWidth / 2) 
                        && (yPos < shapeList[selectedObjectId].pos.y + tHeight ) && (yPos > shapeList[selectedObjectId].pos.y +  bHeight / 2 ))){
                        shapeList[selectedObjectId].text = document.getElementById('tempInput').value;
                        document.getElementById('tempInput').value = '';
                        document.getElementById('tempInput').style.visibility = 'hidden';
                        redrawAll();                      
                    }*/
                });

                element.bind('mousemove', function(event){
                    if(isDragging){
                        shapeList[selectedObjectId].pos.x -= (lastX - event.offsetX);
                        shapeList[selectedObjectId].pos.y -= (lastY - event.offsetY);
                        lastX = event.offsetX;
                        lastY = event.offsetY;
                        redrawAll();
                    }
                });

                element.bind('mouseup', function(event){
                    isDragging = false;
                    
                });

                // canvas clearCanvas
                function clearCanvas(){
                    element[0].width = element[0].width;
                }

                scope.internalControl.deleteObject = function(){
                    shapeList.splice(selectedObjectId, 1);
                    redrawAll();
                };

                scope.internalControl.getClassroom = function(){
                    return shapeList;
                }

                scope.internalControl.scaleObject = function(isZoomIn){
                    switch(shapeList[selectedObjectId].sort){
                        case 2:
                        case 3:
                            if(isZoomIn){
                                shapeList[selectedObjectId].sizeScale ++;
                            }
                            else{
                                if(shapeList[selectedObjectId].bounding.width < 10 || shapeList[selectedObjectId].bounding.height < 10) return;
                                shapeList[selectedObjectId].sizeScale --;
                            }
                    }
                    redrawAll();
                }

                function drawRect(pos, width, height, isRoom){
                    ctx.beginPath();
                    ctx.rect(pos.x - width / 2, pos.y - height/2, width, height);
                    ctx.fillStyle = '#E5E9F5';
                    if(isRoom)
                        ctx.fillStyle = 'white';
                    ctx.fill();
                    ctx.lineWidth = 0.8;
                    ctx.strokeStyle = 'blue';
                    if(isRoom)
                    {
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = '#B2C1E0';
                    }
                    ctx.stroke();
                }

                function drawCircle(pos, radius, text){
                    if(text == undefined){
                        ctx.beginPath();
                        ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = '#E5E9F5';
                        ctx.fill();
                        ctx.lineWidth = 0;
                        ctx.strokeStyle = 'blue';
                        ctx.stroke();
                    }
                    else if(text != "" || text != undefined)
                    {
                        ctx.beginPath();
                        ctx.arc(pos.x , pos.y, radius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = 'white';
                        ctx.fill();
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'blue';
                        ctx.stroke();
                        drawText(pos, text, true, -1);
                    }
                }

                function drawText(pos, text, isStudent, currentIndex){
                    if(isStudent){
                        ctx.font = "11pt Arial";
                        ctx.fillStyle = 'black';
                        var offset = 5;
                        ctx.fillText(text, pos.x - ctx.measureText(text).width / 2, pos.y - 15);
                    }
                    else
                    {
                        ctx.font = 10 + 1 * shapeList[currentIndex].sizeScale + 'pt Arial';
                        ctx.fillStyle = 'black';
                        var offset = 5;
                        var width = ctx.measureText(text).width;
                        var height = 0;
                        if( shapeList[currentIndex].sizeScale == 1 ) 
                            height = 30;
                        else
                            height = shapeList[currentIndex].bounding.height / 2 + (10 + 1 * shapeList[currentIndex].sizeScale) * 1.5;
                        shapeList[currentIndex].textBounding.width = width;
                        shapeList[currentIndex].textBounding.height = height;
                        ctx.fillText(text, pos.x - width / 2, pos.y + height);
                    }
                }

                function drawRoomShape(type){
                    switch(type){
                        case "square":
                            drawRect({x:300, y:250}, 400, 400, true);
                        break;
                        case "tall":
                            drawRect({x:300, y:250}, 300, 450, true);
                        break;
                        case "wide":
                            drawRect({x:300, y:250}, 500, 300, true);
                        break;
                    }
                }

                scope.internalControl.drawRoom = function(type){
                    var new_room = new ShapeObject(1, type);

                    if(shapeList.length == 0)
                        shapeList.push(new_room);
                    else{
                        shapeList[0] = new_room;
                    }

                    redrawAll();
                }

                // Furniture Shape Drawing..

                scope.internalControl.drawShape = function(shapeId, pos){
                    var new_object,
                        object_label = $('#' + shapeId + " span").html(),
                        bounds;
                    
                    new_object = new ShapeObject(0, "");

                    if(shapeList.length == 0)
                        shapeList.push({});
                    new_object.text = object_label;
                    new_object.pos = {x:pos.x, y:pos.y};
                    shapeList.push(new_object);
                    var lastObject = shapeList[shapeList.length - 1];
                    var currentIndex = shapeList.length - 1;
                    if((shapeId.substr(0,1)).toUpperCase() == "F"){
                        lastObject.sort = 2;
                        lastObject.type = shapeId.substr(shapeId.indexOf('item') + 4);

                        drawDivBG(shapeId, pos, currentIndex);
                        drawText(pos, object_label, false, currentIndex);
                    }
                    else if((shapeId.substr(0,1)).toUpperCase() == "D"){
                        lastObject.sort = 3;
                        lastObject.type = shapeId.substr(shapeId.indexOf('item') + 4);
                        if(shapeId == "desk-item5"){
                            drawDivBG(shapeId, pos, currentIndex);
                            drawText(pos, object_label, false, currentIndex);
                        }
                        else{
                            drawDesks(shapeId, pos, currentIndex);
                            drawText(pos, object_label, false, currentIndex);
                        }
                    }
                    else if((shapeId.substr(0,1)).toUpperCase() == "S"){
                        lastObject.sort = 4;
                        lastObject.type = shapeId.substr(shapeId.indexOf('index') + 5);
                        lastObject.bounding.width = 10;
                        lastObject.bounding.height = 10;
                        drawCircle(pos, 10, lastObject.type);
                    }
                    shapeList[shapeList.length - 1] = lastObject;
                    selectedObjectId = shapeList.length - 1;
                }

                // Draw Desk and Student Number to Canvas with pure drawing
                function drawDesks(shapeId, pos, currentIndex){
                    var width = 0,
                        height = 0;
                    switch(shapeId){
                        case 'desk-item2':
                            width = 30 + shapeList[currentIndex].sizeScale * 5;
                            drawCircle(pos, width/2);
                            return;
                        break;
                        case 'desk-item1':
                            width = 30 + shapeList[currentIndex].sizeScale * 5, height = 30 + shapeList[currentIndex].sizeScale * 5;
                        break;
                        case 'desk-item3':
                            width = 55 + shapeList[currentIndex].sizeScale * 5, height = 25 + shapeList[currentIndex].sizeScale * 5;
                        break;
                        case 'desk-item4':
                            width = 45 + shapeList[currentIndex].sizeScale * 5, height = 30 + shapeList[currentIndex].sizeScale * 5;
                        break;
                    }
                    drawRect(pos, width, height);
                    if(currentIndex == -1) return;
                    shapeList[currentIndex].bounding.width = width;
                    shapeList[currentIndex].bounding.height = height;
                }

                // Draw background of Div to Canvas
                function drawDivBG(shapeId, pos, currentIndex){
                    var urlArray = ['http://localhost:8000/assets/images/EPshapes/EPwindow.png',
                                    'http://localhost:8000/assets/images/EPshapes/EPdoor.png',
                                    'http://localhost:8000/assets/images/EPshapes/EPblackboard.png',
                                    'http://localhost:8000/assets/images/EPshapes/EPbookshelves.png',
                                    'http://localhost:8000/assets/images/EPshapes/EPbulletin.png',
                                    'http://localhost:8000/assets/images/EPshapes/EPlocker.png',
                                    'http://localhost:8000/assets/images/EPshapes/EPcomputer.png',
                                    'http://localhost:8000/assets/images/EPshapes/EPhorseshoe.png'
                                    ];
                    var bgurl = "";
                    
                    if(shapeId.substr(0, 1) == 'd') {
                        bgurl = urlArray[7];
                    }
                    else {
                        bgurl = urlArray[Number(shapeId.substr(shapeId.indexOf('item') + 4)) - 1];
                    }

                    shapeId.substr(shapeId.indexOf('item'));
                    var img = new Image();
                    var imgwidth = 0,
                        imgheight = 0;
                    img.onload = function(){
                        switch(shapeId){
                            case 'furniture-item1':
                                imgwidth = 110 + shapeList[currentIndex].sizeScale * 5;
                                imgheight = 20 + shapeList[currentIndex].sizeScale * 0.3;
                            break;
                            case 'furniture-item2':
                                imgwidth = 84.5;
                                imgheight = 28.5;
                            break;
                            case 'furniture-item3':
                                imgwidth = 121 + shapeList[currentIndex].sizeScale * 5;
                                imgheight = 9;
                            break;
                            case 'furniture-item4':
                                imgwidth = 76 + shapeList[currentIndex].sizeScale * 5;
                                imgheight = 26.5 + shapeList[currentIndex].sizeScale * 5;
                            break;
                            case 'furniture-item5':
                                imgwidth = 141 + shapeList[currentIndex].sizeScale * 5;
                                imgheight = 9 + shapeList[currentIndex].sizeScale * 5;
                            break;
                            case 'furniture-item6':
                                imgwidth = 30 + shapeList[currentIndex].sizeScale * 5;
                                imgheight = 32 + shapeList[currentIndex].sizeScale * 5;
                            break;
                            case 'furniture-item7':
                                imgwidth = 36 + shapeList[currentIndex].sizeScale * 5;
                                imgheight = 30 + shapeList[currentIndex].sizeScale * 5;
                            break;
                            case 'desk-item5':
                                imgwidth = 64 + shapeList[currentIndex].sizeScale * 5;
                                imgheight = 33 + shapeList[currentIndex].sizeScale * 5;
                            break;
                        }
                        if(currentIndex != -1)
                        {
                            shapeList[currentIndex].bounding.width = imgwidth;
                            shapeList[currentIndex].bounding.height = imgheight;
                        }
                        ctx.drawImage(img, pos.x - imgwidth / 2, pos.y - imgheight / 2, imgwidth, imgheight);

                    }
                    img.src = bgurl;
                }

                function redrawAll(){
                    clearCanvas();
                    shapeList.forEach(function(item, index){
                        switch(item.sort){
                            case 1:
                                drawRoomShape(item.type);
                                drawText(item.pos, item.text, false, index);
                            break;
                            case 2:
                                drawDivBG('furniture-item' + item.type, item.pos, index);
                                drawText(item.pos, item.text, false, index);
                            break;
                            case 3:
                                if(item.type == 5){
                                    drawDivBG('desk-item' + item.type, item.pos, index);
                                    drawText(item.pos, item.text, false, index);
                                }
                                else{
                                    drawDesks('desk-item' + item.type, item.pos, index);
                                    drawText(item.pos, item.text, false, index);
                                }
                            break;
                            case 4:
                                drawCircle(item.pos, 10, item.type);
                            break;
                        }
                    });
                }
            }
        };
    });