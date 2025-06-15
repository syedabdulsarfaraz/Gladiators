import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardOverview } from '@/components/ui/DashboardOverview';
import { DataEntry } from '@/components/ui/DataEntry';
import { Analytics } from '@/components/ui/Analytics';
import { InstantAI } from '@/components/ui/InstantAI'; // Corrected import (removed .tsx)
import { TrackingAI } from '@/components/ui/TrackingAI';
import { Header } from '@/components/ui/Header';
import { Auth } from '@/components/ui/Auth';
import { TrendingUp, DollarSign, Target, Brain, Zap, BarChart3 } from 'lucide-react';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // For quick testing during development, you can temporarily set isAuthenticated to true:
  // const [isAuthenticated, setIsAuthenticated] = useState(true); 

  if (!isAuthenticated) {
    return <Auth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden text-foreground"> {/* Added text-foreground for default text color */}
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 slide-in">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Neural Commerce</span> {/* Applies the gradient for "Neural Commerce" */}
            <span className="text-white"> Intelligence</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Dual AI system for instant predictions and continuous learning. Transform your business data into strategic advantages with neural-powered insights.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* TabsList uses the custom glass-card style from index.css for its background */}
          <TabsList className="grid w-full grid-cols-5 glass-card p-2 h-auto text-foreground"> {/* Added text-foreground to TabsList */}
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 py-4 text-foreground data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=active]:shadow-lg transition-all duration-300" // Added text-foreground for inactive tab text
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="entry" 
              className="flex items-center gap-2 py-4 text-foreground data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 data-[state=active]:shadow-lg transition-all duration-300" // Added text-foreground
            >
              <DollarSign className="w-5 h-5" />
              <span className="font-medium">Data Entry</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 py-4 text-foreground data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-lg transition-all duration-300" // Added text-foreground
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="instant-ai" 
              className="flex items-center gap-2 py-4 text-foreground data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=active]:shadow-lg transition-all duration-300" // Added text-foreground
            >
              <Zap className="w-5 h-5" />
              <span className="font-medium">Instant AI</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tracking-ai" 
              className="flex items-center gap-2 py-4 text-foreground data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 data-[state=active]:shadow-lg transition-all duration-300" // Added text-foreground
            >
              <Brain className="w-5 h-5" />
              <span className="font-medium">Tracking AI</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 slide-in">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="entry" className="space-y-6 slide-in">
            <DataEntry />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 slide-in">
            <Analytics />
          </TabsContent>

          <TabsContent value="instant-ai" className="space-y-6 slide-in">
            <InstantAI />
          </TabsContent>

          <TabsContent value="tracking-ai" className="space-y-6 slide-in">
            <TrackingAI />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;