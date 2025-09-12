'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DollarSign,
  Home,
  Receipt,
  Tag,
  BarChart3,
  Menu,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '@/utils/common';

const navigation = [
  // { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Transactions', href: '/dashboard/transactions', icon: Receipt },
  { name: 'Categories', href: '/dashboard/categories', icon: Tag },
  { name: 'Summary', href: '/dashboard/summary', icon: BarChart3 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const Sidebar = ({ mobile = false }) => (
    <div className='flex h-full flex-col bg-vintage-cream'>
      <div className='flex h-16 shrink-0 items-center px-4'>
        <div className='flex items-center gap-2'>
          <div className='bg-vintage-rose rounded-lg p-2 shadow-md'>
            <DollarSign className='h-5 w-5 text-primary-foreground' />
          </div>
          <span className='text-lg font-semibold'>ExpenseTracker</span>
        </div>
      </div>
      <nav className='flex-1 space-y-1 px-2 py-4'>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => mobile && setSidebarOpen(false)}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-vintage-rose text-white shadow-md'
                  : 'text-vintage-dark-brown hover:bg-vintage-sage/20 hover:text-vintage-rose'
              )}
            >
              <item.icon className='mr-3 h-5 w-5 flex-shrink-0' />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className='border-t p-4'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='bg-vintage-sage/60 rounded-full p-2'>
            <User className='h-4 w-4' />
          </div>
          <div className='text-sm'>
            <div className='font-medium text-vintage-dark-brown'>John Doe</div>
            <div className='text-muted-foreground text-vintage-dark-brown'>
              john@example.com
            </div>
          </div>
        </div>
        <Button
          variant='outline'
          size='sm'
          className='w-full bg-vintage-cream border-vintage-sage hover:bg-vintage-dark-brown'
          onClick={handleLogout}
          style={{ borderColor: 'rgba(214, 218, 200, 0.3)' }}
        >
          <LogOut className='mr-2 h-4 w-4' />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className='flex h-screen bg-vintage-cream'>
      {/* Desktop sidebar */}
      <div
        className='hidden lg:flex lg:w-64 lg:flex-col lg:border-r'
        style={{ borderColor: 'rgba(214, 218, 200, 0.3)' }}
      >
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side='left' className='w-64 p-0'>
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        <header
          className='flex h-16 items-center gap-4 border-b'
          style={{ borderColor: 'rgba(214, 218, 200, 0.3)' }}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='lg:hidden bg-transparent'
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
          </Sheet>
          <div className='flex-1' />
        </header>
        <main className='flex-1 overflow-auto p-4 lg:p-6'>{children}</main>
      </div>
    </div>
  );
}
