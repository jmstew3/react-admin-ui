export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/",
        icon: "/home.svg",
      },
    ],
  },
  {
    id: 2,
    title: "menu",
    listItems: [
      {
        id: 1,
        title: "Business",
        url: "/business",
        icon: "/profile.svg",
      },
      {
        id: 2,
        title: "Calls",
        url: "/calls",
        icon: "/profile.svg",
      },
      {
        id: 3,
        title: "Marketing",
        url: "/marketing",
        icon: "/profile.svg",
      },
    ],
  },
  {
    id: 3,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Business",
        url: "/business",
        icon: "/profile.svg",
      },
      {
        id: 2,
        title: "Calls",
        url: "/calls",
        icon: "/profile.svg",
      },
      {
        id: 3,
        title: "Marketing",
        url: "/marketing",
        icon: "/profile.svg",
      },
      {
        id: 4,
        title: "Users",
        url: "/users",
        icon: "/profile.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Experimental",
    listItems: [
      {
        id: 1,
        title: "Products",
        url: "/products",
        icon: "/profile.svg",
      }
    ],
  },
];




export const topDealUsers = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Elva McDonald",
    email: "elva@gmail.com",
    amount: "3.668",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Linnie Nelson",
    email: "linnie@gmail.com",
    amount: "3.256",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Brent Reeves",
    email: "brent@gmail.com",
    amount: "2.998",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
    username: "Mina Holmes",
    email: "mina@gmail.com",
    amount: "5.760",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Clifford Ross",
    email: "clifford@gmail.com",
    amount: "1.340",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Nellie Alvarez",
    email: "nellie@gmail.com",
    amount: "7.222",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/2526108/pexels-photo-2526108.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Gordon Freeman",
    email: "gordon@gmail.com",
    amount: "4.987",
  },
];




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
    },
  ],
};




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
    },
  ],
};




export const pieChartBoxData = {
  title: "Leads By Source",
  color: "#FF8042",
  dataKey: "value",
  chartData: [
    {
      name: "Mobile",
      value: 400,
      color: "#0088FE",
    },
    {
      name: "Laptop",
      value: 300,
      color: "#00C49F",
    },
    {
      name: "Tablet",
      value: 300,
      color: "#FFBB28",
    },
    {
      name: "Desktop",
      value: 200,
      color: "#FF8042",
    },
    {
      name: "Others",
      value: 100,
      color: "#AF19FF",
    },
  ],
};




export const userRows = [
  {
    id: 1,
    lastName: "Bennett",
    firstName: "Eliana",
    email: "example@gmail.com",
    avatar: "",
    verified: true,
    phone: "(123) 456-7890",
  },
  {
    id: 2,
    lastName: "Morrison",
    firstName: "Liam",
    email: "example@gmail.com",
    avatar: "",
    verified: false,
    phone: "(123) 456-7890",
  },
  {
    id: 3,
    lastName: "Fitzgerald",
    firstName: "Nora",
    email: "example@gmail.com",
    avatar: "",
    verified: false,
    phone: "(123) 456-7890",
  },
  {
    id: 4,
    lastName: "Quinn",
    firstName: "Oliver",
    email: "example@gmail.com",
    avatar: "",
    verified: true,
    phone: "(123) 456-7890",
  },
  {
    id: 5,
    lastName: "Blackwood",
    firstName: "Maya",
    email: "example@gmail.com",
    avatar: "",
    verified: false,
    phone: "(123) 456-7890",
  },
  {
    id: 6,
    lastName: "Hart",
    firstName: "Theo",
    email: "example@gmail.com",
    avatar: "",
    verified: true,
    phone: "(123) 456-7890",
  },
  {
    id: 7,
    lastName: "Cunningham",
    firstName: "Isabella",
    email: "example@gmail.com",
    avatar: "",
    verified: true,
    phone: "(123) 456-7890",
  },
  {
    id: 8,
    lastName: "Whitaker",
    firstName: "Henry",
    email: "example@gmail.com",
    avatar: "",
    verified: true,
    phone: "(123) 456-7890",
  },
  {
    id: 9,
    lastName: "Dunn",
    firstName: "Charlotte",
    email: "example@gmail.com",
    avatar: "",
    verified: true,
    phone: "(123) 456-7890",
  },
  {
    id: 10,
    lastName: "Hawkins",
    firstName: "Ethan",
    email: "example@gmail.com",
    avatar: "",
    verified: true,
    phone: "(123) 456-7890",
  },
  {
    id: 11,
    lastName: "Sullivan",
    firstName: "Zoe",
    email: "example@gmail.com",
    avatar: "",
    verified: true,
    phone: "(123) 456-7890",
  },
  {
    id: 12,
    lastName: "Bradley",
    firstName: "Jack",
    email: "example@gmail.com",
    avatar: "",
    verified: true,
    phone: "(123) 456-7890",
  },
  {
    id: 13,
    lastName: "Page",
    firstName: "Sophia",
    email: "example@gmail.com",
    avatar: "",
    verified: false,
    phone: "(123) 456-7890",
  },
  {
    id: 14,
    lastName: "Monroe",
    firstName: "Mason",
    email: "example@gmail.com",
    avatar: "",
    verified: false,
    phone: "(123) 456-7890",
  },
  {
    id: 15,
    lastName: "Davidson",
    firstName: "Ella",
    email: "example@gmail.com",
    avatar: "",
    verified: false,
    phone: "(123) 456-7890",
  },
];

export const products = [
  {
    id: 1,
    img: "",
    title: "Logitech MX Master 3",
    color: "Graphite",
    producer: "Logitech",
    price: "$99.99",
    createdAt: "01.20.2023",
    inStock: true
  },
  {
    id: 2,
    img: "",
    title: "Apple Magic Mouse 2",
    color: "Silver",
    producer: "Apple",
    price: "$79.00",
    createdAt: "05.03.2023",
    inStock: false
  },
  {
    id: 3,
    img: "",
    title: "Razer DeathAdder Elite",
    color: "Black",
    producer: "Razer",
    price: "$49.99",
    createdAt: "02.17.2023",
    inStock: true
  },
  {
    id: 4,
    img: "",
    title: "Microsoft Surface Mouse",
    color: "Platinum",
    producer: "Microsoft",
    price: "$54.99",
    createdAt: "03.12.2023",
    inStock: false
  },
  {
    id: 5,
    img: "",
    title: "Dell Wireless Mouse WM126",
    color: "Red",
    producer: "Dell",
    price: "$16.99",
    createdAt: "08.06.2023",
    inStock: true
  },
  {
    id: 6,
    img: "",
    title: "HP Z3700 Wireless Mouse",
    color: "Black",
    producer: "HP",
    price: "$29.99",
    createdAt: "04.25.2023",
    inStock: true
  },
  {
    id: 7,
    img: "",
    title: "Anker Ergonomic Optical USB Mouse",
    color: "Matte Black",
    producer: "Anker",
    price: "$19.99",
    createdAt: "02.01.2023",
    inStock: true
  },
  {
    id: 8,
    img: "",
    title: "Corsair Scimitar RGB Elite",
    color: "Yellow",
    producer: "Corsair",
    price: "$79.99",
    createdAt: "12.29.2023",
    inStock: true
  },
];




export const singleUser = {
  id: 1,
  title: "Jane Doe",
  img: "",
  info: {
    username: "Janedoe99",
    fullname: "Jane Doe",
    email: "janedoe@gmail.com",
    phone: "(123) 456-7890",
    status: "verified",
  },
  chart: {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "sales", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        visits: 4000,
        clicks: 2400,
      },
      {
        name: "Mon",
        visits: 3000,
        clicks: 1398,
      },
      {
        name: "Tue",
        visits: 2000,
        clicks: 9800,
      },
      {
        name: "Wed",
        visits: 2780,
        clicks: 3908,
      },
      {
        name: "Thu",
        visits: 1890,
        clicks: 4800,
      },
      {
        name: "Fri",
        visits: 2390,
        clicks: 3800,
      },
      {
        name: "Sat",
        visits: 3490,
        clicks: 4300,
      }clicks
    ],
  },
  activities: [
    {
      text: "Jane Doe purchased Playstation 5 Digital Edition",
      time: "3 days ago",
    },
    {
      text: "Jane Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 week ago",
    },
    {
      text: "Jane Doe purchased Playstation 5 Digital Edition",
      time: "2 weeks ago",
    },
    {
      text: "Jane Doe reviewed the product",
      time: "1 month ago",
    },
    {
      text: "Jane Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 month ago",
    },
    {
      text: "Jane Doe added 1 item into their wishlist",
      time: "2 months ago",
    },
    {
      text: "Jane Doe reviewed a product",
      time: "3 months ago",
    }
  ]
}
export const singleProduct = {
  id: 1,
  title: "Playstation 5 Digital Edition",
  img: "",
  info: {
    productId: "Ps5SDF1156d",
    color: "white",
    price: "$250.99",
    producer: "Sony",
    export: "Japan",
  },
  chart: {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "sales", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        visits: 4000,
        orders: 2400,
      },
      {
        name: "Mon",
        visits: 3000,
        orders: 1398,
      },
      {
        name: "Tue",
        visits: 2000,
        orders: 9800,
      },
      {
        name: "Wed",
        visits: 2780,
        orders: 3908,
      },
      {
        name: "Thu",
        visits: 1890,
        orders: 4800,
      },
      {
        name: "Fri",
        visits: 2390,
        orders: 3800,
      },
      {
        name: "Sat",
        visits: 3490,
        orders: 4300,
      },
    ],
  },
  activities: [
    {
      text: "John Doe purchased Playstation 5 Digital Edition",
      time: "3 days ago",
    },
    {
      text: "Jane Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 week ago",
    },
    {
      text: "Mike Doe purchased Playstation 5 Digital Edition",
      time: "2 weeks ago",
    },
    {
      text: "Anna Doe reviewed the product",
      time: "1 month ago",
    },
    {
      text: "Michael Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 month ago",
    },
    {
      text: "John Doe added 1 item into their wishlist",
      time: "2 months ago",
    },
    {
      text: "John Doe reviewed a product",
      time: "3 months ago",
    }
  ]
}