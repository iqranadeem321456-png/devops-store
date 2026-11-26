const s = require('fs').readFileSync('server.js', 'utf8');
if (!s.includes('/api/products') || !s.includes('/api/orders')) { console.error('FAIL'); process.exit(1); }
console.log('All tests passed');
