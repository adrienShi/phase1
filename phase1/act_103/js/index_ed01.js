var cardFlag = true;

function cardTap(){
    $('ul.box li').off('tap').on('tap',function(event){
        var num = event.target.getAttribute('num');
        if (cardFlag) {
            cardFlag = false;
            var that = $(this)
            if(that.hasClass('taping')){
                winningPop(num);
                return;
            }
            that.addClass('taping');
            setTimeout(function(){
                that.find('b').css('display', 'block');
                setTimeout(function(){
                    winningPop(num);
                }, 200);
                
            }, 150);
        }
        event.preventDefault();
    });
}

function winningPop(num){
    var caed = $('ul.box li').eq(num);
    $('.winning .box a').attr('href', caed.attr('jump'));
    $('.winning .box img').attr({'src': caed.attr('pic'), 'alt': caed.attr('txt')});
    $('.winning .box p').text(caed.attr('txt'));
    cardFlag = true;
    $('.winning .close').off('tap').on('tap',function(event){
        $('.winning').hide();
        event.preventDefault();
    });
    $('.winning').show();
}

function explainPop(){
    $('.explain_btn').on('tap', function(event) {
        if (cardFlag) {
            var rule_bar = $('.rule_bar');
            var shadow_public = $('.shadow_public');
            rule_bar.show();
            shadow_public.show();
            $('.rule_bar .close').on('tap', function(event) {
                rule_bar.hide();
                shadow_public.hide();
                event.preventDefault();
            })
            event.preventDefault();
        }
    });
}

function page_load() {

    var host = window.location.host;

    $.ajax({ 
        url: '//'+ host +'/ashow?adNum=8',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {'ctype': '1', 'log': '0'}
    })
    .done(function (r) {
        console.log(r);
        if (r.status == '1') {
            loadData(r.result);
            pushBack();
        } else {
            alert('链接超时！')
        }

    })
    .fail(function () {
        console.log("error");
        alert('链接超时！');
    })
    .always(function () {
        console.log("complete");
    });
}

function loadData(d){
    var cardArr = $('ul.box li.s');
    for (var i = 0; i < d.length; i++) {
        cardArr.eq(i).attr({
            'jump': d[i].url,
            'txt': d[i].title,
            'pic': d[i].pic
        });
        cardArr.eq(i).find('i').css("background-image", "url('"+ d[i].pic +"')");
    }
}

function jump() {
   var url = $('.page').eq(0).attr('jump');
   window.location.href = url;
}

function pushBack(url){
    if(getParam('backdraw') !== '0'){
        window.history.pushState(1, '', '');

        window.addEventListener("popstate", function(e) {
            //location.href = url;
            location.href = 'https://www.yuanshanbx.com/m/activity/zh/bwcxbz.html?channel=wtbwcxbz';
        }, false);
    }
}

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}

$(function(){
    page_load();
    cardTap();
    explainPop();
});

