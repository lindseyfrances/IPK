/*
 * GetInvolved.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import Nav from 'app/components/Nav/Nav';
import arrowLeft from 'app/images/leftarrow.png';
import arrowRight from 'app/images/rightarrow.png'

const pages = [
    {
        type: 'title',
        id: 'title',
        header: 'IMPACT',
        text: 'Interested in impacting the environment for the better? Take our quick survey and we’ll give you personalized advice on how you can make a difference.'
    },
    {
        header: 'PERSONAL WASTE',
        id: 'waste-1',
        q: 'How many bags of garbage do you produce per week?',
        type: 'enter',
        inputPlaceholder: 'ENTER # HERE'
    },
    {
        header: 'PERSONAL WASTE',
        q: 'What type of waste do you most commonly produce?',
        id: 'waste-2',
        type: 'choice',
        a: [
            {
                id: 'compost',
                display: 'COMPOST'
            },
            {
                id: 'trash',
                display: 'TRASH'
            },
            {
                id: 'recycling',
                display: 'RECYCLING'
            }
        ]
    },
    {
        header: 'EATING OUT',
        id: 'eat-1',
        q: 'How frequently do you visit restaurants that make an effort to help out the environment?',
        type: 'choice',
        a: [
            {
                id: 'constantly',
                display: 'CONSTANTLY'
            },
            {
                id: 'never',
                display: 'NEVER'
            },
            {
                id: 'noidea',
                display: 'I HAVE NO IDEA'
            }
        ]
    },
    {
        header: 'ORGANIZING',
        id: 'org-1',
        q: 'How many hours per week do you spend with local organizations dedicated to environmental issues.',
        type: 'enter',
        inputPlaceholder: 'ENTER # HOURS'
    },
    {
        header: 'ANALSYS',
        type: 'analysis',
        id: 'analysis',
        text: 'Education is the answer!<br/> From the looks of your answers, you really are well-intentioned, but you could make a more meaningful impact on the environment if you became involved with local organizations.<br/><br/>Make sure to check out our Explore page for more information.'
    }
];

const NEXT = 'next';
const LAST = 'last';
const NUM_PAGES = pages.length;

class GetInvolved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };

        pages.forEach(page => {
            if (page.type !== 'title' || page.type !== 'analysis') {

                if (page.type === 'choice') {
                    this.state[page.id] = page.a[0].id;
                } else {
                    this.state[page.id] = '';
                }
            }
        });

        console.log('state', this.state);

        this.changePage = this.changePage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }

    changePage(dir) {
        let nextPage = this.state.currentPage;
        switch (dir) {
            case NEXT:
                nextPage = nextPage + 1 > NUM_PAGES ? 1 : nextPage + 1;
                break;
            case LAST:
                nextPage = nextPage - 1 < 1 ? NUM_PAGES : nextPage - 1;
                break;
            default:
                break;
        }

        this.setState({
            currentPage: nextPage
        });
    }

    handleChoiceSelection(pageId, answerId) {
        this.setState({
            [pageId]: answerId
        });
    }

    handleInputChange(e, id) {
        this.setState({
            [id]: e.target.value
        });
    }

    setCurrentPage(id) {
        pages.forEach((page, i) => {
            if (page.id === id) {
                this.setState({
                    currentPage: i + 1
                });
            }
        });
    }

    getButtonClassName(id) {
        let className = 'button';
        if (id === 'next' && this.state.currentPage >= NUM_PAGES) {
            className += ' hidden';
        }

        if (id === 'last' && this.state.currentPage <= 1) {
            className += ' hidden';
        }

        return className;
    }
    render() {
        const { location } = this.props;
        const currentPage = pages[this.state.currentPage - 1];
        const renderPage = (page) => {
            switch (page.type) {
                case 'title':
                    return (
                        <div>
                            <h1>{page.header}</h1>
                            <p>{page.text}</p>
                        </div>
                    );
                case 'enter':
                    return (
                        <div>
                            <h1>{page.header}</h1>
                            <p>{page.q}</p>
                            <input placeholder={page.inputPlaceholder} type='text' value={this.state[page.id]} onChange={(e) => this.handleInputChange(e, page.id)} name={page.id}/>
                        </div>
                        );
                case 'choice':
                    return (
                        <div>
                            <h1>{page.header}</h1>
                            <p>{page.q}</p>
                            {page.a.map(a => <p className={this.state[page.id] === a.id ? 'choice active' : 'choice'} onClick={e => this.handleChoiceSelection(page.id, a.id)} key={a.id}>{a.display}</p>)}
                        </div>


                    );

                case 'analysis':
                    return (
                        <div>
                            <h1>{page.header}</h1>
                            <p dangerouslySetInnerHTML={{__html: page.text}}/>
                        </div>
                    );
                default:
                    return;

            }
        }

        return (
            <div className='page get-involved'>
                <Nav activePath={location.pathname} title='Get Involved' />
                <div className='bg'/>
                <div className='bg-overlay'/>
                <div className='content'>
                    <div className='involved-page'>
                        {renderPage(currentPage)}
                    </div>
                    <div className='buttons'>
                        <button className={this.getButtonClassName('last')} onClick={() => this.changePage(LAST)}>back</button>
                        <button className={this.getButtonClassName('next')} onClick={() => this.changePage(NEXT)}>next</button>
                    </div>
                    <ul className='indicators-list'>{pages.map(page => <li onClick={() => this.setCurrentPage(page.id)}key={page.id} className={page.id === currentPage.id ? 'page-indicator active' : 'page-indicator'}></li>)}</ul>
                </div>
            </div>
        );
    }
}

export default GetInvolved;
