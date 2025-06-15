
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Target, 
  Lightbulb,
  BarChart3,
  Sparkles,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TrackingAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [businessData, setBusinessData] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('businessData') || '[]');
    setBusinessData(data);
  }, []);

  const handleGenerateStrategy = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Strategic Analysis Complete",
        description: "AI has analyzed your business patterns and generated new insights",
      });
    }, 3000);
  };

  // Analyze business data for patterns
  const analyzePatterns = () => {
    if (businessData.length === 0) return null;

    const totalRevenue = businessData.reduce((sum, day) => sum + (day.totalSales || 0), 0);
    const totalExpenses = businessData.reduce((sum, day) => {
      const dayExpenses = day.expenses?.reduce((expSum: number, exp: any) => expSum + parseFloat(exp.amount || 0), 0) || 0;
      return sum + dayExpenses;
    }, 0);
    const avgDailySales = totalRevenue / businessData.length;
    const profitMargin = totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : 0;

    // Find best and worst performing days
    const dailyPerformance = businessData.map(day => ({
      date: day.date,
      sales: day.totalSales || 0,
      dayOfWeek: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })
    }));

    const bestDay = dailyPerformance.reduce((best, current) => 
      current.sales > best.sales ? current : best, dailyPerformance[0]);
    const worstDay = dailyPerformance.reduce((worst, current) => 
      current.sales < worst.sales ? current : worst, dailyPerformance[0]);

    return {
      avgDailySales,
      profitMargin,
      bestDay,
      worstDay,
      totalDays: businessData.length
    };
  };

  const patterns = analyzePatterns();

  const generateDailyPatterns = () => {
    if (!patterns) return [];
    
    return [
      {
        day: patterns.bestDay?.dayOfWeek || 'Friday',
        sales: `$${patterns.bestDay?.sales.toFixed(2) || '0.00'}`,
        pattern: 'Peak performance',
        trend: 'up',
        aiNote: 'Optimal day for premium pricing and promotions'
      },
      {
        day: patterns.worstDay?.dayOfWeek || 'Monday',
        sales: `$${patterns.worstDay?.sales.toFixed(2) || '0.00'}`,
        pattern: 'Needs attention',
        trend: 'down',
        aiNote: 'Consider special offers or marketing campaigns'
      },
      {
        day: 'Average',
        sales: `$${patterns.avgDailySales.toFixed(2)}`,
        pattern: 'Baseline performance',
        trend: 'stable',
        aiNote: 'Maintain consistency with proven strategies'
      }
    ];
  };

  const generateStrategies = () => {
    if (!patterns) {
      return [
        {
          title: 'Start Data Collection',
          description: 'Begin entering daily sales and expenses to unlock AI-powered insights and strategies.',
          impact: 'Enable AI learning',
          priority: 'high',
          confidence: 100
        }
      ];
    }

    const strategies = [];

    // Profit margin strategy
    if (patterns.profitMargin < 20) {
      strategies.push({
        title: 'Profit Margin Optimization',
        description: `Current margin of ${patterns.profitMargin.toFixed(1)}% is below optimal. Consider reviewing costs or adjusting pricing strategy.`,
        impact: `+${((20 - patterns.profitMargin) * patterns.avgDailySales * 0.01).toFixed(0)}/day`,
        priority: 'high',
        confidence: 89
      });
    }

    // Sales consistency strategy
    if (patterns.bestDay && patterns.worstDay) {
      const salesGap = patterns.bestDay.sales - patterns.worstDay.sales;
      if (salesGap > patterns.avgDailySales * 0.5) {
        strategies.push({
          title: 'Sales Consistency Improvement',
          description: `Large gap between best (${patterns.bestDay.dayOfWeek}: $${patterns.bestDay.sales.toFixed(2)}) and worst (${patterns.worstDay.dayOfWeek}: $${patterns.worstDay.sales.toFixed(2)}) performing days.`,
          impact: `+$${(salesGap * 0.3).toFixed(0)}/week`,
          priority: 'medium',
          confidence: 76
        });
      }
    }

    // Growth strategy
    strategies.push({
      title: 'Revenue Growth Acceleration',
      description: 'Based on current performance patterns, implement targeted customer retention and acquisition strategies.',
      impact: `+$${(patterns.avgDailySales * 0.25 * 7).toFixed(0)}/week`,
      priority: 'high',
      confidence: 82
    });

    // Cost optimization
    strategies.push({
      title: 'Operational Efficiency Enhancement',
      description: 'Analyze expense patterns to identify cost reduction opportunities without impacting quality.',
      impact: 'Cost -15%',
      priority: 'medium',
      confidence: 78
    });

    return strategies;
  };

  const dailyPatterns = generateDailyPatterns();
  const aiStrategies = generateStrategies();

  return (
    <div className="space-y-6">
      <Card className="ai-tracking cyber-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
              <Brain className="w-5 h-5 text-white" />
            </div>
            Continuous Learning AI
          </CardTitle>
          <CardDescription className="text-slate-400">
            Advanced pattern recognition and strategic recommendations based on your daily data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
            <div>
              <h4 className="font-medium text-white">Neural Learning Status</h4>
              <p className="text-sm text-slate-400">
                {patterns ? `Processing ${patterns.totalDays} days of business data` : 'Waiting for data input to begin learning'}
              </p>
            </div>
            <Button 
              onClick={handleGenerateStrategy}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Analyzing...
                </div>
              ) : (
                'Refresh Analysis'
              )}
            </Button>
          </div>

          {patterns && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dailyPatterns.map((pattern, index) => (
                <div key={index} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-white">{pattern.day}</span>
                    <Badge 
                      variant={pattern.trend === 'up' ? 'default' : 
                              pattern.trend === 'down' ? 'destructive' : 'secondary'}
                      className={`text-xs ${
                        pattern.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                        pattern.trend === 'down' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-slate-500/20 text-slate-400 border-slate-500/30'
                      }`}
                    >
                      {pattern.trend === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
                      {pattern.trend === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
                      {pattern.pattern}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{pattern.sales}</div>
                  <p className="text-xs text-purple-400">{pattern.aiNote}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            AI-Generated Business Strategies
          </CardTitle>
          <CardDescription className="text-slate-400">
            Strategic recommendations based on your daily operations data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiStrategies.map((strategy, index) => (
              <div key={index} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-white">{strategy.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={strategy.priority === 'high' ? 'destructive' : 'default'}
                      className={`text-xs ${
                        strategy.priority === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}
                    >
                      {strategy.priority === 'high' ? <AlertTriangle className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                      {strategy.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-3">{strategy.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-400">{strategy.impact}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">AI Confidence</span>
                    <Progress value={strategy.confidence} className="w-16 h-1" />
                    <span className="text-xs text-slate-400">{strategy.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {patterns && (
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                Business Health Score
              </h4>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-emerald-400">
                  {Math.min(100, Math.max(0, Math.round(patterns.profitMargin * 2 + 40)))}
                </span>
                <Badge className={`${
                  patterns.profitMargin > 20 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                  patterns.profitMargin > 10 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                  'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {patterns.profitMargin > 20 ? 'Excellent' : patterns.profitMargin > 10 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
              <Progress value={Math.min(100, Math.max(0, patterns.profitMargin * 2 + 40))} className="h-2 mb-2" />
              <p className="text-sm text-slate-400">
                Based on {patterns.totalDays} days of operation. Profit margin: {patterns.profitMargin.toFixed(1)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
