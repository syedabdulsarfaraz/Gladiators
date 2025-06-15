import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComposedChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface DailySalesChartProps {
  dailyPatterns: any[];
  onBarClick: (data: any) => void;
}

export const DailySalesChart = ({ dailyPatterns, onBarClick }: DailySalesChartProps) => {
  return (
    <Card className="glass-card neon-border hover:cyber-glow transition-all duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          Daily Sales Patterns
        </CardTitle>
        <CardDescription className="text-slate-400">Click on bars to see detailed breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <ComposedChart data={dailyPatterns}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
                formatter={(value: any, name: string) => [`$${Number(value).toFixed(2)}`, name]}
              />
              <Bar 
                dataKey="profit" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                name="Daily Profit"
                onClick={onBarClick}
                style={{ cursor: 'pointer' }}
              />
              <Bar 
                dataKey="expenses" 
                fill="#ef4444" 
                radius={[4, 4, 0, 0]} 
                name="Daily Expenses"
                onClick={onBarClick}
                style={{ cursor: 'pointer' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
