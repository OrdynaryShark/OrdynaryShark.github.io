/**
 * Created by root on 2/25/17.
 */
mansoryParam = {
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
var mansory;

$(document).ready(function(){
    newsList = new NewsItemList();
    newsList.init(function(arItems){
        var itemContainer = $("#item_container");
        arItems.forEach(function(item){
            itemContainer.append(item.toDomObject());
        });
        afterImagesLoad("#item_container", function(){
            mansory = new Masonry("#item_container", mansoryParam);
        })
    });
});