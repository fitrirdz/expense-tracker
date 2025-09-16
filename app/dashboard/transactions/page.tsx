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
import { useTransactions } from '@/hooks/use-transactions';
import { useCategories } from '@/hooks/use-categories';

export default function TransactionsPage() {
  const { isLoading, transactions, isAddingTransaction, addTransaction } =
    useTransactions();
  const { categories } = useCategories();
  // const [transactions, setTransactions] = useState(mockTransactions);
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

  const filteredTransactions = transactions?.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      transaction.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    const transaction = {
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      category_id: parseInt(newTransaction.category),
      date: newTransaction.date,
    };
    addTransaction(transaction);

    setNewTransaction({
      amount: '',
      date: '',
      description: '',
      category: '',
    });
    setIsAddDialogOpen(false);
  };

  const handleImportCSV = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with /transactions/import POST endpoint
    console.log('Import CSV functionality');
    setIsImportDialogOpen(false);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value) {
      const isoString = new Date(value).toISOString();
      setNewTransaction((prev) => ({
        ...prev,
        date: isoString,
      }));
    }
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
          {/* <Dialog
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
          </Dialog> */}

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
                      step='1'
                      placeholder='0'
                      min={0}
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
                      // type='date'
                      type='datetime-local'
                      onChange={(e) => handleChangeDate(e)}
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
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={`${category.id}`}>
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
                {categories?.map((category) => (
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
            {filteredTransactions?.length} transaction(s) found
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
              {filteredTransactions?.map((transaction) => (
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
                      {transaction.category_name}
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
