
import { Bell, Settings, User, LogOut, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  return (
    <header className="glass-card border-b border-white/10 sticky top-0 z-50 neon-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center cyber-glow floating">
              <Brain className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-white">Neural Commerce</h2>
              <p className="text-sm text-cyan-400">Dual AI System Active • Status: Learning</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10 transition-all duration-300 group">
              <Bell className="w-5 h-5 text-slate-300 group-hover:text-cyan-400" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-purple-500 to-pink-500 pulse-border">
                2
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 transition-all duration-300 group">
              <Settings className="w-5 h-5 text-slate-300 group-hover:text-purple-400" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 transition-all duration-300 group">
              <User className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 transition-all duration-300 group">
              <LogOut className="w-5 h-5 text-slate-300 group-hover:text-red-400" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
