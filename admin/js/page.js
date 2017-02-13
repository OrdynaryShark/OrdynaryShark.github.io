/**
 * Created by Андрей on 12.02.2017.
 */
var pageType = "news";


function openNavMenu(src){
    const menu = $(src);
    if (menu.css("display") == "none"){
        menu.show({
            complete : function(){
                $(document).click(function(event) {
                    if ($(event.target).closest("#nav_menu").length) return;
                    $(document).off("click");
                    hideNavMenu(src);
                    event.stopPropagation();
                });
            }
        });
    }
}
function hideNavMenu(src){
    const menu = $(src);
    if (menu.css("display") != "none"){
        menu.hide();
    }
}

function onMansory(mansory){
    var mansoryParam = {
        itemSelector: '.item',
        singleMode: true,
        isResizable: true,
        isAnimated: true,
        gutter: 10,
        animationOptions: {
            queue: false,
            duration: 500
        }
    };
    if ($(window).width() < 765){
        if (mansory) {
            mansory.destroy();
            $(".item").css({position : "initial"});
        }
    }
    else {
        return new Masonry(".container", mansoryParam);
    }
}

function setPageName(){
    var pageName = getParameterByName("page");
    const pageNameSrc = $("#page_name");

    pageName = pageName ? pageName : pageType;

    switch (pageName){
        case "news":
            pageNameSrc.html("Новости");
            break;
        case "gallery":
            pageNameSrc.html("Галерея");
            break;
        case "courses":
            pageNameSrc.html("Курсы");
            break;
    }
}
$(document).ready(function(){
    setPageName();
    var mansory = onMansory();

    $(window).on("resize", function(){
        mansory = onMansory(mansory)
    });
});