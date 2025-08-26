'use client';

import type React from 'react';

import { useState } from 'react';
import { formatIDR } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Upload,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
} from 'lucide-react';

// Mock data
const mockTransactions = [
  {
    id: 1,
    description: 'Grocery Shopping at SuperIndo',
    amount: -85500,
    category: 'Food',
    date: '2024-01-15',
  },
  {
    id: 2,
    description: 'Gas Station Fill-up',
    amount: -45000,
    category: 'Transportation',
    date: '2024-01-14',
  },
  {
    id: 3,
    description: 'Morning Coffee',
    amount: -12500,
    category: 'Food',
    date: '2024-01-14',
  },
  {
    id: 4,
    description: 'Monthly Salary',
    amount: 3000000,
    category: 'Income',
    date: '2024-01-13',
  },
  {
    id: 5,
    description: 'Electric Bill',
    amount: -120000,
    category: 'Bills',
    date: '2024-01-12',
  },
  {
    id: 6,
    description: 'Netflix Subscription',
    amount: -159900,
    category: 'Entertainment',
    date: '2024-01-11',
  },
  {
    id: 7,
    description: 'Gojek Ride',
    amount: -18500,
    category: 'Transportation',
    date: '2024-01-10',
  },
  {
    id: 8,
    description: 'Freelance Payment',
    amount: 500000,
    category: 'Income',
    date: '2024-01-09',
  },
];

const mockCategories = [
  { id: 1, code: 'FOOD', name: 'Food & Dining' },
  { id: 2, code: 'TRANS', name: 'Transportation' },
  { id: 3, code: 'BILLS', name: 'Bills & Utilities' },
  { id: 4, code: 'ENT', name: 'Entertainment' },
  { id: 5, code: 'INC', name: 'Income' },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    date: '',
    description: '',
    category: '',
  });

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with /transactions POST endpoint
    const transaction = {
      id: transactions.length + 1,
      description: newTransaction.description,
      amount: Number.parseFloat(newTransaction.amount),
      category: newTransaction.category,
      date: newTransaction.date,
    };
    setTransactions((prev) => [transaction, ...prev]);
    setNewTransaction({ amount: '', date: '', description: '', category: '' });
    setIsAddDialogOpen(false);
    console.log('New transaction:', transaction);
  };

  const handleImportCSV = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with /transactions/import POST endpoint
    console.log('Import CSV functionality');
    setIsImportDialogOpen(false);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Transactions</h1>
          <p className='text-muted-foreground'>
            Manage and track all your financial transactions
          </p>
        </div>
        <div className='flex gap-2'>
          <Dialog
            open={isImportDialogOpen}
            onOpenChange={setIsImportDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant='outline'
                className='bg-transparent border-2 hover:bg-opacity-20'
                style={{
                  borderColor: '#D6DAC8',
                  backgroundColor: 'rgba(214, 218, 200, 0.2)',
                }}
              >
                <Upload className='mr-2 h-4 w-4' />
                Import CSV
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Transactions from CSV</DialogTitle>
                <DialogDescription>
                  Upload a CSV file to import multiple transactions at once
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleImportCSV} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='csv-file'>CSV File</Label>
                  <Input id='csv-file' type='file' accept='.csv' required />
                  <p className='text-xs text-muted-foreground'>
                    Expected format: amount, date, description, category
                  </p>
                </div>
                <div className='flex justify-end gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    className='bg-transparent border-2 hover:bg-opacity-20'
                    style={{
                      borderColor: '#D6DAC8',
                      backgroundColor: 'rgba(214, 218, 200, 0.2)',
                    }}
                    onClick={() => setIsImportDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type='submit' className='vintage-button'>
                    Import
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className='vintage-button'>
                <Plus className='mr-2 h-4 w-4' />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Create a new transaction entry
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTransaction} className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='amount'>Amount</Label>
                    <Input
                      id='amount'
                      type='number'
                      step='0.01'
                      placeholder='0.00'
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='date'>Date</Label>
                    <Input
                      id='date'
                      type='date'
                      value={newTransaction.date}
                      onChange={(e) =>
                        setNewTransaction((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    placeholder='Enter transaction description'
                    value={newTransaction.description}
                    onChange={(e) =>
                      setNewTransaction((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='category'>Category</Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) =>
                      setNewTransaction((prev) => ({
                        ...prev,
                        category: value,
                      }))
                    }
                    required
                  >
                    <SelectTrigger
                      className='vintage-input border-2'
                      style={{ borderColor: '#D6DAC8' }}
                    >
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex justify-end gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    className='bg-transparent border-2 hover:bg-opacity-20'
                    style={{
                      borderColor: '#D6DAC8',
                      backgroundColor: 'rgba(214, 218, 200, 0.2)',
                    }}
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type='submit' className='vintage-button'>
                    Add Transaction
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className='vintage-card'>
        <CardHeader>
          <CardTitle className='text-lg'>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search transactions...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-8 vintage-input'
                />
              </div>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger
                className='w-48 vintage-input border-2'
                style={{ borderColor: '#D6DAC8' }}
              >
                <Filter className='mr-2 h-4 w-4' />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Categories</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className='vintage-card'>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transaction(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-muted-foreground' />
                      {transaction.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <FileText className='h-4 w-4 text-muted-foreground' />
                      {transaction.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='secondary'
                      className='text-vintage-dark-brown'
                      style={{
                        backgroundColor: 'rgba(214, 218, 200, 0.3)',
                        borderColor: 'rgba(214, 218, 200, 0.5)',
                      }}
                    >
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div
                      className={`flex items-center justify-end gap-1 font-medium ${
                        transaction.amount > 0
                          ? 'text-vintage-income-green'
                          : 'text-vintage-expense-red'
                      }`}
                    >
                      {transaction.amount > 0 ? (
                        <TrendingUp className='h-4 w-4' />
                      ) : (
                        <TrendingDown className='h-4 w-4' />
                      )}
                      {formatIDR(transaction.amount)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
