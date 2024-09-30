export const menu = 
[
  {
    id: 1,
    title: "Keyword Volume",
    listItems: [
      {
        id: 1,
        title: "Search Volume",
        url: "/keyword-volume/",
        icon: "/element.svg",
      },
      {
        id: 2,
        title: "Keyword List",
        url: "/keyword-list/",
        icon: "/element.svg",
      }
    ],
  },
  {
    id: 2,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Dashboard",
        url: "/",
        icon: "/element.svg",
      },
    ],
  },
  {
    id: 3,
    title: "menu",
    listItems: [
      // {
      //   id: 1,
      //   title: "Business",
      //   url: "/business",
      //   icon: "/chart.svg",
      // },
      {
        id: 2,
        title: "Calls",
        url: "/calls",
        icon: "/phone.svg",
      },
      {
        id: 3,
        title: "Marketing",
        url: "/marketing",
        icon: "/marketing.svg",
      },
      {
        id: 4,
        title: "Competitors",
        url: "/competitors",
        icon: "/marketing.svg",
      },
      {
        id: 5,
        title: "Historical Keywords",
        url: "/historical-keywords",
        icon: "/marketing.svg",
      },
    ],
  },
  // {
  //   id: 3,
  //   title: "analytics",
  //   listItems: [
  //     {
  //       id: 1,
  //       title: "Business",
  //       url: "/business",
  //       icon: "/chart.svg",
  //     },
  //     {
  //       id: 2,
  //       title: "Calls",
  //       url: "/calls",
  //       icon: "/phone.svg",
  //     },
  //     {
  //       id: 3,
  //       title: "Marketing",
  //       url: "/marketing",
  //       icon: "/marketing.svg",
  //     },
  //     {
  //       id: 4,
  //       title: "Users",
  //       url: "/users",
  //       icon: "/profile.svg",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   title: "Experimental",
  //   listItems: [
  //     {
  //       id: 1,
  //       title: "Products",
  //       url: "/products",
  //       icon: "/product.svg",
  //     },
  //   ],
  // },
];

export const topDealUsers = [
  {
    id: 1,
    img: "public/apollo logo.jpg",
    username: "Apollo Home Services",
    email: "Cincinatti, OH",
    amount: "3.668",
  },
  {
    id: 2,
    img: "public/anthony-logo.png",
    username: "Kansas City, MS",
    email: "linnie@gmail.com",
    amount: "3.256",
  },
  {
    id: 3,
    img: "public/Hunter-Logo.png",
    username: "Hunter Super Techs",
    email: "Oklahoma City, OK",
    amount: "2.998",
  },
  {
    id: 4,
    img: "public/Fayette_Listen360.jpg",
    username: "Fayette Heating & Air",
    email: "Lexington, KY",
    amount: "5.760",
  },
  {
    id: 5,
    img: "public/Chapman logo.png",
    username: "Chapman HVAC",
    email: "Indianapolis, IN",
    amount: "1.340",
  },
  {
    id: 6,
    img: "public/Corley_Logo_Square.png",
    username: "Corley Plumbing Air Electric",
    email: "Greenville, SC",
    amount: "7.222",
  },
  {
    id: 7,
    img: "public/Tiger Head-01.png",
    username: "Tiger Heating, Plumbing & Air",
    email: "Collinsville, IL",
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
    inStock: true,
  },
  {
    id: 2,
    img: "",
    title: "Apple Magic Mouse 2",
    color: "Silver",
    producer: "Apple",
    price: "$79.00",
    createdAt: "05.03.2023",
    inStock: false,
  },
  {
    id: 3,
    img: "",
    title: "Razer DeathAdder Elite",
    color: "Black",
    producer: "Razer",
    price: "$49.99",
    createdAt: "02.17.2023",
    inStock: true,
  },
  {
    id: 4,
    img: "",
    title: "Microsoft Surface Mouse",
    color: "Platinum",
    producer: "Microsoft",
    price: "$54.99",
    createdAt: "03.12.2023",
    inStock: false,
  },
  {
    id: 5,
    img: "",
    title: "Dell Wireless Mouse WM126",
    color: "Red",
    producer: "Dell",
    price: "$16.99",
    createdAt: "08.06.2023",
    inStock: true,
  },
  {
    id: 6,
    img: "",
    title: "HP Z3700 Wireless Mouse",
    color: "Black",
    producer: "HP",
    price: "$29.99",
    createdAt: "04.25.2023",
    inStock: true,
  },
  {
    id: 7,
    img: "",
    title: "Anker Ergonomic Optical USB Mouse",
    color: "Matte Black",
    producer: "Anker",
    price: "$19.99",
    createdAt: "02.01.2023",
    inStock: true,
  },
  {
    id: 8,
    img: "",
    title: "Corsair Scimitar RGB Elite",
    color: "Yellow",
    producer: "Corsair",
    price: "$79.99",
    createdAt: "12.29.2023",
    inStock: true,
  },
];

export const singleUser = {
  id: 1,
  title: "Jane Doe",
  img: "../../public/Images/solo-female-1-ai.png",
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
      { name: "clicks", color: "#8884d8" },
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
      },
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
    },
  ],
};

export const tombStoneBox = {};

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
      { name: "orders", color: "#8884d8" },
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
    },
  ],
};

export const business = [
  {
    JobNumber: "1000317",
    JobType: "MTU Heating - 1-9 - KY",
    Campaign: "MPro FREE System Check",
    CampaignCategory: "Digital - Email (M)",
    Category: "HVAC",
    Total: "0",
    CompletionDate: "2023-12-15T00:00:00-05:00",
    TotalRevenue: "0",
    MemberStatus: "Inactive",
    CustomerType: "Residential",
    LocationAddress: "401 East 17th Street, Covington, KY 41014 USA",
    CustomerAddress: "401 East 17th Street, Covington, KY 41014 USA",
    CustomerName: "Matthew Brown",
    CustomerId: "259573109",
    SoldOn: null,
    CreatedDate: "2023-01-27T00:00:00-05:00",
    ScheduledDateYearMonth: "2023-12",
    IsConverted: false,
    LeadGeneratedFromSource: "Marketed Lead",
    JobStatus: "Completed",
    CallCampaign: null,
    JobId: "311559987",
    id: "311559987",
  },
  {
    JobNumber: "1039829",
    JobType: "MTU COMBO (Heat/Cool) 1-9",
    Campaign: "Digital-ScheduleEngine-Texting",
    CampaignCategory: "Digital - Schedule Engine (M)",
    Category: "HVAC",
    Total: "0",
    CompletionDate: "2023-12-26T00:00:00-05:00",
    TotalRevenue: "0",
    MemberStatus: "Active",
    CustomerType: "Residential",
    LocationAddress: "2946 Fair Oak Road, Amelia, OH 45102 USA",
    CustomerAddress: "2946 FAIROAK RD, AMELIA, OH 45102 USA",
    CustomerName: "JASON SCARDINA (Employee)",
    CustomerId: "22147405",
    SoldOn: null,
    CreatedDate: "2023-08-25T00:00:00-04:00",
    ScheduledDateYearMonth: "2023-12",
    IsConverted: false,
    LeadGeneratedFromSource: "Marketed Lead",
    JobStatus: "Completed",
    CallCampaign: null,
    JobId: "349515726",
    id: "349515726",
  },
  {
    JobNumber: "1040347",
    JobType: "MTU Heating - 1-9",
    Campaign: "Summer Heatwave- August 2023",
    CampaignCategory: "Digital - Email (M)",
    Category: "HVAC",
    Total: "67",
    CompletionDate: "2023-12-26T00:00:00-05:00",
    TotalRevenue: "67",
    MemberStatus: "Inactive",
    CustomerType: "Residential",
    LocationAddress: "2487 Trinity Drive, Middletown, OH 45044 USA",
    CustomerAddress: "2487 Trinity Drive, Middletown, OH 45044 USA",
    CustomerName: "Anuradha Sudame",
    CustomerId: "143163682",
    SoldOn: null,
    CreatedDate: "2023-08-28T00:00:00-04:00",
    ScheduledDateYearMonth: "2023-12",
    IsConverted: false,
    LeadGeneratedFromSource: "Marketed Lead",
    JobStatus: "Completed",
    CallCampaign: "November Specials- 2023",
    JobId: "349847484",
    id: "349847484",
  },
];

export const callData = [
  { monthYear: 'Jan 2022', totalInboundCalls: 9500, totalUniqueInboundCalls: 5000 },
  { monthYear: 'Feb 2022', totalInboundCalls: 8700, totalUniqueInboundCalls: 4800 },
  { monthYear: 'Mar 2022', totalInboundCalls: 9300, totalUniqueInboundCalls: 5100 },
  { monthYear: 'Apr 2022', totalInboundCalls: 9000, totalUniqueInboundCalls: 5300 },
  { monthYear: 'May 2022', totalInboundCalls: 9200, totalUniqueInboundCalls: 5500 },
  { monthYear: 'Jun 2022', totalInboundCalls: 8900, totalUniqueInboundCalls: 5400 },
  { monthYear: 'Jul 2022', totalInboundCalls: 9100, totalUniqueInboundCalls: 5200 },
  { monthYear: 'Aug 2022', totalInboundCalls: 8700, totalUniqueInboundCalls: 5000 },
  { monthYear: 'Sep 2022', totalInboundCalls: 8800, totalUniqueInboundCalls: 4900 },
  { monthYear: 'Oct 2022', totalInboundCalls: 9400, totalUniqueInboundCalls: 5200 },
  { monthYear: 'Nov 2022', totalInboundCalls: 9300, totalUniqueInboundCalls: 5100 },
  { monthYear: 'Dec 2022', totalInboundCalls: 9200, totalUniqueInboundCalls: 5000 },
  { monthYear: 'Jan 2023', totalInboundCalls: 10000, totalUniqueInboundCalls: 6000 },
  { monthYear: 'Feb 2023', totalInboundCalls: 9500, totalUniqueInboundCalls: 5800 },
  { monthYear: 'Mar 2023', totalInboundCalls: 9800, totalUniqueInboundCalls: 5900 },
  { monthYear: 'Apr 2023', totalInboundCalls: 9700, totalUniqueInboundCalls: 6000 },
  { monthYear: 'May 2023', totalInboundCalls: 10200, totalUniqueInboundCalls: 6200 },
  { monthYear: 'Jun 2023', totalInboundCalls: 9600, totalUniqueInboundCalls: 6100 },
  { monthYear: 'Jul 2023', totalInboundCalls: 9800, totalUniqueInboundCalls: 6000 },
  { monthYear: 'Aug 2023', totalInboundCalls: 9500, totalUniqueInboundCalls: 5800 },
  { monthYear: 'Sep 2023', totalInboundCalls: 9300, totalUniqueInboundCalls: 5700 },
  { monthYear: 'Oct 2023', totalInboundCalls: 9700, totalUniqueInboundCalls: 6000 },
  { monthYear: 'Nov 2023', totalInboundCalls: 9500, totalUniqueInboundCalls: 5900 },
  { monthYear: 'Dec 2023', totalInboundCalls: 9200, totalUniqueInboundCalls: 5700 },
];