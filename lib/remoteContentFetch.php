<?php
/**
 * Fetch & clean data from Github API
 */

include_once './lib/simpleCache.php';

$cache = new SimpleCache();
$output = $cache->get_data('githubRepos', 'https://api.github.com/users/t1mmen/repos');

$orderedRepos = array();

if ($output) {
    $repos = json_decode($output,true);
    $repoCounter=0;

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

}

// Order by date modified:
krsort($orderedRepos);
// Only show most recent ones...
$orderedRepos = array_slice($orderedRepos, 0, 3);

 ?>
