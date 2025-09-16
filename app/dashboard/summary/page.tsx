'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Target,
} from 'lucide-react';
import { formatIDR } from '@/lib/currency';
import { useTransactions } from '@/hooks/use-transactions';
import { useMemo } from 'react';

export default function SummaryPage() {
  // const savingsRate = (
  //   (mockSummary.netAmount / mockSummary.totalIncome) *
  //   100
  // ).toFixed(1);
  const { summary } = useTransactions();
  const totalAmount = useMemo(() => {
    return summary?.reduce((acc, item) => acc + item.total, 0) || 0;
  }, [summary]);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Summary</h1>
          <p className='text-muted-foreground'>
            Overview of your financial activity and spending patterns
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* <Card className='vintage-card'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Income</CardTitle>
            <TrendingUp className='h-4 w-4 text-vintage-income-green' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-vintage-income-green'>
              {formatIDR(mockSummary.totalIncome)}
            </div>
            <p className='text-xs text-muted-foreground'>This month</p>
          </CardContent>
        </Card> */}

        <Card className='vintage-card'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Expenses
            </CardTitle>
            <TrendingDown className='h-4 w-4 text-vintage-expense-red' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-vintage-expense-red'>
              {formatIDR(-totalAmount)}
            </div>
            <p className='text-xs text-muted-foreground'>This month</p>
          </CardContent>
        </Card>

        {/* <Card className='vintage-card'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Net Amount</CardTitle>
            <DollarSign className='h-4 w-4 text-vintage-neutral-blue' />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                mockSummary.netAmount > 0
                  ? 'text-vintage-income-green'
                  : 'text-vintage-expense-red'
              }`}
            >
              {formatIDR(mockSummary.netAmount)}
            </div>
            <p className='text-xs text-muted-foreground'>Income - Expenses</p>
          </CardContent>
        </Card>

        <Card className='vintage-card'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Savings Rate</CardTitle>
            <Target className='h-4 w-4 text-vintage-warm-gold' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-vintage-warm-gold'>
              {savingsRate}%
            </div>
            <p className='text-xs text-muted-foreground'>Of total income</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Category Breakdown */}
      <Card className='vintage-card'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <BarChart3 className='h-5 w-5' />
            Spending by Category
          </CardTitle>
          <CardDescription>
            Breakdown of expenses across different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {summary?.map((item, index) => {
              const backgroundColor = `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`;
              return (
                <div key={index} className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div
                        className={`w-3 h-3 rounded-full`}
                        // random color
                        style={{
                          backgroundColor: backgroundColor,
                        }}
                      />
                      <span className='font-medium'>{item.category_name}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='text-vintage-dark-brown'
                        style={{
                          backgroundColor: 'rgba(214, 218, 200, 0.3)',
                          border: '1px solid rgba(214, 218, 200, 0.5)',
                        }}
                      >
                        {((item.total / totalAmount) * 100).toFixed(2)}%
                      </Badge>
                      <span className='font-medium'>
                        {formatIDR(item.total)}
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={(item.total / totalAmount) * 100}
                    className='h-2'
                    color={backgroundColor}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      {/* <Card className='vintage-card'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Calendar className='h-5 w-5' />
            Monthly Trend
          </CardTitle>
          <CardDescription>
            Income vs expenses over the last few months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {mockSummary.monthlyTrend.map((month, index) => (
              <div key={index} className='grid grid-cols-4 gap-4 items-center'>
                <div className='font-medium'>{month.month}</div>
                <div className='text-vintage-income-green font-medium'>
                  {formatIDR(month.income)}
                </div>
                <div className='text-vintage-expense-red font-medium'>
                  {formatIDR(-month.expenses)}
                </div>
                <div
                  className={`font-medium ${
                    month.income - month.expenses > 0
                      ? 'text-vintage-income-green'
                      : 'text-vintage-expense-red'
                  }`}
                >
                  {formatIDR(month.income - month.expenses)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Quick Stats */}
      {/* <div className='grid gap-4 md:grid-cols-3'>
        <Card className='vintage-card'>
          <CardHeader>
            <CardTitle className='text-lg'>Top Spending Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: '#b8860b' }}
              />
              <span className='font-medium'>Bills & Utilities</span>
            </div>
            <p className='text-2xl font-bold mt-2 text-vintage-warm-gold'>
              {formatIDR(650_000)}
            </p>
            <p className='text-sm text-muted-foreground'>
              26.5% of total expenses
            </p>
          </CardContent>
        </Card>

        <Card className='vintage-card'>
          <CardHeader>
            <CardTitle className='text-lg'>Average Daily Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold text-vintage-neutral-blue'>
              {formatIDR(81_680)}
            </p>
            <p className='text-sm text-muted-foreground'>Based on 30 days</p>
          </CardContent>
        </Card>

        <Card className='vintage-card'>
          <CardHeader>
            <CardTitle className='text-lg'>Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-2'>
              <TrendingUp className='h-4 w-4 text-vintage-income-green' />
              <span className='font-medium text-vintage-income-green'>
                Under Budget
              </span>
            </div>
            <p className='text-2xl font-bold mt-2 text-vintage-income-green'>
              {formatIDR(549_500)}
            </p>
            <p className='text-sm text-muted-foreground'>
              Remaining this month
            </p>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
