import React from 'react';
export class LandingPage extends React.Component {
    goToMap() {

    }
    renderPage() {
        var { page, switchToNextPage, goToMap } = this.props;
        switch(page) {
            case 0:
                return (
                    <div className='page-overlay fully-centered'>
                        <h1>No Free Lunch</h1>
                        <h3>Food + the City</h3>
                        <button onClick={switchToNextPage}>next</button>
                    </div>
                );
            case 1:
                return (
                    <div className='page-overlay'>
                        <p>New york city is a complicated place. It's food system even more so. Where does our food come from? Our water? Some more intro text here...</p>
                        <p>Explore the food system, layer by layer, and see how artists and activists are taking the food system into their own hands</p>
                        <div>placeholder image maybe?</div>
                        <button onClick={switchToNextPage}>next</button>
                    </div>
                );
            case 2:
                return (
                    <div className='page-overlay'>
                        <p>Select a layer to begin exploring</p>
                        <button onClick={() => { goToMap('water');}} className='button'>Water</button>
                        <button onClick={() => { goToMap('soil');}} className='button'>Soil</button>
                        <button onClick={() => { goToMap('agriculture');}} className='button'>Agriculture</button>
                        <button onClick={() => { goToMap('economics');}} className='button'>Economics</button>
                        <button onClick={() => { goToMap('labor');}} className='button'>Labor</button>
                        <button onClick={() => { goToMap('energy');}} className='button'>Energy</button>
                        <button onClick={() => { goToMap('transporation');}} className='button'>Transportation</button>
                        <button onClick={() => { goToMap('policy');}} className='button'>Policy</button>
                    </div>
                );
        }
    }

    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        );
    }
}

export default LandingPage;
