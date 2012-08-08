var Toodledo = (function() { 
    var d=top.document,
        l=d.location,
        e=encodeURIComponent,
        width = 540,
        height = 400,     
        byId=function(el) { return d.getElementById(el) };
            
    var t = function() {
        var w=window,   
            ua=w.navigator.userAgent,
            host="http://dev.toodledo.com",
            host_m="http://m.toodledo.com";
    };    
    t.init = function () {
        var oldWrap = byId('t_wrap');
        if(oldWrap) body.removeChild(oldWrap);
        
        //creating wrap
        var body = d.getElementsByTagName('body')[0];
        var wrap = d.createElement('div');        
        var topFrame = d.createElement('div');       
        var iframe = d.createElement('iframe'); 
        wrap.id = 't_wrap';
        topFrame.id = 't_head';
        topFrame.innerHTML = '<h2>Toodledo.com</h2>';
        iframe.src = 'http://beta.toodledo.com/tools/quickadd.php';
        iframe.id = 't_iframe';
        iframe.frameBorder = 0;
        
        body.appendChild(wrap);
        
        byId('t_wrap').innerHTML = '<style type="text/css">#t_wrap{border:1px solid #999;top:0;right:0;visibility:hidden;position:fixed;width:'+width+'px;height:'+(height+21)+'px;top:0;z-index:99999;}#t_iframe{width:'+width+'px;height:'+height+'px;border:0;margin:0;padding:0;background:#f1f5f8;}#t_head{border-bottom:1px solid #999;background:#e4e5e0;color:#000;}#t_head h2{font:bold 13px/20px Arial,sans-serif;text-align:center;margin:0;}</style>';       
        wrap.appendChild(topFrame);        
        wrap.appendChild(iframe);
        wrap.style.visibility = 'visible';        
    };    
    t.setValues = function () {
        notesField.value = e(l.href);
    };
    t.hideOverlay = function () {
        var a = byId("t_overlay");
        a.parentNode.removeChild(a);
    },
    t.savedFailure = function ( msg ) {
        console.log(msg);    
    },
    t.savedSuccess = function () {
        console.log("Task Saved!");
    };
    t.init();
    
})();