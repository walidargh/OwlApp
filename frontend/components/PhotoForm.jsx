var React = require('react');
var ClientActions = require('../actions/ClientActions');
var UserStore = require('../stores/user');
var BusinessStore = require('../stores/business');
var Modal = require('react-modal');
var LoginForm = require('./LoginForm');

var customStyles = {
	overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)',
    zIndex 					  : 1000
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    outline								: '#ccc',
    marginRight           : '-50%',
    borderRadius          : '10px',
    transform             : 'translate(-50%, -50%)'
  }
};

var PhotoForm = React.createClass({
	getInitialState: function () {
		return ({modalIsOpen: false});
	},

	componentWillMount: function () {
		this.userListener = UserStore.addListener(this._onChange);
	},

	openModal: function () {
		this.setState({modalIsOpen: true});
	},

	closeModal: function () {
		this.setState({modalIsOpen: false});
	},

	_onChange: function () {
		if (UserStore.errors().length === 0 &&
				BusinessStore.errors().length === 0) {
      this.closeModal();
    }
		this.closeModal();
	},

	uploadPhoto: function (event) {
		event.preventDefault();
		var self = this;
		if (UserStore.currentUser()) {
			cloudinary.openUploadWidget(
				window.CLOUDINARY_OPTIONS, 
				function (error, photos ) {
					if (error === null) {
						var photo = {url: photos[0].url, business_id: self.props.businessId};
						ClientActions.uploadPhoto(photo);
					}
				});
		} else {
			self.openModal();
			}
	}, 

	render: function() {
		return (

			<div className="photo-button">

				<div className="button-wrapper">
					<button onClick={this.uploadPhoto}>Upload Photo</button>
				</div>

				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					>
					<LoginForm formType="Log In"/>
				</Modal>
				
			</div>
		);
	}

});

module.exports = PhotoForm;
