var Toodledo = (function() { 
    var d = top.document,
        l = d.location,
        e = encodeURIComponent,
        host = 'http://dev.toodledo.com',
        host_m = 'http://m.toodledo.com',
        quickAddUrl = 'http://beta.toodledo.com/tools/quickadd.php',
        byId=function(el) { return d.getElementById(el) };
            
    init = function () {
        var a = byId('TDL_wrap'),
            css = d.createElement('link'),
            body = d.getElementsByTagName('body')[0],
            head = d.getElementsByTagName("head")[0],
            wrap = d.createElement('div'),
            topFrame = d.createElement('div'),
            viewTasks = d.createElement('div'),
            iframe = d.createElement('iframe');
        
        if(a) d.body.removeChild(a);
        
        head.appendChild(css);
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.href = host + '/style.css';
        
        wrap.id = 'TDL_wrap';
        topFrame.id = 'TDL_head';
        topFrame.innerHTML = '<a id="TDL_close">x</a><h2>Toodledo.com</h2>';
        iframe.src = quickAddUrl;
        iframe.id = 'TDL_iframe';
        iframe.frameBorder = 0;
        viewTasks.id = 'TDL_viewTasks';
        viewTasks.innerHTML = '<a id="TDL_openTasks"><img src="'+host+'/logo150.png" width="114" /><img src="'+host+'/viewtasks.png" /><img src="'+host+'/btnViewTasks.png" width="93" /></a>';
        body.appendChild(wrap);
                      
        wrap.appendChild(topFrame); 
        wrap.appendChild(viewTasks);       
        wrap.appendChild(iframe);
        
        show(); 
        listen( window, 'message', listener);
        listen(byId('TDL_openTasks'), 'click', openTasks);
        listen(byId('TDL_close'), 'click', function( event ) {
            event.preventDefault();
            hide();  
        });
    };    
    sendMessage = function() {
        var frameContent = byId('TDL_iframe');
        frameContent.contentWindow.postMessage("note:" + e(l.href) , "*" );    
    };
    listen = function( obj, event, callback ) {
        if (window.addEventListener){
            obj.addEventListener(event, callback, false);
        } else {
            obj.attachEvent('on' + event, callback);
        }
    };
    listener = function() {
        console.log(event.data);
        if (event.data == 'pass') {
            setTimeout(function () {
                hide(); 
            }, 5000 );            
        } else if (event.data == 'ready') {
            sendMessage();
        }
    };
    openTasks = function () {
        window.open(host_m, '_blank', 'height=480, width=320, scrollbars=0')
    };
    show = function () {
        var a = byId('TDL_wrap');
        setTimeout(function () {
            a.style.visibility = 'visible';
            a.style.top = '0';
        }, 300);      
    };
    hide = function () {        
        var a = byId('TDL_wrap');
        a.style.top = '-300px';                   
        setTimeout(function () {
            d.body.removeChild(a);
        }, 300 );
    };    
    init();    
})();