<?php
include_once('./lib/utils.php');
require_once('./vendor/autoload.php');


$app = new \Slim\Slim(array(
	'view' => '\Slim\LayoutView',
	'layout' => 'layout.php',
	'templates.path' => './views',
	'debug' => true,
));

// Main route:
$app->get('/', function () use ($app) {

	$app->render('main.php', array(
		'repos' => $app->fetch_repos,
		'designs' => $app->fetch_designs
	));
});

// Designs/portfolio
$app->fetch_designs = function() {
	$designs = array(
		// SPREK
		array(
			'media' => array(
				'img/projects/btsprek1.jpg',
				'img/projects/btsprek2.jpg',
				),
			'client' => 'Bergens Tidende',
			'project_name' => 'Sprek',
			'url' => 'http://tur.bt.no',
			'description' => '
				<p>
					BT Sprek is a service for finding and taking hikes in and
					around Bergen and Tromsø, Norway. Available
					<a target="_blank" href="http://tur.bt.no">on the web</a>,
					<a target="_blank" href="https://itunes.apple.com/us/app/bt-sprek/id439293777?mt=8">IPhone</a> and
					<a target="_blank" href="https://play.google.com/store/apps/details?id=no.appy.btsprek&hl=en">Android</a>
				</p>

				<p>
					I worked on spec, UI & UX, frontend and backend development
					in the 2010–2013 timeframe. I also acted as project lead for
					over one year.
				</p>',
			),
		// GCRIEBER
		array(
			'media' => array(
				'img/projects/gcrieber1.jpg',
				),
			'client' => 'GCRieber Eiendom',
			'project_name' => 'Responsive redesign',
			'url' => 'http://www.gcrieber-eiendom.no',
			'description' => '
				<p>
					GC Rieber Eiendom developes and operates several properties in Bergen, Norway.
				</p>

				<p>
					Designed in collaberation with <a href="https://twitter.com/IvarBorthen81" target="_blank"> @IvarBorthen81</a>.
				</p>',
			),
		);

	return $designs;
};

// Github repos:
$app->fetch_repos = function () {

	// Set up cache:
	$key = FileSystemCache::generateCacheKey('github');
	$repos = FileSystemCache::retrieve($key);

	// If no cache found:
	if ($repos === false) {

		// Fetch from API
		$headers = array('Accept' => 'application/json');
		$options = array('User-Agent' => 't1mmen');
		$response = Requests::get('https://api.github.com/users/t1mmen/repos', $headers, $options);

   		$repos = json_decode($response->body, true);

		// Store cache:
		FileSystemCache::store($key, $repos, 60*10);
	}

	// Order Github data:

	$orderedRepos = array();

	foreach ($repos as $repo) {

		if ($repo['fork'] == 1) {
			continue; // Skip forks
		}

		// Do we have homepage?
		$homepage = $repo['html_url'];
		if ($repo['homepage'] != null) {
			$homepage = $repo['homepage'];
		}

		$timestamp = strtotime($repo['updated_at']);

		$orderedRepos[$timestamp] = array(
			'name' => $repo['name'],
			'html_url' => $repo['html_url'],
			'homepage' => $homepage,
			'description' => $repo['description'],
			'watchers_count' => $repo['watchers_count'],
			'stargazers_count' => $repo['stargazers_count'],
			'forks' => $repo['forks'],
			'open_issues_count' => $repo['open_issues_count'],
			'language' => $repo['language'],
			'updated_timestamp' => $timestamp,
		);
	}


	// Order by date modified:
	krsort($orderedRepos);

	// Only show most recent ones...
	$orderedRepos = array_slice($orderedRepos, 0, 3);

	return $orderedRepos;
};

$app->run();
?>

