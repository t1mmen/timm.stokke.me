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
		'devEnviroment' => $app->get_env,
		'skills' => $app->fetch_skills,
		'repos' => $app->fetch_repos,
		'github_events' => $app->fetch_github_events,
		'designs' => $app->fetch_designs,
		'jobs' => $app->fetch_jobs,
		'timeline' => $app->fetch_timeline,
		'config' => $config,
	));
});


// Enviroment check:
$app->get_env = function() {

 	$enviroment = 'live';

 	if (isset($_GET['setenv'])) {
 		$enviroment = $_GET['setenv'];
 	} elseif ($_SERVER['HTTP_HOST'] === 'localhost' || $_SERVER['HTTP_HOST'] === 'timm.local' || $_SERVER['HTTP_HOST'] === 'timms-macbook-air.local') {
		$enviroment = 'dev';
	}

	return $enviroment;
};

// Jobs
$app->fetch_jobs = function() {
	$jobs = array(
		array(
			'timeframe' => '2011 - now',
			'company' => 'Colours AS',
			'title' => 'UI & UX Developer',
			'url' => 'http://colours.no',
			),
		array(
			'timeframe' => '2007 - 2011',
			'company' => 'Colours AS',
			'title' => 'Senior Developer',
			'url' => 'http://colours.no',
			),
		array(
			'timeframe' => '2001 - 2007',
			'company' => 'Aspekt AS',
			'title' => 'Partner, Lead Developer',
			'url' => 'http://web.archive.org/web/20071010142639/http://www.aspekt.no/',
			),

		);

	return $jobs;
};


// Skills
$app->fetch_skills = function() {
	$skills = array(
		'Frontend' => array(
			array(
				'title' => 'HTML5',
				'url' => 'http://en.wikipedia.org/wiki/HTML5',
				//'votes' => 9,
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
				'title' => 'AngularJS',
				'url' => 'https://angularjs.org/',
				),
			array(
				'title' => 'Bootstrap 2 & 3',
				'url' => 'http://getbootstrap.com',
				),
			array(
				'title' => 'Handlebars.js',
				'url' => 'http://handlebarsjs.com',
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
		'Methodologies & Concepts' => array(
			array(
				'title' => 'Agile / Kanban',
				'url' => 'http://en.wikipedia.org/wiki/Agile_software_development',
				),
			array(
				'title' => 'Mobile first',
				'url' => null,
				),
			array(
				'title' => 'API design',
				'url' => null,
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
			),
		'Tools & DevOps' => array(

			array(
				'title' => 'Vagrant',
				'url' => 'http://www.vagrantu.com/',
				),
			array(
				'title' => 'PuPHPet',
				'url' => 'http://www.puphpet.com',
				),
			array(
				'title' => 'Composer',
				'url' => 'http://getcomposer.org',
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
				'title' => 'Git',
				'url' => 'http://github.com',
				),
			array(
				'title' => 'Sublime Text',
				'url' => 'http://www.sublimetext.com/',
				),
			),
		'Services' => array(
			array(
				'title' => 'Basecamp',
				'url' => 'http://basecamp.com',
				),
			array(
				'title' => 'Hipchat',
				'url' => 'http://hipchat.com',
				),
			array(
				'title' => '#Slack',
				'url' => 'http://slack.com',
				),
			array(
				'title' => 'Leankit',
				'url' => 'http://leankit.com',
				),
			array(
				'title' => 'Breeze.pm',
				'url' => 'http://breeze.pm',
				),
			array(
				'title' => 'Sprint.ly',
				'url' => 'http://sprint.ly',
				),
			array(
				'title' => 'Trello',
				'url' => 'http://trello.com',
				),
			array(
				'title' => 'Google Apps',
				'url' => 'http://www.google.com/enterprise/apps/business/',
				),
			array(
				'title' => 'Github',
				'url' => 'http://github.com',
				),
			),

		);

	return $skills;
};

// Designs/portfolio
$app->fetch_designs = function() {
	$designs = array(
		// ColoursCMS
		array(
			'thumbnail' => false,
			'media' => array(
				'img/projects/ccms1.jpg',
				'img/projects/ccms2.jpg',
				'img/projects/ccms3.jpg',
				),
			'client' => 'Colours',
			'project_name' => 'ColoursCMS',
			'url' => 'http://www.colourscms.no',
			'disciplines' => array('concept', 'design', 'frontend', 'backend'),
			'tease' => 'ColoursCMS is a beautifully simple and powerful content management system',
			'description' => "
				<p>
					ColoursCMS \"is an extremely pleasant CMS to use\", according to
					<a href='http://www.cmscritic.com/colours-cms-review/' target='_blank'>CMS Critic</a> (giving it 4/5 stars!)
				</p>
				<p>
					I worked on ColoursCMS as concept creator, frontend & backend developer and head of UI & UX, in the 2010–2014 timeframe.
				</p>",
			),
		// SPREK
		array(
			'media' => array(
				'img/projects/btsprek1.jpg',
				'img/projects/btsprek2.jpg',
				),
			'client' => 'Bergens Tidende',
			'project_name' => 'Sprek',
			'disciplines' => array('UI', 'UX', 'Frontend', 'Backend', 'Concept', 'Business'),
			'url' => 'http://tur.bt.no',
			'tease' => 'A service for finding and taking hikes.',
			'description' => '
				<p>
					BT Sprek is a service for finding and taking hikes in and
					around Bergen and Trondheim, Norway. Available
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
				'img/projects/gcrieber3.jpg',
				'img/projects/gcrieber2.jpg',
				),
			'client' => 'GCRieber',
			'project_name' => 'Responsive redesign',
			'url' => 'http://www.gcrieber-eiendom.no',
			'disciplines' => array(),
			'tease' => 'Landowner and properties holder in Bergen, Norway.',
			'description' => '
				<p>
					GC Rieber Eiendom developes and operates several properties in Bergen, Norway.
					Designed in collaberation with <a href="https://twitter.com/IvarBorthen81" target="_blank"> @IvarBorthen81</a>.
				</p>',
			),
		// RGROUP
		array(
			'media' => array(
				'img/projects/rgroup.jpg',
				),
			'client' => 'Randaberg Group',
			'project_name' => 'Responsive redesign',
			'url' => 'http://www.rgroup.no',
			'disciplines' => array(),
			'tease' => '',
			'description' => "
				<p>
					Randaberg Group offers a wide array of products and services in steel production and protection for subsea and storage
				</p>",
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
	$orderedRepos = array_slice($orderedRepos, 0, 6);

	return $orderedRepos;
};


// Github events:
$app->fetch_github_events = function () {

	// Set up cache:
	$key = FileSystemCache::generateCacheKey('github_events_multipage');
	$events = FileSystemCache::retrieve($key);

	// If no cache found:
	if ($events === false) {

		// Fetch all event pages (since this is the only way we can track contributions atm)
		$numApiRequests = 10; // = 1000 items max
		$limit = 30; // Max results pr page
		$events = array();

		// Request building:
		$headers = array('Accept' => 'application/json');
		$options = array('User-Agent' => 't1mmen');

		// Fetch items from API (multiple times, if required)
		for ($i = 1; $i < $numApiRequests; $i++) {

			// Fetch from API
			$response = Requests::get('https://api.github.com/users/t1mmen/events?page='.$i, $headers, $options);
	   		$body = json_decode($response->body, true);
	   		$events = array_merge($body, $events);

			// If the API returns less than $limit results, we have all results. Abort.
			if ($body < $limit) {
				break;
			}
		}

		FileSystemCache::store($key, $events, 3600*24);
	}

	// Order Github events:
	$orderedEvents = array();
	$eventsToDisplay = array('PullRequestEvent');

	foreach ($events as $event) {

		// Show only the events we want:
		if (!in_array($event['type'], $eventsToDisplay)) {
			continue;
		}

		$timestamp = strtotime($event['created_at']);

		$repoDetails = explode('/', $event['repo']['name']);

		$orderedEvents[$timestamp] = array(
			'name' => end($repoDetails),
			'homepage' => $event['payload']['pull_request']['base']['repo']['html_url'],
			'description' => $event['payload']['pull_request']['base']['repo']['description'],
			'language' => $event['payload']['pull_request']['base']['repo']['language'],
			'account' => reset($repoDetails),
			'stargazers_count' => $event['payload']['pull_request']['base']['repo']['stargazers_count'],
			'watchers_count' => $event['payload']['pull_request']['base']['repo']['watchers_count'],
			'forks' => $event['payload']['pull_request']['base']['repo']['forks'],
			'homepage' => 'http://github.com/'.$event['repo']['name'].'/pulls/'.$event['payload']['pull_request']['number'],
			'updated_timestamp' => $timestamp,
		);

	}

	// Order by date modified:
	krsort($orderedEvents);

	// Only show most recent ones...
	$orderedEvents = array_slice($orderedEvents, 0, 3);

	return $orderedEvents;
};


// Timeline
$app->fetch_timeline = function () {
	$timeline = array(
		array(
			'title' => 'Became a huge nerd',
			'year' => 1995,
			'description' => "Fell in love with computers. At first, games caught my attention. By '97, I was running my first gaming website.",
			'type' => 'personal',
			),
		array(
			'title' => 'Graduated from IT-Akademiet',
			'year' => 2002,
			'type' => 'jobchange',
			'description' => 'Another webdeveloper headed straight into the dotcom crash.'
			),
		array(
			'title' => 'Joined my first startup',
			'year' => 2002,
			'description' => 'My former teacher hired me out of school. We did websites and webapps, for the most part.',
			'type' => 'jobchange',
			),
		array(
			'title' => 'Shipped first product',
			'year' => 2004,
			'description' => "My first major SaaS launch! PublishOnline, a content management system, is still in use by several major websites to this day.",
			),
		// array(
		// 	'title' => 'Played the World Series of Poker',
		// 	'year' => 2006,
		// 	'description' => "Busting out with aces vs jacks was rough, but what an experience! These days, I don't play much outside of a homegame or two a year.",
		// 	'type' => 'personal',
		// 	),
		array(
			'title' => 'Startup aquired',
			'year' => 2007,
			'description' => 'We joined Colours in building a dedicated agency of industry experts, designers, developers, 3D artists and filmmakers. ',
			'type' => 'jobchange',
			),
		array(
			'title' => 'Met the most awesome girl',
			'year' => 2008,
			'description' => 'Together we have <a href="https://twitter.com/love_marles">Marley, the greatest Boston Terrier</a> in the world. <i class="fa fa-heart"></i>',
			'type' => 'personal',
			),
		array(
			'title' => 'Designed Blueprints',
			'year' => 2009,
			'description' => 'Designing my own apartment blueprints proved a facinating challenge. Superhappy with the results!',
			),
		array(
			'title' => 'ColoursCMS grows up',
			'year' => 2013,
			'description' => '<a href="http://www.cmscritic.com/colours-cms-review/" target="_blank">CRM Critic loved it</a> (4/5!). "I immediately realised that I was in for an extremely easy ride. It all looked so clean and simple.", and, "an extremely pleasant CMS to use"',
			'type' => 'personal',
			),
		array(
			'title' => 'Moving to Canada',
			'year' => 2014,
			'description' => "I'm not quite sure what I'll be doing, though. <a href='#contact'>Should we talk?</a>"
			),
		);
	return $timeline;
};

$app->run();
?>

