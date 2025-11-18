export interface User {
  id: number;
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
  readAll: async (apiUrl: string): Promise<{ userData: User[] }> => {
    const response = await fetch(`${apiUrl}`);

    if (!response.ok) {
      throw new Error("Error loading users data");
    }

    return response.json();
  },
};
