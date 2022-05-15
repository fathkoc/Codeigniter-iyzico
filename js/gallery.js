(function($) {

    jQuery.fn.exists = function(){ return this.length > 0; }


    if ($('.dropzone').exists()) {
        let image_add;
        if($('.dropzone').data('id')) {
            image_add = new Dropzone('.dropzone', {
                url: url + 'Gallery/add_image_and_convert',
                acceptedFiles: "image/jpeg,image/png,image/jpg",
                timeout: 300000,
            });
        }
        image_add.on("success", function (file, response) {
            const myJSON = $.parseJSON(response);
            if(myJSON.status == true) {
                toastr.success("Resim Yüklendi");
                $('.image_area').html(myJSON.table);

            }
        });
    }

    $("body").on('change','.gallery-image-status',function(){

        var id = $(this).data("id");

        if($(this).prop('checked')) {
            var status = 1;
        } else {
            var status = 0;
        }

        var data = [
            {
                name: 'csrf',
                value: Cookies.get('csrf_token')
            },{
                name : 'status',
                value : status
            },{
                name : 'id',
                value : id
            }]
        $.ajax({
            method: 'post',
            dataType: 'json',
            data: data,
            url: url + 'Gallery/status_image',
            success: function(result) {
                if (result.status === true && status == 0) {
                    toastr.success('Artık Sitede Görünmeyecek');
                    $('.checkbox-eye-icon-'+id).removeClass('la-eye');
                    $('.checkbox-eye-icon-'+id).addClass('la-eye-slash');
                    $('.checkbox-eye-icon-'+id).attr('title','Yayına Al');

                } else if (result.status === true && status == 1) {
                    toastr.success('Artık Sitede Görünecek');
                    $('.checkbox-eye-icon-'+id).removeClass('la-eye-slash');
                    $('.checkbox-eye-icon-'+id).addClass('la-eye');
                    $('.checkbox-eye-icon-'+id).attr('title','Yayından Kaldır');
                } else {
                    toastr.warning(result.error);
                }
            },
            error: function() {
                toastr.error('Bağlantı Hatası, Lütfen Tekrar Deneyin');
            }
        });
    });

    $("body").on('click','.delete-gallery-image-directly', function(e){

        var id = $(this).data("id");

        var data = [
            {
                name: 'csrf',
                value: Cookies.get('csrf_token')
            },{
                name : 'id',
                value : id
            }]

        $.ajax({
            method: 'post',
            dataType: 'json',
            data: data,
            url: url + 'Gallery/delete_image',
            success: function(result) {
                if (result.status === true) {
                    $('#delete'+id).remove();
                    toastr.success(" Silindi.");

                } else {
                    toastr.warning(result.error);
                }

            },
            error: function() {
                toastr.error("Bağlantı Hatası Tekrar Deneyin");
            }
        });
    });


    $(".delete-gallery-image").jConfirm().on('confirm', function(e){

        var id = $(this).data("id");

        var data = [
            {
                name: 'csrf',
                value: Cookies.get('csrf_token')
            },{
                name : 'id',
                value : id
            }]

        $.ajax({
            method: 'post',
            dataType: 'json',
            data: data,
            url: url + 'Gallery/delete_image',
            success: function(result) {
                if (result.status === true) {
                    $('#delete'+id).remove();
                    toastr.success(" Silindi.");

                } else {
                    toastr.warning(result.error);
                }

            },
            error: function() {
                toastr.error("Bağlantı Hatası Tekrar Deneyin");
            }
        });
    });


    $('.change-position').sortable({
        update: function(event, ui) {
            $(this).children().each(function(index){
                if($(this).attr('data-position') != (index+1)){
                    $(this).attr('data-position',(index+1)).addClass('updated');
                }
            });
            saveNewPositions()
        }
    });


    function saveNewPositions() {

        var positions = [];
        $('.updated').each(function () {
            positions.push([$(this).attr('data-index'), $(this).attr('data-position')]);
            $(this).removeClass('updated');
        });

        $.ajax({
            method: 'post',
            dataType: 'json',
            data: {positions: positions},
            url: url + 'Gallery/update_slider_position_dragable',
        });
    }

})(jQuery);
