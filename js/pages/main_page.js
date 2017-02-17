/**
 * Created by Андрей on 14.02.2017.
 */

$(document).ready(function(){
    $("#fullpage").fullpage({
        autoScrolling: false,
        scrollBar: true,
        fitToSection: false,
        slidesNavigation: true,
        fadingEffect: false,
        onLeave: function(index, nextIndex, direction){
            console.log(index, nextIndex, direction);
            if (index == 3 && direction == "down"){
                $.fn.fullpage.setAutoScrolling(false);
                console.log("off");
            }
        },

    });
});