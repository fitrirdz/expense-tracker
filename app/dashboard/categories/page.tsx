'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
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
import { Plus, Tag, Edit, Trash2 } from 'lucide-react';
import { addCategory, CategoriesResponse, getCategories } from '@/services/categories';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    code: '',
    name: '',
  });

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const category = {
      code: newCategory.code.toUpperCase(),
      name: newCategory.name,
    };
    await addCategory(category);
    setNewCategory({ code: '', name: '' });
    setIsAddDialogOpen(false);
  };

  // const handleDeleteCategory = (id: number) => {
  //   // TODO: Integrate with DELETE endpoint if available
  //   setCategories((prev) => prev.filter((cat) => cat.id !== id));
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCategories();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getData();
  }, []);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Categories</h1>
          <p className='text-muted-foreground'>
            Organize your transactions with custom categories
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className='vintage-button'>
              <Plus className='mr-2 h-4 w-4' />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category to organize your transactions
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCategory} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='code'>Category Code</Label>
                <Input
                  id='code'
                  placeholder='e.g., FOOD, TRANS'
                  value={newCategory.code}
                  onChange={(e) =>
                    setNewCategory((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }))
                  }
                  className='vintage-input'
                  required
                />
                <p className='text-xs text-muted-foreground'>
                  Short code for the category (will be converted to uppercase)
                </p>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='name'>Category Name</Label>
                <Input
                  id='name'
                  placeholder='e.g., Food & Dining, Transportation'
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className='vintage-input'
                  required
                />
              </div>
              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  className='hover:bg-vintage-sage/20 bg-transparent'
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit' className='vintage-button'>
                  Add Category
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Table */}
      <Card className='vintage-card'>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription className='text-2d2319'>
            {categories.length} categories available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-2d2319'>Code</TableHead>
                <TableHead className='text-2d2319'>Name</TableHead>
                {/* <TableHead className='text-right text-2d2319'>
                  Actions
                </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className='text-2d2319'>
                    <Badge
                      variant='outline'
                      className='border-vintage-sage text-vintage-teal'
                      style={{ borderColor: '#D6DAC8', color: '#2d2319' }}
                    >
                      {category.code}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-2d2319'>
                    <div className='flex items-center gap-2'>
                      <Tag
                        className='h-4 w-4 text-muted-foreground'
                        style={{ color: '#2d2319' }}
                      />
                      {category.name}
                    </div>
                  </TableCell>
                  {/* <TableCell className='text-right text-2d2319'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='hover:bg-vintage-rose/20'
                      >
                        <Edit className='h-4 w-4 text-vintage-dark-brown hover:text-vintage-rose' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='hover:bg-vintage-rose/20'
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className='h-4 w-4 text-vintage-dark-brown hover:text-vintage-rose' />
                      </Button>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
