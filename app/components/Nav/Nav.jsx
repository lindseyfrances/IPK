/* eslint
    "class-methods-use-this": "off"
 */
import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const { open } = this.state;
        const activeClsName = 'is-active';

        const renderNavItems = () => {
            if (open) {
                return [
                    {title: 'Home', url: '/'},
                    {title: 'Learn', url: 'learn'},
                    {title: 'Explore', url: 'explore'},
                    {title: 'Get Involved', url: 'get-involved'}
                ].map(item => <Link className='nav-item' to={item.url} key={item.title}><h1>{item.title}</h1></Link>);
            } else {
                return <h1>{this.props.title}</h1>
            }
        }

        return (
            <div className='nav'>
                <h1>No Free Lunch</h1>
                <div className='nav-items'>
                    {renderNavItems()}
                </div>
                <button onClick={this.handleMenuClick} className={`menu hamburger hamburger--arrow ${open ? activeClsName : ''}`} type="button">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        );
    }
}

Nav.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default Nav;
