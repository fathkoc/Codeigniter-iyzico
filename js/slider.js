(function($) {
    $(".delete-slider").jConfirm().on('confirm', function(e){

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
            url: url + 'Slider/delete',
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

    $(".slider-status").change(function(){

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
            url: url + 'Slider/status',
            success: function(result) {
                if (result.status === true && status == 0) {
                    toastr.success('Artık Sitede Görünmeyecek');

                } else if (result.status === true && status == 1) {
                    toastr.success('Artık Sitede Görünecek');
                } else {
                    toastr.warning(result.error);
                }
            },
            error: function() {
                toastr.error('Bağlantı Hatası, Lütfen Tekrar Deneyin');
            }
        });
    });

    $(document).on("submit", "#infoAddSlider", function(event){
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
            url: url + 'Slider/add',
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

    $(document).on("submit", "#infoUpdateSlider", function(event){
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
            url: url + 'Slider/update',
            success: function(result) {
                if (result.status === true) {
                    toastr.success("Başarıyla Güncellendi.");
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
    var $input = $('.positionslider');

    $input.keydown(function(){
        clearTimeout(typingTimer);
    });

    $(".positionslider").keyup(function(){
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
                    url: url + 'slider/position',
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

})(jQuery);
