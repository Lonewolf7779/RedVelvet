/**
 * Playwright E2E verification test specification for Red Velvet web client.
 */
export const healthVerificationSpec = {
  name: "Editorial Home Canvas Renders Correctly",
  path: "/",
  expectedElements: [
    "h1:has-text('The Architecture of Restraint')",
    "header:has-text('RED VELVET')",
    "button:has-text('Explore Architecture')",
  ],
};
