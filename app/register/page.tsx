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
import { signup } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup(formData);

      toast.success('Registration successful!', {
        description: 'Redirecting you to login...',
        action: {
          label: 'Login now',
          onClick: () => router.push('/login'),
        },
      });
    } catch (err) {
      console.error('Can not register: ', err);
      toast.error('Registration failed', {
        description: 'Please check your information and try again.',
      });
    }
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center bg-vintage-cream p-4'
      style={{
        backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(156, 175, 170, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(214, 169, 157, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(214, 218, 200, 0.1) 0%, transparent 50%)
      `,
      }}
    >
      <Card className='w-full max-w-md vintage-card'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <div className='bg-vintage-income-green rounded-full p-3 shadow-lg'>
              <DollarSign className='h-6 w-6 text-white' />
            </div>
          </div>
          <CardTitle className='text-2xl font-bold text-vintage-income-green'>
            Create Account
          </CardTitle>
          <CardDescription className='text-vintage-teal'>
            Sign up to start tracking your expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                type='text'
                placeholder='Choose a username'
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
                  placeholder='Create a password'
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
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-vintage-income-green'
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
            <Button
              type='submit'
              className='w-full vintage-button bg-vintage-income-green text-white hover:text-black border-vintage-dark-brown'
            >
              Create Account
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='text-vintage-income-green hover:underline vintage-link'
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
