/**
 * User and Organization domain boundaries (Contract specifications for subsequent milestones).
 */

export type UserRole =
  "superadmin" | "org_admin" | "curator" | "talent" | "viewer";

export interface OrganizationBoundary {
  id: string;
  slug: string;
  name: string;
  tier: "editorial" | "atelier" | "enterprise";
  createdAt: string;
  updatedAt: string;
}

export interface UserBoundary {
  id: string;
  organizationId: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
