export const fetchData = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const baseUrl = 'https://localhost:7267/api';
  try {
    const response = await fetch(`${baseUrl}${url}`, options);
    //var data=await response.text();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'An error occurred while fetching data');
    }

    return await response.json();
  } catch (error) {
    console.error("Error during fetch:", error);
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};
