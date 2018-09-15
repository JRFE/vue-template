"use strict";
UA.onNotFound(function (req, res) {
    var model = {
        header: 1,// API.header.get(),
        footer: 2
    };

    return new UA.View(model, 'view/404');
});

UA.onError(function (err, req, res, next) {

    var model = {
        msg: err.message ? err.message : err
    };
    console.log(model.msg);
    return new UA.View(model, 'view/500');
});
