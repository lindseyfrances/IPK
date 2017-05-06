import React from 'react';
// import LighthouseIntroduction from '../pages/LighthouseIntroduction';

const STORY_IDS = {
    LIGHTHOUSE: {
        WASTE: 'waste',
        SOURCING: 'sourcingAndAg'
    }
};

export const storyPages = [
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'Waste',
        pageNumber: 1,
        next: 2,
        floatingText: {
            title: 'New York City',
            text: 'Businessis in NYC Produce about 5.5 Million tons of waste per year.  That\'s roughly 350,000 garbage truck loads worth.',
            position: 'top-left'
        },
        content: { header: 'Introduction', text: 'Businesses in NYC produce about 5.5 million tons of waste per year* (not including demolition and construction), while New York City spends hundreds of millions in contracts with waste haulers and landfill companies.'},
        // center: { latitude: 40.710818, longitude: -73.953722 },
        // zoom: 8,
        mapData: {
            center: {
                latitude: 40.710818,
                longitude: -73.953722
            },
            zoom: 8,
            data: [
                {
                    type: 'geojson',
                    featureType: 'fill',
                    id: 'new-york-city-outline',
                    data: require('app/data/new-york-city.geo.json'),
                    fillColor: 'transparent',
                    fillOutlineColor: '#225378'
                },
                {
                    type: 'geojson',
                    featureType: 'circle',
                    id: 'fresh-kills-landfill',
                    data: require('app/data/fresh-kills-landfill.geo.json')
                }
            ]
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'Waste',
        pageNumber: 2,
        next: 3,
        last: 1,
        floatingText: {
            title: 'Privately Owned Waste Carters',
            text: 'Of the 77 that responded to an NYC survey, only 12 list food waste recycling as a service.',
            position: 'top-center'
        },
        content: {header: 'Trash As Business', text: 'Businesses in NYC are required to contract with privately owned Waste Carters distributed around the city.  This data was voluntary, so it does not fully represent all carters in NYC.  Disposal can cost a business $X per year, so there\'s an incentive to go with the cheap guy who just throws everything in the trash. Notice how these companies tend to be concentrated in certain neighborhoods.'},
        mapData: {
            data: {
                id: 'nyc-carters',
                featureType: 'circle',
                type: 'geojson',
                data: require('app/data/NYC-Carter.geo.json')
            },
            center: {
                latitude: 40.610818,
                longitude: -73.953722
            },
            zoom: 7
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'Waste',
        pageNumber: 3,
        next: 4,
        last: 2,
        center: {
            latitude: 40.710818,
            longitude: -73.953722
        },
        content: {header: 'Transfer Away', text: 'Collected waste is distributed to transfer stations throughout the city.  Note the clustering of the transfer stations in particular neighborhoods.  The nature of privately owned waste management companies produces significant inefficiencies, often with multiple carting companies traveling along the same streets and routes, then driving back to the same neighborhoods.  It’s been called the\"“Wild Ws"t\".'},
        mapData: {
            data: {
                id: 'transfer-stations',
                featureType: 'circle',
                type: 'geojson',
                data: require('app/data/Transfer-Stations.geo.json'),
            },
            center: {
                latitude: 40.610818,
                longitude: -73.953722
            },
            zoom: 5
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'Waste',
        pageNumber: 4,
        next: 5,
        last: 3,
        content: {header: 'What\'s Collected?', text: '\"The recycling rate for this giant waste stream is only about 25%, significantlyworse than the 40% commercial recycling rate published in Mayor Bloomberg’ 2011 PlaNYC update. Moreover, annual reports filed by private waste companies with the state suggest that recycling by major haulers may be much lower – only 9-13% in 201\" Organic Waste makes up over 25% of the commercial waste stream.  Very little of it actually recycled.'},
        mapData: {
            data: {
                id: 'recyling-rates',
                type: 'geojson',
                featureType: 'fill',
                data: require('app/data/recycling_diversion_rates.geo.json'),
                fillColor:  {
                    property: 'Diversion Rate-Total (Total Recycling / Total Waste)',
                    type: 'interval',
                    stops: [
                        [10, '#ffffcc'],
                        [15, '#a1dab4'],
                        [20, '#41b6c4'],
                        [25, '#2c7fb8'],
                        [50, '#253494']
                    ],
                    default: 'blue'
                }
            },
            center: {
                latitude: 40.710818,
                longitude: -73.953722
            },
            zoom: 8
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'Waste',
        pageNumber: 5,
        next: 6,
        last: 4,
        content: {header: 'Lighthouse', text: 'Which brings us to Lighthouse.  Lighthouse attempts to show that there’s a better way to handle our waste'},
        mapData: {
            type: 'symbol',
            data: {id: 'lighthouse', icon: '/images/lighthouselogo_30px.png', label: 'Lighthouse Restaurant', type: 'symbol', latitude: 40.710883, longitude: -73.953847},
            center: {
                latitude: 40.7108827,
                longitude: -73.9560362
            },
            zoom: 12
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'Waste',
        pageNumber: 6,
        next: 7,
        last: 5,
        center: {
            latitude: 40.710818,
            longitude: -73.953722
        },
        content: {header: 'Diverting Waste', text: 'While many restaurants throw all their organics into a trash bin destined for a landfill, Lighthouse separates their oyster shells, diverting X lbs of shells per week, their wine corks for recycling, saving about X corks per week.  They give Carrot tops, beet tops and onion skins to artists to be used for fabric dye.  The rest of their organic waste, about X lbs per week, is composted with Sure We Can.'},
        mapData: {
            data: {
                id: 'diverting-waste',
                type: 'geojson',
                featureType: 'circle',
                data: require('app/data/lighthouse-waste-story-diverting-waste.geo.json'),
            },
            center: {
                latitude: 40.710818,
                longitude: -73.953722
            },
            zoom: 8
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'Waste',
        pageNumber: 7,
        next: 8,
        last: 6,
        center: {
            latitude: 40.710818,
            longitude: -73.953722
        },
        content: {header: 'Waste Activism', text: 'Lighthouse is working with NAG (Neighbor’s Allied for Good Growth) to put on workshops aimed to educate small business owners about how to handle their waste more sustainably. '},
        mapData: {type: 'points', data: [{id: '12', label: 'test2', type: 'point', latitude: 40.510818, longitude: -73.353722}, {id: '15', label: 'testPrj', type: 'point', latitude: 40.810818, longitude: -73.753722}]}
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'Waste',
        pageNumber: 8,
        next: 9,
        last: 7,
        center: {
            latitude: 40.710818,
            longitude: -73.953722
        },
        content: {header: 'What\'s Next?', text: 'NYC doesn’t have the capacity to handle the amount of commercial organic waste produced, so to truly fix this issue, vast investments must be made into compost processing and anaerobic digesters (which turn food scraps into electricity).  Without larger systemic change, small business like Lighthouse are left to figure it all out themselves. '},
        mapData: {type: 'points', data: [{id: '12', label: 'test2', type: 'point', latitude: 40.510818, longitude: -73.353722}, {id: '15', label: 'testPrj', type: 'point', latitude: 40.810818, longitude: -73.753722}]}
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'Waste',
        pageNumber: 9,
        last: 8,
        center: {
            latitude: 40.710818,
            longitude: -73.953722
        },
        title: 'Wrap Up',
        text: 'We know there\'s a better way.  Seattle, for instance, recycles more than 60% of their waste stream.  Lighthouse provides a model for small businesses who want to take control of their waste.  Imagine all NYC restaurants diverting all their organic waste.  That\'s a big number.',
        content: {header: 'Wrap Up', text: 'We know there\'s a better way.  Seattle, for instance, recycles more than 60% of their waste stream.  Lighthouse provides a model for small businesses who want to take control of their waste.  Imagine all NYC restaurants diverting all their organic waste.  That\'s a big number.'},
        mapData: {type: 'points', data: [{id: '12', label: 'test2', type: 'point', latitude: 40.510818, longitude: -73.353722}, {id: '15', label: 'testPrj', type: 'point', latitude: 40.810818, longitude: -73.753722}]}
    },
    {
        id: 'lighthouse',
        story: 'sourcingAndAg',
        storyDisplay: 'Sourcing & Agriculture',
        pageNumber: 1,
        center: {
            latitude: 40.710818,
            longitude: -73.953722
        },
        title: 'Introduction',
        text: 'We know there\'s a better way.  Seattle, for instance, recycles more than 60% of their waste stream.  Lighthouse provides a model for small businesses who want to take control of their waste.  Imagine all NYC restaurants diverting all their organic waste.  That\'s a big number.',
        content: {header: 'Wrap Up', text: 'We know there\'s a better way.  Seattle, for instance, recycles more than 60% of their waste stream.  Lighthouse provides a model for small businesses who want to take control of their waste.  Imagine all NYC restaurants diverting all their organic waste.  That\'s a big number.'},
        mapData: {type: 'points', data: [{id: '12', label: 'test2', type: 'point', latitude: 40.510818, longitude: -73.353722}, {id: '15', label: 'testPrj', type: 'point', latitude: 40.810818, longitude: -73.753722}]}
    }
];

export const caseStudies = {
    lighthouse: {
        name: 'Lighthouse',
        headers: {
            sectionOne:'LIGHTHOUSE RESTAURANT',
            sectionTwo: 'MEET LIGHTHOUSE'
        },
        videoSrc: 'https://player.vimeo.com/video/143381669',
        id: 'lighthouse',
        initialStory: 'waste',
        stories: [STORY_IDS.LIGHTHOUSE.WASTE, STORY_IDS.LIGHTHOUSE.SOURCING],
        storySubHeader: 'Lighthouse touches a wide swathe of the food system. Explore the various ways in which they intervene.',
        // type: 'point',
        // label: 'Lighthouse Restaurant',
        pages: storyPages.filter(story => story.id === 'lighthouse'),
        introText: 'Of all the restaurants in New York City, why have we chosen this little Williamsburg spot to single out?  Lighthouse exemplifies what it means to participate in your food system.  Each leg of the tangled web that is the food system is carefully considered, from sourcing local ingredients, to recycling oyster shells, Lighthouse models what a sustainable restaurant can be.',
        // introContent: <LighthouseIntroduction />,
        // mapCenter: [ 40.710818, -73.953722],
        mapData: {
            type: 'symbol',
            data: {
                id: 'lighthouse',
                icon: '/images/lighthouselogo_30px.png',
                label: 'Lighthouse Restaurant',
                type: 'symbol',
                latitude: 40.710883,
                longitude: -73.953847
            },
            center: {
                latitude: 40.7108827,
                longitude: -73.9560362
            },
            zoom: 12
        }
    }
};

export const nodes = {
    lighthouse: {
        waste: [
            {
                id: 'introduction',
                to: '/learn/lighthouse/waste/1',
                pageNumber: 1,
                title: 'Introduction',
                next: 'business',
            },
            {
                id: 'business',
                to: '/learn/lighthouse/waste/2',
                pageNumber: 2,
                title: 'Trash as business',
                next: 'transfer',
                last: 'business'
            },
            {
                id: 'transfer',
                to: '/learn/lighthouse/waste/3',
                pageNumber: 3,
                title: 'Transfer Away',
                next: 'collection',
                last: 'business'
            },
            {
                id: 'collection',
                to: '/learn/lighthouse/waste/4',
                pageNumber: 4,
                title: 'What\'s Collected',
                next: 'lighthouse',
                last: 'transfer'
            },
            {
                id: 'lighthouse',
                to: '/learn/lighthouse/waste/5',
                pageNumber: 5,
                title: 'Lighthouse',
                next: 'diverting',
                last: 'collection'
            },
            {
                id: 'diverting',
                to: '/learn/lighthouse/waste/6',
                pageNumber: 6,
                title: 'Diverting Waste',
                next: 'activism',
                last: 'lighthouse'
            },
            {
                id: 'activism',
                to: '/learn/lighthouse/waste/7',
                pageNumber: 7,
                title: 'Waste Activism',
                next: 'next',
                last: 'diverting'
            },
            {
                id: 'next',
                to: '/learn/lighthouse/waste/8',
                title: 'What\'s Next?',
                pageNumber: 8,
                next: 'wrapup',
                last: 'activism'
            },
            {
                id: 'wrapup',
                to: '/learn/lighthouse/waste/9',
                title: 'Wrap Up',
                last: 'next',
                pageNumber: 9
            }
        ],
        sourcingAndAg: [
            {
                id: 'introduction',
                to: '/learn/lighthouse/sourcingAndAg/1',
                pageNumber: 1,
                title: 'Introduction',
                next: 'business',
            }
        ]
    }
};
