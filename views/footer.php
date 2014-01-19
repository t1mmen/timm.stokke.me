<?php
/**********************************************************************
 * CONTACT/FOOTER
 * ****************************************************************** */
 ?>
<section id="contact">
<div class="container">

	<div class="page-header">
		<h1>Get in touch</h1>
	</div>

	<div class="row">

		<?php if ($this->data->config['email']) : ?>
		<div class="col-md-3 col-sm-3 col-xs-6">

			<p>
				<a href="mailto:<?=$this->data->config['email']?>" class="btn btn-primary btn-block">
					<i class="fa fa-envelope fa-2x"></i><br>
					<span class="hidden-xs"><?=$this->data->config['email']?></span>
					<span class="visible-xs">email</span>
				</a>
			</p>
		</div>
		<?php endif; ?>

		<?php if ($this->data->config['linkedin_handle']) : ?>
		<div class="col-md-3 col-sm-3 col-xs-6">
			<p><a href="http://www.linkedin.com/in/<?=$this->data->config['linkedin_handle']?>" class="btn btn-primary btn-block" target="_blank"><i class="fa fa-linkedin fa-2x"></i><br> LinkedIn</a></p>
		</div>
		<?php endif; ?>

		<?php if ($this->data->config['github_username']) : ?>
		<div class="col-md-3 col-sm-3 col-xs-6">
			<p><a href="https://github.com/<?=$this->data->config['github_username']?>" class="btn btn-primary  btn-block" target="_blank"><i class="fa fa-github fa-2x"></i><br> Github</a></p>
		</div>
		<?php endif; ?>

		<?php if ($this->data->config['twitter_handle']) : ?>
		<div class="col-md-3 col-sm-3 col-xs-6">
			<p><a href="https://twitter.com/<?=$this->data->config['twitter_handle']?>" class="btn btn-primary  btn-block" target="_blank"><i class="fa fa-twitter fa-2x"></i><br>Twitter</a></p>
		</div>
		<?php endif; ?>
	</div>

</div>
</section>

<div class="text-center" style="padding-top: 50px;">
	<a class="btn btn-default" href="https://github.com/t1mmen/timm.stokke.me"><i class="fa fa-github"></i> site source</a>
</div>
