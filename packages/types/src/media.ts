/**
 * Private Portfolio Storage and Media Domain Boundaries.
 * No private media assets are ever served through public buckets.
 */

export type MediaAccessLevel =
  "private" | "organization_restricted" | "embargoed" | "curated_public";

export interface MediaAssetBoundary {
  id: string;
  organizationId: string;
  ownerId: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  checksumSha256: string;
  accessLevel: MediaAccessLevel;
  embargoUntil?: string;
  createdAt: string;
}

export interface PresignedUrlRequest {
  assetId: string;
  intendedAction: "read" | "write";
  expiresInSeconds?: number;
}

export interface PresignedUrlResponse {
  assetId: string;
  url: string;
  expiresAt: string;
  headers: Record<string, string>;
}
