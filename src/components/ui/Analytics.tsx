import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { ChartCards } from '../analytics/ChartCards.tsx';
import { ExpenseBreakdown } from '../analytics/ExpenseBreakdown';
import { DailySalesChart } from '../analytics/DailySalesChart';
import { FinancialMetrics } from '../analytics/FinancialMetrics';
import { SalesDetailModal } from '../analytics/SalesDetailsModal.tsx';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];

interface DaySalesDetail {
  date: string;
  sales: any[];
  totalSales: number;
  customerName?: string;
  timestamp?: string;
}

export const Analytics = () => {
  const [businessData, setBusinessData] = useState<any[]>([]);
  const [selectedDayDetails, setSelectedDayDetails] = useState<DaySalesDetail | null>(null);
  const [showDayDetails, setShowDayDetails] = useState(false);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('businessData') || '[]');
    setBusinessData(data);
    console.log('Analytics data loaded:', data);
  }, []);

  // Process data for profit/loss analysis
  const profitLossData = businessData.map(day => {
    const sales = day.totalSales || 0;
    const expenses = (day.totalAllExpenses || day.totalExpenses || day.totalProductExpenses || 0) + 
                   (day.expenses?.reduce((sum: number, exp: any) => sum + parseFloat(exp.amount || 0), 0) || 0);
    return {
      date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sales,
      expenses,
      profit: sales - expenses
    };
  });

  // Process expense categories for pie chart - combine all expenses with unique colors
  const expenseCategories = businessData.reduce((acc: any, day) => {
    console.log('Processing day for expenses:', day);
    
    // Add operational expenses from expense tracking
    if (day.expenses && Array.isArray(day.expenses)) {
      console.log('Found operational expenses:', day.expenses);
      day.expenses.forEach((expense: any) => {
        const category = expense.category || 'Other';
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
        const amount = parseFloat(expense.amount || 0);
        console.log(`Adding operational expense: ${categoryName} = ${amount}`);
        acc[categoryName] = (acc[categoryName] || 0) + amount;
      });
    }
    
    // Add product-related expenses (cost of goods sold)
    const productExpenses = day.totalProductExpenses || day.totalExpenses || 0;
    if (productExpenses > 0) {
      console.log(`Adding COGS: ${productExpenses}`);
      acc['Cost Of Goods Sold'] = (acc['Cost Of Goods Sold'] || 0) + productExpenses;
    }
    
    return acc;
  }, {});

  console.log('Final expense categories:', expenseCategories);

  // Create pie data with unique colors for each category - ensure each category gets a different color
  const expensePieData = Object.entries(expenseCategories)
    .filter(([, value]) => Number(value) > 0)
    .map(([name, value], index) => {
      console.log(`Creating pie data for ${name}: $${Number(value)} with color ${COLORS[index % COLORS.length]}`);
      return {
        name,
        value: Number(value),
        color: COLORS[index % COLORS.length]
      };
    });

  console.log('Expense pie data for chart:', expensePieData);

  // Daily sales patterns - aggregate by date with profit and expense data
  const dailySalesMap = businessData.reduce((acc: any, transaction) => {
    const date = transaction.date;
    const dateKey = new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        originalDate: date,
        sales: 0,
        expenses: 0,
        profit: 0,
        transactions: 0,
        details: []
      };
    }
    
    const dayExpenses = (transaction.totalAllExpenses || transaction.totalExpenses || transaction.totalProductExpenses || 0) + 
                       (transaction.expenses?.reduce((expSum: number, exp: any) => expSum + parseFloat(exp.amount || 0), 0) || 0);
    
    acc[dateKey].sales += transaction.totalSales || 0;
    acc[dateKey].expenses += dayExpenses;
    acc[dateKey].profit += (transaction.totalSales || 0) - dayExpenses;
    acc[dateKey].transactions += 1;
    acc[dateKey].details.push({
      customerName: transaction.customerName || 'Guest',
      sales: transaction.sales || [],
      totalSales: transaction.totalSales || 0,
      timestamp: transaction.timestamp || new Date(transaction.date).toISOString()
    });
    
    return acc;
  }, {});

  const dailyPatterns = Object.values(dailySalesMap).sort((a: any, b: any) => 
    new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime()
  );

  // Key metrics
  const totalRevenue = businessData.reduce((sum, day) => sum + (day.totalSales || 0), 0);
  const totalExpenses = businessData.reduce((sum, day) => {
    const dayExpenses = (day.totalAllExpenses || day.totalExpenses || day.totalProductExpenses || 0) + 
                       (day.expenses?.reduce((expSum: number, exp: any) => expSum + parseFloat(exp.amount || 0), 0) || 0);
    return sum + dayExpenses;
  }, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  const avgDailySales = businessData.length > 0 ? (totalRevenue / Object.keys(dailySalesMap).length) : 0;
  const roi = totalExpenses > 0 ? ((netProfit / totalExpenses) * 100) : 0;

  const handleBarClick = (data: any) => {
    const dayData = dailySalesMap[data.date];
    if (dayData) {
      setSelectedDayDetails({
        date: data.date,
        sales: dayData.details.flatMap((detail: any) => 
          detail.sales.map((sale: any) => ({
            ...sale,
            customerName: detail.customerName,
            timestamp: detail.timestamp
          }))
        ),
        totalSales: dayData.sales
      });
      setShowDayDetails(true);
    }
  };

  return (
    <div className="space-y-8">
      {businessData.length === 0 ? (
        <Card className="glass-card neon-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="w-16 h-16 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Data Available</h3>
            <p className="text-slate-400 text-center">
              Add some transactions in the Data Entry tab to see analytics and insights.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCards profitLossData={profitLossData} />
            <DailySalesChart dailyPatterns={dailyPatterns} onBarClick={handleBarClick} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ExpenseBreakdown expensePieData={expensePieData} />
            <FinancialMetrics 
              totalRevenue={totalRevenue}
              totalExpenses={totalExpenses}
              netProfit={netProfit}
              profitMargin={profitMargin}
              avgDailySales={avgDailySales}
              roi={roi}
            />
          </div>
        </>
      )}

      <SalesDetailModal 
        showDayDetails={showDayDetails}
        setShowDayDetails={setShowDayDetails}
        selectedDayDetails={selectedDayDetails}
      />
    </div>
  );
};
