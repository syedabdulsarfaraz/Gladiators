import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Target,
  Calendar,
  Zap,
  Activity,
  BarChart3
} from 'lucide-react';

export const DashboardOverview = () => {
  const [businessData, setBusinessData] = useState<any[]>([]);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('businessData') || '[]');
    setBusinessData(data);
  }, []);

  const getTotalRevenue = () => {
    return businessData.reduce((sum, day) => sum + (day.totalSales || 0), 0);
  };

  const getTotalExpenses = () => {
    return businessData.reduce((sum, day) => {
      const dayExpenses = day.expenses?.reduce((expSum: number, exp: any) => expSum + parseFloat(exp.amount || 0), 0) || 0;
      return sum + dayExpenses;
    }, 0);
  };

  const getProfit = () => {
    return getTotalRevenue() - getTotalExpenses();
  };

  const getTransactionCount = () => {
    return businessData.reduce((sum, day) => sum + (day.sales?.length || 0), 0);
  };

  const getAverageTransaction = () => {
    const totalTransactions = getTransactionCount();
    return totalTransactions > 0 ? getTotalRevenue() / totalTransactions : 0;
  };

  const getProfitMargin = () => {
    const revenue = getTotalRevenue();
    return revenue > 0 ? (getProfit() / revenue) * 100 : 0;
  };

  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${getTotalRevenue().toFixed(2)}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      description: 'vs last quantum cycle',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Net Profit',
      value: `$${getProfit().toFixed(2)}`,
      change: getProfit() >= 0 ? '+15.3%' : '-8.2%',
      changeType: getProfit() >= 0 ? 'positive' : 'negative',
      icon: TrendingUp,
      description: 'profit margin',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Transactions',
      value: getTransactionCount().toString(),
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      description: 'active data streams',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Avg. Transaction',
      value: `$${getAverageTransaction().toFixed(2)}`,
      change: getProfitMargin() >= 0 ? 'Optimized' : 'Needs focus',
      changeType: getProfitMargin() >= 0 ? 'positive' : 'negative',
      icon: Activity,
      description: 'per transaction',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  const recentActivity = businessData.slice(-5).reverse().map(day => ({
    date: day.date,
    sales: day.totalSales || 0,
    transactions: day.sales?.length || 0,
    profit: (day.totalSales || 0) - (day.expenses?.reduce((sum: number, exp: any) => sum + parseFloat(exp.amount || 0), 0) || 0)
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="glass-card hover:cyber-glow transition-all duration-500 group cursor-pointer holographic">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.gradient} group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                {metric.value}
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={metric.changeType === 'positive' ? 'default' : 
                          metric.changeType === 'negative' ? 'destructive' : 'secondary'}
                  className={`text-xs ${
                    metric.changeType === 'positive' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    metric.changeType === 'negative' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    'bg-slate-500/20 text-slate-400 border-slate-500/30'
                  }`}
                >
                  {metric.changeType === 'positive' && <TrendingUp className="w-3 h-3 mr-1" />}
                  {metric.changeType === 'negative' && <TrendingDown className="w-3 h-3 mr-1" />}
                  {metric.change}
                </Badge>
                <p className="text-xs text-slate-400">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card neon-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="w-5 h-5 text-cyan-400" />
              Business Performance
            </CardTitle>
            <CardDescription className="text-slate-400">Real-time neural metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Profit Margin</span>
                <span className="text-cyan-400 font-medium">{getProfitMargin().toFixed(1)}%</span>
              </div>
              <Progress value={Math.max(0, Math.min(100, getProfitMargin()))} className="h-3 bg-slate-700" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Revenue Growth</span>
                <span className="text-emerald-400 font-medium">+18.2%</span>
              </div>
              <Progress value={78} className="h-3 bg-slate-700" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Cost Efficiency</span>
                <span className="text-purple-400 font-medium">82%</span>
              </div>
              <Progress value={82} className="h-3 bg-slate-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card neon-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-slate-400">Latest business transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.profit >= 0 ? 'bg-emerald-400' : 'bg-red-400'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                        ${activity.sales.toFixed(2)} sales
                      </p>
                      <p className="text-xs text-slate-400">{activity.date} • {activity.transactions} transactions</p>
                    </div>
                  </div>
                  <Badge 
                    variant={activity.profit >= 0 ? 'default' : 'destructive'}
                    className={`${
                      activity.profit >= 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                      'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    {activity.profit >= 0 ? '+' : ''}${activity.profit.toFixed(2)}
                  </Badge>
                </div>
              )) : (
                <div className="text-center py-8 text-slate-400">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No transaction data yet</p>
                  <p className="text-sm">Start by adding sales in Data Entry</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
