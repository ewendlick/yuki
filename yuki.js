(function($){
  $.fn.yuki = function(options) {

      //any color is ok
      //shapes: diamond, circle
      //animation: shrink, expand
      //todo: change direction ("shrink" or "grow")
      //todo: implement transparency
      var settings = $.extend({
      // These are the defaults.
          color: "#f4645f",
          shape: "diamond",
          size: 25,
          speed: 500
      }, options );

      //todo: check color and attempt to place it
      function colorcheck(color){
          var isColor  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
          if(isColor){
              return color;
          }else {
              return settings.color;
          }
      }

      //todo: check shape and attempt to place it
      var validshapes = ["diamond", "circle"];
      function shapeCheck(shape){
        if(jQuery.inArray(shape, validshapes)){
            return shape;
        }else{
            return settings.shape;
        }
      }

      function sizeCheck(size){
          var parsedsize = parseInt(size);
          if(parsedsize !== NaN){
              return parsedsize + "px";
          }else{
              return settings.size;
          }
      }

      //todo: check speed and attempt to place it
      function speedCheck(speed){
        if(!isNaN(speed)){
            //do we set the speed here, or what?

            return speed;
        }else{
            return settings.speed;
        }
      }

      function convertHexToDec(hex_value){
          //todo: implement this process

          // step 0) check to see that is a valid color
            if(!colorCheck(hex_value)){
                return -1;
            }
          // step 1) remove the hashtag
            if(hex_value[0] == "#"){
                hex_value = hex_value.substring(1);
            }
          // step 2) if length is 3, duplicate the characters
            if(hex_value.length == 3){
                hex_value = hex_value[0] + hex_value[0] + hex_value[1] + hex_value[1] + hex_value[2] + hex_value[2]; //doesn't require String() function?
            }
          // step 3) split into groups of two

          // step 4) run those through this -> yourNumber = parseInt("FF", 16); //becomes 255
            var rgba = "rgba(" + parseInt(hex_value.substring(0,2)) + ", " + parseInt(hex_value.substring(2,4)) + ", " + parseInt(hex_value.substring(4,6)) + ", 255)";

          return rgba;
      }


    
      //There were difficulties in getting CSS stored in the :after attribute. This is the way that worked
      /*
      $("head").append("<style> \
        .diamond{ \
          height: 0; \
          width: 0; \
          border: 20px solid transparent; \
          border-bottom: 25px solid #f4645f; \
          position: relative; \
          top: -25px; \
        } \
        .diamond:after{ \
          content: ''; \
          position: absolute; \
          left: -20px; \
          top: 25px; \
          width: 0; \
          height: 0; \
          border: 20px solid transparent; \
          border-top: 25px solid #f4645f; \
        } \
      </style>");
      */

      if(settings.shape == "diamond") {
          $("head").append("<style> \
         .diamond2{ \
          height: 0; \
          width: 0; \
          border: 20px solid transparent; \
          border-bottom: 25px solid" + settings.color + "; \
          position: relative; \
          top: -18px; \
        } \
        .diamond2bottom{ \
          content: ''; \
          position: absolute; \
          top: 25px; \
          width: 0; \
          height: 0; \
          border: 20px solid transparent; \
          border-top: 25px solid" + settings.color + "; \
        } \
        </style>");
      }else if(settings.shape == "circle"){
          $("head").append("<style> \
         .circle{ \
         width: "+ settings.size * 2 +"px;\
         height: "+ settings.size * 2 +"px;\
         background:"+ settings.color +"; \
         border-radius:50%; \
         -moz-border-radius: 50%; \
         -webkit-border-radius: 50%; \
         position: relative; \
         top: 0px; \
         left: 0px; \
         } \
         </style>");
      }

      $("head").append("<style> \
      .flair{ \
        position: absolute; \
      } \
      </style>");


    //TODO: change to "this"
    $(document).click(function(event){
      //todo: implement a z-index to place the click event on top of everything
      var zindex = 9999; //to be implemented later


      //disallow duplicates (for now)
      //todo: allow duplicates
      if($(".flair").length == 0) {
          //get the coordinates
          var currentMousePosition = {x: -1, y: -1};
          currentMousePosition.x = event.pageX - 20;
          currentMousePosition.y = event.pageY - 20;

          console.log(currentMousePosition);

          if(settings.shape == "diamond") {
              $('body').append('<div class="flair"><div class="diamond2"></div><div class="diamond2bottom"></div></div>');
              $(".flair").css("top", currentMousePosition.y + "px").css("left", currentMousePosition.x + "px");

              //$(".diamond").animate({"border": "0px", "border-bottom": "0px", "border-top": "0px"},500, function(){console.log("done"); $(".flair").remove();});
              //$(".diamond").animate({"borderWidth": "0px", "border-bottomWidth": "0px", "border-topWidth": "0px", "left": "22.5px"},500, function(){console.log("done"); $(".flair").remove();});
              //Todo: animate the object correctly


              //todo: try this with SVG

              //todo: try this with two classes in CSS
              $(".diamond2").animate({
                  "borderWidth": "0px",
                  "border-bottomWidth": "0px",
                  "border-topWidth": "0px",
                  "top": "2px",
                  "left": "10px"
              }, settings.speed, function () {
                  console.log("done");
                  $(".flair").remove();
              });
              $(".diamond2bottom").animate({
                  "borderWidth": "0px",
                  "border-bottomWidth": "0px",
                  "border-topWidth": "0px",
                  "top": "0px",
                  "left": "10px"
              }, settings.speed, function () {
                  console.log("done");
                  $(".flair").remove();
              });
          }else if(settings.shape == "circle"){
              $('body').append('<div class="flair"><div class="circle"></div></div>');
              $(".flair").css("top", currentMousePosition.y + "px").css("left", currentMousePosition.x + "px");
              $('.circle').css({
                  /*
                  borderTopLeftRadius: settings.size,
                  borderTopRightRadius: settings.size,
                  borderBottomLeftRadius: settings.size,
                  borderBottomRightRadius: settings.size,
                  WebkitBorderTopLeftRadius: settings.size,
                  WebkitBorderTopRightRadius: settings.size,
                  WebkitBorderBottomLeftRadius: settings.size,
                  WebkitBorderBottomRightRadius: settings.size,
                  MozBorderRadius: settings.size,
                  */
                  /*
                  borderRadius: "50%",
                  MozBorderRadius: "50%",
                  WebkitBorderRadius: "50%",
                  Width: "100px",
                  Height: "100px"
                  */
              });
              /*"borderWidth": "0px",
              "borderHeight": "0px",*/
              $('.circle').animate({
                  /*
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  WebkitBorderTopLeftRadius: 0,
                  WebkitBorderTopRightRadius: 0,
                  WebkitBorderBottomLeftRadius: 0,
                  WebkitBorderBottomRightRadius: 0,
                  MozBorderRadius: 0,
                   */
                  top: "20px",
                  left: "20px",
                  width: 0,
                  height: 0
              }, settings.speed, function () {
                  console.log("done");
                  $(".flair").remove();
              });
          }
      }
    });

  };



}(jQuery));

