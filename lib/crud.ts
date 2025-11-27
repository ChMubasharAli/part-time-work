
import { Task5FormData } from "./validations";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  maritalStatus: string;
  gender: string;
  estimatedStartDate: string;
  country: string;
  address: string;
  city: string;
  estimatedEndDate: string;
}

export interface RecordsResponse {
  records: User[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
}

export const crudOperations = {
  // Create
  create: async (data: Task5FormData, apiUrl: string) => {
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  // Read with pagination
  read: async (
    apiUrl: string,
    page: number = 1,
    limit: number = 10
  ): Promise<RecordsResponse> => {
    const response = await fetch(`${apiUrl}?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch records");
    return await response.json();
  },

  // Update
  update: async (id: number, data: User, apiUrl: string) => {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
};
