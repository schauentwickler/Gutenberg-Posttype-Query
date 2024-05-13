import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';

registerBlockType('my-plugin/latest-dflip', {
	title: 'Latest DFlip Post',
	icon: 'book-alt',
	category: 'widgets',

	edit: () => {
		const latestPost = useSelect(select => {
			// کوئری برای دریافت آخرین پست از نوع پست 'dflip'
			const query = {
				per_page: 1, // فقط آخرین پست
				orderby: 'date',
				order: 'desc',
				status: 'publish'
			};
			return select('core').getEntityRecords('postType', 'dflip', query);
		}, []);

		// نمایش چرخاننده (spinner) تا زمان بارگذاری پست
		if (!latestPost || latestPost.length === 0) {
			return <Spinner />;
		}

		// نمایش عنوان و محتوای پست
		const post = latestPost[0];
		return (
			<div style={{ textAlign: 'center' }}>
				<h2>{post.title.rendered}</h2>
				<div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
			</div>
		);
	},

	save: () => {
		// از آنجا که این بلوک دینامیک است، تابع save باید null برگرداند.
		return null;
	},
});
