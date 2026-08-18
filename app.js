(function () {
  const D = window.DATA, app = document.getElementById('app');
  const money = D.ngn, esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const fam = s => D.STATUS[s] || 'neu';
  const pill = s => `<span class="pill ${fam(s)}">${esc(s)}</span>`;
  const heroBg = o => `background:linear-gradient(135deg,${o.hero},#0a1826)`;

  const oppCard = o => `<a class="opp" href="#/opportunity/${o.id}">
      <div class="ph" style="${heroBg(o)}"><span class="loc">📍 ${o.location}</span>${o.verified?'<span class="vf">✓ Verified</span>':''}</div>
      <div class="bd"><div class="dev">${esc(o.dev.name)}</div><h3>${esc(o.name)}</h3><p>${esc(o.tagline)}</p>
        <div class="meta"><div class="from"><small>Participation from</small><b>${money(o.from)}</b></div>
          <span class="stage-chip">${o.pending?'Coming soon':esc(o.stage)}</span></div></div></a>`;

  const ROLES = [['/','Public'],['/investor','Investor'],['/developer','Developer'],['/partner','Legal / Assurance'],['/admin','Administration']];
  function roleBar(active){
    const bar = document.getElementById('rolebar');
    bar.style.display = active ? 'block' : 'none';
    document.getElementById('roleRoles').innerHTML = ROLES.map(([h,l])=>`<span class="r ${active===h?'on':''}" onclick="location.hash='#${h}'">${l}</span>`).join('');
  }

  /* ---------------- PUBLIC ---------------- */
  function home(){
    const feat = D.opportunities.filter(o=>!o.pending).slice(0,3);
    return `
    <section class="hero"><div class="wrap">
      <span class="eyebrow">🏛️ Nigeria MVP · Ikoyi · Victoria Island · Lekki · Ikeja GRA</span>
      <h1>Co-develop premium property — <em>before</em> the developer's margin.</h1>
      <p class="lead">Discover verified developments, qualify privately, structure through professional legal, fund on milestones and monitor construction to ownership — all in one governed digital journey.</p>
      <div class="cta"><a class="btn btn-bronze" href="#/opportunities">Explore opportunities</a><a class="btn btn-outline" href="#/how">How co-development works</a></div>
      <div class="flow">${['Discover','Qualify','Verify','Deal Room','Commit','Fund','Build','Monitor','Own / Exit'].map(s=>`<span>${s}</span>`).join('')}</div>
      <div class="hero-stats">
        <div><div class="n">4</div><div class="l">Prime Lagos markets</div></div>
        <div><div class="n">${D.opportunities.length}</div><div class="l">Curated opportunities</div></div>
        <div><div class="n">${Object.keys(D.developers).length}</div><div class="l">Verified developers</div></div>
        <div><div class="n">Milestone</div><div class="l">Escrow-governed funding</div></div>
      </div>
    </div></section>

    <section><div class="wrap">
      <div class="sec-head"><div class="kicker">Curated Opportunities</div><h2>Featured developments</h2>
        <p>Every opportunity is verified and approved before it reaches the marketplace — trust before conversion.</p></div>
      <div class="grid g3">${feat.map(oppCard).join('')}</div>
      <div style="text-align:center;margin-top:26px"><a class="btn btn-ghost" href="#/opportunities">View all opportunities →</a></div>
    </div></section>

    <section class="soft"><div class="wrap">
      <div class="sec-head"><div class="kicker">The Model</div><h2>A transparent path from discovery to ownership</h2></div>
      <div class="grid g4">
        ${[['🔎','Discover & Qualify','Browse curated developments, then qualify privately — professional and selective, not a generic lead form.'],
           ['🛡️','Verify & Deal Room','Pass KYC, sign the NDA and enter a secure deal room with title, legal, QS and developer due-diligence.'],
           ['🏗️','Commit & Fund','Commit to a unit or SPV participation, e-sign the structure and fund on milestones through escrow.'],
           ['📈','Monitor & Own','Track certified construction evidence, payments and escrow releases to completion, title or exit.']]
          .map(([e,t,d])=>`<div class="card"><div style="font-size:26px;margin-bottom:8px">${e}</div><h3 style="font-size:18px;margin-bottom:6px">${t}</h3><p style="font-size:13.5px;color:var(--muted)">${d}</p></div>`).join('')}
      </div>
    </div></section>

    <section><div class="wrap">
      <div class="grid g2" style="align-items:center;gap:34px">
        <div>
          <div class="kicker">Trust as a product</div>
          <h2 style="font-size:30px;margin:8px 0 12px">Professional governance at every step</h2>
          <p style="color:var(--muted);margin-bottom:16px">Verified developers, a development approval committee, independent QS certification, and bank/escrow-controlled milestone releases — with a complete, immutable audit trail. Legal, banking and assurance are explicit participants, not afterthoughts.</p>
          <div class="row">${['✓ Verified developers','✓ Legal & title review','✓ Bank / escrow control','✓ Independent QS assurance','✓ Immutable audit trail'].map(x=>`<span class="pill good">${x.replace('✓ ','')}</span>`).join('')}</div>
        </div>
        <div class="card" style="background:var(--navy);color:#fff;border:0">
          <div class="kicker" style="color:var(--bronze-2)">Milestone funding</div>
          <h3 style="color:#fff;font-size:20px;margin:6px 0 14px">You fund progress, not promises</h3>
          ${D.MILESTONE_TEMPLATE.map(m=>`<div style="display:flex;justify-content:space-between;font-size:13px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.1)"><span style="color:#c6d2de">${m.name}</span><b style="color:var(--bronze-2)">${m.pct}%</b></div>`).join('')}
          <p class="note-sm" style="color:#9fb0c0;margin-top:12px">Illustrative schedule — each development sets its own certified milestones.</p>
        </div>
      </div>
    </div></section>

    <section class="soft"><div class="wrap" style="text-align:center">
      <div class="kicker">Ready to explore?</div>
      <h2 style="font-size:32px;margin:8px 0 8px">Qualify as a co-developer</h2>
      <p style="color:var(--muted);max-width:560px;margin:0 auto 20px">Preview the full experience — enter the platform as an investor, developer, legal partner or administrator.</p>
      <a class="btn btn-bronze" href="#/investor">Enter the platform ↗</a>
    </div></section>`;
  }

  function catalogue(){
    return `<section><div class="wrap">
      <div class="pg-head"><h2>Development opportunities</h2><p>Curated, verified co-development opportunities across prime Lagos markets.</p></div>
      <div class="filters">
        <select id="fLoc"><option value="">All locations</option>${[...new Set(D.opportunities.map(o=>o.location))].map(l=>`<option>${l}</option>`).join('')}</select>
        <select id="fType"><option value="">All types</option>${[...new Set(D.opportunities.map(o=>o.type))].map(t=>`<option>${t}</option>`).join('')}</select>
        <select id="fStage"><option value="">Any stage</option>${['Due Diligence','Land / Commencement','Foundation','Structural Frame','Building Envelope','Finishing'].map(s=>`<option>${s}</option>`).join('')}</select>
      </div>
      <div class="grid g3" id="oppGrid">${D.opportunities.map(oppCard).join('')}</div>
    </div></section>`;
  }
  function wireCatalogue(){
    const f = ()=>{ const l=val('fLoc'),t=val('fType'),s=val('fStage');
      document.getElementById('oppGrid').innerHTML = D.opportunities.filter(o=>(!l||o.location===l)&&(!t||o.type===t)&&(!s||o.stage===s)).map(oppCard).join('') || '<p style="color:var(--muted)">No opportunities match those filters.</p>'; };
    ['fLoc','fType','fStage'].forEach(id=>{const e=document.getElementById(id);if(e)e.onchange=f;});
  }
  const val = id => { const e=document.getElementById(id); return e?e.value:''; };

  function detail(id){
    const o = D.byId(id); if(!o) return notFound();
    const pctRaised = Math.round(o.raised/o.funding*100);
    const savings = Math.round((1-o.from/o.comparable)*100);
    return `<section><div class="wrap">
      <a href="#/opportunities" style="color:var(--muted);font-size:13.5px">← All opportunities</a>
      <div class="detail-hero" style="${heroBg(o)};margin-top:10px"><div class="in">
        <div class="row" style="gap:8px;margin-bottom:8px">${o.verified?'<span class="pill good">Verified developer</span>':''}<span class="pill neu" style="background:rgba(255,255,255,.15);color:#fff">${esc(o.type)}</span></div>
        <h1 style="color:#fff;font-size:34px">${esc(o.name)}</h1>
        <div style="color:#dbe4ec;font-size:15px;margin-top:4px">📍 ${o.location} · ${esc(o.dev.name)} · Target completion ${o.target}</div>
      </div></div>

      <div class="facts" style="margin-top:20px">
        <div class="fact"><div class="n">${money(o.from)}</div><div class="l">Participation from</div></div>
        <div class="fact"><div class="n">${o.available}/${o.units}</div><div class="l">Available allocations</div></div>
        <div class="fact"><div class="n">${o.pending?'—':o.stage}</div><div class="l">Development stage</div></div>
      </div>

      <div class="detail-grid">
        <div>
          <div class="block"><h3>Opportunity overview</h3><p style="color:#33414f">${esc(o.overview)}</p></div>

          <div class="block"><h3>Co-development structure</h3>
            <div class="kv"><span>Structure</span><b>${esc(o.structure)}</b></div>
            <div class="kv"><span>Property type</span><b>${esc(o.type)}</b></div>
            <div class="kv"><span>Total units</span><b>${o.units}</b></div>
            <div class="kv"><span>Comparable completed value (from)</span><b>${money(o.comparable)}</b></div>
            <div class="callout">Development-stage participation from <b>${money(o.from)}</b> vs a comparable completed value from <b>${money(o.comparable)}</b> — an indicative ~${savings}% earlier-entry position, subject to structure, risk and delivery. <span class="note-sm">Illustrative; not a guaranteed return.</span></div>
          </div>

          <div class="block"><h3>Development timeline</h3>
            <div class="timeline">${D.stages.map((s,i)=>`<div class="tl ${i<o.stageIdx?'done':i===o.stageIdx?'now':''}"><div class="dot"></div><div class="lb">${s}</div></div>`).join('')}</div>
          </div>

          <div class="block"><h3>Payment milestones</h3>
            ${o.schedule.map(m=>`<div class="mrow"><span class="pct">${m.pct}%</span><span class="nm">${m.name}</span><span class="amt">${money(m.amount)}</span></div>`).join('')}
            <p class="note-sm" style="margin-top:8px">Amounts shown for a ${money(o.from)} entry. Funds are held and released on certified milestones through escrow.</p>
          </div>

          <div class="block"><h3>Developer</h3>
            <div class="card"><div class="row between" style="align-items:start">
              <div><div class="row" style="gap:8px"><b style="font-size:16px">${esc(o.dev.name)}</b>${o.dev.verified?'<span class="pill good">Verified</span>':''}</div>
                <p style="font-size:13.5px;color:var(--muted);margin:6px 0 8px;max-width:460px">${esc(o.dev.blurb)}</p>
                <div class="row">${o.dev.specialisms.map(s=>`<span class="pill neu">${s}</span>`).join('')}</div></div>
              <div style="text-align:right"><div class="fact" style="min-width:120px"><div class="n">${o.dev.completed}</div><div class="l">Delivered schemes</div></div></div>
            </div></div>
          </div>

          <div class="block"><h3>Trust & due diligence</h3>
            <div class="grid g2">
              ${[['Title / C of O','Verified'],['Planning approvals','Verified'],['SPV structure','Under Review'],['Professional team','Verified'],['QS cost plan','Verified'],['Risk disclosures','Requires acknowledgement']]
                .map(([k,v])=>`<div class="row between card" style="padding:12px 14px"><span style="font-size:13.5px">${k}</span>${pill(v)}</div>`).join('')}
            </div>
          </div>
        </div>

        <div><div class="side">
          <div class="card">
            <div class="kicker">${o.pending?'Coming soon':'Funding progress'}</div>
            ${o.pending?`<p style="font-size:14px;color:var(--muted);margin:8px 0 14px">This opportunity is in final due diligence and legal review ahead of publication. Register interest to be notified.</p>`
              :`<div style="display:flex;justify-content:space-between;margin:10px 0 6px;font-size:13px"><span style="color:var(--muted)">${money(o.raised)} committed</span><b>${pctRaised}%</b></div>
                 <div class="progress"><i style="width:${pctRaised}%"></i></div>
                 <div class="note-sm" style="margin-top:6px">of ${money(o.funding)} funding requirement</div>`}
            <h3 style="font-size:19px;margin:16px 0 4px">Qualify as a co-developer</h3>
            <p class="note-sm" style="margin-bottom:12px">Complete qualification & KYC to unlock the deal room, developer engagement and commitment.</p>
            <a class="btn btn-bronze" style="width:100%;justify-content:center" href="#/investor">Start qualification</a>
            <a class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:8px" href="#/investor/dealroom/${o.id}">Preview deal room</a>
            <div style="border-top:1px solid var(--line);margin-top:14px;padding-top:12px">
              <div class="row" style="gap:8px"><span class="pill good">Free & no-obligation</span><span class="pill neu">~5 min</span></div>
            </div>
          </div>
          <div class="card" style="margin-top:14px">
            <b style="font-size:14px;color:var(--navy)">Talk to an adviser</b>
            <p class="note-sm" style="margin:6px 0 10px">Book a structured conversation with the developer and professional team.</p>
            <a class="btn btn-ghost sm" href="#/investor">Request a call</a>
          </div>
        </div></div>
      </div>
    </div></section>`;
  }

  function developersView(){
    return `<section><div class="wrap">
      <div class="pg-head"><h2>Verified developers</h2><p>Every developer is assessed on identity, track record, financial capability and delivery history before onboarding.</p></div>
      <div class="grid g2">
        ${Object.values(D.developers).map(d=>`<div class="card"><div class="row between" style="align-items:start">
          <div><div class="row" style="gap:8px"><h3 style="font-size:19px">${esc(d.name)}</h3>${d.verified?'<span class="pill good">Verified</span>':''}</div>
            <div class="note-sm">📍 ${d.location} · Operating since ${d.since}</div>
            <p style="font-size:13.5px;color:var(--muted);margin:8px 0 10px">${esc(d.blurb)}</p>
            <div class="row">${d.specialisms.map(s=>`<span class="pill neu">${s}</span>`).join('')}</div></div>
        </div>
        <div class="facts" style="grid-template-columns:1fr 1fr 1fr;margin-top:14px">
          <div class="fact"><div class="n">${d.completed}</div><div class="l">Completed</div></div>
          <div class="fact"><div class="n">${d.ongoing}</div><div class="l">Ongoing</div></div>
          <div class="fact"><div class="n">${d.delivered}</div><div class="l">Delivered value</div></div>
        </div></div>`).join('')}
      </div>
    </div></section>`;
  }

  function how(){
    const stages=[['1','Discover','Find a verified development through the marketplace or a campaign landing page.'],
      ['2','Qualify','A private, selective qualification — capacity, preferences, funding readiness. Instant status.'],
      ['3','KYC & NDA','Complete identity/AML checks and sign the NDA to unlock the secure deal room.'],
      ['4','Deal Room','Review the memorandum, title, legal, QS, drawings and developer due-diligence.'],
      ['5','Engage','Book a structured conversation with the developer and professional advisers.'],
      ['6','Commit','Select a unit or SPV participation and confirm your commitment.'],
      ['7','Structure & Sign','SPV / co-development agreements generated, approved and e-signed.'],
      ['8','Fund','Milestone capital calls funded into bank / escrow with a unique reference.'],
      ['9','Build & Certify','Developer submits evidence; QS/assurance certifies each milestone.'],
      ['10','Monitor','Track certified progress, payments and escrow releases in your dashboard.'],
      ['11','Own / Exit','Title/deed assignment & handover, or sale, profit distribution and SPV exit.']];
    return `<section><div class="wrap" style="max-width:900px">
      <div class="pg-head"><h2>How co-development works</h2><p>One governed digital journey — from discovery to ownership or exit.</p></div>
      ${stages.map(([n,t,d])=>`<div class="row" style="gap:16px;align-items:start;padding:16px 0;border-bottom:1px solid var(--line)">
        <div style="width:40px;height:40px;border-radius:50%;background:var(--navy);color:var(--bronze-2);display:grid;place-items:center;font-family:'Fraunces',serif;font-weight:600;flex:none">${n}</div>
        <div><b style="color:var(--navy);font-size:16px">${t}</b><p style="color:var(--muted);font-size:14px">${d}</p></div></div>`).join('')}
      <div style="text-align:center;margin-top:24px"><a class="btn btn-bronze" href="#/investor">Enter the platform ↗</a></div>
    </div></section>`;
  }

  /* ---------------- INVESTOR ---------------- */
  function investorDash(){
    const inv=D.investor, committed=inv.holdings.reduce((a,h)=>a+h.committed,0), paid=inv.holdings.reduce((a,h)=>a+h.paid,0);
    const outstanding=committed-paid;
    return portal('investor',`
      <div class="pg-head"><div class="row between"><div><h2>Welcome back, ${inv.name.split(' ')[0]}</h2><p>Your co-development portfolio at a glance.</p></div>
        <div class="row"><span class="pill good">KYC ${inv.kyc}</span><span class="pill good">Qualified</span></div></div></div>
      <div class="grid g4">
        <div class="metric"><div class="n b">${money(committed)}</div><div class="l">Committed capital</div></div>
        <div class="metric"><div class="n g">${money(paid)}</div><div class="l">Paid to date</div></div>
        <div class="metric"><div class="n">${money(outstanding)}</div><div class="l">Outstanding calls</div></div>
        <div class="metric"><div class="n">${inv.holdings.length}</div><div class="l">Active developments</div></div>
      </div>
      <div class="grid g2" style="margin-top:18px;align-items:start">
        <div class="card"><h3 style="font-size:18px;margin-bottom:6px">Action centre</h3>
          ${inv.actions.map(a=>`<div class="act"><span class="t">${esc(a.t)}</span>${pill(a.kind)}<a class="btn btn-ghost sm" href="${a.link}">Open</a></div>`).join('')}
        </div>
        <div class="card"><h3 style="font-size:18px;margin-bottom:6px">My developments</h3>
          ${inv.holdings.map(h=>{const o=D.byId(h.oppId);return `<div style="padding:12px 0;border-bottom:1px solid var(--line)">
            <div class="row between"><b>${esc(o.name)}</b><span class="stage-chip">${o.stage}</span></div>
            <div class="note-sm" style="margin:4px 0 8px">${h.units} · Committed ${money(h.committed)} · Paid ${money(h.paid)}</div>
            <div class="progress"><i style="width:${Math.round(h.paid/h.committed*100)}%"></i></div>
            <div class="row between" style="margin-top:8px"><a class="btn btn-ghost sm" href="#/investor/monitor/${o.id}">Monitor</a><a class="btn btn-ghost sm" href="#/investor/dealroom/${o.id}">Deal room</a></div>
          </div>`;}).join('')}
        </div>
      </div>
      <div class="card" style="margin-top:18px"><div class="row between" style="margin-bottom:8px"><h3 style="font-size:18px">Payments & capital calls</h3><a class="btn btn-ghost sm" href="#/investor/payments">View all</a></div>
        ${paymentsTable(inv)}</div>`);
  }
  function paymentsTable(inv){
    return `<div class="tbl-wrap"><table><thead><tr><th>Development</th><th>Milestone</th><th>Amount</th><th>Due</th><th>Status</th></tr></thead><tbody>
      ${inv.holdings.map(h=>{const o=D.byId(h.oppId);return `<tr><td><b>${esc(o.name)}</b></td><td>${h.nextCall.milestone}</td><td><b>${money(h.nextCall.amount)}</b></td><td>${h.nextCall.due}</td><td>${pill(h.nextCall.status)}</td></tr>`;}).join('')}
    </tbody></table></div>`;
  }
  function payments(){
    const inv=D.investor;
    return portal('investor',`
      <div class="pg-head"><h2>Payments & escrow</h2><p>Controlled milestone funding — you always see why a payment is due, its reference and escrow status.</p></div>
      <div class="flow" style="margin-bottom:16px">${['Capital Call','Review Milestone','Payment Instruction','Funds Received','Reconciled','Escrow Status','Release'].map(s=>`<span style="background:var(--stone);border:1px solid var(--line);color:var(--ink)">${s}</span>`).join('')}</div>
      <div class="card">${paymentsTable(inv)}</div>
      <div class="card" style="margin-top:16px">
        <h3 style="font-size:18px;margin-bottom:10px">Capital call · Marina Heights — Building Envelope</h3>
        <div class="grid g3">
          <div class="fact"><div class="n">${money(7600000)}</div><div class="l">Amount due</div></div>
          <div class="fact"><div class="n">CC-2026-0442</div><div class="l">Unique reference</div></div>
          <div class="fact"><div class="n">${pill('Payment Due')}</div><div class="l">Status</div></div>
        </div>
        <div class="callout">This call is backed by the certified <b>Building Envelope</b> milestone. Funds are held in escrow and released only against certified evidence and the approval chain. Use the exact reference <b>CC-2026-0442</b> on your transfer.</div>
        <div class="row"><button class="btn btn-bronze" onclick="alert('Demo: payment instruction + escrow details would open here.')">View payment instruction</button><button class="btn btn-ghost" onclick="alert('Demo: receipt is issued after reconciliation, not on click.')">I have paid</button></div>
      </div>`);
  }
  function dealRoom(id){
    const o=D.byId(id)||D.opportunities[0];
    return portal('investor',`
      <div class="pg-head"><div class="row between"><div><h2>Deal room — ${esc(o.name)}</h2><p>${o.location} · ${esc(o.dev.name)} · Entitlement-controlled, audited access.</p></div>${pill(o.pending?'NDA required':'Access granted')}</div></div>
      <div class="grid g4" style="margin-bottom:16px">
        <div class="metric"><div class="n b">${money(o.from)}</div><div class="l">Participation from</div></div>
        <div class="metric"><div class="n">${o.available}/${o.units}</div><div class="l">Available</div></div>
        <div class="metric"><div class="n">${o.stage}</div><div class="l">Stage</div></div>
        <div class="metric"><div class="n g">Verified</div><div class="l">Developer</div></div>
      </div>
      <div class="grid g2" style="align-items:start">
        <div class="card"><h3 style="font-size:18px;margin-bottom:10px">Documents</h3>
          ${D.dealroomDocs.map(d=>`<div class="doc"><div class="ic">📄</div><div class="nm"><div class="cat">${d.cat}</div><b>${esc(d.name)}</b></div>${pill(d.status)}</div>`).join('')}
        </div>
        <div>
          <div class="card"><h3 style="font-size:18px;margin-bottom:6px">Next step</h3>
            <p class="note-sm" style="margin-bottom:10px">Acknowledge outstanding documents, then proceed to commitment.</p>
            <a class="btn btn-bronze" style="width:100%;justify-content:center" href="#/investor/commit/${o.id}">Continue to commitment</a>
            <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:8px" onclick="alert('Demo: request clarification / book a developer call.')">Request clarification</button>
          </div>
          <div class="card" style="margin-top:14px"><h3 style="font-size:16px;margin-bottom:8px">Since your last visit</h3>
            <div class="act"><span class="t">QS cost plan updated</span>${pill('Updated')}</div>
            <div class="act"><span class="t">Risk disclosures added</span>${pill('Requires acknowledgement')}</div>
          </div>
        </div>
      </div>`);
  }
  function commit(id){
    const o=D.byId(id)||D.opportunities[0];
    return portal('investor',`
      <div class="pg-head"><h2>Commitment — ${esc(o.name)}</h2><p>Review terms and confirm your participation. Reserved allocation is held while you complete the steps.</p></div>
      <div class="flow" style="margin-bottom:16px">${['Select Participation','Review Terms','Reserve / Commit','Legal Review','Sign','Funding'].map((s,i)=>`<span style="${i===0?'background:var(--bronze);color:#fff':'background:var(--stone);border:1px solid var(--line);color:var(--ink)'}">${s}</span>`).join('')}</div>
      <div class="grid g2" style="align-items:start">
        <div class="card"><h3 style="font-size:18px;margin-bottom:10px">Your participation</h3>
          <div class="kv"><span>Structure</span><b>${esc(o.structure)}</b></div>
          <div class="kv"><span>Participation amount</span><b>${money(o.from)}</b></div>
          <div class="kv"><span>Allocation</span><b>1 unit / participation</b></div>
          <div class="kv"><span>Reserved until</span><b>72 hours</b></div>
          <h3 style="font-size:16px;margin:16px 0 8px">Milestone schedule</h3>
          ${o.schedule.slice(0,4).map(m=>`<div class="mrow"><span class="pct">${m.pct}%</span><span class="nm">${m.name}</span><span class="amt">${money(m.amount)}</span></div>`).join('')}
          <div class="note-sm" style="margin-top:6px">+ ${o.schedule.length-4} further milestones to completion.</div>
        </div>
        <div class="card">
          <h3 style="font-size:18px;margin-bottom:10px">Confirm commitment</h3>
          <div class="callout">By proceeding you acknowledge the material terms, risk disclosures and the co-development structure. Your commitment becomes binding after platform/developer approval and signature.</div>
          <label class="row" style="gap:8px;font-size:13.5px;margin-bottom:12px"><input type="checkbox" id="ack"> I acknowledge the material terms and risk disclosures.</label>
          <button class="btn btn-bronze" style="width:100%;justify-content:center" onclick="document.getElementById('ack').checked?alert('Demo: commitment submitted → legal review → e-signature → funding.'):alert('Please acknowledge the material terms first.')">Reserve &amp; commit</button>
          <a class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:8px" href="#/investor/dealroom/${o.id}">Back to deal room</a>
        </div>
      </div>`);
  }
  function monitor(id){
    const o=D.byId(id)||D.opportunities[0];
    const h=D.investor.holdings.find(x=>x.oppId===o.id)||D.investor.holdings[0];
    return portal('investor',`
      <div class="pg-head"><div class="row between"><div><h2>${esc(o.name)}</h2><p>My allocation: ${h.units} · ${o.location} · Target ${o.target}</p></div><span class="stage-chip">${o.stage}</span></div></div>
      <div class="card" style="margin-bottom:16px"><h3 style="font-size:16px;margin-bottom:10px">Development programme</h3>
        <div class="timeline">${D.stages.map((s,i)=>`<div class="tl ${i<o.stageIdx?'done':i===o.stageIdx?'now':''}"><div class="dot"></div><div class="lb">${s}</div></div>`).join('')}</div></div>
      <div class="grid g2" style="align-items:start">
        <div class="card"><h3 style="font-size:16px;margin-bottom:8px">Progress & evidence</h3>
          <div class="act"><span class="t"><b>Latest update</b> — Structural frame to level 4 complete; roofing mobilised.</span>${pill('Verified')}</div>
          <div class="act"><span class="t">Milestone evidence — Structural Frame (photos, QS report)</span>${pill('Certified')}</div>
          <div class="act"><span class="t">Next milestone — Building Envelope</span>${pill('Evidence Submitted')}</div>
          <div style="height:120px;border-radius:10px;margin-top:10px;${heroBg(o)};display:grid;place-items:center;color:#fff;font-size:13px">🏗️ Evidence gallery (timestamped)</div>
        </div>
        <div class="card"><h3 style="font-size:16px;margin-bottom:8px">Financial / investor position</h3>
          <div class="kv"><span>Committed</span><b>${money(h.committed)}</b></div>
          <div class="kv"><span>Paid to date</span><b>${money(h.paid)}</b></div>
          <div class="kv"><span>Next capital call</span><b>${h.nextCall.milestone} · ${money(h.nextCall.amount)}</b></div>
          <div class="kv"><span>Escrow status</span>${pill('Held in Escrow')}</div>
          <div class="kv"><span>Next call status</span>${pill(h.nextCall.status)}</div>
          <a class="btn btn-bronze sm" style="margin-top:12px" href="#/investor/payments">Go to payments</a>
        </div>
      </div>`);
  }

  /* ---------------- DEVELOPER ---------------- */
  function developerDash(){
    const dv=D.developer;
    return portal('developer',`
      <div class="pg-head"><div class="row between"><div><h2>${esc(dv.name)}</h2><p>Developer portal — projects, investor engagement and milestones.</p></div><span class="pill good">Verified developer</span></div></div>
      <div class="grid g4">
        <div class="metric"><div class="n">${dv.projects.length}</div><div class="l">Live opportunities</div></div>
        <div class="metric"><div class="n b">${money(dv.projects.reduce((a,p)=>a+p.committed,0))}</div><div class="l">Committed capital</div></div>
        <div class="metric"><div class="n">${dv.projects.reduce((a,p)=>a+p.investors,0)}</div><div class="l">Co-developers</div></div>
        <div class="metric"><div class="n">${dv.tasks.length}</div><div class="l">Open tasks</div></div>
      </div>
      <div class="grid g2" style="margin-top:18px;align-items:start">
        <div class="card"><h3 style="font-size:18px;margin-bottom:6px">Action centre</h3>
          ${dv.tasks.map(t=>`<div class="act"><span class="t">${esc(t.t)}</span>${pill(t.kind)}</div>`).join('')}
        </div>
        <div class="card"><h3 style="font-size:18px;margin-bottom:6px">My projects</h3>
          ${dv.projects.map(p=>{const o=D.byId(p.oppId);return `<div style="padding:12px 0;border-bottom:1px solid var(--line)">
            <div class="row between"><b>${esc(o.name)}</b><span class="stage-chip">${o.stage}</span></div>
            <div class="note-sm" style="margin:4px 0 6px">${p.investors} co-developers · ${money(p.committed)} committed · Due: ${p.milestoneDue}</div>
            <div class="row"><a class="btn btn-ghost sm" href="#/developer/milestones">Milestones</a><a class="btn btn-ghost sm" href="#/opportunity/${o.id}">View listing</a></div>
          </div>`;}).join('')}
        </div>
      </div>
      <div class="card" style="margin-top:18px"><div class="row between"><div><h3 style="font-size:18px">Submit a new opportunity</h3><p class="note-sm">Guided wizard — submission enters internal review, not immediate publication.</p></div><a class="btn btn-bronze" href="#/developer/submit">+ New opportunity</a></div></div>`);
  }
  function submitWizard(){
    const dv=D.developer, active=2;
    return portal('developer',`
      <div class="pg-head"><h2>Opportunity submission</h2><p>Structured facts + supporting evidence. Save & resume anytime.</p></div>
      <div class="steps">${dv.submitSteps.map((s,i)=>`<div class="step ${i<active?'done':i===active?'on':''}"><span class="n">${i<active?'✓':i+1}</span>${s}</div>`).join('')}</div>
      <div class="card">
        <h3 style="font-size:18px;margin-bottom:12px">Design</h3>
        <div class="grid g2">
          ${[['Property type','Luxury Residential'],['Number of units','24'],['Gross floor area (sqm)','6,400'],['Amenities','Pool · Concierge · Parking']].map(([l,v])=>`<div><label style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);font-weight:700">${l}</label><input value="${v}" style="width:100%;border:1.5px solid var(--line);border-radius:8px;padding:10px 12px;font:inherit;margin-top:5px"></div>`).join('')}
        </div>
        <div style="margin-top:12px"><label style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);font-weight:700">Project narrative</label>
          <textarea rows="3" style="width:100%;border:1.5px solid var(--line);border-radius:8px;padding:10px 12px;font:inherit;margin-top:5px">A boutique collection of 2 &amp; 3-bed luxury residences with concierge, pool and secure parking.</textarea></div>
        <div class="callout">Required vs optional evidence is indicated by market and opportunity type. Information already in your organisation profile is not re-requested.</div>
        <div class="row between"><button class="btn btn-ghost" onclick="alert('Demo: previous step')">← Back</button>
          <div class="row"><button class="btn btn-ghost" onclick="alert('Demo: saved. Resume anytime.')">Save & exit</button><button class="btn btn-bronze" onclick="alert('Demo: continue → Commercials')">Continue →</button></div></div>
      </div>`);
  }
  function devMilestones(){
    const o=D.byId('ivory-ikoyi');
    return portal('developer',`
      <div class="pg-head"><h2>Milestones — ${esc(o.name)}</h2><p>Submit evidence and request certification. Payments depend on certified milestones.</p></div>
      <div class="card"><div class="tbl-wrap"><table><thead><tr><th>Milestone</th><th>%</th><th>Amount</th><th>Status</th><th></th></tr></thead><tbody>
        ${o.schedule.map((m,i)=>{const st=i<o.stageIdx?'Certified':i===o.stageIdx?'Evidence Submitted':'Planned';return `<tr><td><b>${m.name}</b></td><td>${m.pct}%</td><td>${money(m.amount)}</td><td>${pill(st)}</td>
          <td style="text-align:right">${i===o.stageIdx?`<button class="btn btn-ghost sm" onclick="alert('Demo: upload evidence + request QS certification.')">Submit evidence</button>`:''}</td></tr>`;}).join('')}
      </tbody></table></div></div>
      <div class="callout">Foundation evidence is <b>under assurance review</b>. Once certified, the Foundation capital call is released to co-developers and reconciled through escrow.</div>`);
  }

  /* ---------------- ADMIN ---------------- */
  function adminDash(){
    const a=D.admin;
    return portal('admin',`
      <div class="pg-head"><h2>Administration</h2><p>Operational control plane — pipeline, approvals, finance, assurance and audit.</p></div>
      <div class="grid g4">
        <div class="metric"><div class="n">${a.pipeline.length}</div><div class="l">Opportunities in pipeline</div></div>
        <div class="metric"><div class="n b">${money(a.finance.reduce((s,f)=>s+f.amount,0))}</div><div class="l">Capital calls in flight</div></div>
        <div class="metric"><div class="n">${a.kyc.length}</div><div class="l">KYC exceptions</div></div>
        <div class="metric"><div class="n g">4</div><div class="l">Markets live</div></div>
      </div>
      <div class="grid g2" style="margin-top:18px;align-items:start">
        <div class="card"><h3 style="font-size:18px;margin-bottom:10px">Opportunity pipeline</h3>
          <div class="tbl-wrap"><table><thead><tr><th>Opportunity</th><th>Developer</th><th>Stage</th><th>Status</th></tr></thead><tbody>
            ${a.pipeline.map(p=>`<tr><td><b>${esc(p.opp)}</b></td><td>${esc(p.dev)}</td><td>${esc(p.stage)}</td><td>${pill(p.status)}</td></tr>`).join('')}
          </tbody></table></div>
        </div>
        <div class="card"><h3 style="font-size:18px;margin-bottom:10px">KYC / compliance queue</h3>
          ${a.kyc.map(k=>`<div class="act"><span class="t"><b>${esc(k.name)}</b> · ${k.type}</span>${pill(k.status)}<button class="btn btn-ghost sm" onclick="alert('Demo: open compliance case')">Review</button></div>`).join('')}
          <h3 style="font-size:16px;margin:16px 0 8px">Approvals & governance</h3>
          <div class="act"><span class="t">GRA Court — Approval committee</span>${pill('Under Review')}</div>
          <div class="act"><span class="t">Deal-room entitlements — Marina Heights</span>${pill('Action Required')}</div>
        </div>
      </div>
      <div class="card" style="margin-top:18px"><div class="row between"><h3 style="font-size:18px">Finance & reconciliation</h3><a class="btn btn-ghost sm" href="#/admin/finance">Open finance</a></div>
        ${financeTable(a).replace('<table>','<table style="margin-top:10px">')}</div>`);
  }
  function financeTable(a){
    return `<div class="tbl-wrap"><table><thead><tr><th>Reference</th><th>Investor</th><th>Development</th><th>Milestone</th><th>Amount</th><th>Status</th></tr></thead><tbody>
      ${a.finance.map(f=>`<tr><td><b>${f.ref}</b></td><td>${esc(f.investor)}</td><td>${esc(f.opp)}</td><td>${f.milestone}</td><td><b>${money(f.amount)}</b></td><td>${pill(f.status)}</td></tr>`).join('')}
    </tbody></table></div>`;
  }
  function adminFinance(){
    const a=D.admin;
    return portal('admin',`
      <div class="pg-head"><h2>Finance & reconciliation</h2><p>Capital calls, escrow status and milestone releases — segregation of duties with maker-checker approval.</p></div>
      <div class="flow" style="margin-bottom:16px">${['Capital Call','Investor Instruction','Bank / Escrow Receipt','Reconciliation','Milestone Eligibility','Authorised Release','Audit Event'].map(s=>`<span style="background:var(--stone);border:1px solid var(--line);color:var(--ink)">${s}</span>`).join('')}</div>
      <div class="card">${financeTable(a)}</div>
      <div class="callout">No single administrator can create, approve <em>and</em> release a sensitive financial instruction. Release of <b>The Waterfront — Finishing</b> requires the certified milestone plus the maker-checker approval chain. Every action is written to an immutable audit event.</div>
      <div class="row"><button class="btn btn-bronze" onclick="alert('Demo: maker-checker release flow (requires second approver).')">Authorise release (CC-2026-0421)</button><button class="btn btn-ghost" onclick="alert('Demo: resolve unmatched payment via controlled reconciliation.')">Resolve unmatched payment</button></div>`);
  }

  /* ---------------- PARTNER ---------------- */
  function partnerDash(){
    const p=D.partner;
    return portal('partner',`
      <div class="pg-head"><div class="row between"><div><h2>Partner workspace</h2><p>${esc(p.name)} — assigned reviews and certifications only. No broad marketplace or investor-data access.</p></div><span class="pill neu">Task-based access</span></div></div>
      <div class="card"><h3 style="font-size:18px;margin-bottom:10px">Assigned tasks</h3>
        <div class="tbl-wrap"><table><thead><tr><th>Task</th><th>Type</th><th>Status</th><th></th></tr></thead><tbody>
          ${p.tasks.map(t=>`<tr><td><b>${esc(t.t)}</b></td><td>${t.type}</td><td>${pill(t.kind)}</td><td style="text-align:right"><button class="btn btn-ghost sm" onclick="alert('Demo: open task workspace')">Open</button></td></tr>`).join('')}
        </tbody></table></div>
      </div>
      <div class="grid g3" style="margin-top:16px">
        <div class="card"><h3 style="font-size:16px;margin-bottom:6px">Legal</h3><p class="note-sm">Title/legal reviews, SPV/JV checklist, agreements, signatures and completion documentation.</p></div>
        <div class="card"><h3 style="font-size:16px;margin-bottom:6px">QS / Assurance</h3><p class="note-sm">Milestone evidence review, certification, comments and resubmission states.</p></div>
        <div class="card"><h3 style="font-size:16px;margin-bottom:6px">Bank / Finance</h3><p class="note-sm">Escrow/payment references, reconciliation exceptions and controlled release tasks.</p></div>
      </div>`);
  }

  /* portal shell */
  function portal(role, inner){
    return `<section style="padding-top:26px"><div class="wrap">
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px">${portalTabs(role)}</div>
      ${inner}</div></section>`;
  }
  function portalTabs(role){
    const tabs = {
      investor:[['#/investor','Dashboard'],['#/investor/payments','Payments'],['#/investor/dealroom/ivory-ikoyi','Deal room'],['#/investor/monitor/marina-vi','Monitoring']],
      developer:[['#/developer','Overview'],['#/developer/submit','Submit opportunity'],['#/developer/milestones','Milestones']],
      admin:[['#/admin','Dashboard'],['#/admin/finance','Finance']],
      partner:[['#/partner','My tasks']],
    }[role]||[];
    const cur = location.hash;
    return tabs.map(([h,l])=>`<a href="${h}" class="btn ${cur===h?'btn-navy':'btn-ghost'} sm">${l}</a>`).join('');
  }

  function notFound(){ return `<section><div class="wrap" style="text-align:center;padding:80px 22px"><h2>Not found</h2><p style="color:var(--muted)">This page doesn't exist in the prototype.</p><a class="btn btn-bronze" href="#/" style="margin-top:14px">Back home</a></div></section>`; }

  /* ---------------- ROUTER ---------------- */
  function render(){
    const h = (location.hash||'#/').replace(/^#/,'');
    const parts = h.split('/').filter(Boolean); // e.g. ['investor','dealroom','ivory-ikoyi']
    let html, roleActive=null;
    if(h==='/'||h===''){ html=home(); }
    else if(h==='/opportunities'){ html=catalogue(); }
    else if(parts[0]==='opportunity'){ html=detail(parts[1]); }
    else if(h==='/developers'){ html=developersView(); }
    else if(h==='/how'){ html=how(); }
    else if(parts[0]==='investor'){ roleActive='/investor';
      if(parts[1]==='payments') html=payments();
      else if(parts[1]==='dealroom') html=dealRoom(parts[2]);
      else if(parts[1]==='commit') html=commit(parts[2]);
      else if(parts[1]==='monitor') html=monitor(parts[2]);
      else html=investorDash();
    }
    else if(parts[0]==='developer'){ roleActive='/developer';
      if(parts[1]==='submit') html=submitWizard();
      else if(parts[1]==='milestones') html=devMilestones();
      else html=developerDash();
    }
    else if(parts[0]==='admin'){ roleActive='/admin'; html=(parts[1]==='finance')?adminFinance():adminDash(); }
    else if(parts[0]==='partner'){ roleActive='/partner'; html=partnerDash(); }
    else html=notFound();

    app.innerHTML = html;
    roleBar(roleActive);
    document.querySelectorAll('#navlinks a').forEach(a=>a.classList.toggle('on', a.getAttribute('href')==='#'+h));
    document.getElementById('navlinks').classList.remove('open');
    if(h==='/opportunities') wireCatalogue();
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange', render);
  document.getElementById('navtoggle').onclick=()=>document.getElementById('navlinks').classList.toggle('open');
  render();
})();
