import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CategoriesResponse, addCategory, getCategories } from '@/services/categories';

export const categoriesKeys = {
  all: ['categories'] as const,
  lists: () => [...categoriesKeys.all, 'list'] as const,
  list: (filters: string) => [...categoriesKeys.lists(), { filters }] as const,
  details: () => [...categoriesKeys.all, 'detail'] as const,
  detail: (id: number) => [...categoriesKeys.details(), id] as const,
};

export function useCategories() {
  const queryClient = useQueryClient();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: categoriesKeys.lists(),
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: async (newCategory: { code: string; name: string }) => {
      const response = await addCategory(newCategory);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the categories list
      queryClient.invalidateQueries({ queryKey: categoriesKeys.lists() });
      toast.success('Category added successfully!');
    },
    onError: (error) => {
      toast.error('Failed to add category', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    },
  });

  return {
    categories,
    isLoading,
    error,
    addCategory: addCategoryMutation.mutate,
    isAddingCategory: addCategoryMutation.isPending,
  };
}
