var config = {
    apiKey: "AIzaSyDA_wcmIwJ0uciV_wPrIpFYE_-J0RXal74",
    authDomain: "feeds-ee857.firebaseapp.com",
    databaseURL: "https://feeds-ee857.firebaseio.com",
    storageBucket: "feeds-ee857.appspot.com",
    messagingSenderId: "425863286402"
};
firebase.initializeApp(config);


var FeedItem = React.createClass({

    vote: function(newCount) {
        this.props.onVote({
            key: this.props.id,
            id: this.props.id,
            title: this.props.title,
            description: this.props.desc,
            voteCount: newCount
        });
    },

    voteUp: function() {
        var count = parseInt(this.props.voteCount, 10);
        var newCount = count + 1;
        this.vote(newCount);
    },

    voteDown: function () {
        var count = parseInt(this.props.voteCount, 10);
        var newCount = count - 1;
        this.vote(newCount);
    },

    render: function() {
        var positiveNegativeClassName = this.props.voteCount >= 0 ?
            'material-icons mdl-badge mdl-badge--overlap itemList-fuctional-value positive' :
            'material-icons mdl-badge mdl-badge--overlap itemList-fuctional-value negative';
        var styles = {
            color: '#fff',
            height: '200px',
            background: 'rgb(0,150,136) url(' + this.props.image + ') center / cover'
        };
        return (
            <div key={this.props.id} id={this.props.id} className="mdl-card mdl-shadow--2dp itemList-item">
                <div className="mdl-card__title" style={styles}>
                    <h2 className="mdl-card__title-text">{this.props.title}</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    {this.props.desc}
                </div>
                <div className="mdl-card__actions mdl-card--border itemList-fuctional">
                    <div data-badge={this.props.voteCount} className={positiveNegativeClassName}>thumbs_up_down</div>
                    <div className="itemList-fuctional-button">
                        <button id="up" className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onClick={this.voteUp}>
                            <i className="material-icons">exposure_plus_1</i>
                        </button>
                        <button id="down" className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onClick={this.voteDown}>
                            <i className="material-icons">exposure_neg_1</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

});

var FeedList = React.createClass({
    render: function() {

        var feedItems = this.props.items.map(function(item) {
            return <FeedItem
                key={item.key}
                id={item.id}
                title={item.title}
                image={item.image}
                desc={item.description}
                voteCount={item.voteCount}
                onVote={this.props.onVote}
            />
        }.bind(this));

        return (
            <div className="itemList">
                <div className="mdl-spinner mdl-js-spinner is-active itemList-spinner"></div>
                {feedItems}
            </div>
        );
    }
});

var FeedForm = React.createClass({

    imageUploaded: function() {
        var preview = document.getElementById('imageLoad');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.value = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    },

    handleForm: function(e) {
        e.preventDefault();
        var imageData = this.refs.image.value;
        var newItem = {
            title: this.refs.title.value,
            description: this.refs.desc.value,
            image: imageData,
            voteCount: 0,
        };

        this.refs.feedForm.reset();
        this.props.onNewItem(newItem);
    },

    render: function() {
        var display = this.props.displayed ? '30px' : '-350px';
        var styles = {
            right: display
        };
        return (
            <div className="mdl-card mdl-shadow--2dp feedForm" style={styles}>
                <div className="mdl-card__supporting-text">
                    <form ref="feedForm" action="#" onSubmit={this.handleForm}>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="title" type="text" className="mdl-textfield__input" id="sample1" />
                            <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="desc" type="text" className="mdl-textfield__input" id="sample2" />
                            <label className="mdl-textfield__label" htmlFor="sample2">Description</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--file">
                            <input className="mdl-textfield__input" placeholder="File" type="text" id="uploadFile" readOnly />
                            <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                                <i className="material-icons">attach_file</i><input type="file" id="uploadBtn" onChange={this.imageUploaded} />
                            </div>
                        </div>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" id="fileLoad">
                            Add
                        </button>
                        <input ref="image" type="hidden" id="imageLoad" className="is-hidden"/>
                    </form>
                </div>
            </div>
        );
    }
});

var ShowAddButton = React.createClass({
    render: function() {

        var classString, buttonText;

        if(this.props.displayed) {
            classString = 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored addComment';
            buttonText = 'clear';
        } else {
            classString = 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored addComment success';
            buttonText = 'add';
        }

        return (
            <button className={classString} onClick={this.props.onToggleForm}>
                <i className="material-icons">{buttonText}</i>
            </button>
        );
    }
});

var PageIntro = React.createClass({

    loadData: function() {
        //var ref = new firebase.database().ref('intro-image/');
        //ref.on('value', function(snapshot) {
        //    var getImage = {
        //        image: snapshot.val()
        //    };
        //
        //    this.setState({
        //        image: getImage
        //    });
        //
        //}.bind(this));
    },

    componentDidMount: function() {
        //this.loadData();
    },

    getInitialState: function() {
        return {
            image: "1"
        }
    },

    render: function() {
        return (
            <button className="lol">
                {this.state.image}
                <i className="material-icons">item</i>
            </button>
        );
    }
});

var Feed = React.createClass({

    loadData: function() {
        var ref = new firebase.database().ref('feed/');
        ref.on('value', function(snapshot) {
            var items = [];
            var sorted = [];

            snapshot.forEach(function(itemSnap) {
                var item = itemSnap.val();
                item.key = itemSnap.getKey();
                item.id = itemSnap.getKey();
                items.push(item);
            });

            sorted = _.sortBy(items, function(item) {
                return -item.voteCount;
            });

            this.setState({
                items: sorted
            });
        }.bind(this));
    },

    componentDidMount: function() {
        this.loadData();
    },

    getInitialState: function() {
        return {
            items: [],
            formDisplayed: false,
        }
    },

    onToggleForm: function() {
        this.setState({
            formDisplayed: !this.state.formDisplayed
        });
    },

    onNewItem: function(newItem) {
        var ref = new firebase.database().ref('feed/');
        ref.push(newItem);
    },

    onVote: function(item) {
        var ref = new firebase.database().ref('feed/').child(item.id);
        ref.update(item);
    },

    render: function() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header pageHeader">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">HELLO</span>
                        <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} />
                    </div>
                    <FeedForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem} />
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Title</span>
                    <nav className="mdl-navigation">
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <section className="introImage">
                            <PageIntro image={this.state.image} />
                        </section>
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    <FeedList items={this.state.items} onVote={this.onVote} />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <footer className="footerCopy">
                    Made By RyuKit
                </footer>
            </div>
        );
    }
});

var feedComponent = ReactDOM.render(
    <Feed />,
    document.getElementById('root')
);


if ( ! ( typeof ( componentHandler ) == undefined ) ) {
    componentHandler.upgradeAllRegistered();
}

document.getElementById("uploadBtn").onchange = function () {
    document.getElementById("uploadFile").value = this.files[0].name;
};
