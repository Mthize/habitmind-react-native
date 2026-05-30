export async function canAccessAiInsights(_userId?: string): Promise<boolean> {
  return false;
}

export async function requireAiInsightsAccess() {
  return {
    allowed: false,
    reason: "AI insights require a paid plan.",
  };
}
