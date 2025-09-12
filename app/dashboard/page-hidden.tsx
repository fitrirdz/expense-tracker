'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  Tag,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { formatIDR } from '@/lib/currency';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useTransactions } from '@/hooks/use-transactions';

// const mockStats = {
//   totalExpenses: 2450500,
//   monthlyChange: -12.5,
//   transactionCount: 47,
//   categoryCount: 8,
// };

export default function DashboardPage() {
  const userData = JSON.parse(Cookies.get('user_data') || '{}');
  const { transactions: recentTransactions } = useTransactions();

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Welcome, {userData?.username}!
          </h1>
          <p className='text-muted-foreground'>
            Here's an overview of your expenses.
          </p>
        </div>
      </div>

      {/* Stats Cards (Temporary hidden) */}
      {/* <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='vintage-card'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Expenses
            </CardTitle>
            <DollarSign className='h-4 w-4 text-vintage-expense-red' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatIDR(mockStats.totalExpenses)}
            </div>
            <p className='text-xs text-muted-foreground'>
              <span
                className={`inline-flex items-center ${
                  mockStats.monthlyChange < 0
                    ? 'text-vintage-income-green'
                    : 'text-vintage-expense-red'
                }`}
              >
                {mockStats.monthlyChange < 0 ? (
                  <ArrowDownRight className='mr-1 h-3 w-3' />
                ) : (
                  <ArrowUpRight className='mr-1 h-3 w-3' />
                )}
                {Math.abs(mockStats.monthlyChange)}%
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className='vintage-card'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Transactions</CardTitle>
            <Receipt className='h-4 w-4 text-vintage-neutral-blue' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {mockStats.transactionCount}
            </div>
            <p className='text-xs text-muted-foreground'>This month</p>
          </CardContent>
        </Card>

        <Card className='vintage-card'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Categories</CardTitle>
            <Tag className='h-4 w-4 text-vintage-warm-gold' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{mockStats.categoryCount}</div>
            <p className='text-xs text-muted-foreground'>Active categories</p>
          </CardContent>
        </Card>

        <Card className='vintage-card'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg. Daily</CardTitle>
            <TrendingUp className='h-4 w-4 text-vintage-income-green' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatIDR(81680)}</div>
            <p className='text-xs text-muted-foreground'>Last 30 days</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Recent Transactions */}
      <Card className='vintage-card'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your latest financial activities
              </CardDescription>
            </div>
            <Button
              variant='outline'
              asChild
              className='vintage-button bg-transparent'
            >
              <Link href='/dashboard/transactions'>View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {recentTransactions?.map((transaction) => (
              <div
                key={transaction.id}
                className='flex items-center justify-between'
              >
                <div className='flex items-center space-x-4'>
                  <div
                    className={`p-2 rounded-full`}
                    style={{
                      backgroundColor:
                        transaction.amount > 0
                          ? 'rgba(74, 103, 65, 0.2)'
                          : 'rgba(139, 74, 71, 0.2)',
                    }}
                  >
                    {transaction.amount > 0 ? (
                      <TrendingUp className='h-4 w-4 text-vintage-income-green' />
                    ) : (
                      <TrendingDown className='h-4 w-4 text-vintage-expense-red' />
                    )}
                  </div>
                  <div>
                    <p className='font-medium'>{transaction.description}</p>
                    <p className='text-sm text-muted-foreground'>
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <Badge
                    variant='secondary'
                    className='text-vintage-dark-brown'
                    style={{
                      backgroundColor: 'rgba(214, 218, 200, 0.3)',
                      borderColor: '#D6DAC8',
                    }}
                  >
                    {transaction.category_name}
                  </Badge>
                  <span
                    className={`font-medium ${
                      transaction.amount > 0
                        ? 'text-vintage-income-green'
                        : 'text-vintage-expense-red'
                    }`}
                  >
                    {formatIDR(transaction.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
