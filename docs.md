Ryan's Notes:

- Avg converted job by zip code rev/converted ... look at isConverted
    - list of each zip code with count of isConverted equal to true
    - need to stack up Revenue associated with those fuckers 

    Tooltip:
    Zip: 70706
    IsConverted: 58
    Revenue: $26,768

- Tech close rate by zip code
    Tooltip:
    Zip: 7076
    Tech Close Rate: 21%

- Map with the highest conversion rates by tickets (what is this calculation?)
- Waiting on table


Tech Close Rate equals: 

Home Chart:
Total Completed Jobs
Unique Customers Book = New Customers
Total Revenue needs to be a dollar figure



// Tech Close Rate
const isConvertedMap = new Map();
jobsCompleted.forEach(() => {
	isConvertedMap.set(jobsCompleted.isConverted == true, 1, DATEMONTH);
});

const isConvertedCount = isConvertedMap.get('isConvertedCount');
const techCloseRate = parseInt(isConvertedCount) / parseInt(isConverted.length);
console.log(techCloseRate) // ship this