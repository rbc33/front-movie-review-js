import React, { useState } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, useLocation } from "react-router-dom";

const AddReview = (props) => {
	const params = useParams();
	const location = useLocation();
	let initialReviewState = "";
	let editing = false; // means adding. if editing, set to true

	//check if 'state' is passed inde
	// if (props.location.state && props.location.state.currentReview) {
	// 	editing = true;
	// 	initialReviewState = props.location.state.currentReview.review;
	// }
	if (location.state && location.state.currentReview) {
		editing = true;
		initialReviewState = location.state.currentReview.review;
	}

	const [review, setReview] = useState(initialReviewState);
	const [submitted, setSubmitted] = useState(false);

	const onChangeReview = (e) => {
		const review = e.target.value;
		setReview(review);
	};

	const saveReview = () => {
		var data = {
			review: review,
			name: props.user.name,
			user_id: props.user.id,
			// movie_id: props.match.params.id, // get movie id direct from url
			movie_id: params.id, // get movie id direct from url
		};

		if (editing) {
			// get existing review id
			// data.review_id = props.location.state.currentReview._id;
			data.review_id = location.state.currentReview._id;
			MovieDataService.updateReview(data)
				.then((response) => {
					setSubmitted(true);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			MovieDataService.createReview(data)
				.then((response) => {
					setSubmitted(true);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	return (
		<div>
			{submitted ? (
				<div>
					<h4>Review submitted successfully</h4>
					{/* <Link to={"/movies/" + props.match.params.id}>Back to Movie</Link> */}
					<Link to={"/movies/" + params.id}>Back to Movie</Link>
				</div>
			) : (
				<Form>
					<Form.Group>
						<Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
						<Form.Control
							type="text"
							required
							value={review}
							onChange={onChangeReview}
						/>
					</Form.Group>
					<Button variant="primary" onClick={saveReview}>
						Submit
					</Button>
				</Form>
			)}
		</div>
	);
};

export default AddReview;
