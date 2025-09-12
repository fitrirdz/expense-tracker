'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
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
import { Eye, EyeOff, DollarSign } from 'lucide-react';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData);
      router.push('/dashboard/transactions');
    } catch (err: AxiosError | any) {
      toast.error(err?.response?.data?.error, {
        description: 'Please check your information and try again.',
      });
    }
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center bg-vintage-cream p-4'
      style={{
        backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(214, 169, 157, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(156, 175, 170, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(214, 218, 200, 0.1) 0%, transparent 50%)
      `,
      }}
    >
      <Card className='w-full max-w-md vintage-card'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <div className='bg-vintage-rose rounded-full p-3 shadow-lg'>
              <DollarSign className='h-6 w-6 text-primary-foreground' />
            </div>
          </div>
          <CardTitle className='text-2xl font-bold text-vintage-rose'>
            Welcome Back
          </CardTitle>
          <CardDescription className='text-vintage-teal'>
            Sign in to your expense tracker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                type='text'
                placeholder='Enter your username'
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-vintage-rose'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>
            <Button type='submit' className='w-full vintage-button'>
              Sign In
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            {"Don't have an account? "}
            <Link
              href='/register'
              className='text-vintage-rose hover:text-vintage-rose/80 hover:underline font-medium'
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
