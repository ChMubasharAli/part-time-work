export interface FormData {
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

  clientTimestamp?: string; // ISO string of client time
  timezoneOffset?: number; // UTC offset in minutes
  browserTimezone?: string;
}

export const crudOperations = {
  // crud opertaion for create user record
  create: async (
    data: FormData,
    apiUrl: string
  ): Promise<{ message: string }> => {
    const respone = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!respone.ok) {
      const errorData = await respone.json();
      throw new Error(errorData.console.error || "Error saving data");
    }
    return respone.json();
  },

  //   here we can also add the different crud operations like (update, delete and read )
};
