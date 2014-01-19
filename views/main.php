<?php
/**********************************************************************
 * INTRO
 * ****************************************************************** */
 ?>
<section id="intro" style="padding-top: 50px;">
<div class="container">

	<div class="row">

		<div class="col-md-3 col-sm-3">
			<br>
			<img src="img/timm-stokke.png" class="invisible animated avatar img-circle img-responsive">
		</div>

		<div class="col-md-9 col-sm-9">

			<div class="page-header">
				<h1>
					<small>Hi there,</small><br>
					I'm Timm Stokke.</h1>
			</div>

			<p class="lead">
				I've been passionately building websites, services and apps for web & mobile devices since 1997.
			</p>

			<p>
				<a href="#contact" class="btn btn-success">Let's talk</a>
				&nbsp;
				<a href="#portfolio" class="btn btn-default">View my work</a>
			</p>


		</div>
	</div>


</div>
</section>

<?php
/**********************************************************************
 * SKILLS OVERVIEW
 * ****************************************************************** */
 ?>
<section id="ido" class="primary">
<div class="container">

	<div class="page-header">
		<h1>
			<small>In brief</small><br>
			Areas of Expertise
		</h1>
	</div>

	<div class="row">

		<div class="col-md-3 col-sm-6 col-xs-12">


			<h3 class="text-center">
				<i class="fa fa-lightbulb-o fa-3x text-muted"></i><br>
				Concepts
			</h3>

			<p>From a napkin drawings to interactive mockups, I work efficiently in the idea, concept and prototyping stages.</p>


		</div>

		<div class="col-md-3 col-sm-6 col-xs-12">


			<h3 class="text-center">
				<i class="fa fa-eye fa-3x text-muted"></i><br>
				Design
			</h3>
			<p>I love doing user interface & experience design for web application, websites & mobile apps.</p>


		</div>
		<div class="col-md-3 col-sm-6 col-xs-12">

			<h3 class="text-center">
				<i class="fa fa-code fa-3x text-muted"></i><br>
				Frontend
			</h3>
			<p>I am fluent in HTML, CSS and jQuery. I'm dabbeling with JS & frontend MVC frameworks.</p>


		</div>
		<div class="col-md-3 col-sm-6 col-xs-12">


			<h3 class="text-center">
				<i class="fa fa-cog fa-3x text-muted"></i><br>
				Backend
			</h3>
			<p>
				I work on the LAMP stack. CakePHP has been my go-to framework the last 5 years.
			</p>

		</div>
	</div>
</div>
</section>


<?php
/**********************************************************************
 * DESIGN PORTFOLIO
 * ****************************************************************** */
if (isset($this->data->designs)) :
?>

<section id="portfolio">
<div class="container">

	<h1>Some of my work</h1>


	<div class="row">
		<?php
		$counter=0;
		foreach ($this->data->designs as $design) :
			$counter++;
		?>

		<div class="col-md-6 col-sm-6 col-xs-12">

			<div class="browser">
				<div class="chrome">
					<div class="buttons">
						<div class="exit"></div>
						<div class="minimize"></div>
						<div class="maximize"></div>
					</div>
					<a href="<?php echo $design['url'] ?>" class="address-bar"><?php echo $design['url'] ?></a>
				</div>
				<div class="viewport">

					<div class="owl-carousel">
					<?php
					foreach ($design['media'] as $media) {
						echo "<div><img data-src='$media' class='lazyOwl'></div>";
					}
					 ?>
					</div>

				</div>
			</div>

			<h4 class="pull-right text-right">
				<small>client</small><br>
				<?php echo $design['client']; ?>
			</h4>

			<h4>
				<small>project</small><br>
				<?php echo $design['project_name']; ?>
			</h4>

			<?php echo $design['description']; ?>

			<p>
			<a href="<?php echo $design['url']; ?>" target="_blank" class="btn btn-primary btn-sm">visit</a>
			</p>

		</div>
		<?php
		if ($counter==2) {
			$counter=0;
			echo '<div class="clearfix"></div>';
		}
		endforeach;
		?>
	</div>



</div>
</section>
<?php endif; ?>


<?php
/**********************************************************************
 * OPEN SOURCE WORK / CODE PORTFOLIO
 * ****************************************************************** */
if (isset($this->data->repos)) :
?>

<section id="github" class="success">
<div class="container">


	<div class="page-header">
		<h1>My Open Source Projects</h1>
	</div>


	<div class="row">
		<?php
		$counter=0;
		foreach ($this->data->repos as $repo) :
			$counter++;
		?>
		<div class="col-md-4  col-sm-4 col-xs-12">

			<h4>
				<a href="<?php echo $repo['html_url'] ?>" target="_blank" class="ellipse block" title="Browse the <?php echo $repo['name'] ?> repository"><?php echo $repo['name'] ?></a>
				<small><?php echo $repo['language'] ?></small>
			</h4>

			<p><?php echo $repo['description'] ?></p>

			<p>
			<small class="text-muted">
				<i class="fa fa-time"></i> Updated <?php echo timeAgo($repo['updated_timestamp']) ?> ago.&nbsp;

				<?php if ($repo['stargazers_count'] > 0) : ?>
					<a href="<?php echo $repo['html_url']; ?>/stargazers" target="_blank">
						<i class="fa fa-star"></i>
						<?php echo $repo['stargazers_count']; ?>
						stargazers.
					</a>&nbsp;
				<?php endif; ?>

				<?php if ($repo['forks'] > 0) : ?>
					<a href="<?php echo $repo['html_url']; ?>/network" target="_blank">
						<i class="fa fa-code-fork"></i>
						<?php echo $repo['forks']; ?>
						forks.
					</a>&nbsp;
				<?php endif; ?>

				<?php if ($repo['open_issues_count'] > 0) : ?>
					<a href="<?php echo $repo['html_url']; ?>/issues" target="_blank">
						<i class="fa fa-bug"></i>
						<?php echo $repo['open_issues_count']; ?>
						open issues.
					</a>&nbsp;
				<?php endif; ?>

			</small>
			</p>

		</div>
		<?php
		if ($counter==3) {
			$counter=0;
			echo '<div class="clearfix invisible-xs"></div>';
		}
		endforeach;
		?>

	</div>

	<p></p>
	<!-- Contributions -->
	<div class="page-header">
		<h4>Recently contributed to...</h4>
	</div>

	<div class="row">
		<?php
		$counter=0;
		foreach ($this->data->github_events as $repo) :
			$counter++;
		?>
		<div class="col-md-4  col-sm-4 col-xs-12">

			<h4>
				<a href="<?php echo $repo['homepage'] ?>" target="_blank" class="ellipse block" title="Browse the <?php echo $repo['name'] ?> repository"><?php echo $repo['name'] ?></a>
				<small><?php echo $repo['language'] ?></small>
			</h4>

			<p><?php echo $repo['description'] ?></p>

		</div>
		<?php
		if ($counter==3) {
			$counter=0;
			echo '<div class="clearfix invisible-xs"></div>';
		}
		endforeach;
		?>

		<div class="col-md-12">
			<a href="https://github.com/t1mmen/" target="_blank" class="btn btn-success">Browse more on Github</a>
		</div>
	</div>

</div>
</section>
<?php endif; ?>


<?php
/**********************************************************************
 * EMPLOYMENT HISTORY
 * ****************************************************************** */
if (isset($this->data->jobs)) :
 ?>

<section id="employment-history">
<div class="container">

	<div class="page-header">
		<h1>Employment history</h1>
	</div>

	<div class="row">
		<?php
		$counter = 0;
		foreach ($this->data->jobs as $job) :
		$counter++;
		?>

			<div class="col-md-4 col-sm-4 col-xs-6">
				<h4>
					<a href="<?php echo $job['url'] ?>" target="_blank"><?php echo $job['company'] ?></a>
					<br>
					<small><?php echo $job['timeframe']; ?></small>
				</h4>
				<p><?php echo $job['title'] ?></p>
			</div>

		<?php
		if ($counter==2) {
			$counter=0;
			echo '<div class="clearfix visible-xs"></div>';
		}
		endforeach;
		?>
	</div>


	<a href="http://www.linkedin.com/in/timmstokke" target="_blank" class="btn btn-primary">Learn more on LinkedIn</a>
	&nbsp;
	<p class="visible-xs"></p>
	<a href="#buzzwords" data-target=".buzzwords" class="js-expand btn btn-default" data-toggle="false">
		view my skills
	</a>

</div>
</section>

<section id="buzzwords" class="buzzwords animated hide">
<div class="container">

	<div class="row">

		<div class="col-md-12">

				<div class="page-header">
					<h3>
						Skills
					</h3>
				</div>

				<ul class="columns">

					<?php foreach ($this->data->skills as $skillGroup => $skillSet) : ?>

						<li><h5><?php echo $skillGroup; ?></h5></li>

						<?php foreach ($skillSet as $skill) : ?>
						<li>
							<a href="<?php echo $skill['url']; ?>" target="_blank"><?php echo $skill['title']; ?></a>
							<?php if (isset($skill['votes']) && $skill['votes'] > 0) :?>
								<abbr title="LinkedIn recommentations for this particular skill" class="badge badge-info">+<?php echo $skill['votes']; ?></abbr>
							<?php endif; ?>
						</li>
						<?php endforeach; ?>
					<?php endforeach; ?>

				</ul>

		</div>

	</div>
</div>
</section>
<?php endif; ?>

<?php
/**********************************************************************
 * TIMELINE
 * ****************************************************************** */
if (isset($this->data->timeline)) :
?>

<section id="timeline"  class="info">
<div class="container">

	<div class="page-header">
		<h1>Highlights</h1>
	</div>


	<div class="row">
		<div class="col-md-12">

			<ul class="timeline">
			<?php
			foreach ($this->data->timeline as $key => $timeline) :
				$class = 'timeline-node animated invisible';

				if (isset($timeline['extendedDescription'])) {
					$class .= ' has-extended-body';
				}
			?>

				<li class="<?php echo $class; ?> js-expand" data-target=".extended-body-<?php echo $key; ?>" data-toggle="true" data-hide-trigger="false" data-animation-in="flipInX" data-animation-out="flipOutX" >

					<div class="date">'<?php echo substr($timeline['year'], 2, 2); ?></div>

					<div class="body">
						<div class="connector"></div>
						<h5>
							<?php echo $timeline['title']; ?>
							<small><?php echo $timeline['year']; ?></small>
						</h5>
						<?php if (isset($timeline['description'])) : ?>
							<p><?php echo $timeline['description']; ?></p>
						<?php endif; ?>
					</div>

					<?php  if (isset($timeline['extendedDescription'])) : ?>
						<div class="extended-body extended-body-<?php echo $key; ?> animated hide">
							<div>
							<?php echo $timeline['extendedDescription'];  ?>
							</div>
						</div>
					<?php endif; ?>

				</li>

			<?php endforeach; ?>
			</ul>
		</div>
	</div>

</div>
</section>
<?php endif; ?>
