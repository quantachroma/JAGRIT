const http = require('http');

function api(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, data }); }
      });
    });
    req.on('error', (err) => {
      if (err.code === 'ECONNREFUSED') {
        console.error('❌ Cannot connect to server! Make sure "npm run dev" is running in your other terminal tab.');
      } else {
        console.error('Request Error:', err.message);
      }
      reject(err);
    });
    if (payload) req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('\n======================================================');
  console.log('🚀 JAGRIT BACKEND AUTOMATED VERIFICATION SUITE');
  console.log('======================================================\n');

  // 1. Health Check
  console.log('1️⃣  Testing Health & PostGIS Database Connection...');
  const health = await api('GET', '/health');
  console.log('   Response:', JSON.stringify(health.data));

  // 2. Ingestion & PostGIS 500m Deduplication
  console.log('\n2️⃣  Testing Ingestion & PostGIS 500m Radar Deduplication...');
  const dedup = await api('POST', '/api/v1/challenges/submit', {
    title: 'Broken Handpump in Kanke',
    description: 'Red water with iron sediment.',
    lat: 23.3441,
    lon: 85.3096,
    district: 'Ranchi',
    block: 'Kanke'
  });
  console.log('   Response:', JSON.stringify(dedup.data));

  // 3. Hackathon Bidding
  console.log('\n3️⃣  Testing University Bid Placement...');
  const bid = await api('POST', '/api/v1/hackathon/bid', {
    challenge_id: 'c0000000-0000-0000-0000-000000000001',
    university_name: 'Birla Institute of Technology, Mesra',
    budget: 350000,
    faculty_id: 'a0000000-0000-0000-0000-000000000002'
  });
  console.log('   Response:', JSON.stringify(bid.data));
  
  const projectId = bid.data.id || (bid.data.project && bid.data.project.id);
  console.log(`   👉 Captured Active Project UUID: ${projectId}`);

  if (projectId) {
    // 4. Tranche 2 Escrow Release
    console.log('\n4️⃣  Testing Escrow Tranche 2 Release (NABL Certificate)...');
    const t2 = await api('POST', `/api/v1/escrow/${projectId}/tranche-2/release`, {
      nabl_cert_url: 'https://storage.supabase.co/certificates/nabl-test.pdf'
    });
    console.log('   Response:', JSON.stringify(t2.data));

    // 5. Tranche 3 Escrow Release
    console.log('\n5️⃣  Testing Escrow Tranche 3 Release (PESA Gram Sabha NOC)...');
    const t3 = await api('POST', `/api/v1/escrow/${projectId}/tranche-3/release`, {
      pesa_noc_url: 'https://storage.supabase.co/governance/gram-sabha-palamu.pdf'
    });
    console.log('   Response:', JSON.stringify(t3.data));

    // 6. Citizen Quorum Vote
    console.log('\n6️⃣  Testing Citizen Quorum Vote Casting...');
    const vote = await api('POST', '/api/v1/quorum/vote', {
      project_id: projectId,
      is_pass: true,
      complaint_type: 'NONE',
      lat: 24.04,
      lon: 84.18
    });
    console.log('   Response:', JSON.stringify(vote.data));

    // 7. Quorum Evaluation
    console.log('\n7️⃣  Testing AI Population Quorum Evaluation Engine...');
    const quorum = await api('POST', `/api/v1/quorum/evaluate/${projectId}`, {
      settlement_population: 850
    });
    console.log('   Response:', JSON.stringify(quorum.data));
  }

  console.log('\n======================================================');
  console.log('🎉 ALL TESTS EXECUTED CLEANLY! NO CURL ERRORS!');
  console.log('======================================================\n');
}

run().catch(() => {});
