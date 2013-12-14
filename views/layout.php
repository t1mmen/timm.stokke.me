<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Hi, I am Timm Stokke</title>
		<meta name="description" content="Learn more about Timm Stokke. That's me, btw.">
		<meta name="viewport" content="width=device-width">
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>

		<?php
		// Load view:
		echo $yield;

		// Include footer in all views:
		include "views/footer.php";
		?>


		<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
		<script src="js/main.js"></script>

		<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-4168066-2']);
		_gaq.push(['_setDomainName', 'stokke.me']);
		_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
		</script>

	</body>
</html>
