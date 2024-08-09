export function extractEmailId(email: string): string {
    return email.split("@")[0];
  }