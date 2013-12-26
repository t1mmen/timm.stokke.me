<?php
include_once('./config.php');
include_once('./lib/utils.php');
require_once('./vendor/autoload.php');


$app = new \Slim\Slim(array(
	'view' => '\Slim\LayoutView',
	'layout' => 'layout.php',
	'templates.path' => './views',
	'debug' => true,
));

// Main route:
$app->get('/', function () use ($app, $config) {

	$app->render('main.php', array(
		'skills' => $app->fetch_skills,
		'repos' => $app->fetch_repos,
		'designs' => $app->fetch_designs,
		//'timeline' => $app->fetch_timeline,
		'config' => $config,
	));
});

// Skills
$app->fetch_skills = function() {
	$skills = array(
		'Frontend' => array(
			array(
				'title' => 'HTML5',
				'url' => 'http://en.wikipedia.org/wiki/HTML5',
				),
			array(
				'title' => 'CSS3',
				'url' => 'http://en.wikipedia.org/wiki/Cascading_Style_Sheets',
				),
			array(
				'title' => 'jQuery',
				'url' => 'http://jquery.com',
				),
			array(
				'title' => 'Javascript',
				'url' => 'http://en.wikipedia.org/wiki/Javascript',
				),
			array(
				'title' => 'KnockoutJs',
				'url' => 'http://knockoutjs.com',
				),
			array(
				'title' => 'Grunt',
				'url' => 'http://gruntjs.com/',
				),
			array(
				'title' => 'Bower',
				'url' => 'http://bower.io',
				),
			array(
				'title' => 'Bootstrap 2/3',
				'url' => 'http://getbootstrap.com',
				),
			),
		'Backend' => array(
			array(
				'title' => 'PHP',
				'url' => 'http://php.net',
				),
			array(
				'title' => 'CakePHP',
				'url' => 'http://cakephp.org',
				),
			array(
				'title' => 'Slim Framework',
				'url' => 'http://www.slimframework.com/',
				),
			array(
				'title' => 'MySQL',
				'url' => 'http://mysql.com',
				),
			array(
				'title' => 'Composer',
				'url' => 'http://getcomposer.org',
				),
			),
		'Design & Concept' => array(
			array(
				'title' => 'Photoshop',
				'url' => 'http://www.photoshop.com',
				),
			array(
				'title' => 'Pen & Paper',
				'url' => 'http://alistapart.com/article/paperprototyping',
				),
			array(
				'title' => 'Balsamiq mockups',
				'url' => 'http://balsamiq.com/',
				),
			array(
				'title' => 'FramerJS',
				'url' => 'http://framerjs.com',
				),
			array(
				'title' => 'SketchApp',
				'url' => 'http://www.bohemiancoding.com/sketch/',
				),
			),
		'Methodologies & Tools' => array(
			array(
				'title' => 'Agile / Kanban',
				'url' => 'http://en.wikipedia.org/wiki/Agile_software_development',
				),
			array(
				'title' => 'MVC',
				'url' => 'http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller',
				),
			array(
				'title' => 'DRY',
				'url' => "http://en.wikipedia.org/wiki/Don't_repeat_yourself",
				),
			array(
				'title' => "RESTful API's",
				'url' => 'http://en.wikipedia.org/wiki/Representational_state_transfer',
				),
			array(
				'title' => 'Github',
				'url' => 'http://github.com',
				),
			array(
				'title' => 'Sublime Text',
				'url' => 'http://www.sublimetext.com/',
				),
			),

		);

	return $skills;
};

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
		FileSystemCache::store($key, $repos, 3600);
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

$app->fetch_timeline = function () {
	$timeline = array(
		array(
			'title' => 'Joined my first startup',
			'year' => 2001,
			'description' => 'Hired by my former teacher, bootstrapped.',
			),
		array(
			'title' => 'Shipped 2net Publish',
			'year' => 2004,
			'description' => 'My first major SaaS launch.',
			),
		array(
			'title' => 'Aquihired',
			'year' => 2007,
			'description' => 'Colours bought Aspekt.',
			),
		array(
			'title' => 'Designed apartment blueprints',
			'year' => 2009,
			'description' => '>Designing living spaces proved a fun challenge.',
			),
		array(
			'title' => 'Shipped BT Sprek',
			'year' => 2012,
			'description' => false,
			),
		array(
			'title' => 'Moving to Canada',
			'year' => 2014,
			'description' => false,
			),
		);
	return $timeline;
};

$app->run();
?>

