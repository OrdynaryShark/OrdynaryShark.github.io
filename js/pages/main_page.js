/**
 * Created by Андрей on 14.02.2017.
 */

$(document).ready(function(){
    $("#fullpage").fullpage({
        autoScrolling: true,
        scrollBar: true,
        fitToSection: false,
        slidesNavigation: true,
        fadingEffect: true,
        onLeave: function(index, nextIndex, direction){
            console.log(index, nextIndex, direction);
            if (index == 3 && direction == "down"){
                $.fn.fullpage.setAutoScrolling(false);
                console.log("off");
            }
        },

    });
});