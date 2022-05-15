(function($) {
    $(document).on("submit", "#infoAddMarka", function(event){
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
            url: url + 'Marka/insertmarka',
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

    $('.delete-marka').jConfirm().on('confirm',function () {

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
            url: url + 'Marka/deleted',
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

    $(".marka-status").change(function(){

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
            url: url + 'Marka/status',
            success: function(result) {
                if (result.status === true && status == 0) {
                    toastr.success("ÜRÜN Sitede Görünmeyecek.");
                } else if (result.status === true && status == 1) {
                    toastr.success("ÜRÜN Artık Sitede Görünecek.");
                } else {
                    toastr.warning(result.error);
                }
            },
            error: function() {
                toastr.error("Bağlantı Hatası Tekrar Deneyin");
            }
        });
    });
    $(document).on("submit", "#infoUpdatemarka", function(event){
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
            url: url + 'Marka/update',
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

})(jQuery);