import React from "react";
import PropTypes from "prop-types";
import { Image, Form, TextArea } from "semantic-ui-react";

import "./AddComment.scss";

const AddComment = props => (
	<div className="add-comment">
		<Image
			className="user-image"
			src="http://via.placeholder.com/48x48"
			circular
		/>
		<Form>
			<TextArea autoHeight rows={1} placeholder="Add a public comment..." />
		</Form>
	</div>
);

AddComment.propTypes = {};

export default AddComment;
