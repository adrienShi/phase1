$(function(){

	function tplFn(url, title, pic){
		var tpl = '<li>'
			+'<a href="'+ url +'">'
				+'<img src="'+ pic +'">'
				+'<div class="clearfix">'
					+'<span>'+ title +'</span>'
					+'<b>立即查看 <i> ></i></b>'
				+'</div>'
			+'</a>'
		+'</li>';
		return $(tpl);
	}

	var host = window.location.host;
	
	$.ajax({ 
		url: '//'+ host +'/ashow?adNum=1',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {'ctype': '4', 'log': '0'}
    })
	.done(function(r) {
        console.log(r);
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

	$.ajax({ 
		url: '//'+ host +'/ashow?adNum=8',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {'ctype': '3', 'log': '0'}
    })
	.done(function(r) {
        console.log(r);
        if(r.status == '1') {
			for (var  i = 0; i < r.result.length; i++) {
				//console.log(tplFn(r.result[i].url, r.result[i].title, r.result[i].pic))
				$('.ht').attr('href', r.result[i].url);
				$('.ht img').attr('src', r.result[i].pic);
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

	function getParam(paramName) {
		paramValue = "", isFound = !1;
		if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
			arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
			while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
		}
		return paramValue == "" && (paramValue = null), paramValue
	}

	function pushHistory(){
	    var host = window.location.host;
	    $.ajax({
	        url: '//'+ host +'/backclk',
	        type: 'GET',
	        dataType: 'jsonp',
	        jsonp: 'callback'
	    })
	    .done(function(r) {
	        console.log(r.url);
	        pushBack(r.url);

	    })
	}

	function pushBack(url){
	    if(getParam('backdraw') !== '0'){
	        window.history.pushState(1, '', '');

	        window.addEventListener("popstate", function(e) {
	            location.href = url;
	            //location.href = 'http://zp.bjgit.com/dzp/a/index.html';
	        }, false);
	    }
	}

	pushHistory();
})

