/**
 * Created by root on 2/25/17.
 */
function NewsItemList(){
    var arItem = [];

    function init(callBack){
        firebase.database().ref("/news/").once("value").then(function(snapshot){
            var objValue = snapshot.val();

            for (var key in objValue) {
                var item = new NewsItem(key, objValue[key]);
                arItem.push(item);
            }
            callBack(arItem);
        });
    }

    this.init = function(callBack) {
        init(callBack);
    };
    this.toArray = function(){
        return arItem;
    };
}