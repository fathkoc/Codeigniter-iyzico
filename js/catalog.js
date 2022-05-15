(function($) {
    $(document).on("submit", "#addcatalog", function(event){
        event.preventDefault();
        var serialized = $(this).serializeArray();
        serialized.push({
            name: 'csrf',
            value: Cookies.get('csrf_token')
        });
        $.ajax({
            method: 'post',
            dataType: 'json',
            data: serialized,
            url: url + 'Catalog/index',
            success: function(result) {
                if (result.status === true) {
                    toastr.success("Başarıyla Eklendi.");
                    setTimeout(
                        function(){
                            window.location.reload();
                        }, 1000);
                } else {
                    toastr.warning(result.error);
                }

            },
            error: function() {
                toastr.error("Bağlantı Hatası Tekrar Deneyin");
            }
        });
    });

    var typingTimer;
    var $input = $('.catalog');

    $input.keydown(function(){
        clearTimeout(typingTimer);
    });

    $(".catalog").keyup(function(){
        var id = $(this).data("id");
        var new_order = $(this).val();
        clearTimeout(typingTimer);
        typingTimer = setTimeout(function (){
            if(new_order > 0) {
                var data = [
                    {
                        name: 'csrf',
                        value: Cookies.get('csrf_token')
                    },{
                        name : 'new_order',
                        value : new_order
                    },{
                        name : 'id',
                        value : id
                    }]
                $.ajax({
                    method: 'post',
                    dataType: 'json',
                    data: data,
                    url: url + 'Catalog/position',
                    success: function(result) {
                        if (result.status === true) {
                            toastr.success("Sıralama Değiştirildi.");
                        } else {
                            toastr.warning(result.error);
                        }
                    },
                    error: function() {
                        toastr.error("Bağlantı Hatası Tekrar Deneyin");
                    }
                });
            }
        }, 800);
    });

    $(document).on("submit", "#infoUpdateCatalog", function(event){
        event.preventDefault();
        var serialized = $(this).serializeArray();
        serialized.push({
            name: 'csrf',
            value: Cookies.get('csrf_token')
        });
        $.ajax({
            method: 'post',
            dataType: 'json',
            data: serialized,
            url: url + 'Catalog/update',
            success: function(result) {
                if (result.status === true) {
                    toastr.success("Başarıyla Eklendi.");
                    setTimeout(
                        function(){
                            window.location = result.url;
                        }, 1000);
                } else {
                    toastr.warning(result.error);
                }
            },
            error: function() {
                toastr.error("Bağlantı Hatası Tekrar Deneyin");
            }
        });
    });

    $(".catalog-status").change(function(){

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
            url: url + 'Catalog/status',
            success: function(result) {
                if (result.status === true && status == 0) {
                    toastr.success("Katalog Sitede Görünmeyecek.");
                } else if (result.status === true && status == 1) {
                    toastr.success("Katalog Artık Sitede Görünecek.");
                } else {
                    toastr.warning(result.error);
                }
            },
            error: function() {
                toastr.error("Bağlantı Hatası Tekrar Deneyin");
            }
        });
    });


    $('.delete-catalog').jConfirm().on('confirm',function () {

        var id = $(this).data('id');
        var data = [{
            name: 'id',
            value: id
        }];
        data.push({
            name: 'csrf',
            value: Cookies.get('csrf_token')
        });

        $.ajax({
            method: 'post',
            dataType: 'json',
            data: data,
            url: url + 'Catalog/deleted',
            success: function (result) {
                if (result.status === true) {
                    $('#delete'+id).remove();


                } else {
                    toastr.warning(result.error);
                }
            },
            error: function () {
                toastr.error('baglantı hatası')
            }
        });
    });
})(jQuery);