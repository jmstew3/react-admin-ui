import { useState, useEffect } from 'react';

function useGetBudgetData() {

    const [budgetData, setBudgetData] = useState([]);
    const [budgetDataError, setBudgetDataError] = useState(null);
    const [budgetDataisLoading, setBudgetDataisLoading] = useState(false);

    useEffect(() => {
        const fetchBudgetData = async () => {
            setBudgetDataisLoading(true);
            setBudgetDataError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/budgets/brand/budgets/apollohome`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBudgetData(data.budget);
            } catch (error) {
                setBudgetDataError(error.message);
                setBudgetData([]);
            } finally {
                setBudgetDataisLoading(false);
            }
        };

        fetchBudgetData();
    }, []);

    return { budgetData, budgetDataError, budgetDataisLoading };
}

export default useGetBudgetData;