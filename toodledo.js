var Toodledo = (function() { 
    var d=top.document,
        l=d.location,
        e=encodeURIComponent,
        host='http://dev.toodledo.com',
        host_m='http://m.toodledo.com',
        quickAddHost='http://beta.toodledo.com',
        quickAddUrl=quickAddHost + '/tools/quickadd.php';
            
    init = function () {
        var a=d.getElementById('TDL_wrap'),
            css=d.createElement('link'),
            body=d.getElementsByTagName('body')[0],
            head=d.getElementsByTagName('head')[0],
            wrap=d.createElement('div'),
            viewTasks=d.createElement('div'),
            iframe=d.createElement('iframe');
        
        //closing bookmarklet if already opened
        if(a) {
            hide();
            return;
        }
        
        //attaching css
        head.appendChild(css);
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.href = host + '/style.css';
        
        //setting up bookmarklet structure
        wrap.id = 'TDL_wrap';
        iframe.src = quickAddUrl;
        iframe.id = 'TDL_iframe';
        iframe.frameBorder = 0;
        viewTasks.id = 'TDL_viewTasks';
        viewTasks.innerHTML = '<a id="TDL_close">x</a><a id="TDL_openTasks"><img src="'+host+'/logo114.png" width="114" /><img src="'+host+'/viewtasks.png" /><span class="tdl_button">View Tasks</span></a>';
        
        body.appendChild(wrap);                      
        wrap.appendChild(viewTasks);       
        wrap.appendChild(iframe);
        
        //displaying the bookmarklet
        show(); 
        
        //adding event listeners
        listen(window, 'message', listener); //iframe message listener
        listen(d.getElementById('TDL_openTasks'), 'click', openTasks); //opens mobile site in a new window
        listen(d.getElementById('TDL_close'), 'click', function() {
            hide();  
        });
    };    
    sendMessage = function() {
        //sending message to display url in the notes field
        var frameContent = d.getElementById('TDL_iframe');
        frameContent.contentWindow.postMessage("note:" + e(l.href) , quickAddHost );    
    };
    listen = function( obj, event, callback ) {
        //cross-browser event listener
        if (window.addEventListener){
            obj.addEventListener(event, callback, false);
        } else {
            obj.attachEvent('on' + event, callback);
        }
    };
    listener = function( event ) {
        var val = event.data,
            o = event.origin;      
            
        if (o == quickAddHost) { //ensure that message is from our server
            switch (val) {
                case 'pass':
                    setTimeout(function () {
                        hide(); 
                    }, 5000 ); 
                    break;
                case 'ready':
                    sendMessage();
                    break;
                default:
                    if(val.indexOf("height:")!==-1) {
                        setHeight(val.substr(7));
                    }
            }
        }
    };
    openTasks = function () {
        //opens a mobile site window
        window.open(host_m, '_blank', 'height=480, width=320, scrollbars=0')
    };
    setHeight = function ( val ) {
        //setting bookmarklet's height based on value recieved
        var a = d.getElementById('TDL_wrap'),
            b = d.getElementById('TDL_iframe'),
            c = d.getElementById('TDL_openTasks'),
            i = parseInt(val)+5; // to add more space at the bottom
            
        a.style.height = b.style.height = i+"px";
        c.style.height = (i-30)+"px";
    };
    show = function () {
        var a = d.getElementById('TDL_wrap');
        setTimeout(function () {
            a.style.visibility = 'visible';
            a.style.top = '0';
        }, 300);      
    };
    hide = function () {        
        var a = d.getElementById('TDL_wrap');         
        a.style.top = '-300px';                   
        setTimeout(function () {
            d.body.removeChild(a);
        }, 1000 );        
    };    
    init();    
})();