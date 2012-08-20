var Toodledo = (function() { 
    var d=top.document,
        l=d.location,
        e=encodeURIComponent,
        host='http://dev.toodledo.com',
        host_m='http://m.toodledo.com',
        quickAddHost='https://www.toodledo.com',
        quickAddUrl=quickAddHost + '/tools/quickadd.php';
        instructionsUrl=quickAddHost + '/tools/instructions.php';
            
    init = function ( instructions ) {
        var loadInstructions  = (typeof instructions != 'undefined' ) ? true : false;
        
        var a=d.getElementById('TDL_wrap'),
            css=d.createElement('style'),
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
        
        //setting up bookmarklet structure
        wrap.id = 'TDL_wrap';
        css.type='text/css';
        css.innerHTML = '#TDL_wrap{top:-300px;left:0;visibility:hidden;position:fixed;width:100%;min-height:237px !important;height:237px;background:#e3ecf1;z-index:999999;-webkit-transition:all 0.5s ease;-moz-transition:all 0.5s ease;-webkit-box-shadow:0 0 20px rgba(0,0,0,0.8);-moz-box-shadow:0 0 20px rgba(0,0,0,0.4);-o-box-shadow:0 0 20px rgba(0,0,0,0.8);box-shadow:0 0 20px rgba(0,0,0,0.8);}#TDL_iframe{width:100%;min-height:237px !important;height:237px;border:0;margin:0;padding:0;background:#e3ecf1;}#TDL_viewTasks{position:absolute;top:0;right:0;width:100%;}#TDL_openTasks{padding: 25px 5px 5px 5px;position:absolute;right:0;display:block;min-height:207px !important;height:207px;width:114px;border:0;text-decoration:none;cursor:pointer;background:#0e3755;}#TDL_viewTasks a img{display:block;margin:5px auto 0 auto;border:0;}#TDL_close{color: #333;display:block;float:right;z-index: 10000000;font-size: 16px;position: absolute;right: 5px;top: 0;font-weight: bold;font-family: sans-serif;background: #efefef;padding: 0 5px 5px 5px;height: 15px;cursor: pointer;}#TDL_close:hover{text-decoration:none;}#TDL_viewTasks .tdl_button{background:#e49e26 url(http://static.toodledo.com/images/css/sprites_btn_bkg_2.png) repeat-x left -74px;display:block;height:28px;color:#fff;padding:0 10px;margin:10px 0;font:bold 13px/28px Verdana,sans-serif;cursor:pointer;-moz-border-radius:3px;border-radius:3px;text-shadow:0 -1px 1px rgba(0,0,0,0.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.5);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,.5);-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.5);border:1px solid #b57a15;width:94px;text-align:center;}#TDL_viewTasks .tdl_button:hover{background-color:#de9518;}';
        iframe.src = (loadInstructions)? instructionsUrl : quickAddUrl;
        iframe.id = 'TDL_iframe';
        iframe.frameBorder = 0;
        viewTasks.id = 'TDL_viewTasks';
        viewTasks.innerHTML = '<a id="TDL_close">x</a><a id="TDL_openTasks"><img src="'+host+'/logo114.png" width="114" /><img src="'+host+'/viewtasks.png" /><span class="tdl_button">View Tasks</span></a>';
        body.appendChild(wrap);  
        wrap.appendChild(css);         
        wrap.appendChild(iframe);  
        wrap.appendChild(viewTasks);
        
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
    
    (l.pathname == '/tools/bookmarklet.php' && l.hostname == 'www.toodledo.com') ? init( 'instructions' ) : init();    
})();