/*$( document ).ready(function() {
  // js goes in here.        
  	var canvas = document.getElementById('teacherBoard'),
    context = canvas.getContext('2d'), 
    img = document.createElement('img'),
    mouseDown = false,
    hasText = tre,
    clearCanvas = function(){
        if(hasText){
            context.clearRect(0,0, canvas.width, canvas.height);
            hasText = false;
        }
    };

    img.addEventListener("load", function(){
        clearCanvas();
        context.drawImage(img, 0, 0);
    }, false);
});*/