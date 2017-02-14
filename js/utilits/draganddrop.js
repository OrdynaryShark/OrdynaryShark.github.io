/**
 * Created by Андрей on 13.02.2017.
 */
function DrugAndDrop(src, param){
    var form = src;
    var droppedFiles = false;
    var onDrop = param.onDrop ? param.onDrop : false;

    init();

    function init(property){
        form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
        })
        .on('dragover dragenter', function() {
            form.addClass('is-dragover');
        })
        .on('dragleave dragend drop', function() {
            form.removeClass('is-dragover');
        })
        .on('drop', function(e) {
            droppedFiles = e.originalEvent.dataTransfer.files;
            if (droppedFiles && onDrop){
                onDrop(droppedFiles);
            }
        });
    }
}