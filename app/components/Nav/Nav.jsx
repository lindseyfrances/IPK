/* eslint
    "class-methods-use-this": "off"
    */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ROUTER_PATHS } from 'app/constants/CONSTANTS';
import Logo from 'app/components/SimpleElements/Logo';
import * as actions from 'app/actions/actions';

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
        this.lastScrollPos = 0;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate() {
        this.handleScroll();
    }

    handleScroll(e) {
        const { activePath, dispatch } = this.props;
        console.log('scroll handler');

        let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.lastScrollPos < 100 && scrollPos > 100) {
            dispatch(actions.closeNav());
            this.lastScrollPos = 200;
        } else if (this.lastScrollPos > 100 && scrollPos < 10){
            dispatch(actions.openNav());
            this.lastScrollPos = 0;
        }
    }


    render() {
        const { nav } = this.props;
        console.log('nav from state', nav);
        const createItemClassName = (path) => {
            // XXX: dumb check - only checking if active path is contained in the larger
            // url string.  Could lead to problems if the app is to grow, but for
            // now it works.
            if (this.props.activePath.indexOf(path) !== -1) {
                return 'nav-item active';
            }
            return 'nav-item';
        }

        const createClassName = () => {
            if (this.props.nav.closed) {
                return 'nav nav-closed';
            }

            return 'nav';
        }


        return (
            <div className={createClassName()} ref={c => { this._elt = c; }}>
                <Link to={ROUTER_PATHS.HOME}><h1>NO FREE LUNCH</h1></Link>
                <div className='nav-items'>
                    <Link className={createItemClassName(ROUTER_PATHS.LEARN)} to={ROUTER_PATHS.LEARN}>Learn</Link>
                    <Link className={createItemClassName(ROUTER_PATHS.EXPLORE)} to={ROUTER_PATHS.EXPLORE}>Explore</Link>
                    <Link className={createItemClassName(ROUTER_PATHS.GETINVOLVED)} to={ROUTER_PATHS.GETINVOLVED}>Get Involved</Link>
                </div>
            </div>
        );
    }
}


Nav.defaultProps = {
    activePath: '/'
};

Nav.propTypes = {
    activePath: React.PropTypes.string,
};

export default connect(state => ({
    nav: state.nav
}))(Nav);
