import React from 'react';
import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';

import * as actions from 'app/actions/actions';

import LayerCheckBox from 'app/components/LayerCheckBox';

class LayerList extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.getDefaultStyles = this.getDefaultStyles.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.willEnter = this.willEnter.bind(this);
        this.willLeave = this.willLeave.bind(this);

    }
    componentDidMount() {
        var { dispatch } = this.props;

        this.filteredProjects = [];


    }

    componentDidUpdate() {
        var { layers } = this.props;
    }

    handleClick() {
        var { title, dispatch } = this.props;
        dispatch(actions.toggleLayerList(title));
    }

    getDefaultStyles() {
        var { title, layerLists } = this.props;
        var shouldShowChildren = layerLists[title];

        if (shouldShowChildren) {
            return items.map((item) => {
                return {
                    key: item,
                    data: item,
                    style: {
                        height: 0,
                        opacity: 0
                    }
                };
            });
        } else {
            return [];
        }
    }

    getStyles() {
        var { items, title, layerLists } = this.props;
        var shouldShowChildren = layerLists[title];

        if (shouldShowChildren) {
            return items.map((item) => {
                return {
                    key: item,
                    data: item,
                    style: {
                        height: spring(40),
                        opacity: spring(1)
                    }
                };
            });
        } else {
            return [];
        }
    }

    willEnter() {
        return {
            height: 0,
            opacity: 1
        };
    }

    willLeave() {
        return {
            height: spring(0),
            opacity: spring(0),
        };
    }

    render() {
        var { title, items, layerLists } = this.props;

        var shouldShowChildren = layerLists[title];


        var renderListItems = () => {
            if (items !== [] && shouldShowChildren) {
                return items.map((item) => {
                    return <LayerCheckBox name={item} layerKey={item} key={item} />;
                });
            }
        };

        return (
            <div className='layer-list' >
                <h2 onClick={this.handleClick}>{capitalizeFirstLetter(title)}</h2>
                <TransitionMotion
                    defaultStyles={this.getDefaultStyles()}
                    styles={this.getStyles()}
                    willEnter={this.willEnter}>
                    {styles => 
                            <div>
                                {styles.map( ({key, style, data}) => {
                                    return <LayerCheckBox style={style} name={data} layerKey={key} key={key} />;
                                })}
                            </div>
                    }
                </TransitionMotion>
                {/*{renderListItems()}*/}
            </div>
        );
    }
}

                                    //return <LayerCheckBox style={style} name={name} layerKey={key} key={key} />;
var capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export default connect((state) => {
    return {
        layerLists: state.layerLists
    };
})(LayerList);
