/**
 * Created by root on 2/25/17.
 */

function initMap(){
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 59.9444218, lng: 30.2929786},
        zoom: 15,
        mapTypeControl: false
    });
    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: 59.9444218, lng: 30.2929786},
    });
}

$(document).ready(function(){
    var headerHeight = $("header").outerHeight() + $(".autodesk-logo-line").outerHeight();
    var footerHeight = $("footer").outerHeight();
    var windowHeight = getPageSize("windowHeight");
    $("#map").height(windowHeight - footerHeight - headerHeight);
});