//默认焦点
function defaultFaoc(){
    $('#defaultSearch').focus();
}
defaultFaoc();

//清空搜索框
function clearSearch(){
    $('#defaultSearch').attr('value','');
}


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

//顶部地区切换划过
$('.diqu').hover(
    function(){
        $(this).animate({
            'outlineWidth':'1px'
        },{
            duration: 200,
            easing: 'easeOutQuint'
        }).css({
            'border-color':'#6A8B82'
        })
    },
    function(){
        $(this).animate({
            'outlineWidth':'1px'
        },{
            duration: 200,
            easing: 'easeOutQuint'
        }).css({
            'border-color':'#ccc'

        })

});

//搜索下拉


$('#defaultSearch').AutoComplete({
    'data': ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']
});

