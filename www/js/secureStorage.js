var secureStorageRequest = {
    connect: function() {
        $.post(LOCALSTORAGEURL, {request:'connect',username:'patryktesting@gmail.com',password:'123456'}, function(data) {
            write(data);
        });
    }
};