/* eslint
    "global-require": "off"
*/
import React from 'react';
import Hoverable from 'app/components/SimpleElements/Hoverable';
import ExternalLink from 'app/components/SimpleElements/ExternalLink';
import { COLORS } from 'app/constants/CONSTANTS';
export const STORY_IDS = {
    LIGHTHOUSE: {
        WASTE: {
            id: 'waste',
            display: 'WASTE',
            activeImg: '/images/waste-active.png',
            inactiveImg: '/images/waste-inactive.png'
        },
        SOURCING: {
            id: 'sourcingAndAg',
            display: 'SOURCING & AGRICULTURE',
            activeImg: '/images/sourcing-active.png',
            inactiveImg: '/images/sourcing-inactive.png'
        }
    },
};
export const CASE_STUDY_TYPES = {
    REGULAR: 'regular',
    SLIDESHOW: 'slideshow'
}

export const storyPages = [
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'WASTE',
        pageNumber: 1,
        next: 2,
        floatingText: {
            title: 'Landfills in NY State',
            text: 'New York City has a long history of trash. We used to dump it in the rivers. Then came landfills like Fresh Kills. Now we ship it all over the country (and sometimes the world).',
            position: 'top-left'
        },
        content: { header: 'Introduction', text: 'Businesses in NYC produce about 5.5 million tons of waste per year* (not including demolition and construction). That\'s roughtly 350,000 garbage truck loads worth. Meanwhile, New York City spends hundreds of millions of dollars in contracts with waste haulers and landfill companies to take all of this waste out of sight and out of mind.' },
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
                    featureType: 'circle',
                    id: 'landfills',
                    data: 'https://s3.amazonaws.com/nfl-map-data/landfills.geo.json',
                    circleColor: COLORS.PRIMARY_COLOR
                },
                // {
                //     type: 'geojson',
                //     featureType: 'fill',
                //     id: 'new-york-city-outline',
                //     data: require('app/data/new-york-city.geo.json'),
                //     fillColor: 'transparent',
                //     fillOutlineColor: '#225378'
                // },
                {
                    type: 'geojson',
                    featureType: 'circle',
                    id: 'fresh-kills-landfill',
                    data: 'https://s3.amazonaws.com/nfl-map-data/fresh-kills-landfill.geo.json',
                    circleColor: COLORS.TERTIARY_COLOR
                }
            ]
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'WASTE',
        pageNumber: 2,
        next: 3,
        last: 1,
        floatingText: {
            title: 'Privately Owned Waste Carters',
            text: 'Of the 77 that responded to an NYC survey, only 12 list food waste recycling as a service.',
            position: 'top-center'
        },
        content: { header: 'Trash As Business', text: 'Businesses in NYC are required to contract with privately owned Waste Carters distributed around the city.  This data was voluntary, so it does not fully represent all carters in NYC.  Disposal can cost a business $X per year, so there\'s an incentive to go with the cheap guy who just throws everything in the trash. Notice how these companies tend to be concentrated in certain neighborhoods.' },
        mapData: {
            data: {
                id: 'nyc-carters',
                featureType: 'circle',
                type: 'geojson',
                data: 'https://s3.amazonaws.com/nfl-map-data/NYC-Carter.geo.json',
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
        storyDisplay: 'WASTE',
        pageNumber: 3,
        next: 4,
        last: 2,
        floatingText: {
            title: 'Transfer Stations',
            text: 'NYC is home to over 130 transfer stations. They often are clustered in low income, or industrial neighborhoods like the South Bronx and along Newtown Creek, leading to concerns over air quality from both the trash and the trucks.',
            position: 'top-left'
        },
        content: { header: 'Transfer Away', text: 'Collected waste is distributed to transfer stations throughout the city. The nature of privately owned waste management companies produces significant inefficiencies, often with multiple carting companies traveling along the same streets and routes, then driving back to the same neighborhoods.  It’s been calle the "Wild West" by some New York City officials.' },
        mapData: {
            data: {
                id: 'transfer-stations',
                featureType: 'circle',
                type: 'geojson',
                data: 'https://s3.amazonaws.com/nfl-map-data/Transfer-Stations.geo.json',
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
        storyDisplay: 'WASTE',
        pageNumber: 4,
        next: 5,
        last: 3,
        floatingText: {
            title: 'How much do we recycle?',
            text: 'As of 2010, Most community districts hover between 10 and 20% recylcing rates (amount waste recycled / total waste).',
            position: 'top-left',
            image: require('app/images/recycling_rates_legend.png')
        },
        content: { header: 'What\'s Collected?', text: '"The recycling rate for this giant waste stream is only about 25%, significantly worse than the 40% commercial recycling rate published in Mayor Bloomberg\'s 2011 PlaNYC update. Moreover, annual reports filed by private waste companies with the state suggest that recycling by major haulers may be much lower – only 9-13% in 201" Organic Waste makes up over 25% of the commercial waste stream.' },
        mapData: {
            data: {
                id: 'recyling-rates',
                type: 'geojson',
                featureType: 'fill',
                data: '	https://s3.amazonaws.com/nfl-map-data/recycling_diversion_rates.geo.json',
                fillColor: {
                    property: 'Diversion Rate-Total (Total Recycling / Total Waste)',
                    type: 'interval',
                    stops: [
                        [10, '#fa9fb5'],
                        [15, '#f768a1'],
                        [20, '#dd3497'],
                        [25, '#ae017e'],
                        [50, '#7a0177']
                    ],
                    default: 'blue'
                }
            },
            center: {
                latitude: 40.710818,
                longitude: -73.953722
            },
            zoom: 11
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'WASTE',
        pageNumber: 5,
        next: 6,
        last: 4,
        content: { header: 'Lighthouse', text: 'Which brings us to Lighthouse.  Lighthouse attempts to show that there’s a better way to handle our waste' },
        mapData: {
            type: 'symbol',
            data: { id: 'lighthouse', icon: '/images/lighthouselogo_30px.png', label: 'Lighthouse Restaurant', type: 'symbol', latitude: 40.710883, longitude: -73.953847 },
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
        storyDisplay: 'WASTE',
        pageNumber: 6,
        next: 7,
        last: 5,
        floatingText: {
            title: 'Why did we choose Lighthouse?',
            text: 'Recycled oyster shells, recycled corks, composting all organic waste, recycling all cans, bottles, and paper materials, and constructed largely out of found or second hand materials, Lighthouse exemplefies what it means to be a sustainable restaurant.',
            position: 'top-left'
        },
        content: { header: 'Diverting Waste', text: 'Restaurants have to contract with a privately owned waste carter, which, as we saw, typically throw everything into the trash, destined for a landfill. It\'s the cheapest, easiest short term solution. Lighthouse is trying their best to beat the pretty dismal recycling rates throughout the city.' },
        mapData: {
            data: {
                id: 'diverting-waste',
                type: 'geojson',
                featureType: 'circle',
                data: 'https://s3.amazonaws.com/nfl-map-data/lighthouse-waste-story-diverting-waste.geo.json',
            },
            center: {
                latitude: 40.710818,
                longitude: -73.953722
            },
            zoom: 11
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'WASTE',
        pageNumber: 7,
        next: 8,
        last: 6,
        floatingText: {
            title: 'Getting involved in the community',
            text: 'To educate restauranteurs, and businesses at large, about how to handle waste both responsibly and affordably is a big undertaking. Community organizations like NAG are fundamental in these efforts.',
            position: 'top-left'
        },
        content: { header: 'Waste Activism', text: 'Lighthouse is working with NAG (Neighbor’s Allied for Good Growth) to put on workshops aimed to educate small business owners about how to handle their waste more sustainably.' },
        mapData: {
            data: {
                id: 'waste-activism',
                type: 'geojson',
                featureType: 'circle',
                data: 'https://s3.amazonaws.com/nfl-map-data/nag.geo.json',
            },
            center: {
                longitude: -73.9636534,
                latitude: 40.7208871
            },
            zoom: 13
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'WASTE',
        pageNumber: 8,
        next: 9,
        last: 7,
        floatingText: {
            title: 'Composting Facilities',
            text: 'Composting facilities exist throughout NY State. So why are we still doing so poorly when it comes to composting? One potential answer lies in the sheer volume of food waste produced by NYC on a daily basis. 8 Million people produce quite a lot of food scraps.',
            position: 'top-left'
        },
        content: { header: 'What\'s Next?', text: 'NYC doesn’t have the capacity to handle the amount of commercial organic waste produced, so to truly fix this issue, vast investments must be made into compost processing and anaerobic digesters (which turn food scraps into electricity).  Without larger systemic change, small business like Lighthouse are left to figure it all out themselves.' },
        mapData: {
            data: {
                id: 'composting',
                type: 'geojson',
                featureType: 'circle',
                data: 'https://s3.amazonaws.com/nfl-map-data/composting_facilities.geo.json',
            },
            center: {
                longitude: -73.9636534,
                latitude: 40.7208871
            },
            zoom: 8
        }
    },
    {
        id: 'lighthouse',
        story: 'waste',
        storyDisplay: 'WASTE',
        pageNumber: 9,
        last: 8,
        title: 'Wrap Up',
        text: 'We know there\'s a better way.  Seattle, for instance, recycles more than 60% of their waste stream.  Lighthouse provides a model for small businesses who want to take control of their waste.  Imagine all NYC restaurants diverting all their organic waste.  That\'s a big number.',
        content: { header: 'Wrap Up', text: 'We know there\'s a better way.  Seattle, for instance, recycles more than 60% of their waste stream.  Lighthouse provides a model for small businesses who want to take control of their waste.  Imagine all NYC restaurants diverting all their organic waste.  That\'s a big number.' },
        mapData: {
            type: 'symbol',
            data: { id: 'lighthouse-wrapup', icon: '/images/lighthouselogo_30px.png', label: 'Lighthouse Restaurant', type: 'symbol', latitude: 40.710883, longitude: -73.953847 },
            center: {
                latitude: 40.7108827,
                longitude: -73.9560362
            },
            zoom: 12
        }
    },
    {
        id: 'lighthouse',
        story: 'sourcingAndAg',
        storyDisplay: 'SOURCING & AGRICULTURE',
        pageNumber: 1,
        floatingText: {title: 'Population', text: 'The sheer size of New York City makes it pretty remarkable that we can supply enough food for everyone. Whether everyone has access to that food is a different story, but there\'s no doubt there\'s enough to go around.', position: 'top-left'},
        content: {header: 'Introduction', text: 'New York City houses over 8.5 million people. An estimated 5.7 million tons of food, both domestic and international, flow into New York City every year. That’s a lot So where does it all come from?  The answer, both over simplistically and quite accurately, is everywhere.'},
        mapData: {
            data: {
                id: 'nyc-population',
                type: 'geojson',
                featureType: 'fill',
                data: 'https://s3.amazonaws.com/nfl-map-data/nyc-population-census-2010.geo.json',
                fillColor: {property: 'Population', type: 'interval', stops: [[1700,      '#feebe2'], [1700 * 2,  '#fcc5c0'], [1700 * 3,  '#fa9fb5'], [1700 * 4,  '#f768a1'], [1700 * 5,  '#dd3497'], [1700 * 6,  '#ae017e'], [1700 * 7,  '#7a0177']], default: 'blue'}
            },
            center: {latitude: 40.710818, longitude: -73.953722},
            zoom: 11
        }
    },
    {
        id: 'lighthouse',
        story: 'sourcingAndAg',
        storyDisplay: 'SOURCING & AGRICULTURE',
        pageNumber: 2,
        floatingText: {
            title: 'National Wholesalers',
            text:  'Much of the food that comes into the City is purchased by large National Wholesalers and Distributors - Sysco, White Rose, General Trading, C&S. These distributors purchase bulk from farms and other large food producers, then repack and distribute to businesses and consumers throughout the city.',
            position: 'top-left'
        },
        content: {
            header: 'A Countrywide Endeavor',
            text: 'Much of the food that comes into the City is purchased by large National Wholesalers and Distributors - Sysco, White Rose, General Trading, C&S. These distributors purchase bulk from farms and other large food producers, then repack and distribute to businesses and consumers throughout the city. But they\'re not the only game in town...'
        },
        mapData: {
            data: {
                id: 'wholesalers',
                type: 'geojson',
                featureType: 'circle',
                data: 'https://s3.amazonaws.com/nfl-map-data/wholesalers.geo.json',
            },
            center: {
                latitude: 36.1738691,
                longitude: -80.4458514
            },
            zoom: 4
        }
    },
    {
        id: 'lighthouse',
        story: 'sourcingAndAg',
        storyDisplay: 'SOURCING & AGRICULTURE',
        pageNumber: 3,
        floatingText: {
            title: 'Hunt\'s Point',
            text:  '',
            position: 'top-left'
        },
        content: {
            header: 'Local Distribution',
            text: 'You may have heard of Hunt\'s Point. It\'s a common name in the world of food in NYC. The neighborhood is home to a Distribution Center responsible for "60 percent of the cit\'s produce and about half of the city\'s meat and fish" While larger retailers like supermarkets might work with Sysco, or White Rose, the rest of the city\'s small businesses - bodegas, restaurants, small markets, specialty food shops - are likely to be found buying their goods from the Hunt\'s Point Market. Smaller distribution center’s exist throughout the city - often focusing on specific items or specialty goods - but none can touch the scale of Hunt\'s Point.'
        },
        mapData: {
            data: {
                id: 'hunts-point',
                type: 'geojson',
                featureType: 'fill',
                data: 'https://s3.amazonaws.com/nfl-map-data/hunts-point.geo.json',
                fillColor: COLORS.PRIMARY_COLOR,
                fillOutlineColor: 'red',
                opacity: 0.4
            },
            center: {
                latitude: 40.810951,
                longitude: -73.8869236
            },
            zoom: 13.5
        }
    },
    {
        id: 'lighthouse',
        story: 'sourcingAndAg',
        storyDisplay: 'SOURCING & AGRICULTURE',
        pageNumber: 4,
        floatingText: {
            title: '',
            text:  '',
            position: 'top-left'
        },
        content: {
            header: 'Back to the Source',
            text: 'Lighthouse believes in transparency, thus makes an effort to source their ingredients personally. What this means is that rather than purchase all their goods from Hunt\'s Point Market, or through a regional distributor, they often buy straight from the farm when they can. When they can’t buy direct, they work with distributors they can trust, that have a face and name, and value transparency. Check the map to see the distributors and farms that Lighthouse purchases from.'
        },
        mapData: {
            data: {
                id: 'lighthouse-sourcing',
                type: 'geojson',
                featureType: 'circle',
                data: '	https://s3.amazonaws.com/nfl-map-data/lighthouse-sourcing.geo.json',
                circleColor: {
                    property: 'type',
                    type: 'categorical',
                    stops: [
                        ['farm', '#66c2a5'],
                        ['producer', '#fc8d62'],
                        ['products', '#8da0cb'],
                        ['distributor', '#e78ac3'],
                        ['shop', '#a6d854'],
                        ['greenmarket', '#ffd92f']
                    ],
                }
            },
            center: {
                latitude: 40.810951,
                longitude: -73.8869236
            },
            zoom: 9
        }
    },
    {
        id: 'lighthouse',
        story: 'sourcingAndAg',
        storyDisplay: 'SOURCING & AGRICULTURE',
        pageNumber: 5,
        floatingText: {
            title: 'NY Agricultural Districts',
            text:  'Counties in New York State have the power to designate land as an Agricultural District, which provides legal protection from regulation or development that may impede the production of any farm that works the land within the district, unless there is a public health risk or concern.',
            position: 'top-left'
        },
        content: {
            header: 'Buying Local',
            text: 'Many of the farms and distributors lighthouse works with try to stay local - so what\'s the deal with buying local "As of 2012, New York was home to more than 35,500 farms", contributing towards an estimated $5.4 billion in agricultural commodity sales in New York. Despite this, over 50% of farmers reported making less than $10,000 from sales. NYC itself has over 700 farms and gardens that grow food, but the overall contribution of urban agriculture remains small.'
        },
        mapData: {
            data: {
                id: 'lighthouse-sourcing',
                type: 'geojson',
                featureType: 'fill',
                data: 'https://s3.amazonaws.com/nfl-map-data/ny_ag_districts.geojson',
                fillColor: 'blue'
            },
            center: {
                latitude: 40.810951,
                longitude: -73.8869236
            },
            zoom: 5
        }
    },
    {
        id: 'lighthouse',
        story: 'sourcingAndAg',
        storyDisplay: 'SOURCING & AGRICULTURE',
        pageNumber: 6,
        floatingText: {
            title: '',
            text:  '',
            position: 'top-left'
        },
        content: {
            header: 'We Love Dairy',
            text: 'As for what we farm, dairy production represents 44% of the New York’s total sales, totaling roughly $2.4 billion, the third highest in the country.*  Grains and beans come in 2nd, totaling 15% of sales, and Cattle and Calves in 3rd, grabbing 8% of sales.  Produce is quite low, fruits and vegetables combined only represents 11% of the market.'
        },
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
    },
    {
        id: 'lighthouse',
        story: 'sourcingAndAg',
        storyDisplay: 'SOURCING & AGRICULTURE',
        pageNumber: 7,
        floatingText: {
            title: '',
            text:  '',
            position: 'top-left'
        },
        content: {
            header: 'The Future of Food',
            text: 'When thinking about local food, you might be tempted to say “can local farms really feed all of New York City?”  Probably not, but does that mean that the answer is an industrial scale production effort like what we have now?  Definitely not. Restaurants in New York often fall into the mold of our current system - strive for efficiency and cost effectiveness, which leads them to Hunt’s Point, or to a Wholesaler like White Rose But Lighthouse follows a different mentality - foster our communities by contributing to them. Be transparent. Know where your food comes from and how it gets to you. Only then can we start moving towards a more localized system that can feed our city.'
        },
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
    },
];

export const caseStudies = {
    lighthouse: {
        name: 'Lighthouse',
        headers: {
            sectionOne: 'LIGHTHOUSE RESTAURANT',
            sectionTwo: 'MEET LIGHTHOUSE'
        },
        type: CASE_STUDY_TYPES.REGULAR,
        videoSrc: 'https://player.vimeo.com/video/218415945',
        id: 'lighthouse',
        initialStory: STORY_IDS.LIGHTHOUSE.WASTE,
        stories: [STORY_IDS.LIGHTHOUSE.WASTE, STORY_IDS.LIGHTHOUSE.SOURCING],
        storySubHeader: 'Lighthouse touches a wide swathe of the food system. Explore the various ways in which they intervene.',
        // type: 'point',
        // label: 'Lighthouse Restaurant',
        pages: storyPages.filter(story => story.id === 'lighthouse'),
        introText: 'Of all the restaurants in New York City, why have we singled out this little Williamsburg spot? Lighthouse exemplifies what it means to participate in your food system. Each thread of the tangled web that is the food system is carefully considered: from sourcing local ingredients, to recycling oyster shells, Lighthouse exemplifies what a sustainable restaurant can be.',
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
    },
    wheat: {
        type: CASE_STUDY_TYPES.SLIDESHOW,
        pages: [
            {
                pageNumber: 1,
                backgroundImage: '/images/jez-timms-2831.jpg',
                content: [
                    {
                        text:<p>Human's didn't cultivate wheat - wheat domesticated us.</p>,
                        loc: 'top-left'
                    },
                    {
                        text: <p>Wheat was the first crop that transitioned us from hunter gatherers to growers and harvesters.</p>,
                        loc: 'bottom-right'
                    }
                ]
            },
            {
                pageNumber: 2,
                backgroundImage: '/images/gristmill_compressed.jpg',
                content: [
                    {
                        text: <p>Before wheat production moved out west by the early 19th Century, New York was the region's breadbasket with gristmill spread throughout the Hudson Valley.</p>,
                        loc: 'top-right',
                    },
                    {
                        text: <p>A <Hoverable id='gristmill-old'>gristmill</Hoverable> is a mechanism for grinding grains into flour. While the process remains essentially the same, the <Hoverable id='gristmill-new'>hardware</Hoverable> has evolved quite a bit from the old wooden mills of the past.</p>,
                        loc: 'bottom-left'
                    }
                ]
            },
            {
                pageNumber: 3,
                backgroundImage: '/images/gristmill_compressed.jpg',
                content: [
                    {
                        text: <p>With the loss of that infrastructure came the loss of that milling knowledge.</p>,
                        loc: 'top-middle'
                    }
                ]
            },
            {
                pageNumber: 4,
                backgroundImage: '/images/white-bread.jpg',
                content: [
                    {
                        text: <p>By the late 1800’s white bread started making its slow but steady creep into the American diet and by the 1920’s it became a symbol of industrialization, modernity and the automation of food production.</p>,
                        loc: 'middle-middle'
                    }
                ]
            },
            {
                pageNumber: 5,
                backgroundImage: '/images/wheat-kernals.jpg',
                content: [
                    {
                        text: <p>The processing of wheat into white bread removes the bran and germ nutrient layers in order to secure a longer shelf life.</p>,
                        loc: 'middle-left'
                    },
                    {
                        text: <p>To compensate for the loss of these nutritional components, flour became enriched with synthetic vitamins to restore the nutritional value that had been processed out, but is still missing the fiber from the original wheat product.</p>,
                        loc: 'bottom-right'
                    }
                ]
            },
            {
                pageNumber: 6,
                backgroundImage: '/images/static-background.png',
                content: [
                    {
                        text:
                            <div
                                style={{
                                    width: '100vw',
                                    height: '100vh',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                    <p style={{textAlign: 'center', padding: '0 6rem'}}>Many industrially produced white and wheat breads also have added stabilizers, preservatives, artificial flavors and enhancers.</p>
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/GEfWShkO4Ac" frameBorder="0" allowFullScreen></iframe>
                            </div>
                    }
                ]
            },
            {
                pageNumber: 7,
                backgroundImage: '/images/wheat-farmer.jpg',
                content: [
                    {
                        text: <p>When grown as an industrialized, subsidized mono-crop, wheat problematically influences the biodiversity and ecosystem balance in the regions it is grown.</p>,
                        loc: 'top-left'
                    },
                    {
                        text: <p>Monsanto's use of Roundup Ready Wheat - employing the <ExternalLink url='http://www.ecowatch.com/why-is-glyphosate-sprayed-on-crops-right-before-harvest-1882187755.html'>herbicide glyphosate</ExternalLink> - has been deemed a likely carcinogenic by the World Health Organization and a contributor to Colony Collapse Disorder in Bees.</p>,
                        loc: 'bottom-right'
                    }
                ]
            },
            {
                pageNumber: 8,
                backgroundImage: '/images/seitan.jpg',
                content: [
                    {
                        text: <p>One of the most recent enhancers is vital wheat gluten a powder made from wheat gluten also known as seitan: first appearing in 6th Century china and a vegetarian staple for centuries.</p>,
                        loc: 'middle-left'
                    }
                ]
            },
            {
                pageNumber: 9,
                backgroundImage: '/images/seitan.jpg',
                content: [
                    {
                        text: <p><ExternalLink url='http://www.newyorker.com/magazine/2014/11/03/grain'>Vital wheat gluten</ExternalLink> increases shelf life and acts as a binder; because it's so versatile, food companies have added it not only to bread but to pastas, snacks, cereals, and crackers, and as a thickener in hundreds of foods and even in some cosmetics. It's this extreme exposure that is being considered a cause for the meteoric rise in gluten intolerance – not to be confused with celiac disease.</p>,
                        loc: 'top-right'
                    }
                ]
            },
            {
                pageNumber: 10,
                backgroundImage: '/images/baguette.jpg',
                content: [
                    {
                        text: <p>Since the revival of <ExternalLink url='http://www.biencuit.com/'>artisanal</ExternalLink> / <ExternalLink url='https://hotbreadkitchen.org/'>craft bread</ExternalLink> / <ExternalLink url='https://www.grownyc.org/grains/about'>regional grain wheat diversity</ExternalLink> is rising and you can find breads made with new varieties and flavor expressions.</p>,
                        loc: 'bottom-left'
                    }
                ]
            }
        ]
    }
};

/*
 * A terrible way to do this, again, but I'm pressed for time...
*/
export const slideshowPopupContent = {
    wheat: {
        1: {},
        2: {
            'gristmill-old': {
                image: '/images/gristmill_closeup_old.jpg',
                text: 'an old style gristmill',
                dir: 'top-left'
            },
            'gristmill-new': {
                image: '/images/gristmill_closeup_new.jpg',
                text: 'A newer, industrial gristmill',
                dir: 'top-left'
            }
        },
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {}
    }
}

export const nodes = {
    lighthouse: {
        waste: [
            {
                id: 'introduction',
                to: '/learn/lighthouse/waste/1',
                pageNumber: 1,
                title: 'Introduction',
                next: 'business'
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
                title: 'Introduction',
                pageNumber: 1
            },
            {
                id: 'wholesalers',
                title: 'National Wholesalers',
                pageNumber: 2
            },
            {
                id: 'hunts-point',
                title: 'Hunt\'s Point',
                pageNumber: 3
            },
            {
                id: 'source',
                title: 'Back to the Source',
                pageNumber: 4
            },
            {
                id: 'local',
                title: 'Buying Local',
                pageNumber: 5
            },
            {
                id: 'dairy',
                title: 'We Love Dairy',
                pageNumber: 6
            },
            {
                id: 'future',
                title: 'The Future of Food',
                pageNumber: 7
            },

        ]
    }
};
