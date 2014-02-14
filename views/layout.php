<?php
// Load minimized stuff on live
$css = 'css/main.min.css?v2';
$script = 'js/main.min.js?v2';
// But in dev, we need sourcemap & unminified JS
if ($this->data->devEnviroment == 'dev') {
	$css = 'css/main.css';
	$script = 'js/build/main.concat.js';
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Hi, I am Timm Stokke</title>
		<meta name="description" content="I've been passionately building websites, services and apps for web & mobile devices since 1997.">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="<?php echo $css; ?>">
		<link rel="author" href="https://plus.google.com/107766367797089659313">
		<link rel="canonical" href="http://timm.stokke.me">
	</head>
	<body>


		<header id="headroom" class="headroom slideOutUp">
			<div class="container">
				<div class="row">



					<!-- menu -->
					<ul class="pull-left hidden-xs">
						<li>
							<span>Timm Stokke</span>
						</li>
					</ul>

					<!-- menu -->
					<ul class="pull-right">
						<li>
							<a href="#hello">
								Hi
							</a>
						</li>
						<li>
							<a href="#portfolio">
								Portfolio
							</a>
						</li>
						<li>
							<a href="#employment-history">
								History
							</a>
						</li>
						<li>
							<a href="#contact">
								Contact
							</a>
						</li>
					</ul>
					<!-- end menu -->

				</div>
			</div>
		</header>

		<?php
		// Load view:
		echo $yield;

		// Include footer in all views:
		include "views/footer.php";
		?>


		<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
		<script src="<?php echo $script; ?>"></script>

		<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-4168066-2']);
		_gaq.push(['_setDomainName', 'stokke.me']);
		_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
		</script>

	</body>
</html>
