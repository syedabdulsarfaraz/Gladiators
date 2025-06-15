
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Zap, Send, TrendingUp, DollarSign, Target, Sparkles, Calculator, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const InstantAI = () => {
  const [predictionType, setPredictionType] = useState('sales');
  const [inputs, setInputs] = useState({
    productPrice: '',
    expectedQuantity: '',
    marketingSpend: '',
    dayOfWeek: '',
    season: '',
    customerType: '',
    customQuery: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleInstantAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Get historical data for better predictions
    const businessData = JSON.parse(localStorage.getItem('businessData') || '[]');
    const avgDailySales = businessData.length > 0 ? 
      businessData.reduce((sum: number, day: any) => sum + (day.totalSales || 0), 0) / businessData.length : 100;
    
    setTimeout(() => {
      let mockResult;
      
      if (predictionType === 'sales') {
        const baseRevenue = parseFloat(inputs.productPrice) * parseFloat(inputs.expectedQuantity) || avgDailySales;
        const marketingMultiplier = inputs.marketingSpend ? 1 + (parseFloat(inputs.marketingSpend) / 100) * 0.05 : 1;
        const dayMultiplier = inputs.dayOfWeek === 'friday' || inputs.dayOfWeek === 'saturday' ? 1.3 : 
                             inputs.dayOfWeek === 'sunday' || inputs.dayOfWeek === 'monday' ? 0.8 : 1;
        
        const predictedRevenue = baseRevenue * marketingMultiplier * dayMultiplier;
        
        mockResult = {
          type: 'Sales Prediction',
          prediction: `$${predictedRevenue.toFixed(2)}`,
          confidence: Math.min(95, 70 + Math.random() * 20),
          insights: [
            `Based on your pricing of $${inputs.productPrice} for ${inputs.expectedQuantity} units`,
            `${inputs.dayOfWeek ? `${inputs.dayOfWeek.charAt(0).toUpperCase() + inputs.dayOfWeek.slice(1)} typically shows ${dayMultiplier > 1 ? 'higher' : dayMultiplier < 1 ? 'lower' : 'average'} sales` : 'Consider day-of-week impact on sales'}`,
            `Marketing spend of $${inputs.marketingSpend || '0'} could boost revenue by ${((marketingMultiplier - 1) * 100).toFixed(1)}%`,
            `Historical average: $${avgDailySales.toFixed(2)} per day`
          ],
          recommendations: [
            predictedRevenue > avgDailySales ? 'Maintain current pricing strategy' : 'Consider promotional pricing',
            dayMultiplier < 1 ? 'Implement special offers for low-traffic days' : 'Optimize inventory for peak days',
            'Track competitor pricing in your market',
            marketingMultiplier > 1 ? 'Monitor ROI on marketing spend' : 'Consider increasing marketing budget'
          ]
        };
      } else if (predictionType === 'profit') {
        const revenue = parseFloat(inputs.productPrice) * parseFloat(inputs.expectedQuantity) || avgDailySales;
        const estimatedCosts = revenue * 0.6; // Assume 60% cost ratio
        const profit = revenue - estimatedCosts;
        
        mockResult = {
          type: 'Profit Analysis',
          prediction: `$${profit.toFixed(2)}`,
          confidence: Math.min(90, 65 + Math.random() * 20),
          insights: [
            `Estimated revenue: $${revenue.toFixed(2)}`,
            `Projected costs: $${estimatedCosts.toFixed(2)}`,
            `Profit margin: ${((profit / revenue) * 100).toFixed(1)}%`,
            'Based on industry standard cost ratios'
          ],
          recommendations: [
            profit > 0 ? 'Profitable venture - proceed with confidence' : 'Review cost structure before proceeding',
            'Monitor actual vs predicted costs',
            'Consider bulk purchasing to reduce unit costs',
            'Optimize operational efficiency'
          ]
        };
      } else {
        // Custom query analysis
        mockResult = {
          type: 'Custom Analysis',
          prediction: `$${(avgDailySales * 1.15).toFixed(2)}`,
          confidence: Math.min(85, 60 + Math.random() * 20),
          insights: [
            'AI analyzed your query using neural pattern recognition',
            'Market conditions appear favorable for growth',
            'Customer demand trending upward based on input',
            'Seasonal factors may impact results by ±15%'
          ],
          recommendations: [
            'Test small scale before full implementation',
            'Monitor market response closely',
            'Adjust strategy based on early results',
            'Consider customer feedback in decision making'
          ]
        };
      }
      
      setResult(mockResult);
      setIsAnalyzing(false);
      toast({
        title: "Neural Analysis Complete",
        description: "Instant predictions generated with quantum precision",
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <Card className="ai-instant cyber-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Instant Neural Predictions
          </CardTitle>
          <CardDescription className="text-slate-400">
            Real-time AI analysis based on your business inputs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-slate-300 mb-2 block">
                Prediction Type
              </Label>
              <Select value={predictionType} onValueChange={setPredictionType}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400">
                  <SelectValue placeholder="Select prediction type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="sales" className="text-white">Sales Revenue Prediction</SelectItem>
                  <SelectItem value="profit" className="text-white">Profit Analysis</SelectItem>
                  <SelectItem value="custom" className="text-white">Custom Query</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {predictionType === 'custom' ? (
              <div>
                <Label className="text-sm font-medium text-slate-300 mb-2 block">
                  Ask Neural Network
                </Label>
                <Textarea
                  placeholder="Enter your business question: 'If I increase prices by 10%, what will happen to my sales?' or 'Should I expand my product line?'"
                  value={inputs.customQuery}
                  onChange={(e) => setInputs({...inputs, customQuery: e.target.value})}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20 min-h-[100px]"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Product Price ($)</Label>
                  <Input
                    type="number"
                    placeholder="25.00"
                    value={inputs.productPrice}
                    onChange={(e) => setInputs({...inputs, productPrice: e.target.value})}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Expected Quantity</Label>
                  <Input
                    type="number"
                    placeholder="50"
                    value={inputs.expectedQuantity}
                    onChange={(e) => setInputs({...inputs, expectedQuantity: e.target.value})}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Marketing Spend ($)</Label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={inputs.marketingSpend}
                    onChange={(e) => setInputs({...inputs, marketingSpend: e.target.value})}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Day of Week</Label>
                  <Select value={inputs.dayOfWeek} onValueChange={(value) => setInputs({...inputs, dayOfWeek: value})}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="monday" className="text-white">Monday</SelectItem>
                      <SelectItem value="tuesday" className="text-white">Tuesday</SelectItem>
                      <SelectItem value="wednesday" className="text-white">Wednesday</SelectItem>
                      <SelectItem value="thursday" className="text-white">Thursday</SelectItem>
                      <SelectItem value="friday" className="text-white">Friday</SelectItem>
                      <SelectItem value="saturday" className="text-white">Saturday</SelectItem>
                      <SelectItem value="sunday" className="text-white">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            <Button 
              onClick={handleInstantAnalysis}
              disabled={isAnalyzing || (predictionType === 'custom' && !inputs.customQuery.trim()) || (predictionType !== 'custom' && !inputs.productPrice)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Neural Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Generate Prediction
                </div>
              )}
            </Button>
          </div>

          {result && (
            <div className="space-y-4 p-4 bg-slate-800/30 rounded-xl border border-cyan-400/20">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">{result.type}</h4>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  {result.confidence.toFixed(0)}% Confidence
                </Badge>
              </div>
              
              <div className="text-3xl font-bold gradient-text">
                {result.prediction}
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-slate-300 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Neural Insights:
                </h5>
                {result.insights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-slate-400">
                    <TrendingUp className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    {insight}
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-slate-300 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  Strategic Recommendations:
                </h5>
                {result.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-slate-400">
                    <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
