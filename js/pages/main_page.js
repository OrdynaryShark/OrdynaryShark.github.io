/**
 * Created by Андрей on 14.02.2017.
 */

$(document).ready(function(){
    $("#fullpage").fullpage({
        autoScrolling: false,
        scrollBar: true,
        fitToSection: false,
        slidesNavigation: true,
        fadingEffect: true,
    });
    $("#news_slider").itemslide({
        start: 1
    });
    /*$("#news_slider").itemslide({
        disable_autowidth: true,
        start: 1
    });*/
});

function slider(src, opt) {
    var selector = $(src);

    var center;
    var arItems;

    init();




    function init(){
        center = $(selector).find(".news-item.center");
        arItems = $(selector).find(".news-item");

        $(arItems[3]).off("click");
        $(arItems[1]).off("click");
        $(arItems[1]).click(function(){
            showNext("left");
        });
        $(arItems[3]).click(function(){
            showNext("right");
        });
    }
    function showNext(dir){
        switch (dir){
            case "right":
                center.removeClass("center", 200);
                $(arItems[1]).addClass("center", 200, function(){
                    init();
                });
                $(arItems[4]).remove().appendTo(selector).hide();
                $(arItems[3]).hide();
                $(arItems[0]).show();
                break;
            case "left":
            center.removeClass("center", 200);
            $(arItems[3]).addClass("center", 200, function(){
                init();
            });
            $(arItems[0]).remove().appendTo(selector).hide();
            $(arItems[1]).hide();
            $(arItems[4]).show();
            break;
        }

    }
}