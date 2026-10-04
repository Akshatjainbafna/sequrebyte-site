// Hand-written content pages. Each page has its own sections, FAQs and examples (no swapped-variable templates).
// Claims are limited to what the product ships (see the build brief). Sources are named where a number appears.

export const pages = [
  {
    slug: 'vibe-coded-app-security',
    group: 'Guides',
    nav: 'Security audit for vibe-coded apps',
    blurb: 'You built it with an AI assistant. Here is what to check before a customer, investor or auditor does.',
    titleTag: 'Vibe-Coded App Security Audit: What to Check | SequreByte',
    description: 'Built your app with an AI assistant? Here is what a security audit should check, what to fix first, and how to scan for it. Plain English.',
    h1: 'Security audit for vibe-coded apps',
    intro: [
      'You built it fast with an AI assistant, and it works. Whether it is safe is a separate question, and customers, investors and auditors tend to ask it sooner than you expect.',
      'AI assistants write plausible code, not reviewed code. In Veracode\'s 2025 GenAI Code Security Report, 45% of AI-generated code samples failed security tests. That does not mean your app is broken. It means nobody has checked yet.',
    ],
    sections: [
      {
        h: 'What a security audit of a vibe-coded app should cover',
        body: ['Start with what an outsider can reach, then work inwards.'],
        list: [
          ['Logins and sessions', 'Can one user see another user\'s data? Does the app still work for someone who is not logged in?'],
          ['Secrets', 'API keys and passwords that ended up in the code or the front end.'],
          ['Dependencies', 'Packages the assistant pulled in, and whether any have known vulnerabilities.'],
          ['Cloud setup', 'Public storage buckets, open databases and permissions that are looser than they need to be.'],
          ['What is exposed to the internet', 'Forgotten subdomains, open ports and test environments nobody switched off.'],
          ['Certificates and HTTPS', 'Expired or misconfigured certificates, which break trust and sometimes the app itself.'],
        ],
      },
      {
        h: 'How SequreByte covers it',
        body: [
          'SequreByte scans web apps, including the parts behind a login. It reads your dependencies and SBOMs, checks AWS and Azure against posture rules, watches certificates, and maps your external attack surface, including ports and signatures.',
          'It also tells you what it could not check. A control nobody has scanned reads "not assessed", never green. You see the real gaps instead of a comforting number.',
        ],
      },
      {
        h: 'What to do with the results',
        body: ['A sensible order: fix what is exposed to the internet first, then what an attacker could reach without logging in, then everything else. Keep a dated record of what you found and what you fixed. If you later pursue SOC 2 or ISO 27001, that record is the evidence an auditor asks for, and SequreByte keeps it as dated snapshots.'],
      },
    ],
    faqs: [
      ['Is vibe-coded software less secure than hand-written software?', 'Not automatically, but it is less reviewed. Code written quickly by an assistant usually skips the review step where a person would catch a missing permission check or a leaked key. A scan restores some of that review.'],
      ['Do I need a penetration test (VAPT) as well as a scan?', 'A scan finds known classes of problems quickly and repeatedly. A penetration test, run by people, probes logic and chains weaknesses together. Many enterprise customers ask for a VAPT report. SequreByte supports VAPT teams running engagements, so the two work together.'],
      ['Can a scan make me SOC 2 or ISO 27001 compliant?', 'No. A SOC 2 report comes from an independent auditor, and ISO 27001 certification comes from an accredited certification body. A scan helps you find and fix problems and gather the evidence those auditors ask for.'],
    ],
  },
  {
    slug: 'soc-2-for-startups',
    group: 'Guides',
    nav: 'SOC 2 for startups',
    blurb: 'What SOC 2 is, why your customers ask for it, and what to prepare.',
    titleTag: 'SOC 2 for Startups: What to Prepare | SequreByte',
    description: 'What SOC 2 is, the difference between Type I and Type II, what auditors look for, and how to gather evidence without rebuilding it by hand.',
    h1: 'SOC 2 for startups: what to prepare',
    intro: [
      'SOC 2 is a report written by an independent auditor about how your company protects customer data. Nobody can give it to you from a dashboard. You earn it through an audit.',
      'It usually enters the picture when a customer\'s security questionnaire arrives and one of the questions is "Do you have a SOC 2 report?"',
    ],
    sections: [
      {
        h: 'Type I and Type II',
        body: [
          'A Type I report says your controls were designed properly at a single point in time. A Type II report says they operated effectively over a period, typically several months. Type II is harder to get because you cannot rush an observation period, and it is the one larger customers prefer.',
        ],
      },
      {
        h: 'What auditors want to see',
        body: ['Evidence that was true during the audit period, not just today. For the technical side, that usually means:'],
        list: [
          ['Vulnerability scans', 'Run regularly, with findings tracked.'],
          ['Cloud configuration', 'Settings that match your stated policies.'],
          ['Access reviews', 'Who has access to what, reviewed on a schedule.'],
          ['Policies and artefacts', 'Documents, screenshots and recordings that back each control.'],
        ],
      },
      {
        h: 'Where SequreByte fits',
        body: [
          'SequreByte maps what its scanners find onto SOC 2 controls, then records dated snapshots so you can show what was true in March, not just today. You can attach your own policies, screenshots and recordings to a shared evidence library, so one access-review recording backs several controls without being uploaded five times.',
          'Some controls cannot be judged by software. SequreByte marks those "needs manual evidence" and leaves them out of the readiness percentage, with the excluded count next to the number.',
        ],
      },
      {
        h: 'What a tool cannot do',
        body: ['It cannot issue the report. An independent auditor does that. A tool can find problems, organise the evidence and show you the gaps before the audit starts.'],
      },
    ],
    faqs: [
      ['How long does SOC 2 take?', 'It depends on your scope and how much is already in place. Type II needs an observation period, so it cannot be done overnight. Starting evidence collection early is the part you control.'],
      ['SOC 2 or ISO 27001 first?', 'Often it depends on who is asking. US customers tend to ask for SOC 2. Indian enterprises, government bodies and European customers often ask for ISO 27001. Check your next three deals and let them decide. SequreByte maps to both.'],
      ['Does SequreByte replace the auditor?', 'No. You still need an independent auditor for the report. SequreByte helps you prepare and keeps the evidence in one place.'],
    ],
  },
  {
    slug: 'iso-27001-for-startups',
    group: 'Guides',
    nav: 'ISO 27001 for startups',
    blurb: 'What ISO/IEC 27001 expects and how to check your readiness honestly.',
    titleTag: 'ISO 27001 for Startups: Readiness Guide | SequreByte',
    description: 'What ISO/IEC 27001 expects from a startup, how the 2022 and 2013 control sets differ, and how to check readiness without fooling yourself.',
    h1: 'ISO 27001 for startups: what it expects',
    intro: [
      'ISO/IEC 27001 is an international standard for running an information security management system. You do not "install" it. You build the system, then an accredited certification body audits it and issues the certificate.',
      'For startups selling to Indian enterprises, banks, government bodies or European customers, it often appears as a vendor requirement.',
    ],
    sections: [
      {
        h: '2022 and 2013: which one',
        body: [
          'ISO/IEC 27001:2022 is the current edition. Its Annex A lists 93 controls in four themes (ISO/IEC 27001:2022, Annex A). The 2013 edition listed 114 controls in 14 groups. Some teams and customers still work to the older set, so SequreByte maps findings to both.',
        ],
      },
      {
        h: 'What the technical side looks like',
        body: ['Plenty of controls are about people and process. The ones software can check include:'],
        list: [
          ['Technical vulnerability management', 'Regular scanning, with findings tracked to closure.'],
          ['Network and external exposure', 'What is reachable from the internet and why.'],
          ['Cloud configuration', 'Settings checked against rules, with a record.'],
          ['Cryptography and certificates', 'Expiry and configuration of TLS certificates.'],
        ],
      },
      {
        h: 'Readiness that does not fool you',
        body: [
          'Most dashboards show one reassuring percentage. SequreByte sorts controls into four states: satisfied, failed, not yet assessed and needs manual evidence. Readiness is calculated only across controls software can genuinely assess, and the excluded count is printed next to the figure.',
          'When you open a satisfied control, you see the checks that passed, the named cloud resources they ran against, the date and the account. Where that per-check record does not exist, the verdict is labelled "inferred".',
        ],
      },
    ],
    faqs: [
      ['Is ISO 27001 mandatory in India?', 'Not by law for most companies. Many enterprise, banking and public-sector customers ask for it as a vendor requirement, which makes it mandatory in practice for those deals.'],
      ['Can software certify me?', 'No. An accredited certification body audits you and issues the certificate. Software helps you find gaps and gather evidence beforehand.'],
      ['Do I need a security team to start?', 'You need someone accountable for the work. SequreByte is set up with you on a call, on your scope, so a small team or a founder can get started without a long onboarding.'],
    ],
  },
  {
    slug: 'rbi-cyber-security-framework',
    group: 'Guides',
    nav: 'RBI Cyber Security Framework',
    blurb: 'For banks, NBFCs and the startups that sell to them.',
    titleTag: 'RBI Cyber Security Framework: Compliance Guide | SequreByte',
    description: 'Selling to a bank or NBFC? What the RBI Cyber Security Framework means for you, what auditors check, and how to gather evidence.',
    h1: 'RBI Cyber Security Framework: what it means for you',
    intro: [
      'Banks, NBFCs and other RBI-regulated entities have to meet the RBI\'s cyber security requirements, and they pass expectations down to the vendors and fintech startups they work with.',
      'If a regulated customer sent you a security questionnaire, this page is for you.',
    ],
    sections: [
      {
        h: 'Who is affected',
        body: ['Directly: banks, NBFCs, brokers, insurers and payment companies that fall under their regulator\'s rules. Indirectly: any company that handles their data or connects to their systems. Regulated customers will ask you to show controls equivalent to their own.'],
      },
      {
        h: 'What audits tend to look for',
        body: ['Evidence that controls exist and work. In practice:'],
        list: [
          ['Regular vulnerability assessment and penetration testing', 'With findings tracked and closed.'],
          ['Asset and external exposure visibility', 'You know what is on the internet.'],
          ['Configuration and access controls', 'Cloud and network settings that match policy.'],
          ['Incident readiness', 'A way to detect and report incidents quickly.'],
        ],
      },
      {
        h: 'Incident reporting',
        body: ['Under the CERT-In directions of 28 April 2022, organisations must report certain cyber incidents to CERT-In within six hours of noticing them. SequreByte does not file reports for you. It helps you see your exposure before an incident, and shows what was true at a given date.'],
      },
      {
        h: 'Where SequreByte fits',
        body: [
          'The RBI Cyber Security Framework is supported alongside ISO/IEC 27001 and SOC 2. SequreByte maps scanner findings onto framework controls and keeps dated snapshots. That lets a team show a regulated customer what was true during a period, not just today.',
          'This page is general information, not legal advice. Confirm your obligations with your compliance advisor.',
        ],
      },
    ],
    faqs: [
      ['Do startups that sell to NBFCs have to follow it?', 'Usually indirectly. The NBFC is regulated, and it will ask you to demonstrate comparable controls through questionnaires, VAPT reports and evidence.'],
      ['Is ISO 27001 enough for an RBI-regulated customer?', 'ISO 27001 helps a lot, but it does not replace RBI-specific requirements. SequreByte maps to both, so one set of scans and evidence supports each.'],
      ['Does SequreByte support other frameworks?', 'Today it supports ISO/IEC 27001:2022, ISO/IEC 27001:2013, SOC 2 and the RBI Cyber Security Framework. More frameworks are being added.'],
    ],
  },
  {
    slug: 'for/founders',
    group: 'By role',
    nav: 'Founders and solopreneurs',
    blurb: 'Not a security person? Start here. Plain English, no jargon.',
    titleTag: 'Security Help for Non-Technical Founders | SequreByte',
    description: 'Not a security person? A plain-English starting point for founders and solopreneurs: what to check, what the jargon means, and what to do this month.',
    h1: 'Security help for founders who are not security people',
    intro: [
      'You built a product, maybe with an AI assistant, maybe with a small team or alone. Then someone asked, "Are you SOC 2?" or "Can we see your pentest report?" and you realised nobody had ever looked.',
      'That is a normal place to be. This page explains the words and gives you a short plan.',
    ],
    sections: [
      {
        h: 'The jargon, in plain English',
        body: [],
        list: [
          ['Vulnerability scan', 'A tool that checks your app, cloud and network for known weaknesses, automatically.'],
          ['VAPT', 'Vulnerability Assessment and Penetration Testing. A structured attempt, often by people, to find ways in.'],
          ['SBOM', 'A list of every software component your product is built from, so known-vulnerable ones can be spotted.'],
          ['SOC 2 and ISO 27001', 'Two standards customers ask for. An independent auditor checks you against them and issues a report or certificate.'],
          ['Attack surface', 'Everything about your product that is reachable from the internet.'],
        ],
      },
      {
        h: 'What to do this month',
        body: [],
        list: [
          ['Turn on two-factor login', 'For email, code hosting, cloud and anything that holds customer data.'],
          ['Find out what is exposed', 'A scan lists your public subdomains, open ports and expiring certificates.'],
          ['Fix the exposed things first', 'Then what a stranger could reach without a login.'],
          ['Keep a dated record', 'What you found and what you fixed. It becomes your evidence later.'],
        ],
      },
      {
        h: 'How SequreByte helps if you are not technical',
        body: ['SequreByte needs real setup: cloud credentials, scan targets, and the frameworks your customers ask about. So the demo is a working session. We set it up with you, on your scope, instead of handing you an empty workspace.'],
      },
    ],
    faqs: [
      ['I am not technical. Can I use SequreByte?', 'Yes. The first session sets up your scans with you, and results are written to be read by a founder as well as an engineer.'],
      ['Do I need this if I am a team of one?', 'If customers or investors are asking about security or compliance, yes. If not yet, the free steps above are a good start.'],
      ['Is my small app really a target?', 'Automated scanners probe every public address, regardless of size. Small apps are often the easiest to find problems in, because nobody has checked.'],
    ],
  },
  {
    slug: 'for/security-leads',
    group: 'By role',
    nav: 'CISOs and security leads',
    blurb: 'One workspace for findings, controls and evidence. Honest about gaps.',
    titleTag: 'Vulnerability Management for Security Leads | SequreByte',
    description: 'For CISOs and security managers: scan, map findings to ISO 27001, SOC 2 and RBI controls, and keep dated evidence. Readiness that states what it left out.',
    h1: 'For CISOs and security leads',
    intro: [
      'You probably run two or three tools, keep findings in a spreadsheet, and rebuild the same evidence every audit. The question that matters is simple: will this survive the audit?',
    ],
    sections: [
      {
        h: 'What changes',
        body: [],
        list: [
          ['One workspace', 'Scanning, control mapping, evidence and reporting in one place.'],
          ['Keep your scanners', 'Import reports from Nessus, OpenVAS and SonarQube, plus common scanner exports.'],
          ['Honest readiness', 'Four control states, and the excluded count printed beside every figure.'],
          ['Dated snapshots', 'Show what was true during the audit period, not only today.'],
          ['Evidence you can cite', 'Open a satisfied control and see the checks, resources, date and account.'],
        ],
      },
      {
        h: 'Frameworks',
        body: ['ISO/IEC 27001:2022, ISO/IEC 27001:2013, SOC 2 and the RBI Cyber Security Framework. More frameworks are being added.'],
      },
      {
        h: 'What it will not claim',
        body: ['SequreByte will not tell you that you are 100% compliant. If a control needs manual evidence it says so, and if a verdict is inferred it says that too.'],
      },
    ],
    faqs: [
      ['Does it replace our existing scanners?', 'It scans for web apps, dependencies, cloud posture, certificates, external attack surface, ports and firewall rulesets. You can also import reports from tools you already run.'],
      ['How does it treat controls software cannot assess?', 'They are shown as "needs manual evidence" and excluded from the readiness percentage, with the excluded count shown next to it.'],
    ],
  },
  {
    slug: 'for/security-architects',
    group: 'By role',
    nav: 'Security architects',
    blurb: 'Start design reviews from what is actually exposed.',
    titleTag: 'Security Architects: Attack Surface Review | SequreByte',
    description: 'Attack surface discovery, authenticated web scanning and AWS and Azure posture review, mapped to ISO 27001, SOC 2 and RBI controls. For security architects.',
    h1: 'For security architects',
    intro: [
      'Design reviews go better when they start from facts. SequreByte gives you the real attack surface and cloud posture, mapped to the controls your organisation answers to.',
    ],
    sections: [
      {
        h: 'What you can see',
        body: [],
        list: [
          ['External attack surface', 'Subdomains and what is exposed, including assets nobody remembers deploying.'],
          ['Authenticated web app scanning', 'Scans that stay logged in, so the parts behind the login are tested too.'],
          ['Cloud posture', 'AWS and Azure assessed against posture rules.'],
          ['Dependencies and SBOMs', 'Known-vulnerable packages, found before they ship.'],
          ['Ports, signatures and firewall rulesets', 'Reviewed against what should be open.'],
          ['Certificates', 'Expiry monitored across the estate.'],
        ],
      },
      {
        h: 'Traceable verdicts',
        body: ['A satisfied control links to the automated checks that passed and the named resources they ran against, with the date and account. Where that per-check record does not exist, the verdict is labelled "inferred", so you know how much weight to give it.'],
      },
    ],
    faqs: [
      ['Does it scan behind authentication?', 'Yes. Web application scanning can stay logged in, so authenticated areas are covered.'],
      ['Which clouds are supported?', 'AWS and Azure.'],
      ['Can I trace a verdict back to a check?', 'Yes, where a per-check record exists. Otherwise the verdict is labelled inferred.'],
    ],
  },
  {
    slug: 'for/vapt-teams',
    group: 'By role',
    nav: 'VAPT teams and MSSPs',
    blurb: 'Run engagements in the platform and give each client a login.',
    titleTag: 'Platform for VAPT Teams and MSSPs | SequreByte',
    description: 'Run VAPT engagements in a multi-tenant platform, import Nessus, OpenVAS and SonarQube reports, and give clients a login to see their results.',
    h1: 'For VAPT teams and MSSPs',
    intro: [
      'SequreByte is multi-tenant, so you can run client engagements in one platform and give each client a login. Findings turn into evidence that maps to the frameworks they answer to.',
    ],
    sections: [
      {
        h: 'How it fits an engagement',
        body: [],
        list: [
          ['Bring your tools', 'Import reports from Nessus, OpenVAS and SonarQube, plus common scanner exports.'],
          ['Map findings to controls', 'ISO/IEC 27001:2022 and 2013, SOC 2 and the RBI Cyber Security Framework.'],
          ['Evidence library', 'Attach policies, screenshots, recordings and exports once and reuse across controls.'],
          ['Dated snapshots', 'Show a client what was true during an audit period.'],
          ['Client logins', 'Clients see their own results without a PDF handover.'],
        ],
      },
      {
        h: 'Why clients care',
        body: ['Clients get more than a one-off report. They get a record they can show an auditor, with each verdict traceable to the check behind it.'],
      },
    ],
    faqs: [
      ['Can I import reports from my existing scanners?', 'Yes: Nessus, OpenVAS and SonarQube, plus report import for common scanner exports.'],
      ['Can my clients log in?', 'Yes. You can give each client a login so they can see their own results.'],
    ],
  },
];

export const bySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));
