var React = require('react');
var ClientActions = require('../actions/ClientActions');

var ReviewForm = React.createClass({
	getInitialState: function () {
		return {body: "", rating: 2};
	},

	handleBody: function (event) {
		this.setState({body: event.target.value});
	},

	handleRating: function (event) {
		this.setState({rating: event.target.value});
	},

	handleSubmit: function (event) {
		event.preventDefault();
		var review = {body: this.state.body, 
									rating: this.state.rating, 
									business_id: this.props.businessId};
		ClientActions.createReview(review);
	},

	ratingForm: function () {
	},

	render: function () {
		debugger
		return (
			<form className="review-form" onSubmit={this.handleSubmit}>
				<label>Write a Review for {this.props.businessName}</label>
				<input 
					type="textbox" 
					onChange={this.handleBody} 
					value={this.state.body} 
				/>
				<input type="submit" value="Submit" onClick={this.handleSubmit}/>
			</form>
		);
	}
});

module.exports = ReviewForm;