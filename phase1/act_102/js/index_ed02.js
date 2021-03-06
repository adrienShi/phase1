
var is_run = false;
var btn_flag = true;

function distribution_zIndex() {
	var individual = $('.page');
	var le = individual.length;
	for (var m = 0; m < le; m += 1) {
		individual.eq(m).css('z-index', le + 100 - m);
		if (m <= 2) {
			individual.eq(m).css('transform', 'scale(' + (1 - m * 0.03) + ') translateY(' + 10 * m + 'px)')
		} else {
			individual.eq(m).css('transform', 'scale(0.94) translateY(20px)')
		}
	}
}

function moveStart() {

	var container = $('.page_box');
	var individual = $('.page').eq(0);
    var click_x, click_y, move_x, move_y, now_x, now_y;
    var deal_btn = $('.deal_btn'),
        fail_btn = $('.fail_btn');
    distribution_zIndex();
    
	container.on("touchstart", function (e) {
        if(!btn_flag)return;
		is_run = true;
		click_x = e.changedTouches[0].clientX;
        click_y = e.changedTouches[0].clientY;
        individual.css('transition', 'all 0s');
        $(".win").on('touchmove', function (e) { e.preventDefault() });
    });

	container.on("touchmove", function (e) {
		if (is_run) {
			move_x = e.changedTouches[0].clientX;
			move_y = e.changedTouches[0].clientY;
			now_x = move_x - click_x;
            now_y = move_y - click_y;
			if (now_y > 0) {
				individual.css({
					'transform': 'translate3d(' + now_x + 'px,' + now_y + 'px,0) rotate(-3deg)'
                });
                btnState(deal_btn, 1);
                btnState(fail_btn, 1.2);

			} else if (now_y < 0) {
				individual.css({
					'transform': 'translate3d(' + now_x + 'px,' + now_y + 'px,0) rotate(3deg)'
				});
				btnState(deal_btn, 1.2);
                btnState(fail_btn, 1);
			}

		}
	});

	container.on("touchend", function (e) {
		is_run = false;

		btnState(deal_btn, 1);
        btnState(fail_btn, 1);

        $(".win").off();

		if (now_y < -20) {
			jump();
			loopPage();

		} else if (now_y > 20) {

			loopPage();

		} else {
			individual.css({
				'transition': '0.26s linear',
				'transform': 'scale(1) translate3d(0,0,0) rotate(0deg)'
			});

		}
    });

    function btnState(o, s) {
        o.css({
            'transition': 'all 0.4s linear',
            'transform': 'scale('+ s +')'
        });
    }

}

function loopPage(){
    var clon = $('.page')
        .eq(0)
        .clone()
        .css({
            'zIndex': '100',
            'transform': 'scale(0.94) translate3d(0,0,0) rotate(0deg) ',
            'transition': 'transform 0.4s linear',
            'transform': 'translate(0, 0, 0)',
            'will-change': 'transform'
        });
    $('.page')
        .eq(0)
        .remove();
    $('.page_box')
        .append(clon)
        .off();
    moveStart();
}

function deal_start() {
    $('.deal_btn')
        .unbind('tap')
        .tap(function(e){
            if(!btn_flag)return;
            btn_flag = false;
            e.preventDefault();
            $('.page')
                .eq(0)
                .css({
                    'transition': 'transform 0.4s linear',
                    'transform': 'translate(50%,-180%) rotate(9deg)'
                });
                setTimeout(function(){
                    jump();
                  	loopPage();
                    btn_flag = true;
                },400);
        });
}

function fail_start(){
    $('.fail_btn')
        .unbind('tap')
        .tap(function(e){
            if(!btn_flag)return;
            btn_flag = false;
            e.preventDefault();
            $('.page')
                .eq(0)
                .css({
                    'transition': 'transform 0.4s linear',
                    'transform': 'translate(-50%,180%) rotate(-9deg)'
                });
                setTimeout(function(){
                    loopPage();
                    btn_flag = true;
                },400);
        });
}

function explain_start() {
    $('.explain_btn').tap(function(e){
        e.preventDefault();
        $('.rule_bar').show();
    });
    $('.rule_bar .close').tap(function(e){
        e.preventDefault();
        $('.rule_bar').hide();
    });
}

$(document).on("touchmove",function(e){
    if(!$(e.target).hasClass('page_box'))
    {
        e.preventDefault();
    }
});

function page_load() {
    var host = window.location.host;
    $.ajax({
        url: '//'+ host +'/ashow?adNum=6',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {}
    })
    .done(function (r) {
        console.log(r);
        if (r.status == '1') {
            push_Page(r);
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

    function push_Page(d) {
        var pageBox = $('.page_box');
        var pageList = '';
        for (var i = 0; i < d.result.length; i++) {
            
            var page ='<li class="page" jump="'+d.result[i].url+'">'
                        +'<div class="t">'
                            +'<div class="box">'
                                +'<div class="calendar"></div>'
                                +'<div class="container">'
                                    +'<a href="'+d.result[i].url+'" class="individual">'
                                        +'<img src="'+d.result[i].pic+'" width="100%" height="100%" alt="'+d.result[i].creativeName+':'+d.result[i].title+'" style="display:block;" >'
                                    +'</a>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                        +'<div class="b">'
                            +'<p class="txt">'+d.result[i].creativeName+':'+d.result[i].title+'</p>'
                        +'</div>'
                    +'</li>';
            pageList += page;
        };
        pageBox.html(pageList);
      	deal_start();
        fail_start();
        explain_start();
        moveStart();
    } 
}

function jump() {
   var url = $('.page').eq(0).attr('jump');
   window.location.href = url;
}

$(function(){
	page_load();
});

