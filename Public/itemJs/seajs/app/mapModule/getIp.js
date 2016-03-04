define(function () {
    return {
        getIpFun: function () {
                var ip;
                ip = $('#getIp').val();
                if (!ip) {
                    ip = '60.10.21.156';
                }
                return ip;
        }
    }
})