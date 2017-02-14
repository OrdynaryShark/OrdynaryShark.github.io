/**
 * Created by Андрей on 14.02.2017.
 */

$(document).ready(function(){
    /*var oViewer;
    var options = {
        env: 'AutodeskProduction',
        accessToken: '2jLGiT3syn7nAUHYo4lNJ7SfZXAd',
        document : "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE3LTAyLTE0LTA4LTM5LTIxLTJqbGdpdDNzeW43bmF1aHlvNGxuajdzZnp4YWQvUm9ib3RBcm0uZHdmeA"
    };

    oViewer =new Autodesk.Viewing.Private.GuiViewer3D ($("#main_viewer") [0], {}) ; // With toolbar
    Autodesk.Viewing.Initializer (options, function () {
        oViewer.initialize () ;
        loadDocument (oViewer, options) ;
    }) ;

    function loadDocument (viewer, options) {
        if ( options.document.substring (0, 4) === 'urn:' )
            options.document =options.document.substring (4) ;

        Autodesk.Viewing.Document.load ('urn:' + options.document, //options.accessToken,
            function (doc) { // onLoadCallback
                oDocument =doc ;
                // Get all the 3D and 2D views (but keep in separate arrays so we can differentiate in the UI)
                oViews3D =Autodesk.Viewing.Document.getSubItemsWithProperties (doc.getRootItem (), { 'type': 'geometry', 'role': '3d' }, true) ;
                oViews2D =Autodesk.Viewing.Document.getSubItemsWithProperties (doc.getRootItem (), { 'type': 'geometry', 'role': '2d' }, true) ;

                // Load up first a 3D view by default
                if ( oViews3D.length > 0 )
                    oViewer.load (doc.getViewablePath (oViews3D [0])) ;
                else if ( oViews2D.length > 0 )
                    oViewer.load (doc.getViewablePath (oViews2D [0])) ;
                else
                    return (alert ('ERROR: No 3D or 2D views found in this document!')) ;

                for ( var i =0 ; i < oViews3D.length ; i++ ) {
                    var r =$('<div><button id="view_' + i + '" data="' + oViews3D [i].guid + '">' + oViews3D [i].name + '</button></div>') ;
                    $('#list').append (r) ;
                    $('#view_' + i).click (function (e) {
                        e.stopPropagation () ;
                        var i =parseInt (e.target.id.substring (5)) ;
                        var guid =oViews3D [i].guid ;

                        var viewObj =Autodesk.Viewing.Document.getSubItemsWithProperties (doc.getRootItem (), { 'type': 'geometry', 'role': '3d', 'guid': guid }, true) ;
                        if ( viewObj.length == 0 )
                            return ;
                        var path =doc.getViewablePath (viewObj [0]) ;
                        oViewer.load (path, doc.getPropertyDbPath ()) ;
                    }) ;
                }
                for ( var i =0, j =1000 ; i < oViews2D.length ; j++, i++ ) {
                    var r =$('<div><button id="view_' + j + '" data="' + oViews2D [i].guid + '">' + oViews2D [i].name + '</button></div>') ;
                    $('#list').append (r) ;
                    $('#view_' + j).click (function (e) {
                        e.stopPropagation () ;
                        var i =parseInt (e.target.id.substring (5)) - 1000 ;
                        var guid =oViews2D [i].guid ;

                        var viewObj =Autodesk.Viewing.Document.getSubItemsWithProperties (doc.getRootItem (), { 'type': 'geometry', 'role': '2d', 'guid': guid }, true) ;
                        if ( viewObj.length == 0 )
                            return ;
                        var path =doc.getViewablePath (viewObj [0]) ;
                        oViewer.load (path, doc.getPropertyDbPath ()) ;
                    }) ;
                }

            },
            function (errorMsg) { // onErrorCallback
                alert("Load Error: " + errorMsg) ;
            }
        ) ;
    }*/
});