import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    const parsedData: Record<string, any> = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        if (value instanceof File) {
          parsedData[key] = {
            name: value.name,
            size: value.size,
            type: value.type,
          };
        } else {
          parsedData[key] = value;
        }
      });
    } else if (contentType.includes('application/json')) {
      const json = await req.json().catch(() => ({}));
      Object.assign(parsedData, json);
    }

    // Role 1 Mock Response as specified in Task 1.0.4 & PRD
    return NextResponse.json(
      {
        ticketNumber: 'JAG-2026-RAN-0104',
        status: 'PENDING_HITL',
        upvotes: 1,
        message: 'Samasya safalta-purvak darj ho gayi hai',
        receivedPayload: {
          title: parsedData.title || 'Rural Handpump Maintenance',
          domain: parsedData.category || 'drinking_water',
          location: parsedData.location || {
            lat: 23.3441,
            lon: 85.3096,
            district: 'Ranchi',
          },
          hasAudio: Boolean(parsedData.audio),
          hasMedia: Boolean(parsedData.media || parsedData.photos),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to process submission payload',
        details: error?.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      status: 'MOCK_API_HEALTHY',
      service: 'JAGRIT Citizen Submission Ingestion',
      sampleTicket: 'JAG-2026-RAN-0104',
    },
    { status: 200 }
  );
}

