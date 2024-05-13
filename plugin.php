<?php
/**
 * Plugin Name:       SCHAU UND HORCH
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Hamid Safari
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       schauundhorch
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */

 function render_latest_dflip_block() {
    $args = array(
        'post_type'      => 'dflip',
        'post_status'    => 'publish',
        'posts_per_page' => 1,
        'orderby'        => 'date',
        'order'          => 'DESC',
    );
    $query = new WP_Query($args);

    $output = '<div '.get_block_wrapper_attributes().' style="text-align: center;">';

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $output .= do_shortcode('[dflip id="' . get_the_ID() . '" type="thumb"][/dflip]');
        }
    } else {
        $output .= 'No posts found.';
    }

    wp_reset_postdata();

    $output .= '</div>';

    return $output;
}

register_block_type('my-plugin/latest-dflip', array(
    'render_callback' => 'render_latest_dflip_block'
));


function create_block_boilerplate_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'create_block_boilerplate_block_init' );
