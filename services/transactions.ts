import { AxiosResponse } from 'axios';
import api from './api';

export interface TransactionsResponse {
  transactions: {
    amount: number;
    category_id: number;
    category_name: string;
    created_at: string;
    date: string;
    description: string;
    id: number;
    user_id: number;
  }[];
}

export interface TransactionPayload {
  amount: number;
  category_id: number;
  date: string;
  description: string;
}

export interface SummaryResponse {
  summary: [
    {
      category_id: number;
      category_name: string;
      total: number;
    }
  ];
}

export function getTransactions(): Promise<
  AxiosResponse<TransactionsResponse>
> {
  return api.get<TransactionsResponse>('transactions');
}

export function addTransaction(
  payload: TransactionPayload
): Promise<AxiosResponse<TransactionsResponse>> {
  return api.post<TransactionsResponse>('transactions', payload);
}

export function getSummary(): Promise<AxiosResponse<SummaryResponse>> {
  return api.get<SummaryResponse>('transactions/summary');
}
