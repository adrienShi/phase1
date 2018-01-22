//旋转开关
var flag = true;
//次数
var count = 8;

var timer = null;

//初始红包启动
function fst_prize_start(){
    var fst_prize = $('#fst_prize');
    fst_prize.show();
    $('#fst_prize .btn').tap(function(e){
        e.preventDefault();
        winningShow();
        fst_prize.hide();
    });
    $('#fst_prize .close').tap(function(e){
        e.preventDefault();
        fst_prize.hide();
    });
}

//转轮圆灯闪烁
function neonStart(){
    var disk = $('.disk .side');
    setInterval(function(){
        if(disk.hasClass('side_2')){
            disk.removeClass('side_2');
        }else{
            disk.addClass('side_2');
        }
    },600);
}

//手机类型检测
function chaekPhone(){
    var u = navigator.userAgent;
    //var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        $('.ios').show();
    }
}

//旋转
function rotateFn(){
    var surface = $('.surface');
    flag = false;
    surface.stopRotate()
    surface.removeClass('disk_animation')
    surface.rotate({
        angle: 0,
        animateTo: 1920,        // 旋转角度 *360
        duration: 3000,         // 旋转时间
        callback:function (){   //旋转后执行
            winning_load(function(){
                winningShow();
                setTimeout(function(){
                    surface.addClass('disk_animation');
                    flag = true;
                },500);
            })
            
        }
    });
};

//点击抽奖
function rotateEv(){
    if(flag){
        if(count){
            rotateFn();
            count--;
            upCount();
            
        } else {
            window.location.href="https://lp.17tuiguang.cn/sclk"; 
            //alert('今日抽奖次数已用完!');
            //跳转其他游戏
        }
    }
}

//点击按钮
function rotateStart(){
    $('.pointer').tap(function(e){
        e.preventDefault();
        rotateEv();
    });
}

//说明弹窗启动
function ruleStart(){
    $('.rule_btn').tap(function(e){
        e.preventDefault();
        $('.rule_bar').show();
    });
    $('.rule_bar .close').tap(function(e){
        e.preventDefault();
        $('.rule_bar').hide();
    });
}

//检测次数
function upCount(){
    $('.count_bar i').text(count);
}

//中奖弹出开启
function winningShow(){
    winning_load(function(){
        $('#winning').show(function(){
            //
        })
    })
}

//中奖关闭绑定
function winningCloseStart(){
    $('#winning .close').tap(function(e){
        e.preventDefault();
        $('#winning').hide();
    });
}

//手指点击
function fingerTap(){
    $('#finger').tap(function(e){
        e.preventDefault();
        rotateEv();
    })
}

//手指动画
function finger_animation(){
    var c = 0
    timer = setInterval(function(){
        c++;
        if(c > 4) c = 1;
        $('#finger').removeClass();
        $('#finger').addClass('finger_animation_' + c);
    }, 500);
}

//清除手指
function clearFinger(){
    $('#finger').hide();
    clearInterval(timer);
}

//中奖装载 
function winning_load(fn){
    $.ajax({
        url: 'https://lp.17tuiguang.cn/ashow',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {test: 'test'},
    })
    .done(function(r) {
        console.log(r);
        if(r.status == '1') {
            $('#winning .banner_img').attr('src', r.result.pic);
            $('#winning .banner_text').text(r.result.title);
            $('#winning .winning_btn').attr('href', r.result.url);
            $('#winning .banner').attr('href', r.result.url);
            fn && fn();
        } else {
            alert('链接超时！')
        }
        
    })
    .fail(function() {
        console.log("error");
        alert('链接超时！')
    })
    .always(function() {
        console.log("complete");
    });
}

$(function(){
    chaekPhone();
    fst_prize_start();
    ruleStart();
    neonStart();
    upCount();
    rotateStart();
    winningCloseStart();
    fingerTap();
    finger_animation();
});

