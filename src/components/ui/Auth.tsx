
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Mail, Lock, User, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthProps {
  onAuthenticated: () => void;
}

export const Auth = ({ onAuthenticated }: AuthProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (type: 'login' | 'signup') => {
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `${type === 'login' ? 'Welcome back!' : 'Account created!'}`,
        description: `Neural network authentication successful. Accessing quantum dashboard...`,
      });
      onAuthenticated();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 auth-bg">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-pink-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Card className="w-full max-w-md glass-card neon-border relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center cyber-glow floating">
            <Brain className="text-white w-8 h-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">
              <span className="gradient-text">Neural Commerce</span>
            </CardTitle>
            <CardDescription className="text-slate-400 mt-2">
              Advanced AI-powered business intelligence platform
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 glass-card p-1">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
              >
                Neural Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
              >
                Initialize Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-slate-300">Neural ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="your@neural.id" 
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-slate-300">Access Code</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="••••••••••" 
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20" 
                  />
                </div>
              </div>
              <Button 
                onClick={() => handleAuth('login')} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 cyber-glow"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  'Access Neural Network'
                )}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-slate-300">Entity Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <Input 
                    id="signup-name" 
                    placeholder="Your neural designation" 
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400/20" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-slate-300">Neural ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="your@neural.id" 
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400/20" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-slate-300">Access Code</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <Input 
                    id="signup-password" 
                    type="password" 
                    placeholder="••••••••••" 
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400/20" 
                  />
                </div>
              </div>
              <Button 
                onClick={() => handleAuth('signup')} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3 cyber-glow"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Initializing...
                  </div>
                ) : (
                  'Initialize Neural Account'
                )}
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Advanced quantum encryption • Neural data protection
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
