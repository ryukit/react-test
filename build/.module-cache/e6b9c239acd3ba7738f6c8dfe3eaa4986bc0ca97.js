/** @jsx React.DOM */

var SubMessage = React.createClass({displayName: "SubMessage",

    handleDelete: function(e) {
        this.props.onDelete(this.props.message);
    },

    propTypes: {
        message: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            message: 'Good Job'
        }
    },

    render: function() {
        return (
            React.createElement("div", null, 
            React.createElement("b", null, this.props.message), 
        React.createElement("button", {onClick: this.handleDelete, className: "btn btn--delete"}, "x")
            )
        );
    }
});
