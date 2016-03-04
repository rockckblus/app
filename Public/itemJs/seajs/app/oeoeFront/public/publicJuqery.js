// 帮助 划过

$('.help').hover(
    function () {
        $(this).find('.helpBac').animate({
            'width': '33px',
            'height': '80px',
            'marginLeft': '-12px',
            'marginTop': '-39px'

        }, {
            duration: 200,
            easing: 'easeOutQuint'

        }).css({
            'backgroundColor': '#83A098'
        });
        $(this).animate({
            paddingLeft: '9px'
        }, {
            duration: 300,
            easing: 'easeOutQuint'
        }).css({
            'cursor': 'pointer'
        });
    }, function () {
        $(this).find('.helpBac').animate({
            'width': '1px',
            'height': '1px',
            'marginLeft': '0px',
            'marginTop': '0px'

        }, {
            duration: 200,
            easing: 'easeOutQuint'

        }).css({
            'backgroundColor': '#83A098'
        });
        $(this).animate({
            paddingLeft: '6px'
        }, {
            duration: 300,
            easing: 'easeOutQuint'
        }).css({

        });
    }
);


$('#defaultSearch').hide();