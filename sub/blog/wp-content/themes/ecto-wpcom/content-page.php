<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package Ecto
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'ecto' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<?php edit_post_link( __( 'Edit', 'ecto' ), '<footer class="entry-footer"><div class="entry-meta"><span class="edit-link">', '</span></div></footer>' ); ?>

</article><!-- #post-## -->
