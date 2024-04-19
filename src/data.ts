export const menu = [
    {
        id: 1,
        title: "main",
        listItems: [
            {
                id: 1,
                title: "Home",
                url: "/",
                icon: "/home.svg"
            }
        ]
    },
    {
        id: 2,
        title: "menu",
        listItems: [
            {
                id: 1,
                title: "Business",
                url: "/business",
                icon: "/profile.svg"
            },
            {
                id: 2,
                title: "Calls",
                url: "/calls",
                icon: "/profile.svg"
            },
            {
                id: 3,
                title: "Marketing",
                url: "/marketing",
                icon: "/profile.svg"
            }
        ]
    },
    {
        id: 3,
        title: "analytics",
        listItems: [
            {
                id: 1,
                title: "Business",
                url: "/business",
                icon: "/profile.svg"
            },
            {
                id: 2,
                title: "Calls",
                url: "/calls",
                icon: "/profile.svg"
            },
            {
                id: 3,
                title: "Marketing",
                url: "/marketing",
                icon: "/profile.svg"
            }
        ]
    }
]


export const topDealUsers = [
    {
      "id": 1,
      "img": "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "username": "Elva McDonald",
      "email": "elva@gmail.com",
      "amount": "3.668"
    },
    {
      "id": 2,
      "img": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "username": "Linnie Nelson",
      "email": "linnie@gmail.com",
      "amount": "3.256"
    },
    {
      "id": 3,
      "img": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "username": "Brent Reeves",
      "email": "brent@gmail.com",
      "amount": "2.998"
    },
    {
      "id": 4,
      "img": "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
      "username": "Mina Holmes",
      "email": "mina@gmail.com",
      "amount": "5.760"
    },
    {
      "id": 5,
      "img": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "username": "Clifford Ross",
      "email": "clifford@gmail.com",
      "amount": "1.340"
    },
    {
      "id": 6,
      "img": "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "username": "Nellie Alvarez",
      "email": "nellie@gmail.com",
      "amount": "7.222"
    },
    {
      "id": 7,
      "img": "https://images.pexels.com/photos/2526108/pexels-photo-2526108.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "username": "Gordon Freeman",
      "email": "gordon@gmail.com",
      "amount": "4.987"
    }
  ]


  export const chartBoxUser = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Users",
    number: "11.238",
    dataKey: "users",
    percentage: 45,
    chartData: [
      { name: "Sun", users: 400 },
      { name: "Mon", users: 600 },
      { name: "Tue", users: 500 },
      { name: "Wed", users: 700 },
      { name: "Thu", users: 400 },
      { name: "Fri", users: 500 },
      { name: "Sat", users: 450 },
    ],
  };

  export const chartBoxProduct = {
    color: "skyblue",
    icon: "/productIcon.svg",
    title: "Total Products",
    number: "238",
    dataKey: "products",
    percentage: 21,
    chartData: [
      { name: "Sun", products: 400 },
      { name: "Mon", products: 600 },
      { name: "Tue", products: 500 },
      { name: "Wed", products: 700 },
      { name: "Thu", products: 400 },
      { name: "Fri", products: 500 },
      { name: "Sat", products: 450 },
    ],
  };

  export const chartBoxRevenue = {
    color: "teal",
    icon: "/revenueIcon.svg",
    title: "Total Revenue",
    number: "$56.432",
    dataKey: "revenue",
    percentage: -12,
    chartData: [
      { name: "Sun", revenue: 400 },
      { name: "Mon", revenue: 600 },
      { name: "Tue", revenue: 500 },
      { name: "Wed", revenue: 700 },
      { name: "Thu", revenue: 400 },
      { name: "Fri", revenue: 500 },
      { name: "Sat", revenue: 450 },
    ],
  };
  
  export const chartBoxConversion = {
    color: "gold",
    icon: "/conversionIcon.svg",
    title: "Total Ratio",
    number: "2.6",
    dataKey: "ratio",
    percentage: 12,
    chartData: [
      { name: "Sun", ratio: 400 },
      { name: "Mon", ratio: 600 },
      { name: "Tue", ratio: 500 },
      { name: "Wed", ratio: 700 },
      { name: "Thu", ratio: 400 },
      { name: "Fri", ratio: 500 },
      { name: "Sat", ratio: 450 },
    ],
  };

  export const barChartBoxRevenue = {
    title: "Profit Earned",
    color: "#8884d8",
    dataKey: "profit",
    chartData: [
        {
            name: "Sun",
            profit: 4000,
        },
        {
            name: "Mon",
            profit: 3000,
        },
        {
            name: "Tue",
            profit: 2000,
        },
        {
            name: "Wed",
            profit: 2780,
        },
        {
            name: "Thu",
            profit: 1890,
        },
        {
            name: "Fri",
            profit: 2390,
        },
        {
            name: "Sat",
            profit: 3490,
        }
    ]
  }

  export const barChartBoxVisit = {
    title: "Total Visits",
    color: "#FF8042",
    dataKey: "visits",
    chartData: [
        {
            name: "Sun",
            visits: 4000,
        },
        {
            name: "Mon",
            visits: 3000,
        },
        {
            name: "Tue",
            visits: 2000,
        },
        {
            name: "Wed",
            visits: 2780,
        },
        {
            name: "Thu",
            visits: 1890,
        },
        {
            name: "Fri",
            visits: 2390,
        },
        {
            name: "Sat",
            visits: 3490,
        }
    ]
  }