// Dummy data
// TODO: Migrate to actual database
export const benefitData = {
    "58584bb7f36d2873dac5eed1": {
        "_id":{"$oid":"58584bb7f36d2873dac5eed1"},
        "project":"58581b4aa3e9c089e852bea4",
        "projectName":"Sure We Can",
        "type":"donate",
        "benefits":{"baseUnit":"month","baseFreq":1,"benefits":[{"title":"cans","value":60,"unit":"cans","desc":"Recycled","quantitative":true}]}
    },
    "58584bd6f36d2873dac5eee5": {
        "_id":{"$oid":"58584bd6f36d2873dac5eee5"},
        "project":"58581b4aa3e9c089e852bea4",
        "projectName":"Sure We Can",
        "type":"compost",
        "benefits":{
            "baseUnit":"week",
            "baseFreq":1,
            "benefits":[{
                "title":"compost",
                "value":6,
                "unit":"lbs",
                "desc":"diverted food waste",
                "quantitative":true
            }]
        }
    },
    "58584cb3f36d2873dac5ef59": {
        "_id":{"$oid":"58584cb3f36d2873dac5ef59"},
        "project":"58581b4aa3e9c089e852be97",
        "projectName":"Lighthouse Restaurant",
        "type":"eat",
        "benefits":{
            "baseUnit":"wk",
            "baseFreq":"1",
            "benefits":[
                {
                    "title":"oystershells",
                    "value":1,
                    "unit":"lb",
                    "desc":"recyled oyster shells",
                    "quantitative":true
                },
                {
                    "title":"sustainableseafood",
                    "quantitative":false,
                    "desc":"Contribute to sustainably caught fish"
                },
                {
                    "title":"waste",
                    "quantitative":true,
                    "value":1,
                    "unit":"lb",
                    "desc":"diverted food waste"
                },
                {
                    "title":"meat",
                    "quantitative":false,
                    "desc":"Support grass-fed and pasture raised meat"
                }
            ]
        }
    },
    "58584cd1f36d2873dac5ef5d": {
        "_id":{"$oid":"58584cd1f36d2873dac5ef5d"},
        "project":"58581b4aa3e9c089e852beb8",
        "projectName":"Billion Oyster Project",
        "type":"volunteer",
        "benefits":{"baseUnit":"month","baseFreq":1,"benefits":[{"title":"oysters","value":100,"unit":"oysters","desc":"Restored","quantitative":true}]}
    },
    "58584d00f36d2873dac5ef7f": {
        "_id":{"$oid":"58584d00f36d2873dac5ef7f"},
        "project":"58581b4aa3e9c089e852bea4",
        "projectName":"Sure We Can",
        "type":"volunteer",
        "benefits":{
            "baseUnit":"month",
            "baseFreq":1,
            "benefits":[
                {
                    "title":"surewecan",
                    "quantitative":false,
                    "desc":"Maintain community space, compost project, garden, and more"
                }
            ]
        }
    }
};

export const userData = {
    "_id": {
        "$oid": "58584e56f36d2873dac5efe9"
    },
    "username": "jcharry",
    "password": "password",
    "contributions": [
        {
            "contribId": "58584bb7f36d2873dac5eed1",
            "frequency": 1,
            "unit": "month"
        },
        {
            "contribId": "58584bd6f36d2873dac5eee5",
            "frequency": 1,
            "unit": "week"
        },
        {
            "contribId": "58584cb3f36d2873dac5ef59",
            "frequency": 1,
            "unit": "week"
        },
        {
            "contribId": "58584cd1f36d2873dac5ef5d",
            "frequency": 1,
            "unit": "month"
        }
    ]
};
