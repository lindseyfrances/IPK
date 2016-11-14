/* eslint
    "react/no-string-refs": "off"
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'app/actions/actions';

class AddItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            name: '',
            category: 'none',
            street: '',
            city: '',
            state: '',
            zip: '',
            connections: []
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleStreetChange = this.handleStreetChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleZipChange = this.handleZipChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);

        this.connectionsRefs = [];
        this.connections = [];
    }

    componentDidUpdate() {
        //let { categories } = this.props;
        console.log(this.state);
    }

    onFormSubmit(e) {
        e.preventDefault();
        const { dispatch, handleCloseForm } = this.props;
        const { name, category, street, city, state, zip } = this.state;
        const connections = Object.keys(this.refs).map((ref) => {
            return this.refs[ref].value;
        }).filter((val) => {
            if (val !== 'None') {
                return true;
            }
            return false;
        });

        const data = {
            name,
            category,
            address: `${street} ${city} ${state} ${zip}`,
            connections
        };

        dispatch(actions.startAddItem(data));

        // Form validation
        // Get items off state
        handleCloseForm(e);
    }

    handleNameChange(event) {
        console.log(event.target.value);
        this.setState({
            name: event.target.value
        });
    }

    handleCategoryChange(event) {
        console.log(event.target.value);
        this.setState({
            category: event.target.value
        });
    }

    handleStreetChange(event) {
        console.log(event.target.value);
        this.setState({
            street: event.target.value
        });
    }

    handleCityChange(event) {
        console.log(event.target.value);
        this.setState({
            city: event.target.value
        });
    }

    handleStateChange(event) {
        console.log(event.target.value);
        this.setState({
            state: event.target.value
        });
    }

    handleZipChange(event) {
        console.log(event.target.value);
        this.setState({
            zip: event.target.value
        });
    }

    // TODO: Add description textarea input
    render() {
        const { projects, categories, handleCloseForm } = this.props;

        const renderSelectElements = function(numMaxConnections) {
            const arr = [];
            // let counter = 0;
            for (let i = 0; i < numMaxConnections; i++) {
                arr.push(
                    <select id={`select-group-${i}`} key={`select-group-${i}`} ref={`select-group-${i}`}>
                        <option>None</option>
                        {Object.keys(projects).map((key) => {
                            const prj = projects[key];
                            return <option key={prj.id} >{prj.name}</option>;
                        })}
                    </select>
                );
            }
            return arr;
        };

        return (
            <div className='add-item-form'>
                <form onSubmit={this.onFormSubmit}>
                    <label htmlFor='item-name'>Organization or Project Name</label>
                    <input id='item-name' value={this.state.name} onChange={this.handleNameChange} placeholder='Organization/Project Name' />

                    <label htmlFor='item-cat'>Category</label>
                    <select id='item-cat' value={this.state.category} onChange={this.handleCategoryChange}>
                        <option value='none'>Select A Category</option>
                        {Object.keys(categories).map((cat) => {
                            return <option key={`${cat}-select-option`} value={cat}>{cat}</option>;
                        })}
                    </select>

                    <label htmlFor='item-address-street'>Address</label>
                    <input id='item-address-street' value={this.state.street} onChange={this.handleStreetChange} type='text' placeholder='Street' />
                    <input id='item-address-city' value={this.state.city} onChange={this.handleCityChange} type='text' placeholder='City' />
                    <input id='item-address-state' value={this.state.state} onChange={this.handleStateChange} type='text' placeholder='State' />
                    <input id='item-address-zip' value={this.state.zip} onChange={this.handleZipChange} type='text' placeholder='Zip' />

                    <label htmlFor='select-group-0'>Add up to 5 connections</label>
                    {renderSelectElements(5)}

                    <div className='row'>
                        <button type='submit'>Submit</button>
                        <button onClick={handleCloseForm}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

AddItemForm.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    projects: React.PropTypes.object.isRequired,
    categories: React.PropTypes.object.isRequired,
    handleCloseForm: React.PropTypes.func.isRequired
};

export default connect((state) => {
    return {
        projects: state.projects,
        categories: state.categories
    };
})(AddItemForm);
