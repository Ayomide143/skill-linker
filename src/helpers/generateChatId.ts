export function generateChatId(freelancerId: string, clientId: string) {
  try {
    if (!freelancerId || !clientId) {
      throw new Error("Both freelancerId and clientId are required");
    }
    return freelancerId < clientId
      ? `${freelancerId}_${clientId}`
      : `${clientId}_${freelancerId}`;
  } catch (error) {
    console.error("Error generating chat ID:", error);
    throw error;
  }
}

