import React, { createContext, useContext, ReactNode, useState, FunctionComponent } from 'react';

interface DateRange {
    fromDate: string;
    toDate: string;
}

interface DateContextType {
    dateRange: DateRange;
    setDateRange: (newRange: DateRange) => void;
}

// Create a context with an undefined initial value, as we will always use it within the provider
const DateContext = createContext<DateContextType | undefined>(undefined);

interface DateProviderProps {
    children: ReactNode;
    initialFromDate?: string;
    initialToDate?: string;
}

export const DateProvider: FunctionComponent<DateProviderProps> = ({ children, initialFromDate, initialToDate }) => {
    const [dateRange, setDateRange] = useState<DateRange>({
        fromDate: initialFromDate || new Date().toISOString().split('T')[0], // Defaults to today's date if not provided
        toDate: initialToDate || new Date().toISOString().split('T')[0]     // Defaults to today's date if not provided
    });

    return (
        <DateContext.Provider value={{ dateRange, setDateRange }}>
            {children}
        </DateContext.Provider>
    );
};

// Hook to use the date context
export const useDate = (): DateContextType => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDate must be used within a DateProvider');
    }
    return context;
};