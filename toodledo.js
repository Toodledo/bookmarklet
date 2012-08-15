var Toodledo = (function() { 
    var d = top.document,
        host = 'http://dev.toodledo.com',
        host_m = 'http://m.toodledo.com',
        quickAddUrl = 'http://beta.toodledo.com/tools/quickadd.php',
        byId=function(el) { return d.getElementById(el) };
            
    init = function () {
        var a = byId('t_wrap'),
            css = d.createElement('link'),
            body = d.getElementsByTagName('body')[0],
            head = d.getElementsByTagName("head")[0],
            wrap = d.createElement('div'),
            topFrame = d.createElement('div'),
            iframe = d.createElement('iframe');
        
        if(a) d.body.removeChild(a);
        
        head.appendChild(css);
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.href = host + '/style.css';
        
        wrap.id = 't_wrap';
        topFrame.id = 't_head';
        topFrame.innerHTML = '<h2>Toodledo.com</h2>';
        iframe.src = quickAddUrl;
        iframe.id = 't_iframe';
        iframe.frameBorder = 0;
        
        body.appendChild(wrap);
                      
        wrap.appendChild(topFrame);        
        wrap.appendChild(iframe);
        
        show(); 
        listen( window, 'message', listener);
    };    
    listen = function( obj, event, callback ) {
        if (window.addEventListener){
            obj.addEventListener(event, callback, false);
        } else {
            obj.attachEvent('on' + event, callback);
        }
    };
    listener = function() {
        if (( event.origin == 'http://beta.toodledo.com' ) && (event.data == 'pass')) {
           showViewAllTasks(); 
           hide();
        }
    };
    showViewAllTasks = function() {
        var viewTasks = d.createElement('div'),
            a = byId('t_wrap');
        a.style.height = '200px';
        a.removeChild(byId('t_iframe'));
        a.appendChild(viewTasks);
        viewTasks.id = 't_viewTasks';
        
        viewTasks.innerHTML = '<a id="openTasks">View Tasks<img src="'+host+'/viewtasks.png" /></a> <h2>Task Added.</h2>';
        
        listen(byId('openTasks'), 'click', openTasks); 
        
    };
    openTasks = function () {
        window.open(host_m, '_blank', 'height=480, width=320, scrollbars=0')
    };
    show = function () {
        var a = byId('t_wrap'),
            b = byId('t_iframe');
        setTimeout(function () {
            a.style.visibility = 'visible';
            a.style.height = '250px';
            b.style.display = 'block';  
        }, 300);      
    };
    hide = function () {
        var a = byId('t_wrap');
        setTimeout(function () {
            a.style.height = '0';
            a.style.visibility = 'hidden';  
            d.body.removeChild(a);          
        }, 5000);
    };    
    init();    
})();