"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Calendar, Target } from "lucide-react"

// Mock data for summary with better vintage colors
const mockSummary = {
  totalIncome: 3500.0,
  totalExpenses: 2450.5,
  netAmount: 1049.5,
  categoryBreakdown: [
    { category: "Food & Dining", amount: 485.5, percentage: 19.8, color: "#8b4a47" }, // Deep burgundy
    { category: "Transportation", amount: 320.0, percentage: 13.1, color: "#5a6b7d" }, // Muted slate blue
    { category: "Bills & Utilities", amount: 650.0, percentage: 26.5, color: "#b8860b" }, // Dark goldenrod
    { category: "Entertainment", amount: 180.99, percentage: 7.4, color: "#4a6741" }, // Deep forest green
    { category: "Shopping", amount: 425.0, percentage: 17.3, color: "#D6A99D" }, // Vintage rose
    { category: "Healthcare", amount: 289.01, percentage: 11.8, color: "#9CAFAA" }, // Vintage teal
    { category: "Education", amount: 100.0, percentage: 4.1, color: "#554b41" }, // Medium brown
  ],
  monthlyTrend: [
    { month: "Jan", income: 3500, expenses: 2450 },
    { month: "Dec", income: 3200, expenses: 2680 },
    { month: "Nov", income: 3400, expenses: 2320 },
    { month: "Oct", income: 3100, expenses: 2890 },
  ],
}

export default function SummaryPage() {
  const savingsRate = ((mockSummary.netAmount / mockSummary.totalIncome) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Summary</h1>
          <p className="text-muted-foreground">Overview of your financial activity and spending patterns</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="vintage-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-vintage-income-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-vintage-income-green">+${mockSummary.totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="vintage-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-vintage-expense-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-vintage-expense-red">-${mockSummary.totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="vintage-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-vintage-neutral-blue" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${mockSummary.netAmount > 0 ? "text-vintage-income-green" : "text-vintage-expense-red"}`}
            >
              {mockSummary.netAmount > 0 ? "+" : ""}${mockSummary.netAmount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Income - Expenses</p>
          </CardContent>
        </Card>

        <Card className="vintage-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <Target className="h-4 w-4 text-vintage-warm-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-vintage-warm-gold">{savingsRate}%</div>
            <p className="text-xs text-muted-foreground">Of total income</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="vintage-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Spending by Category
          </CardTitle>
          <CardDescription>Breakdown of expenses across different categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSummary.categoryBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-vintage-dark-brown"
                      style={{
                        backgroundColor: "rgba(214, 218, 200, 0.3)",
                        border: "1px solid rgba(214, 218, 200, 0.5)",
                      }}
                    >
                      {item.percentage}%
                    </Badge>
                    <span className="font-medium">${item.amount.toFixed(2)}</span>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card className="vintage-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Trend
          </CardTitle>
          <CardDescription>Income vs expenses over the last few months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSummary.monthlyTrend.map((month, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center">
                <div className="font-medium">{month.month}</div>
                <div className="text-vintage-income-green font-medium">+${month.income.toFixed(2)}</div>
                <div className="text-vintage-expense-red font-medium">-${month.expenses.toFixed(2)}</div>
                <div
                  className={`font-medium ${(month.income - month.expenses) > 0 ? "text-vintage-income-green" : "text-vintage-expense-red"}`}
                >
                  {month.income - month.expenses > 0 ? "+" : ""}${(month.income - month.expenses).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="vintage-card">
          <CardHeader>
            <CardTitle className="text-lg">Top Spending Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#b8860b" }} />
              <span className="font-medium">Bills & Utilities</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-vintage-warm-gold">$650.00</p>
            <p className="text-sm text-muted-foreground">26.5% of total expenses</p>
          </CardContent>
        </Card>

        <Card className="vintage-card">
          <CardHeader>
            <CardTitle className="text-lg">Average Daily Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-vintage-neutral-blue">$81.68</p>
            <p className="text-sm text-muted-foreground">Based on 30 days</p>
          </CardContent>
        </Card>

        <Card className="vintage-card">
          <CardHeader>
            <CardTitle className="text-lg">Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-vintage-income-green" />
              <span className="font-medium text-vintage-income-green">Under Budget</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-vintage-income-green">$549.50</p>
            <p className="text-sm text-muted-foreground">Remaining this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
