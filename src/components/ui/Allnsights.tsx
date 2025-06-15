
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  AlertTriangle,
  Calendar,
  DollarSign,
  ArrowRight
} from 'lucide-react';

export const AIInsights = () => {
  const predictions = [
    {
      metric: 'Next Week Sales',
      value: '$2,840',
      confidence: 87,
      trend: 'up',
      description: 'Based on seasonal patterns and recent performance'
    },
    {
      metric: 'Monthly Revenue',
      value: '$12,650',
      confidence: 92,
      trend: 'up',
      description: 'Projected to exceed last month by 8.5%'
    },
    {
      metric: 'Customer Growth',
      value: '+15%',
      confidence: 78,
      trend: 'up',
      description: 'New customer acquisition trending upward'
    }
  ];

  const recommendations = [
    {
      title: 'Optimize Weekend Sales',
      priority: 'high',
      impact: 'Revenue +$340/week',
      description: 'Your Saturday sales are 40% higher than Sunday. Consider special Sunday promotions or extend Saturday operating hours.',
      action: 'Create Sunday specials'
    },
    {
      title: 'Reduce Supply Costs',
      priority: 'medium',
      impact: 'Cost -$180/month',
      description: 'AI detected consistent overspending on office supplies. Consider bulk purchasing or alternative suppliers.',
      action: 'Review supplier contracts'
    },
    {
      title: 'Customer Retention Focus',
      priority: 'high',
      impact: 'Revenue +$520/month',
      description: 'Implement a loyalty program for customers with 3+ purchases. 28% of your revenue comes from repeat customers.',
      action: 'Launch loyalty program'
    },
    {
      title: 'Seasonal Inventory Planning',
      priority: 'low',
      impact: 'Efficiency +12%',
      description: 'Based on historical data, increase inventory 3 weeks before peak seasons to avoid stockouts.',
      action: 'Plan inventory cycles'
    }
  ];

  const insights = [
    {
      type: 'opportunity',
      title: 'Peak Sales Hours Identified',
      description: 'Your best sales occur between 2-4 PM. Consider staffing optimization.',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      type: 'warning',
      title: 'Expense Growth Alert',
      description: 'Monthly expenses increased 15% vs last month. Review unnecessary costs.',
      icon: AlertTriangle,
      color: 'text-yellow-600'
    },
    {
      type: 'insight',
      title: 'Customer Behavior Pattern',
      description: 'Customers who buy on Fridays spend 23% more on average.',
      icon: Brain,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            AI-Powered Sales Predictions
          </CardTitle>
          <CardDescription>
            Machine learning analysis of your business patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predictions.map((prediction, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">{prediction.metric}</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-2">
                  {prediction.value}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Confidence</span>
                    <span>{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-1" />
                </div>
                <p className="text-xs text-slate-500 mt-2">{prediction.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Smart Recommendations
            </CardTitle>
            <CardDescription>AI-generated strategies to boost your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-slate-800">{rec.title}</h4>
                    <Badge 
                      variant={rec.priority === 'high' ? 'destructive' : 
                              rec.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">{rec.impact}</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      {rec.action}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Business Insights
            </CardTitle>
            <CardDescription>Key patterns and observations from your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                  <insight.icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800 mb-1">{insight.title}</h4>
                    <p className="text-sm text-slate-600">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Revenue Optimization Score
              </h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-green-600">82/100</span>
                <Badge className="bg-green-600">Excellent</Badge>
              </div>
              <Progress value={82} className="h-2 mb-2" />
              <p className="text-sm text-slate-600">
                Your business is performing well! Focus on the high-priority recommendations to reach the next level.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
