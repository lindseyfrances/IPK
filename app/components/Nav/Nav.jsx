/* eslint
    "class-methods-use-this": "off"
    */
import React from 'react';
import { Link } from 'react-router';
import { ROUTER_PATHS } from 'app/constants/CONSTANTS';
import Logo from 'app/components/SimpleElements/Logo';

const Nav = props => {
    function createClassName(path) {
        // XXX: dumb check - only checking if active path is contained in the larger
        // url string.  Could lead to problems if the app is to grow, but for
        // now it works.
        if (props.activePath.indexOf(path) !== -1) {
            return 'nav-item active';
        }
        return 'nav-item';
    }

    return (
        <div className='nav'>
            <Link to={ROUTER_PATHS.HOME}><h1>NO FREE LUNCH</h1></Link>
            <div className='nav-items'>
                <Link className={createClassName(ROUTER_PATHS.LEARN)} to={ROUTER_PATHS.LEARN}>Learn</Link>
                <Link className={createClassName(ROUTER_PATHS.EXPLORE)} to={ROUTER_PATHS.EXPLORE}>Explore</Link>
                <Link className={createClassName(ROUTER_PATHS.GETINVOLVED)} to={ROUTER_PATHS.GETINVOLVED}>Get Involved</Link>
            </div>
        </div>
    );
};

Nav.defaultProps = {
    activePath: '/'
};

Nav.propTypes = {
    activePath: React.PropTypes.string
};

export default Nav;
