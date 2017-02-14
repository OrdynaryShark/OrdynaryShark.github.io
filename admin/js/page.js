/**
 * Created by Андрей on 12.02.2017.
 */
var pageType = "news";

var config = {
    apiKey: "AIzaSyDBnQMS4DmpTexTemIMSyZgBQdq7lA9wTg",
    authDomain: "autodesk-ifmo.firebaseapp.com",
    databaseURL: "https://autodesk-ifmo.firebaseio.com",
    storageBucket: "autodesk-ifmo.appspot.com",
    messagingSenderId: "1002713116303"
};

firebase.initializeApp(config);






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
            duration: 300
        }
    };
    if ($(window).width() < 765){
        if (mansory) {
            mansory.destroy();
            $(".item").css({position : "initial"});
        }
    }
    else {
        return new Masonry("#item_container", mansoryParam);
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

function openAddForm(){
    switch (pageType){
        case "news":
            NewsAddForm();
            break;
        case "courses":
            break;
        case "gallery":
            break;
    }
}


function NewsItem(id, data){
    const defaultImageUrl = "../images/default-placeholder.png";

    var unic_id;
    var isPublic;
    var title;
    var content;
    var mainPhoto;
    var arPhoto = [];
    var timestamp;

    init(id);


    function init(news_id){
        switch (typeof  news_id){
            case "string":
                unic_id = news_id;
                if (!data){
                    firebase.database().ref("/news/" + unic_id).once("value").then(function(snapshot){
                        var objValue = snapshot.val();
                        setValues(objValue);
                    });
                }
                else {
                    setValues(data);
                }
                break;
            default:
                unic_id = generateUnicId("news");
                isPublic = false;
                title = "Новость";
                mainPhoto = defaultImageUrl;
                break;
        }
    }

    function setValues(data){
        isPublic   = data.isPublic;
        title      = data.title;
        content    = data.content;
        mainPhoto  = data.mainPhoto;
        arPhoto    = data.arPhoto;
        timestamp  = data.timestamp;
    }

    this.setTitle = function(value){
        if (value != ""){
            title = value;
            return true;
        }
        else
            return false;
    };
    this.setContent = function(value){
        if (value != ""){
            content = value;
            return true;
        }
        else
            return false;
    };
    this.setMainPhoto = function(url){
        if ($.inArray(url, arPhoto) != -1)
            mainPhoto = url;
        else {
            mainPhoto = url;
            arPhoto.push(url);
        }
    };
    this.addPhoto = function(file, param){
        jQuery.storage.uploadNewsPhoto(unic_id, file, {
            onSuccess: function(url){
                arPhoto.push(url);
                if (arPhoto.length == 1)
                    mainPhoto = url;
                if (param.onSuccess)
                    param.onSuccess(url);
            }
        });
    };

    this.getMainPhotoURL = function () {
        return mainPhoto;
    };
    this.getMainPhotoIndex = function () {
        return arPhoto.indexOf(mainPhoto);
    };

    this.removePhoto = function (url, param) {
        jQuery.storage.deletePhoto(url, {
            onSuccess: function(){
                deleteFromArrayByValue(arPhoto, url);
                if (url == mainPhoto){
                    if (arPhoto.length > 0)
                        mainPhoto = arPhoto[0];
                    else
                        mainPhoto = defaultImageUrl;
                }
                if (param.onSuccess)
                    param.onSuccess();
            }
        });
    };

    this.isActiveUrl = function (url) {
        return url == mainPhoto;
    };
    this.arPhotoEmpty = function () {
        return arPhoto.length == 0;
    };

    this.export = function () {
        firebase.database().ref("/news/" + unic_id).set({
            isPublic : isPublic,
            title    : title,
            content  : content,
            mainPhoto: mainPhoto,
            arPhoto  : arPhoto,
            timestamp : new Date().getTime()
        });
    }
    this.toDomObject = function () {

        var photoWrapp = $("<div/>").addClass("photo-files");
        arPhoto.forEach(function(item){
            photoWrapp.append($("<div/>").addClass("photo-item").css({backgroundImage: "url('" + item + "')"}));
        });
        photoWrapp.append("<div class = 'clear'></div>");

        var result = $("<div/>").addClass("news-item item");
        var top = $("<div/>").addClass("top").html($("<span/>").html($("<b/>").html(title)));
        var middle = $("<div/>").addClass("middle").append($("<div/>").addClass("text").html(content))
            .append($("<img/>").addClass("photo-preview").attr({
                width: "100%",
                height : "auto",
                src : mainPhoto
            }))
            .append(photoWrapp);
        var bottom = $("<div/>").addClass("bottom")
            .append($("<span/>").addClass("date").html(timeConverter(timestamp)))
            .append($("<button/>").html('<i class="material-icons">more_horiz</i>').addClass("property"))
            .append("<div class = 'clear'></div>");
        result.append(top)
            .append(middle)
            .append(bottom);
        return result;
    }
}
function NewsItemList(){
    var arItem = [];

    init();

    function init(){
        firebase.database().ref("/news/").once("value").then(function(snapshot){
            var objValue = snapshot.val();
            var loadedItemCount = 0;
            var countItem = countObjectProp(objValue);
            for (var key in objValue) {
                var item = new NewsItem(key, objValue[key]);
                const itemDom = item.toDomObject();
                var itemImg = itemDom.find("img")[0];

                $(itemImg).on("load",function(){
                    loadedItemCount++;
                    itemDom.fadeIn();
                    if (loadedItemCount == countItem){
                        jQuery.mansory = onMansory();
                    }
                });

                arItem.push(item);

                $("#item_container").prepend(itemDom);
            }

        });
    }
}
function NewsAddForm(){
    var newsItem = new NewsItem();

    var form = $("#add_news");

    var dragndrop = form.find(".drag-and-drop");
    var photoBox = form.find(".drag-and-drop-files");
    var photoBoxPlaceholder = photoBox.find(".drag-and-drop-placeholder");
    var photoPreview = form.find(".image-preview");
    var title = form.find("input[name='title']");
    var content = form.find("textarea[name='content']");

    var confirmBtn = form.find(".submit-button");

    init();

    function init(){
        $.magnificPopup.open({
            items: {
                src: form,
                type: 'inline'
            }
        });
        DrugAndDrop(dragndrop, {
            onDrop: function(file){
                photoBoxPlaceholder.hide();
                var clear = photoBox.find(".clear");
                var imageBox = $("<div/>", {
                    "class" : "photo-preview",
                    css : {
                        width : 60,
                        height : 60,
                        backgroundImage : "url(../images/preloader.gif)"
                    }
                }).insertBefore(clear);
                var deleteBtn = $('<i class="material-icons">delete_forever</i>').appendTo(imageBox);

                newsItem.addPhoto(file[0], {
                    onSuccess: function (url) {
                        const bgString = "url('" + url + "')";
                        imageBox.css({
                            backgroundImage : bgString,
                        });
                        imageBox.click(function(){
                            selectPhoto(url, $(this));
                        });
                        deleteBtn.click(function(){
                            deleteImage(url, imageBox);
                        });
                        if (newsItem.isActiveUrl(url)){
                            selectPhoto(url, imageBox);
                        }
                    }
                });
            }
        });
        confirmBtn.click(sendForm);
    }

    function updateMainImage(url){
        newsItem.setMainPhoto(url);
        photoPreview.attr("src", url);
    }
    function selectPhoto(url, elem){
        var selected = photoBox.find(".selected");
        if (selected.length != 0)
            selected.removeClass("selected");
        elem.addClass("selected");
        updateMainImage(url);
    }
    function sendForm(){
        newsItem.setContent(content.val());
        newsItem.setTitle(title.val());
        newsItem.export();
        $.magnificPopup.close();
    }
    function deleteImage(url, elem){
        newsItem.removePhoto(url, {
            onSuccess: function(){
                elem.remove();
                const photoURL = newsItem.getMainPhotoURL();
                if (!newsItem.arPhotoEmpty()){
                    const photoIndex = newsItem.getMainPhotoIndex();
                    selectPhoto(photoURL, $($(".photo-preview")[photoIndex]));
                }
                else {
                    updateMainImage(photoURL);
                    photoBoxPlaceholder.show();
                }
            }
        });
    }
}

$(document).ready(function(){
    jQuery.storage = new Storage(firebase.storage(), firebase);

    var listItem = NewsItemList();

    setPageName();

    $(window).on("resize", function(){
        jQuery.mansory = onMansory(jQuery.mansory)
    });



});