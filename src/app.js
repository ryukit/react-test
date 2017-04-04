/** @jsx React.DOM */

//var React = require('react');
//var SubMessage = require('./SubMessage');
var MessageBox = React.createClass({

    deleteMessage: function(message) {
        var newMessages = _.without(this.state.messages, message);
        this.setState({
            messages: newMessages
        });
    },

    handleAdd: function(e) {
        var newMessage = $('.js-input').val();
        console.log(newMessage)
        var newMessages = this.state.messages.concat([newMessage]);
        this.setState({
            messages: newMessages
        })
    },

    getInitialState: function() {
        return {
            isVisible: true,
            messages: [
                'I will',
                'break your ',
                'neck',
            ]
        }
    },

    render: function () {

        var inlineStyles = {
            display: this.state.isVisible ? 'block' : 'none'
        };

        var messages = this.state.messages.map(function(message){
            return <SubMessage message={message} onDelete={this.deleteMessage} />;
        }.bind(this));

        return (
            <div className="container" style={inlineStyles}>
                <h2>Hello World</h2>
                <input type="text" className="js-input" />
                <button className="btn btn--primary" onClick={this.handleAdd}>Add</button>
                { messages }
            </div>
        );
    }
});

var SubMessage = React.createClass({

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
            <div>
                <b>{this.props.message}</b>
                <button onClick={this.handleDelete} className="btn btn--delete">x</button>
            </div>
        );
    }
});

var reactComponent = ReactDOM.render(
    <MessageBox />,
    document.getElementById('root')
);
