<!doctype html>
<html lang="en">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8">
	<title>Bookmarklet</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width">
	<script type="text/javascript">
    
    </script>	
</head>
<body>
    <a href="javascript:(function(){var w=window,d = w.top.document,t=top.js; if(t && t.document) d = t.document; var s = d.createElement('script');d.task_script = s; s.src = 'http://dev.toodledo.com/toodledo.js';d.getElementsByTagName('head')[0].appendChild(s);})(); void(0);">Add Task</a>
</body>
</html>