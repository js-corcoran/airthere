# Document Vault — Build Shard
## AirThere | Screen SCR-009 | Shard 09

---

## 1. Screen Overview

**Screen ID:** SCR-009
**Screen Name:** Document Vault
**Purpose:** Secure, encrypted storage for travel documents (passports, visas, insurance, boarding passes, hotel confirmations). Accessible from Trip Dashboard, with biometric authentication.

---

## 2. Route & File Location

### Next.js Route Path
```
(main)/trips/[tripId]/documents/page.tsx
```

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **SCR-008 (Trip Dashboard):** Access documents from trip detail

### Shared Components Required
- `Button`, `Input`, `Modal`, `Skeleton` (Shadcn)
- `DocumentUploadModal` (custom)
- `DocumentViewer` (custom, PDF/image preview)

### Mock Data Requirements
- Document types and requirements by destination
- Mock encryption (Design Mode only)
- Document file samples (PDFs, images)

---

## 4. Component Hierarchy

```
DocumentVaultPage
├── VaultHeader
│   ├── Title ("Document Vault")
│   └── BiometricUnlockButton
├── DocumentCategories (tabs or sections)
│   ├── TripDocuments (for current trip)
│   │   ├── DocumentCard[] (required + uploaded)
│   │   ├── UploadPrompt (if missing required doc)
│   │   └── DocumentUploadModal
│   ├── GeneralDocuments (profile-level)
│   │   ├── Passport
│   │   ├── Visas
│   │   ├── Insurance
│   │   └── CustomDocuments
│   └── ArchivedDocuments (past trips)
│
├── DocumentCard (repeating)
│   ├── DocumentIcon (type-specific)
│   ├── DocumentName
│   ├── ExpirationStatus
│   ├── ViewButton (preview)
│   ├── DeleteButton
│   └── ShareButton (generate link)
│
└── DocumentViewer (modal, PDF/image preview)
    ├── Document preview
    ├── ExpirationDate
    ├── DownloadButton
    └── CloseButton
```

---

## 5. Component Specifications

### Component: DocumentCard

**Props Interface:**
```typescript
interface DocumentCardProps {
  document: TripDocument;
  onView?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
  onShare?: (documentId: string) => void;
}
```

**Tailwind Classes:**
```typescript
const styles = {
  card: 'p-4 border border-neutral-200 rounded-lg flex items-start justify-between',
  cardExpired: 'border-error-300 bg-error-50',
  cardExpiringSoon: 'border-warning-300 bg-warning-50',
  icon: 'text-2xl mr-3',
  content: 'flex-1',
  name: 'font-semibold text-neutral-900',
  expiration: 'text-xs text-neutral-600 mt-1',
  expirationWarning: 'text-xs text-error-600 font-medium',
  actions: 'flex gap-2',
  actionButton: 'px-2 py-1 text-xs rounded hover:bg-neutral-100',
};
```

---

### Component: DocumentUploadModal

**Props Interface:**
```typescript
interface DocumentUploadModalProps {
  documentType: 'passport' | 'visa' | 'insurance' | 'booking' | 'custom';
  tripId?: string;
  onUpload: (file: File, metadata: DocumentMetadata) => Promise<void>;
  onClose: () => void;
}
```

---

## 6. Layout & Wireframe

### Document Vault — Mobile

```
┌──────────────────────────────────────┐
│ Document Vault       🔓 [Biometric]  │
├──────────────────────────────────────┤
│                                      │
│ Trip Documents (SFO → LHR)          │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ 📕 Passport                    │  │
│ │ Required                       │  │
│ │ ✓ Uploaded | Expires 2028-06  │  │
│ │                                │  │
│ │ [View] [Share] [Delete]        │  │
│ └────────────────────────────────┘  │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ 📗 UK Visa                     │  │
│ │ Required                       │  │
│ │ ⚠️ Not uploaded                 │  │
│ │                                │  │
│ │ [Upload Now]                   │  │
│ └────────────────────────────────┘  │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ 📄 Travel Insurance            │  │
│ │ Required                       │  │
│ │ ✓ Uploaded | Expires 2026-04  │  │
│ │                                │  │
│ │ [View] [Share] [Delete]        │  │
│ └────────────────────────────────┘  │
│                                      │
├──────────────────────────────────────┤
│ General Documents                    │
│ • Passport (General profile)        │
│ • Previous visas                    │
│ • Insurance documents               │
│ • Custom documents                  │
│                                      │
└──────────────────────────────────────┘
```

---

## 7. Interaction Patterns

### Document Upload
- Tap "Upload [Document]" → Modal opens
- User can take photo (camera) or select file (gallery)
- Show preview and edit metadata (expiration date)
- Tap "Save" → Upload with encryption

### View Document
- Tap "View" → Full-screen PDF/image viewer
- Pinch-to-zoom on images
- Download button available

### Biometric Unlock
- On vault enter, request Face ID or fingerprint
- Fail-back to PIN or password
- Session timeout: 5 minutes, re-lock required

### Document Expiration
- Red background if expired
- Yellow background if expiring within 30 days
- Notification badge on trip card

---

## 8. State Management

### Local Component State

```typescript
const [documents, setDocuments] = useState<TripDocument[]>([]);
const [selectedDocument, setSelectedDocument] = useState<TripDocument | null>(null);
const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);
const [isLocked, setIsLocked] = useState(true);
```

---

## 9. Data Requirements & Mock Data

### Data Shapes

```typescript
export interface TripDocument {
  id: string;
  tripId?: string;
  type: 'passport' | 'visa' | 'insurance' | 'booking' | 'custom';
  name: string;
  required: boolean;
  status: 'required' | 'uploaded' | 'expired' | 'expiring-soon';
  expirationDate?: Date;
  uploadDate: Date;
  fileUrl: string;
  fileSize: number;
  encrypted: boolean;
  metadata: {
    country?: string;
    documentNumber?: string;
    issuedDate?: Date;
  };
}
```

### Mock Data

```typescript
export function generateMockDocuments(tripId: string): TripDocument[] {
  return [
    {
      id: 'd1',
      tripId,
      type: 'passport',
      name: 'US Passport',
      required: true,
      status: 'uploaded',
      expirationDate: new Date('2028-06-15'),
      uploadDate: new Date('2026-03-20'),
      fileUrl: '/mock-documents/passport.pdf',
      fileSize: 250000,
      encrypted: true,
      metadata: {
        country: 'US',
        documentNumber: 'C12345678',
        issuedDate: new Date('2018-06-15'),
      },
    },
    // ... more documents
  ];
}
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")
- Emphasis: Privacy, security
- Show: Document sharing with assistant/concierge

### PERSONA-02: Business ("Marcus")
- Emphasis: Organization, compliance tracking
- Show: Document expiration alerts, bulk export

### PERSONA-03: Family ("Chen Family")
- Show: Documents for all family members
- Emphasis: Child passport, family insurance

---

## 11. Accessibility Requirements

### ARIA Labels

**Document List:**
```html
<ul role="list" aria-label="Travel documents">
  <li aria-label="Passport, required, uploaded, expires June 2028">...</li>
</ul>
```

---

## 12. Loading, Error & Empty States

### Upload Loading
```typescript
<div className="flex flex-col items-center">
  <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
  <p className="text-sm text-neutral-600 mt-2">{uploadProgress}%</p>
</div>
```

### Empty Documents
```typescript
<div className="text-center py-8">
  <div className="text-4xl mb-4">📄</div>
  <p className="text-sm text-neutral-600">No documents uploaded for this trip</p>
</div>
```

---

## 13. Edge Cases & Error Handling

- **File too large:** Show "File exceeds 10MB limit"
- **Unsupported format:** Show "PDF or image files only"
- **Upload interrupted:** Show "Upload failed" with retry
- **Document expired:** Show warning badge, prompt re-upload
- **Encryption unavailable:** Fall back to unencrypted storage (Design Mode)

---

## 14. Testing Requirements

### Component Tests

```typescript
describe('DocumentVault', () => {
  it('displays required documents', () => {
    const { getByText } = render(
      <DocumentVault documents={[
        {type: 'passport', required: true, status: 'uploaded'},
        {type: 'visa', required: true, status: 'required'},
      ]} />
    );
    expect(getByText(/passport/i)).toBeInTheDocument();
    expect(getByText(/visa/i)).toBeInTheDocument();
  });

  it('shows expiration warnings', () => {
    const expiringDoc = {
      ...mockDoc,
      expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    };
    const { getByText } = render(<DocumentVault documents={[expiringDoc]} />);
    expect(getByText(/expires in 15 days/i)).toBeInTheDocument();
  });
});
```

---

## 15. Build Checklist

- [ ] Document upload functionality
- [ ] File encryption mock (Design Mode)
- [ ] Document preview (PDF, image viewers)
- [ ] Biometric lock/unlock
- [ ] Document expiration tracking
- [ ] Trip-specific and general documents
- [ ] Document sharing links
- [ ] Responsive design tested
- [ ] Accessibility audit passing
- [ ] Loading & error states
- [ ] Unit & integration tests passing

---

**Estimated Build Time:** 2-3 days
**Dependencies:** SCR-008 (Trip Dashboard) complete
**Priority:** P1 (important feature, non-blocking)
