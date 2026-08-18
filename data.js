/* Property Co-Development Platform — demo/prototype sample data.
   All figures are illustrative for demonstration only. Currency: NGN (₦). */
window.DATA = (function () {
  const ngn = n => '₦' + Number(n).toLocaleString('en-NG');
  const MILESTONE_TEMPLATE = [
    { name: 'Commitment / SPV Entry', pct: 10 },
    { name: 'Land / Commencement', pct: 15 },
    { name: 'Foundation', pct: 15 },
    { name: 'Structural Frame', pct: 20 },
    { name: 'Building Envelope / Roofing', pct: 10 },
    { name: 'Mechanical & Electrical', pct: 10 },
    { name: 'Finishing', pct: 15 },
    { name: 'Completion / Handover', pct: 5 },
  ];

  const developers = {
    meridian: { id:'meridian', name:'Meridian Developments', verified:true, since:2009, location:'Ikoyi, Lagos',
      blurb:'Award-winning luxury residential developer with 14 delivered schemes across Ikoyi and Victoria Island.',
      completed:11, ongoing:3, delivered:'₦48B+', specialisms:['Luxury residential','Waterfront','Mixed-use'] },
    atlas: { id:'atlas', name:'Atlas Urban', verified:true, since:2013, location:'Victoria Island, Lagos',
      blurb:'Mixed-use and commercial specialists focused on institutional-grade developments on Lagos Island.',
      completed:7, ongoing:2, delivered:'₦31B+', specialisms:['Mixed-use','Commercial','Retail'] },
    coastline: { id:'coastline', name:'Coastline Projects', verified:true, since:2016, location:'Lekki, Lagos',
      blurb:'High-volume residential estates and gated communities across the Lekki corridor.',
      completed:5, ongoing:4, delivered:'₦22B+', specialisms:['Estates','Residential','Gated communities'] },
    heritage: { id:'heritage', name:'Heritage Build', verified:true, since:2007, location:'Ikeja GRA, Lagos',
      blurb:'Premium redevelopment and refurbishment specialists in established GRA neighbourhoods.',
      completed:9, ongoing:1, delivered:'₦18B+', specialisms:['Redevelopment','Premium residential'] },
  };

  function schedule(total){
    return MILESTONE_TEMPLATE.map((m,i)=>({ ...m, amount: Math.round(total*m.pct/100) }));
  }

  const opportunities = [
    { id:'ivory-ikoyi', name:'Ivory Residences', location:'Ikoyi', devId:'meridian', type:'Luxury Residential',
      units:24, available:9, from:45000000, structure:'Property allocation + SPV', stage:'Foundation', stageIdx:2,
      target:'Q4 2027', verified:true, hero:'#1f3b57',
      tagline:'24 curated waterfront-adjacent residences in the heart of Ikoyi.',
      overview:'A boutique collection of 2 & 3-bed luxury apartments with concierge, pool and secure parking. Co-developers participate from foundation stage at development-stage pricing.',
      comparable:78000000, funding:1080000000, raised:642000000 },
    { id:'marina-vi', name:'Marina Heights', location:'Victoria Island', devId:'atlas', type:'Mixed-Use',
      units:60, available:22, from:38000000, structure:'SPV equity participation', stage:'Structural Frame', stageIdx:3,
      target:'Q2 2028', verified:true, hero:'#173a3a',
      tagline:'A landmark mixed-use tower — residences, offices and retail on VI.',
      overview:'Grade-A mixed-use development combining serviced apartments, offices and ground-floor retail. Equity participation in the development SPV with distribution on completion/sale.',
      comparable:60000000, funding:2280000000, raised:1520000000 },
    { id:'lekki-palms', name:'Lekki Palms Estate', location:'Lekki', devId:'coastline', type:'Residential Estate',
      units:120, available:64, from:22000000, structure:'Off-plan allocation', stage:'Land / Commencement', stageIdx:1,
      target:'Q3 2028', verified:true, hero:'#2a2f5a',
      tagline:'A 120-home gated estate with parks, retail and 24/7 security.',
      overview:'Master-planned family estate of terraces and detached homes with recreation, water and power infrastructure. Earliest-stage participation at the most attractive pricing.',
      comparable:34000000, funding:2640000000, raised:790000000 },
    { id:'gra-court', name:'GRA Court', location:'Ikeja GRA', devId:'heritage', type:'Premium Redevelopment',
      units:18, available:18, from:30000000, structure:'SPV equity participation', stage:'Due Diligence', stageIdx:0,
      target:'Q1 2028', verified:true, hero:'#3a2f22', pending:true,
      tagline:'Boutique redevelopment of a landmark GRA site — 18 premium units.',
      overview:'An 18-unit premium redevelopment in established Ikeja GRA. Currently in final due-diligence & legal review ahead of marketplace publication.',
      comparable:52000000, funding:540000000, raised:0 },
    { id:'waterfront-ikoyi', name:'The Waterfront', location:'Ikoyi', devId:'meridian', type:'Luxury Apartments',
      units:30, available:4, from:65000000, structure:'Property allocation', stage:'Finishing', stageIdx:6,
      target:'Q1 2027', verified:true, hero:'#12303f',
      tagline:'Waterfront luxury apartments — final finishing stage, near completion.',
      overview:'Signature waterfront apartments with private berths, spa and sky lounge. Approaching practical completion — limited final allocations remain.',
      comparable:96000000, funding:1950000000, raised:1820000000 },
    { id:'palm-offices', name:'Palm Grove Offices', location:'Lekki', devId:'atlas', type:'Commercial',
      units:40, available:15, from:40000000, structure:'SPV equity participation', stage:'Building Envelope', stageIdx:4,
      target:'Q4 2027', verified:true, hero:'#1c3a2b',
      tagline:'Grade-A office suites on the Lekki-Epe corridor.',
      overview:'Efficient, sustainable office suites for owner-occupiers and investors, with parking and backup power. Participation via development SPV.',
      comparable:58000000, funding:1600000000, raised:1010000000 },
  ].map(o => ({ ...o, dev: developers[o.devId], schedule: schedule(o.from) }));

  const stages = ['Due Diligence','Land / Commencement','Foundation','Structural Frame','Building Envelope','Mechanical & Electrical','Finishing','Completion'];

  // Sample authenticated investor
  const investor = {
    name:'Adaeze Okafor', qualified:true, kyc:'Verified',
    holdings:[
      { oppId:'marina-vi', committed:76000000, paid:53200000, units:'2 units (SPV equity)', nextCall:{ milestone:'Building Envelope', amount:7600000, due:'2026-09-05', status:'Payment Due' } },
      { oppId:'waterfront-ikoyi', committed:65000000, paid:61750000, units:'Apt 14B', nextCall:{ milestone:'Completion / Handover', amount:3250000, due:'2026-11-20', status:'Awaiting Milestone' } },
    ],
    actions:[
      { t:'Sign participation agreement — Ivory Residences', kind:'Awaiting Signature', link:'#/investor/dealroom/ivory-ikoyi' },
      { t:'Capital call due — Marina Heights (Building Envelope)', kind:'Payment Due', link:'#/investor/payments' },
      { t:'Acknowledge updated QS report — Marina Heights', kind:'Action Required', link:'#/investor/dealroom/marina-vi' },
    ],
  };

  const dealroomDocs = [
    { cat:'Investment Memorandum', name:'Investment & Development Memorandum v3', status:'Requires acknowledgement' },
    { cat:'Title & Land', name:'Certificate of Occupancy + Search Report', status:'Available' },
    { cat:'Planning', name:'Development Permit & Approvals', status:'Available' },
    { cat:'Financials', name:'Development Budget & Cashflow', status:'Available' },
    { cat:'QS / Cost', name:'Quantity Surveyor Cost Plan', status:'Updated' },
    { cat:'Architecture', name:'Drawings, Floor Plans & Renders', status:'Available' },
    { cat:'Legal Structure', name:'SPV / Co-Development Agreement', status:'Awaiting signature' },
    { cat:'Developer DD', name:'Developer Due-Diligence Pack', status:'Signed' },
    { cat:'Risk & Disclosures', name:'Risk Factors & Disclosures', status:'Requires acknowledgement' },
  ];

  const developer = {
    name:'Meridian Developments', devId:'meridian',
    projects:[
      { oppId:'ivory-ikoyi', investors:12, committed:642000000, milestoneDue:'Foundation evidence' },
      { oppId:'waterfront-ikoyi', investors:26, committed:1820000000, milestoneDue:'Completion certificate' },
    ],
    tasks:[
      { t:'Submit Foundation milestone evidence — Ivory Residences', kind:'Action Required' },
      { t:'Respond to 2 investor clarifications — Ivory Residences', kind:'Clarification Required' },
      { t:'Upload updated cost plan — The Waterfront', kind:'Action Required' },
    ],
    submitSteps:['Project Basics','Land / Title','Design','Commercials','Funding','Programme','Professional Team','Documents','Review & Submit'],
  };

  const admin = {
    pipeline:[
      { opp:'GRA Court', dev:'Heritage Build', stage:'Legal Review', status:'Under Review' },
      { opp:'Ivory Residences', dev:'Meridian Developments', stage:'Published', status:'Funding' },
      { opp:'Marina Heights', dev:'Atlas Urban', stage:'Published', status:'Funding' },
      { opp:'Palm Grove Offices', dev:'Atlas Urban', stage:'Published', status:'Development' },
      { opp:'Harbour View', dev:'Coastline Projects', stage:'Due Diligence', status:'Draft' },
    ],
    kyc:[
      { name:'Chidi Nwosu', type:'Individual', status:'Review Required' },
      { name:'Zenith Capital Ltd', type:'Corporate', status:'In Progress' },
    ],
    finance:[
      { ref:'CC-2026-0442', investor:'Adaeze Okafor', opp:'Marina Heights', milestone:'Building Envelope', amount:7600000, status:'Awaiting Payment' },
      { ref:'CC-2026-0439', investor:'Tunde Bello', opp:'Ivory Residences', milestone:'Foundation', amount:6750000, status:'Received' },
      { ref:'CC-2026-0431', investor:'Ngozi Eze', opp:'Marina Heights', milestone:'Structural Frame', amount:15200000, status:'Reconciled' },
      { ref:'CC-2026-0428', investor:'K. Adeyemi', opp:'Palm Grove Offices', milestone:'Envelope', amount:4000000, status:'Held in Escrow' },
      { ref:'CC-2026-0421', investor:'Zenith Capital', opp:'The Waterfront', milestone:'Finishing', amount:9750000, status:'Release Approved' },
    ],
  };

  const partner = {
    name:'Okoro & Partners (Legal)',
    tasks:[
      { t:'Title verification — GRA Court', kind:'Under Review', type:'Legal' },
      { t:'SPV incorporation check — Marina Heights', kind:'Action Required', type:'Legal' },
      { t:'Certify Structural milestone — Palm Grove Offices', kind:'Evidence Submitted', type:'QS / Assurance' },
      { t:'Approve escrow release — The Waterfront (Finishing)', kind:'Payment Due', type:'Bank / Finance' },
    ],
  };

  // status vocabulary → family
  const STATUS = {
    'Verified':'good','Approved':'good','Signed':'good','Paid':'good','Certified':'good','Completed':'good','Reconciled':'good','Received':'good','Release Approved':'good','Released':'good','Funding':'good','Available':'good',
    'Under Review':'prog','KYC Pending':'prog','In Progress':'prog','Awaiting Signature':'prog','Evidence Submitted':'prog','Held in Escrow':'prog','Updated':'prog','Development':'prog','Awaiting Milestone':'prog','Awaiting Payment':'prog',
    'Action Required':'attn','Payment Due':'attn','Clarification Required':'attn','Requires acknowledgement':'attn','Review Required':'attn','Expiring Soon':'attn',
    'Rejected':'bad','Failed Verification':'bad','Overdue':'bad','Disputed':'bad','Blocked':'bad',
    'Draft':'neu','Planned':'neu','Not Started':'neu','Closed':'neu','Withdrawn':'neu','Legal Review':'neu','Due Diligence':'neu','Published':'neu',
  };

  return { ngn, opportunities, developers, investor, developer, admin, partner, dealroomDocs, stages, MILESTONE_TEMPLATE, STATUS,
    byId:id=>opportunities.find(o=>o.id===id) };
})();
