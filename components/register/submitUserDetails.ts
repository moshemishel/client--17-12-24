export interface SubmitResult {
    isSuccess: boolean;
    message: string;
  }
  
  export async function submitUserDetails(
    data: { name: string; phone: string }
  ): Promise<SubmitResult> {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        return {
            isSuccess: false,
          message: error.message || "An unknown error occurred",
        };
      }
  
      return {
        isSuccess: true,
        message: "Details submitted successfully",
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message || "Network error occurred",
      };
    }
  };

export default submitUserDetails;