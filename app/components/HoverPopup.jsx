import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import ExternalLink from 'app/components/ExternalLink';
import Select from 'react-select';
import * as actions from 'app/actions/actions';

// TODO: Eventually add authentication to be able to add connections?
// Or should we just tally how many times that connection has been submitted
// and only show ones over a certain threshold?
class HoverPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            selectValues: []
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        // const { currentProject, projects } = this.props;
        const { visible, point } = this.props.popup;

        if (this._elt) {
            const w = this._elt.offsetWidth;
            const h = this._elt.offsetHeight;

            let containerLeftOffset = 0;
            const containerTopOffset = 0;
            if ($('.content-container')) {
                containerLeftOffset = $('.content-container')[0].offsetLeft;
            }

            // Defualt puts the popup to the upper left of the cursor
            if (point && visible) {
                let left = `${point.x + -w + containerLeftOffset}px`,
                    top = `${point.y - h}px`;

                // If the cursor is closer to the edge than the width of the
                // popup, move popup to right of cursor
                if (point.x < w) {
                    left = `${point.x + containerLeftOffset}px`;
                }

                // Same with y, but move to bottom of cursor
                if (point.y < h) {
                    top = `${point.y + containerTopOffset}px`;
                }

                this._elt.style.left = left;
                this._elt.style.top = top;
            }
            this._elt.style.visibility = visible ? 'visible' : 'hidden';
        }

        // set editing to false if we've hovered off a project
        const prevProject = prevProps.popup.currentProject;
        const { currentProject } = this.props.popup;
        if (prevProject !== '' && currentProject === '') {
            // We've hovered off a project, so set editing to false
            // XXX: This has a bad smell...
            this.setState({         // eslint-disable-line
                editing: false
            });
        }
    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({
            editing: true
        });
    }

    handleSelectChange(value) {
        console.log(value);
        this.setState({
            selectValues: value
        });
    }

    cancelEdit(e) {
        e.preventDefault();
        this.setState({
            editing: false
        });
    }

    handleSubmit(e) {
        const { selectValues } = this.state;
        const { dispatch, popup } = this.props;
        const { currentProject } = popup;
        e.preventDefault();
        const updates = {
            connections: selectValues.map((val) => { return val.value; })
        };
        dispatch(actions.updateProject(currentProject, updates));
    }

    render() {
        const { popup, projects } = this.props;
        // const { visible, currentProject, point } = popup;
        const { currentProject } = popup;
        const prj = projects[currentProject];
        const self = this;

        // If projects haven't loaded yet, we just render an empty div
        if (!prj) {
            return <div />;
        }

        const renderContent = () => {
            const { editing, selectValues } = this.state;
            const options = Object.keys(projects).filter((key) => {
                if (prj.category === projects[key].category) {
                    return true;
                }
                return false;
            }).map((key) => {
                return { value: projects[key]._id, label: projects[key].name };
            });
            if (editing) {
                return (
                    <div>
                        <h1>Edit Entry</h1>
                        <p>Add up to 5 connections</p>
                        <Select
                            name='form-field-name'
                            value={selectValues}
                            options={options}
                            onChange={this.handleSelectChange}
                            multi
                        />
                        <button onClick={this.handleSubmit}>Submit</button>
                        <button onClick={this.cancelEdit}>Cancel</button>
                    </div>
                );
            }

            return (
                <div>
                    <h2>{prj && prj.name}</h2>
                    <ExternalLink dest={prj && prj.link}>Website</ExternalLink>
                    <div className='hover-section'>
                        <h4>About&nbsp;</h4>
                        <p>{prj && prj.shortDesc}</p>
                    </div>
                    <div className='hover-section'>
                        <h4>Keywords</h4>
                        <p>{prj && prj.keywords.join(', ')}</p>
                    </div>
                    {/* <button title='Save project for later'>+</button> */}
                    <button className='edit-project' title='edit' onClick={self.handleEdit}>Edit</button>
                </div>
            );
        };
        return (
            <div id='hover-popup' ref={(c) => { self._elt = c; }}>
                {renderContent()}
            </div>
        );
    }
}

HoverPopup.propTypes = {
    popup: React.PropTypes.object.isRequired,
    projects: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect((state) => {
    return {
        popup: state.popup,
        projects: state.projects
    };
})(HoverPopup);
