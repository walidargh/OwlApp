var React = require('react');
var ClientActions = require('../actions/ClientActions');
var UserStore = require('../stores/user');
var Modal = require('react-modal');
var LoginForm = require('./LoginForm');

var ReviewForm = React.createClass({
	getInitialState: function () {
		return {body: "", rating: 2, formIsOpen: false, modalIsOpen: false};
	},

	componentWillMount: function () {
		this.userListener = UserStore.addListener(this._onChange);
	},

	_onChange: function () {
		this.closeModal();
		this.closeForm();
		document.getElementByClassName("review-button").style.display = "block";
	},

	openModal: function () {
		this.setState({modalIsOpen: true});
	},

	closeModal: function () {
		this.setState({modalIsOpen: false});
	},

	openForm: function () {
		this.setState({formIsOpen: true});
	},

	closeForm: function (callback) {
		this.setState({formIsOpen: false, body: ""}, callback);
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
		this.closeForm();
	},

	ratingForm: function () {
	},

	reviewForm: function () {
		if (this.state.formIsOpen) {
			return (
				<form className="review-form" onSubmit={this.handleSubmit}>
					<label>Write a Review{this.props.businessName}</label>
					<textarea
						className="review-form-body"
						row={5}
						column={20} 
						onChange={this.handleBody} 
						value={this.state.body} 
					/>
				<input type="submit" value="Submit" onClick={this.handleSubmit}/>
			</form>
			);
		} 
	},

	identifyForm: function () {
		if (UserStore.currentUser()) {
			debugger
			this.openForm();
			debugger
			document.getElementsByClassName("review-button")[0].style.display = "none";
			debugger
		} else {
			this.openModal();
		}
	},

	render: function () {
		return (
			<div className="review-form-and-button">
				<button className="review-button" onClick={this.identifyForm}>Write A Review</button>
				{this.reviewForm()}
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}>
					<LoginForm formType="Log In"/>
				</Modal>
			</div>
		);
	}
});

module.exports = ReviewForm;
