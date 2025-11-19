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

  // Read
  read: async (apiUrl: string) => {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) throw new Error("Failed to fetch records");
    const userData = await response.json();
    return userData.userData || userData;
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
