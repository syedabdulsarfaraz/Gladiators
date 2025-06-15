import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Save, Calendar, Printer, ShoppingCart, Package, User, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  expense: number;
  quantity: number;
  total: number;
  totalExpense: number;
  profit: number;
  timestamp: string;
}

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  timestamp: string;
}

interface Customer {
  id: string;
  name: string;
  totalSales: number;
  totalExpense: number;
  totalProfit: number;
  transactionCount: number;
}

export const DataEntry = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [products, setProducts] = useState<Product[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    expense: '',
    quantity: 1
  });
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: ''
  });

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.expense) {
      const price = parseFloat(newProduct.price);
      const expense = parseFloat(newProduct.expense);
      const quantity = newProduct.quantity;
      
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        price: price,
        expense: expense,
        quantity: quantity,
        total: price * quantity,
        totalExpense: expense * quantity,
        profit: (price - expense) * quantity,
        timestamp: new Date().toISOString()
      };
      
      setProducts([...products, product]);
      setNewProduct({ name: '', price: '', expense: '', quantity: 1 });
      toast({
        title: "Product Added",
        description: `${product.name} added to ${customerName || 'customer'}'s cart`,
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in product name, price, and expense",
        variant: "destructive"
      });
    }
  };

  const addExpense = () => {
    if (newExpense.category && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        description: newExpense.description,
        timestamp: new Date().toISOString()
      };
      
      setExpenses([...expenses, expense]);
      setNewExpense({ category: '', amount: '', description: '' });
      toast({
        title: "Expense Added",
        description: `${expense.category} expense of $${expense.amount} added`,
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in expense category and amount",
        variant: "destructive"
      });
    }
  };

  const removeProduct = (id: string) => {
    const productToRemove = products.find(p => p.id === id);
    setProducts(products.filter(p => p.id !== id));
    if (productToRemove) {
      toast({
        title: "Product Removed",
        description: `${productToRemove.name} removed from cart`,
      });
    }
  };

  const removeExpense = (id: string) => {
    const expenseToRemove = expenses.find(e => e.id === id);
    setExpenses(expenses.filter(e => e.id !== id));
    if (expenseToRemove) {
      toast({
        title: "Expense Removed",
        description: `${expenseToRemove.category} expense removed`,
      });
    }
  };

  const updateProductQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setProducts(products.map(product => {
      if (product.id === id) {
        const updatedProduct = {
          ...product,
          quantity: newQuantity,
          total: product.price * newQuantity,
          totalExpense: product.expense * newQuantity,
          profit: (product.price - product.expense) * newQuantity
        };
        return updatedProduct;
      }
      return product;
    }));
  };

  const getTotalSales = () => {
    return products.reduce((sum, product) => sum + product.total, 0);
  };

  const getTotalProductExpenses = () => {
    return products.reduce((sum, product) => sum + product.totalExpense, 0);
  };

  const getTotalOperationalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getTotalAllExpenses = () => {
    return getTotalProductExpenses() + getTotalOperationalExpenses();
  };

  const getTotalProfit = () => {
    return getTotalSales() - getTotalAllExpenses();
  };

  const clearTransaction = () => {
    setProducts([]);
    setExpenses([]);
    setCustomerId('');
    setCustomerName('');
    setNewProduct({ name: '', price: '', expense: '', quantity: 1 });
    setNewExpense({ category: '', amount: '', description: '' });
    toast({
      title: "Transaction Cleared",
      description: "Ready for new customer",
    });
  };

  const generateBill = () => {
    if (products.length === 0) {
      toast({
        title: "No Products",
        description: "Please add products before printing the bill",
        variant: "destructive"
      });
      return;
    }

    const billWindow = window.open('', '_blank');
    if (!billWindow) {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups for this site to print bills",
        variant: "destructive"
      });
      return;
    }

    const billContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Sales Receipt</title>
          <style>
            body { font-family: 'Courier New', monospace; max-width: 300px; margin: 0 auto; padding: 20px; background: white; color: black; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .item { display: flex; justify-content: space-between; margin: 5px 0; }
            .total { border-top: 2px solid #000; padding-top: 10px; margin-top: 20px; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Neural Commerce</h2>
            <p>Date: ${selectedDate}</p>
            <p>Receipt #: ${Date.now()}</p>
            ${customerName ? `<p>Customer: ${customerName}</p>` : ''}
            ${customerId ? `<p>ID: ${customerId}</p>` : ''}
          </div>
          ${products.map(product => `
            <div class="item">
              <span>${product.name} x${product.quantity}</span>
              <span>$${product.total.toFixed(2)}</span>
            </div>
          `).join('')}
          <div class="total">
            <div class="item">
              <span>TOTAL:</span>
              <span>$${getTotalSales().toFixed(2)}</span>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Powered by Neural Commerce AI</p>
          </div>
        </body>
      </html>
    `;
    billWindow.document.write(billContent);
    billWindow.document.close();
    billWindow.print();
    
    toast({
      title: "Bill Generated",
      description: "Receipt ready for customer",
    });
  };

  const saveDayData = () => {
    if (products.length === 0 && expenses.length === 0) {
      toast({
        title: "No Data",
        description: "Please add products or expenses before saving",
        variant: "destructive"
      });
      return;
    }

    const dayData = {
      date: selectedDate,
      customerId: customerId || `GUEST-${Date.now()}`,
      customerName: customerName || 'Guest Customer',
      sales: products,
      totalSales: getTotalSales(),
      totalProductExpenses: getTotalProductExpenses(),
      totalOperationalExpenses: getTotalOperationalExpenses(),
      totalAllExpenses: getTotalAllExpenses(),
      totalProfit: getTotalProfit(),
      expenses: expenses,
      timestamp: new Date().toISOString()
    };
    
    const existingData = JSON.parse(localStorage.getItem('businessData') || '[]');
    existingData.push(dayData);
    localStorage.setItem('businessData', JSON.stringify(existingData));

    updateCustomerData(dayData);
    
    toast({
      title: "Neural Network Updated!",
      description: `Transaction data for ${customerName || 'Guest'} saved successfully.`,
    });
    
    clearTransaction();
  };

  const updateCustomerData = (transactionData: any) => {
    const existingCustomers = JSON.parse(localStorage.getItem('customerData') || '[]');
    const customerIndex = existingCustomers.findIndex((c: Customer) => c.id === transactionData.customerId);
    
    if (customerIndex >= 0) {
      existingCustomers[customerIndex].totalSales += transactionData.totalSales;
      existingCustomers[customerIndex].totalExpense += transactionData.totalAllExpenses;
      existingCustomers[customerIndex].totalProfit += transactionData.totalProfit;
      existingCustomers[customerIndex].transactionCount += 1;
    } else {
      const newCustomer: Customer = {
        id: transactionData.customerId,
        name: transactionData.customerName,
        totalSales: transactionData.totalSales,
        totalExpense: transactionData.totalAllExpenses,
        totalProfit: transactionData.totalProfit,
        transactionCount: 1
      };
      existingCustomers.push(newCustomer);
    }
    
    localStorage.setItem('customerData', JSON.stringify(existingCustomers));
  };

  const getCustomerList = (): Customer[] => {
    return JSON.parse(localStorage.getItem('customerData') || '[]');
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card neon-border hover:cyber-glow transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            Neural Point of Sale
          </CardTitle>
          <CardDescription className="text-slate-400">
            Quantum transaction processing system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <Label htmlFor="date" className="text-slate-300">Transaction Date:</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <div>
              <Label className="text-slate-300">Customer ID/UID</Label>
              <Input
                placeholder="Enter customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
            <div>
              <Label className="text-slate-300">Customer Name</Label>
              <Input
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Product to Cart
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label className="text-slate-300">Product Name</Label>
                <Input
                  placeholder="Enter product"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
              <div>
                <Label className="text-slate-300">Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
              <div>
                <Label className="text-slate-300">Expense ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newProduct.expense}
                  onChange={(e) => setNewProduct({...newProduct, expense: e.target.value})}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-400"
                />
              </div>
              <div>
                <Label className="text-slate-300">Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({...newProduct, quantity: parseInt(e.target.value) || 1})}
                  className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={addProduct}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
          </div>

          {products.length > 0 && (
            <div className="space-y-4">
              <Separator className="bg-slate-600" />
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">
                  Shopping Cart {customerName && `- ${customerName}`}
                </h4>
                <Button
                  onClick={clearTransaction}
                  variant="outline"
                  size="sm"
                  className="text-slate-300 border-slate-600 hover:bg-slate-700"
                >
                  Clear Cart
                </Button>
              </div>
              <div className="space-y-2">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex-1">
                      <span className="font-medium text-white">{product.name}</span>
                      <div className="text-sm text-slate-400 mt-1">
                        Unit Price: ${product.price.toFixed(2)} | Unit Expense: ${product.expense.toFixed(2)}
                      </div>
                      <div className="text-xs text-emerald-400 mt-1">
                        Unit Profit: ${(product.price - product.expense).toFixed(2)} | Total Profit: ${product.profit.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateProductQuantity(product.id, product.quantity - 1)}
                          className="w-8 h-8 p-0 text-slate-300 border-slate-600 hover:bg-slate-700"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white font-medium min-w-[2rem] text-center">
                          {product.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateProductQuantity(product.id, product.quantity + 1)}
                          className="w-8 h-8 p-0 text-slate-300 border-slate-600 hover:bg-slate-700"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                        ${product.total.toFixed(2)}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeProduct(product.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                  <span className="text-lg font-bold text-white">Total Sales:</span>
                  <span className="text-xl font-bold gradient-text">${getTotalSales().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-500/20">
                  <span className="text-lg font-bold text-white">Total Expense:</span>
                  <span className="text-xl font-bold text-red-400">${getTotalAllExpenses().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                  <span className="text-lg font-bold text-white">Total Profit:</span>
                  <span className="text-xl font-bold text-emerald-400">${getTotalProfit().toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={generateBill}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3"
                >
                  <Printer className="w-5 h-5 mr-2" />
                  Print Bill
                </Button>
                <Button
                  onClick={saveDayData}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Transaction
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-pink-600">
              <Package className="w-5 h-5 text-white" />
            </div>
            Expense Tracking
          </CardTitle>
          <CardDescription className="text-slate-400">
            Daily operational cost management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Expense Entry
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-slate-300">Expense Category</Label>
                <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-red-400">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="raw-materials" className="text-white">Raw Materials</SelectItem>
                    <SelectItem value="rent" className="text-white">Rent</SelectItem>
                    <SelectItem value="utilities" className="text-white">Utilities</SelectItem>
                    <SelectItem value="marketing" className="text-white">Marketing</SelectItem>
                    <SelectItem value="labor" className="text-white">Labor</SelectItem>
                    <SelectItem value="equipment" className="text-white">Equipment</SelectItem>
                    <SelectItem value="transportation" className="text-white">Transportation</SelectItem>
                    <SelectItem value="maintenance" className="text-white">Maintenance</SelectItem>
                    <SelectItem value="other" className="text-white">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Amount ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-400"
                />
              </div>
              <div>
                <Label className="text-slate-300">Description</Label>
                <Input
                  placeholder="Optional notes"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-400"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={addExpense}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            </div>
          </div>

          {expenses.length > 0 && (
            <div className="space-y-4">
              <Separator className="bg-slate-600" />
              <h4 className="text-lg font-semibold text-white">Current Expenses</h4>
              <div className="space-y-2">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium text-white capitalize">
                          {expense.category.replace('-', ' ')}
                        </span>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          ${expense.amount.toFixed(2)}
                        </Badge>
                      </div>
                      {expense.description && (
                        <p className="text-sm text-slate-400">{expense.description}</p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeExpense(expense.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-500/20">
                <span className="text-lg font-bold text-white">Total Operational Expenses:</span>
                <span className="text-xl font-bold text-red-400">${getTotalOperationalExpenses().toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <User className="w-5 h-5 text-white" />
            </div>
            Customer Overview
          </CardTitle>
          <CardDescription className="text-slate-400">
            Customer transaction history and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getCustomerList().length > 0 ? getCustomerList().map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                      {customer.name}
                    </span>
                    <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                      ID: {customer.id}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Sales: </span>
                      <span className="text-cyan-400 font-medium">${customer.totalSales.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Expense: </span>
                      <span className="text-red-400 font-medium">${customer.totalExpense.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Profit: </span>
                      <span className="text-emerald-400 font-medium">${customer.totalProfit.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Transactions: </span>
                      <span className="text-purple-400 font-medium">{customer.transactionCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-slate-400">
                <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No customer data yet</p>
                <p className="text-sm">Start adding transactions to see customer analytics</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
