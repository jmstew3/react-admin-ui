import React, { createContext, useContext, ReactNode, useState, FunctionComponent } from 'react';

interface DateRange {
    fromDate: string;
    toDate: string;
}

interface DateContextType {
    dateRange: DateRange;
    setDateRange: (newRange: DateRange | ((prevRange: DateRange) => DateRange)) => void;
}

const defaultDateRange: DateRange = {
    // fromDate: new Date().toISOString().split('T')[0],
    // toDate: new Date().toISOString().split('T')[0]
    fromDate: '2023-12-01',
    toDate: '2023-12-31'
};

const defaultContextValue: DateContextType = {
    dateRange: defaultDateRange,
    setDateRange: () => {}  // Placeholder
};

export const DateContext = createContext<DateContextType>(defaultContextValue);

export const DateProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [dateRange, setDateRangeState] = useState<DateRange>(defaultDateRange);

    const setDateRange = (newRange: DateRange | ((prevRange: DateRange) => DateRange)) => {
        setDateRangeState(prev => (typeof newRange === 'function' ? newRange(prev) : newRange));
    };

    return (
        <DateContext.Provider value={{ dateRange, setDateRange }}>
            {children}
        </DateContext.Provider>
    );
};
