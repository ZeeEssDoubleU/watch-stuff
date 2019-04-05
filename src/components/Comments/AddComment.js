import React from "react";
import { Image, Form, TextArea } from "semantic-ui-react";

import "./AddComment.scss";

const AddComment = props => (
	<div className="add-comment">
		<Image
			className="user-image"
			src="https://via.placeholder.com/48x48"
			circular
		/>
		<Form>
			<TextArea
				autoHeight
				rows={1}
				placeholder="Add a public comment..."
			/>
		</Form>
	</div>
);

export default AddComment;
