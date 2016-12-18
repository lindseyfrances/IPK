/* eslint
    "class-methods-use-this": "off"
*/
import React from 'react';
import { connect } from 'react-redux';
import FilterList from 'app/components/Nav/FilterList';
import { setBottomNavContent, clearBottomNavContent } from 'app/actions/actions';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            open: false
        };
    }

    componentDidUpdate() {
        // const { categories } = this.props;
    }


    handleClick(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        if (this.state.open) {
            dispatch(clearBottomNavContent());
        } else {
            dispatch(setBottomNavContent('filter'));
        }
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        // const { categories } = this.props;
        return (
            <p onClick={this.handleClick}>Filter</p>
            );
    }
}

Filter.propTypes = {
    // categories: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(
    // state => ({ categories: state.categories })
)(Filter);
