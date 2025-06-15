import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface FinancialMetricsProps {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  avgDailySales: number;
  roi: number;
}

export const FinancialMetrics = ({ 
  totalRevenue, 
  totalExpenses, 
  netProfit, 
  profitMargin, 
  avgDailySales, 
  roi 
}: FinancialMetricsProps) => {
  return (
    <Card className="lg:col-span-2 glass-card neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <DollarSign className="w-5 h-5 text-cyan-400" />
          Financial Performance
        </CardTitle>
        <CardDescription className="text-slate-400">Key profitability metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
              <span className="text-sm font-medium text-slate-300">Total Revenue</span>
              <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30">
                ${totalRevenue.toFixed(2)}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-500/20">
              <span className="text-sm font-medium text-slate-300">Total Expenses</span>
              <Badge className="bg-red-600/20 text-red-400 border-red-500/30">
                ${totalExpenses.toFixed(2)}
              </Badge>
            </div>
            <div className={`flex justify-between items-center p-4 bg-gradient-to-r ${netProfit >= 0 ? 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20' : 'from-orange-500/10 to-red-500/10 border-orange-500/20'} rounded-xl border`}>
              <span className="text-sm font-medium text-slate-300">Net Profit</span>
              <Badge className={`${netProfit >= 0 ? 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30' : 'bg-orange-600/20 text-orange-400 border-orange-500/30'}`}>
                {netProfit >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                ${netProfit.toFixed(2)}
              </Badge>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-500/20">
              <span className="text-sm font-medium text-slate-300">Profit Margin</span>
              <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                {profitMargin.toFixed(1)}%
              </Badge>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
              <span className="text-sm font-medium text-slate-300">Avg Daily Sales</span>
              <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30">
                ${avgDailySales.toFixed(2)}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-500/10 to-gray-500/10 rounded-xl border border-slate-500/20">
              <span className="text-sm font-medium text-slate-300">ROI</span>
              <Badge className="bg-slate-600/20 text-slate-400 border-slate-500/30">
                {roi.toFixed(1)}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
