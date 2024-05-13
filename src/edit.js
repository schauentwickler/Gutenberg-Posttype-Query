import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Spinner } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit() {
	// Fetch posts using the 'useSelect' hook from the 'core' data store.
	const posts = useSelect(select => {
		return select('core').getEntityRecords('postType', 'dflip', {
			per_page: 1,  // Number of posts to show
			orderby: 'date',
			order: 'desc'
		});
	}, []);

	return (
		<>

			<div style={{ textAlign: 'center' }} className="wp-block-greenshift-blocks-container gspb_container">
				{posts === null ? (
					<Spinner />
				) : (
					posts.map(post => (
						<div key={post.id}>
							{/* Here you would render the post data, assuming dFlip supports a way to render via React */}
							<h1>Hello</h1>
						</div>
					))
				)}
			</div>
		</>
	);
}
