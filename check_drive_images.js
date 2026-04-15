const urls=[
  'https://drive.google.com/uc?export=view&id=1wG-5gQ2TH2A_pIaqat9gZuaBqCGZp1T-',
  'https://drive.google.com/uc?export=view&id=1-U2EHoHchQQOpLXQveTqmFI8WJgmBNlx',
  'https://drive.google.com/uc?export=view&id=1lk8cV4mG8a43OpzEinxJIlIIu0x8Hcqk'
];

(async () => {
  for (const u of urls) {
    try {
      const res = await fetch(u);
      console.log('URL', u);
      console.log('status', res.status);
      console.log('ct', res.headers.get('content-type'));
      const b = await res.arrayBuffer();
      const bytes = new Uint8Array(b.slice(0,16));
      console.log('len', b.byteLength, 'head', Array.from(bytes).map(x => x.toString(16).padStart(2,'0')).join(' '));
    } catch (e) {
      console.error('ERROR', u, e.message);
    }
  }
})();
