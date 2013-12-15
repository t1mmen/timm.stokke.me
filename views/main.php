<?php
/**********************************************************************
 * INTRO
 * ****************************************************************** */
 ?>
<section class="primary" id="intro" style="padding-top: 50px;">
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

			<a href="#contact" class="btn btn-success">Let's talk</a>


		</div>
	</div>


</div>
</section>

<?php
/**********************************************************************
 * SKILLS OVERVIEW
 * ****************************************************************** */
 ?>
<section class="outlined" id="ido">
<div class="container">

	<div class="page-header">
		<h1>I do...</h1>
	</div>

	<div class="row">

		<div class="col-md-3 col-sm-6 col-xs-12">


			<h3>
				<i class="fa fa-lightbulb-o fa-2x text-muted"></i><br>
				Concepts
			</h3>

			<p>From a napkin drawing to interactive mockups, I work efficiently in the idea & lo-fi phase.</p>


		</div>

		<div class="col-md-3 col-sm-6 col-xs-12">


			<h3>
				<i class="fa fa-eye fa-2x text-muted"></i><br>
				Design
			</h3>
			<p>User interface & experience design for web application, websites & mobile apps.</p>


		</div>
		<div class="col-md-3 col-sm-6 col-xs-12">

			<h3 class="center-block">
				<i class="fa fa-code fa-2x text-muted"></i><br>
				Frontend
			</h3>
			<p>I am fluent in HTML, CSS and jQuery. I'm dabbeling with JS & frontend MVC frameworks.</p>


		</div>
		<div class="col-md-3 col-sm-6 col-xs-12">


			<h3>
				<i class="fa fa-cog fa-2x text-muted"></i><br>
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

<section id="designs">
<div class="container">

	<div class="page-header">
		<h1>Some of my designs</h1>
	</div>


	<div class="row">
		<?php foreach ($this->data->designs as $design) : ?>

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
						echo "<div><img src='$media' data-src='$media' class='lazyOwl'></div>";
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
			<a href="<?php echo $design['url']; ?>" target="_blank" class="btn btn-primary">visit</a>
			</p>

		</div>

		<?php endforeach; ?>
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

<section id="github">
<div class="container">

	<div class="page-header">
		<h1>Recent Open Source Work</h1>
	</div>


	<div class="row">
		<?php foreach ($this->data->repos as $repo) : ?>
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
		<?php endforeach; ?>
	</div>

	<div class="row">
		<div class="col-md-12">
			<p>
				<a href="https://github.com/t1mmen/" target="_blank" class="btn btn-primary">Browse more on Github</a>
			</p>
		</div>
	</div>

</div>
</section>
<?php endif; ?>


<?php
/**********************************************************************
 * EMPLOYMENT HISTORY
 * ****************************************************************** */
 ?>

<section id="employment-history" class="green">
<div class="container">

	<div class="page-header">
		<h1>Employment history</h1>
	</div>

	<div class="row">

		<div class="col-md-4 col-sm-4 col-xs-6">
			<h4>
				<a href="http://colours.no" target="_blank">Colours AS</a>
				<br>
				<small>2011 – now</small>
			</h4>
			<p>UI & UX Designer</p>
		</div>

		<div class="col-md-4 col-sm-4 col-xs-6">
			<h4>
				<a href="http://colours.no" target="_blank">Colours AS</a>
				<br>
				<small>2007 – 2011</small>
			</h4>
			<p>Senior Developer</p>
		</div>

		<div class="col-md-4 col-sm-4 col-xs-6">
			<h4>
				<a href="http://web.archive.org/web/20071010142639/http://www.aspekt.no/"  target="_blank">Aspekt AS</a>
				<br>
				<small>2002 – 2007</small>
			</h4>
			<p>Partner, Lead Developer</p>
		</div>

	</div>

	<div class="row">
		<div class="col-md-12">
			<p>
				<a href="http://www.linkedin.com/in/timmstokke" target="_blank" class="btn btn-primary">Learn more on LinkedIn</a>
			</p>
		</div>
	</div>

</div>
</section>
