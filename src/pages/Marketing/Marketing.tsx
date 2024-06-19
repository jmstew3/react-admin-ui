import React from 'react';
import MarketingBudgetTable from '../../components/MarketingBudgetTable/MarketingBudgetTable';
import './marketing.scss';

const Marketing: React.FC = () => {
  return (
    <div className="marketing">
      <h1>Marketing</h1>
      <MarketingBudgetTable />
    </div>
  );
};

export default Marketing;