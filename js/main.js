/**
 * Created by Андрей on 13.02.2017.
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

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function generateUnicId(prefix) {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
}
function deleteFromArrayByValue(array, value){
    array.splice(array.indexOf(value), 1);
}
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
    var year = a.getFullYear();
    var month = (a.getMonth() / 10 != 0) ? "0" + a.getMonth() :  a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}
function countObjectProp(obj){
    var counter = 0;
    for (var key in obj) {
        counter++;
    }
    return counter;
}
function afterImagesLoad(src, callback){
    var selector = (src == undefined) ? $("body") : $(src);
    var imgArray = selector.find("img");

    const imgCount = imgArray.length;
    var imgCounter = 1;

    imgArray.on("load", function(){
        imgCounter++;
        if (imgCounter == imgCount){
            callback();
        }
    });
}
function getPageSize(type) {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight) { // Explorer 6 strict mode
        xScroll = document.documentElement.scrollWidth;
        yScroll = document.documentElement.scrollHeight;
    } else { // Explorer Mac...would also work in Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }
    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }
    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }
    switch (type){
        case "pageWidth":
            return pageWidth;
            break;
        case "pageHeight":
            return pageHeight;
            break;
        case "windowWidth":
            return windowWidth;
            break;
        case "windowHeight":
            return windowHeight;
            break;
        default:
            return [pageWidth, pageHeight, windowWidth, windowHeight];
            break;
    }
}