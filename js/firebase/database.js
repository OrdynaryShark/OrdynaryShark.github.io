/**
 * Created by Андрей on 13.02.2017.
 */
function Database(fb){
    var firebase = fb;

    this.addNews = function(type, id, data){
        const itemRef = firebase.database.ref(type + "/" + id, {
            public : formatParam(data.public, false),
            title  : formatParam(data.title, "Новость"),
            content: formatParam(data.content, false),
            public : formatParam(data.public, false),
            public : formatParam(data.public, false),
        });
    }

    function formatParam(value, def){
        return value ? value : def;
    }
}