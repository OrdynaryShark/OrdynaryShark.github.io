/**
 * Created by Андрей on 13.02.2017.
 */
function Storage(fb_storage, fb){
    var storage = fb_storage;
    var firebase = fb;
    var storageRef  = storage.ref();

    var tmpRef      = storageRef.child("tmp");

    var newsRef     = storageRef.child("news");
    var galleryRef  = storageRef.child("gallery");

    this.uploadNewsPhoto = function(news_id, file, callback){
        const arCallBack = callback ? callback : false;
        const currNewsRef = newsRef.child(news_id);
        const currFileRef = currNewsRef.child(file.name);
        const metadata = {
            contentType : file.type,
            size : file.size
        };

        var uploadTask = currFileRef.put(file, metadata);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
                if (arCallBack.onProgress){
                    arCallBack.onProgress(snapshot);
                }
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                }
            }, function(error) {
                if (arCallBack.onError){
                    arCallBack.onError(error);
                }
            }, function() {
                if (arCallBack.onSuccess){
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    arCallBack.onSuccess(downloadURL);
                }
            });
    }
    this.deletePhoto = function(photoURL, callback){
        var photoRef = storage.refFromURL(photoURL);
        photoRef.delete().then(function(){
            if (callback.onSuccess)
                callback.onSuccess();
        }).catch(function(error){
            console.log(error);
            if (callback.onError)
                callback.onError(error);
        })
    }
}