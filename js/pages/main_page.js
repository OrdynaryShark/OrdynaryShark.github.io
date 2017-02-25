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
    new NewsBanner("news_slider");

    var slide = 0;

    function slideToRight(){
        if (slide == 0){
            setTimeout(function(){
                slide = 1;
                slideToRight();
                $.fn.fullpage.moveSlideRight();
            }, 6000);
        }
        else {
            setTimeout(function(){
                slide = 0;
                slideToRight();
                $.fn.fullpage.moveSlideRight();
            }, 30000)
        }
    }
    slideToRight();
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
function NewsBanner(list_id){
    var sliderSrc = $("#" + list_id);
    var arNewsBannerItems = [];

    init();

    function init(){
        var newsItem = new NewsItemList();

        newsItem.init(function(arItems){
            for (var i = 0; i < 4; i++){
                var item = arItems[i];
                console.log(item);
                arNewsBannerItems.push(item);
                console.log(item.toDomObject());
                sliderSrc.append(item.toDomObject());
            }
            var mansoryParam = {
                itemSelector: '.item',
                singleMode: true,
                isResizable: true,
                isAnimated: true,
                gutter: 10,
                animationOptions: {
                    queue: false,
                    duration: 300
                }
            };
            var arImg = sliderSrc.find("img");
            var imgCounter = 1;
            const arImglength = arImg.length;
            arImg.on("load", function(){
                imgCounter++;
                if (imgCounter == arImglength){
                    new Masonry("#news_slider", mansoryParam);
                }
            });
            /*sliderSrc.itemslide({
                start: 1
            });*/
        });
    }
}
