/**
 * Created by Андрей on 13.02.2017.
 */
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