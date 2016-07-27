import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'app/actions/actions';

class LayerCheckBox extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var { visibleLayers, dispatch, layerKey, toggled } = this.props;

        if (visibleLayers.indexOf(layerKey) === -1) {
            dispatch(actions.startAddVisibleLayer(layerKey));
        } else {
            dispatch(actions.removeVisibleLayer(layerKey));
        }
    }

    render() {
        var { visibleLayers, style, dispatch, name, layerKey, toggled } = this.props;

        var newStyle = {
            ...style,
            backgroundColor: visibleLayers.indexOf(layerKey) > -1 ? 'rgba(125,40, 230, 0.6)' : 'transparent'
        };
        
        return (
            <div style={newStyle} className='layer-checkbox' onClick={this.handleClick}>
                <p className='layer-name'>{name}</p>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        visibleLayers: state.visibleLayers
    };
})(LayerCheckBox);
