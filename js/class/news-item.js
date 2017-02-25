/**
 * Created by root on 2/25/17.
 */
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
    this.getTitle = function(){
        return title;
    };
    this.getText = function () {
        return content;
    };
    this.getArImages = function () {
        return arPhoto;
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
        if (arPhoto){
            arPhoto.forEach(function(item){
                photoWrapp.append($("<div/>").addClass("photo-item").css({backgroundImage: "url('" + item + "')"}));
            });
        }
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
