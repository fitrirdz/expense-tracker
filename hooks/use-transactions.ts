import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  TransactionPayload,
  addTransaction,
  getSummary,
  getTransactions,
} from '@/services/transactions';

export const transactionsKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionsKeys.all, 'list'] as const,
  list: (filters: string) =>
    [...transactionsKeys.lists(), { filters }] as const,
  details: () => [...transactionsKeys.all, 'detail'] as const,
  detail: (id: number) => [...transactionsKeys.details(), id] as const,
};

export function useTransactions() {
  const queryClient = useQueryClient();

  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: transactionsKeys.lists(),
    queryFn: async () => {
      const response = await getTransactions();
      return response.data?.transactions || [];
    },
  });

  const addTransactionMutation = useMutation({
    mutationFn: async (newTransaction: TransactionPayload) => {
      const response = await addTransaction(newTransaction);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the transactions list
      queryClient.invalidateQueries({ queryKey: transactionsKeys.lists() });
      toast.success('Transaction added successfully!');
    },
    onError: (error) => {
      toast.error('Failed to add Transaction', {
        description:
          error instanceof Error ? error.message : 'Please try again',
      });
    },
  });

  const {
    data: summary,
    isLoading: isLoadingSummary,
    error: summaryError,
  } = useQuery({
    queryKey: ['summary'],
    queryFn: async () => {
      const response = await getSummary();
      return response.data?.summary || [];
    },
  });

  return {
    transactions,
    isLoading,
    error,
    addTransaction: addTransactionMutation.mutate,
    isAddingTransaction: addTransactionMutation.isPending,
    summary,
    isLoadingSummary,
    summaryError,
  };
}
