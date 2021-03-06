/** @jsx React.DOM */

var Dashboard = React.createClass({

    loadData: function(url) {
        return $.get('https://test-desk.firebaseio.com/' + url + '/.json');
    },

    setData: function(url) {
        $.get('https://test-desk.firebaseio.com/').ref(url).set({
            username: 'lol',
            email: 'osoos',
            profile_picture : 'urlsss'
        });
    },

    componentWillMount: function() {
        //debugger;
    },

    componentDidMount: function() {
        //debugger;
        this.loadData(this.props.url).then(function(data) {
            this.setState({
                metric: data
            });
            $('#tip').tooltip();
        }.bind(this));
    },

    componentWillReceiveProps: function(nextProps) {
        var lastUrl = this.props.url;
        this.loadData(nextProps.url).then(function (data) {
            this.setState({
                lastRoute: lastUrl,
                metric: data
            });
        }.bind(this));
        //debugger;
    },

    componentWillUnmount: function () {
        debugger;
        $('#tip').tooltip('destroy');
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return nextState.metric > 100;
    },

    getInitialState: function() {
        return {
            metric: 0,
            lastRoute: ''
        };
    },

    render: function() {
        return (
            <div className="jumbotron">
            {this.state.lastRoute}
        <a id="tip" href="#" data-toggle="tooltip" title="Hover!">Hover ME!</a>
        <h2>{this.state.metric}</h2>
        </div>
        );
    }

});

var dashComponent = React.renderComponent(
    <Dashboard url="metric" />,
    document.getElementById('content'),
    function() {
        console.log('after init');
    }
);
