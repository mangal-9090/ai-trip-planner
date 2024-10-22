export const SelectTravelsList=[
    {

        id:1,
        title:'just me',
        desc:'A sole travels in exploration',
        icon:'✈',
        people:'1'
    },

    {

        id:2,
        title:'A Couple',
        desc:'Two travels in tandem',
        icon:'🥂',
        people:'2'
    },

    {

        id:3,
        title:'Family',
        desc:'A group of fun loving people',
        icon:'🏠',
        people:'3 to 5 people'
    },

    {

        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'👥',
        people:'5 to 10 people'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay consious of cost',
        icon:'🪙',
    },

    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },

    {
        id:3,
        title:'Luxury',
        desc:'Do not worry about cost',
        icon:'💸',
    },

]

export const AI_PROMPT='Generate Travel Plan for Location:{location}, for {totalDays} Days for {noOfPeople} travellers with a {budget} budget, give me hotels options list with hotel name, hotel address,hotel price,hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, time travel each of the location for {totalDays} days with each each day plan with best time to visit in JSON format'