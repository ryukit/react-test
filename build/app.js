(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

//var React = require('react');
//var SubMessage = require('./SubMessage');
var MessageBox = React.createClass({displayName: 'MessageBox',

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
            return SubMessage({message: message, onDelete: this.deleteMessage});
        }.bind(this));

        return (
            React.DOM.div({className: "container", style: inlineStyles}, 
                React.DOM.h2(null, "Hello World"), 
                React.DOM.input({type: "text", className: "js-input"}), 
                React.DOM.button({className: "btn btn--primary", onClick: this.handleAdd}, "Add"), 
                messages 
            )
        );
    }
});

var SubMessage = React.createClass({displayName: 'SubMessage',

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
            React.DOM.div(null, 
                React.DOM.b(null, this.props.message), 
                React.DOM.button({onClick: this.handleDelete, className: "btn btn--delete"}, "x")
            )
        );
    }
});

var reactComponent = ReactDOM.render(
    MessageBox(null),
    document.getElementById('root')
);

},{}]},{},[1]);
