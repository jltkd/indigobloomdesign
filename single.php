<?php get_header(); ?>
<div id="content">
		<div id="scroll-pane">
			<div class="left mask"></div>
			<div class="right mask"></div>
			<div id="scroll-content">
				<ul id="elements">
					<li>
						<img src="<?php the_field('first_image_above_initial_content'); ?>" alt="" />
						<h2><span><?php the_field('project_title'); ?></span></h2>
						<p><?php the_field('project_content'); ?></p>
						<p class="capabilities"><span>CAPABILITIES:</span> <?php the_field('capabilities'); ?></p>
					</li>
					<li>
						<div class="shim"><img src="<?php the_field('product_image'); ?>" alt="" /></div>
						<?php if (get_field('product_image_caption')) : ?><p><i><?php the_field('product_image_caption'); ?></i></p><?php endif; ?>
					</li>
					<li>
						<div class="shim"><img src="<?php the_field('additional_image'); ?>" alt="" /></div>
						<?php if (get_field('additional_image_caption')) : ?><p><i><?php the_field('additional_image_caption'); ?></i></p><?php endif; ?>
					</li>
					<?php if (get_field('additional_image_two') ) : ?>
					<li>
						<div class="shim"><img src="<?php the_field('additional_image_two'); ?>" alt="" /></div>
						<?php if (get_field('additional_image_two_caption')) : ?><p><i><?php the_field('additional_image_two_caption'); ?></i></p><?php endif; ?>
					</li>
					<?php endif; ?>
				</ul>
			</div>
		</div>
		<div id="slider-wrap">
			<p>Use slider or mousewheel to scroll</p>
			<div id="slider"></div>
		</div>
		<?php if (get_field('project_details') ) : ?>
			<div id="project-details">
				<span class="opener">Project Details</span>
				<div class="tabs">
					<?php the_field('project_details'); ?>
					<span class="closer">Close Project Details</span>
				</div>
			</div>
		<?php endif; ?>
	</div>
	<?php get_footer(); ?>