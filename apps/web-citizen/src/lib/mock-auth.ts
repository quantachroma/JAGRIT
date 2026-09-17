export interface MockUser {
  role: 'CITIZEN' | 'UNIVERSITY' | 'INDUSTRY' | 'GOVERNMENT';
  name: string;
  email: string;
  password: string;
  organization: string;
  authId: string;
  targetDashboard: string;
  badge: string;
}

export const MOCK_ACCOUNTS: Record<string, MockUser> = {
  citizen: {
    role: 'CITIZEN',
    name: 'Somra Oraon',
    email: 'citizen@jagrit.jharkhand.gov.in',
    password: 'Citizen@2026',
    organization: 'Gram Panchayat Kanke, Ranchi',
    authId: 'VOTER-JH-2026-9941',
    targetDashboard: '/dashboard',
    badge: 'Verified Rural Resident',
  },
  university: {
    role: 'UNIVERSITY',
    name: 'Dr. Anand Verma (Dean R&D)',
    email: 'dean.research@bitmesra.ac.in',
    password: 'Uni@2026',
    organization: 'Birla Institute of Technology (BIT) Mesra',
    authId: 'AISHE-U-0204',
    targetDashboard: '/university/dashboard',
    badge: 'NABL Chemistry Lab Head',
  },
  industry: {
    role: 'INDUSTRY',
    name: 'Rajesh Singhania (CSR Lead)',
    email: 'csr.lead@tatasteel.com',
    password: 'Industry@2026',
    organization: 'Tata Steel Corporate Foundation',
    authId: 'CSR-1-JH-00421',
    targetDashboard: '/industry/dashboard',
    badge: 'Schedule VII Co-Sponsor',
  },
  government: {
    role: 'GOVERNMENT',
    name: 'Sunita Soren, IAS',
    email: 'dhte.secretary@jharkhand.gov.in',
    password: 'Govt@2026',
    organization: 'Dept of Higher & Technical Education (DHTE)',
    authId: 'JH-GOV-DHTE-001',
    targetDashboard: '/government/dashboard',
    badge: 'State Innovation Secretary',
  },
};

export function getMockUserByRole(role: 'CITIZEN' | 'UNIVERSITY' | 'INDUSTRY' | 'GOVERNMENT'): MockUser {
  const key = role.toLowerCase();
  return MOCK_ACCOUNTS[key] || MOCK_ACCOUNTS.citizen;
}

export function saveActiveSession(user: MockUser): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jagrit_active_user', JSON.stringify(user));
    localStorage.setItem(
      'jagrit_citizen_user',
      JSON.stringify({
        phone: user.email,
        name: user.name,
        isAuthenticated: true,
        role: user.role,
        organization: user.organization,
        authId: user.authId,
        badge: user.badge,
      })
    );
    // Sync session to cookie so Next.js Edge Middleware and SSR can verify session
    document.cookie = `jagrit_session=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400; SameSite=Lax`;
  }
}

export function getActiveSession(): MockUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('jagrit_active_user');
    if (raw) return JSON.parse(raw);

    // Fallback check on session cookie
    const cookies = document.cookie.split(';');
    for (const c of cookies) {
      const trimmed = c.trim();
      if (trimmed.startsWith('jagrit_session=')) {
        const val = trimmed.substring('jagrit_session='.length);
        if (val) return JSON.parse(decodeURIComponent(val));
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function clearActiveSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jagrit_active_user');
    localStorage.removeItem('jagrit_citizen_user');
    document.cookie = 'jagrit_session=; path=/; max-age=0; SameSite=Lax';
  }
}
