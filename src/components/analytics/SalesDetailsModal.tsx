
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface DaySalesDetail {
  date: string;
  sales: any[];
  totalSales: number;
  customerName?: string;
  timestamp?: string;
}

interface SalesDetailModalProps {
  showDayDetails: boolean;
  setShowDayDetails: (show: boolean) => void;
  selectedDayDetails: DaySalesDetail | null;
}

export const SalesDetailModal = ({ showDayDetails, setShowDayDetails, selectedDayDetails }: SalesDetailModalProps) => {
  return (
    <Dialog open={showDayDetails} onOpenChange={setShowDayDetails}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Sales Details - {selectedDayDetails?.date}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Detailed breakdown of all sales for this day
          </DialogDescription>
        </DialogHeader>
        {selectedDayDetails && (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
              <span className="font-medium text-white">Total Daily Sales:</span>
              <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-500/30 text-lg px-3 py-1">
                ${selectedDayDetails.totalSales.toFixed(2)}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                Sales by Time & Customer
              </h4>
              {selectedDayDetails.sales
                .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                .map((sale, index) => (
                  <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium text-white">{sale.name}</span>
                        <span className="text-slate-400 ml-2">({sale.customerName})</span>
                      </div>
                      <div className="text-right">
                        <div className="text-cyan-400 font-medium">${sale.total.toFixed(2)}</div>
                        <div className="text-xs text-slate-500">
                          {new Date(sale.timestamp).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      Qty: {sale.quantity} × ${sale.price.toFixed(2)} each
                      {sale.profit && (
                        <span className="text-emerald-400 ml-4">
                          Profit: ${sale.profit.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
