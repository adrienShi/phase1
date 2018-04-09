$(function(){

	function tplFn(url, title, pic){
		var tpl = '<li>'
			+'<a href="'+ url +'" class="clearfix">'
				+'<div class="img_bar">'
					+'<img src="'+ pic +'">'
				+'</div>'
				+'<div class="linfo_bar">'
					+'<span class="title">'+ title +'</span>'
				+'</div>'
			+'</a>'
		+'</li>';
		return $(tpl);
	}

	var host = window.location.host;
	
	$.ajax({
        url: '//'+ host +'/alist',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback'
    })
	.done(function(r) {
        //console.log(r);
        if(r.status == '1') {
			for (var  i = 0; i < r.result.length; i++) {
				//console.log(tplFn(r.result[i].url, r.result[i].title, r.result[i].pic))
				$('.list').append(tplFn(r.result[i].url, r.result[i].title, r.result[i].pic));
			}
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
	
})

