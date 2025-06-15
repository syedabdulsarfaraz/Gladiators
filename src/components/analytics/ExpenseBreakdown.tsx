import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartPie } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];

interface ExpenseBreakdownProps {
  expensePieData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const ExpenseBreakdown = ({ expensePieData }: ExpenseBreakdownProps) => {
  console.log('ExpenseBreakdown received data:', expensePieData);

  // Use the colors already assigned in the Analytics component
  const dataWithColors = expensePieData.map((item) => ({
    ...item,
    fill: item.color // Recharts uses 'fill' property for colors
  }));

  console.log('ExpenseBreakdown processed data with fill colors:', dataWithColors);

  return (
    <Card className="glass-card neon-border hover:cyber-glow transition-all duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <ChartPie className="w-5 h-5 text-cyan-400" />
          Expense Breakdown
        </CardTitle>
        <CardDescription className="text-slate-400">Cost distribution analysis</CardDescription>
      </CardHeader>
      <CardContent>
        {dataWithColors.length > 0 ? (
          <>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={dataWithColors}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    fontSize={12}
                  >
                    {dataWithColors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#f8fafc'
                    }}
                    formatter={(value: any, name: string) => [`$${Number(value).toFixed(2)}`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {dataWithColors.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300">{item.name}</span>
                  <span className="text-slate-400">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-slate-400">
            <ChartPie className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No expense data yet</p>
            <p className="text-sm mt-2">Add expenses in Data Entry to see breakdown</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
