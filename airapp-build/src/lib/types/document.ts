export interface TripDocument {
  id: string;
  tripId?: string;
  type: 'passport' | 'visa' | 'insurance' | 'booking' | 'custom';
  name: string;
  holderName?: string;
  required: boolean;
  status: 'required' | 'uploaded' | 'expired' | 'expiring-soon';
  expirationDate?: string;
  uploadDate?: string;
  fileSize?: number;
  encrypted: boolean;
  metadata: {
    country?: string;
    documentNumber?: string;
    issuedDate?: string;
  };
}

export interface DocumentCategory {
  id: string;
  label: string;
  documents: TripDocument[];
}

export type DocumentFilter = 'all' | 'trip' | 'general' | 'archived';

export interface DocumentUploadPayload {
  type: TripDocument['type'];
  name: string;
  holderName?: string;
  expirationDate?: string;
  tripId?: string;
}
