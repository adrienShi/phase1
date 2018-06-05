var cardFlag = true;

function cardTap(){
    $('.box li').off('tap').on('tap',function(event){
        if (cardFlag) {
            cardFlag = false;
            var that = $(this)
            if(that.hasClass('taping')){
                winningPop();
                return;
            }
            that.addClass('taping');
            setTimeout(function(){
                that.find('b').css('display', 'block');
                setTimeout(function(){
                    winningPop();
                }, 200);
                
            }, 150);
        }
        event.preventDefault();
    });
}

function winningPop(){
    $('.winning').show();
    cardFlag = true;
    $('.winning .close').off('tap').on('tap',function(event){
        $('.winning').hide();
        event.preventDefault();
    });
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
    //var host = window.location.host;
    var host = 'https://lp.17tuiguang.com';
    $.ajax({
        url: '//'+ host +'/ashow?adNum=6',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {'ctype': '3', 'log': '0'}
    })
    .done(function (r) {
        console.log(r);
        if (r.status == '1') {
           
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

function sendPn() {
    var host = window.location.host;
    var showUrl = $('.page').eq(0).attr('showUrl');
    $.ajax({
        url: showUrl,
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback'
    })
    .done(function (r) {

    })
    .fail(function () {
        
    })
    .always(function () {
        console.log("success");
    });
}

function jump() {
   var url = $('.page').eq(0).attr('jump');
   window.location.href = url;
}

function pushBack(url){
    if(getParam('backdraw') !== '0'){
        window.history.pushState(1, '', '');

        window.addEventListener("popstate", function(e) {
            location.href = url;
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

