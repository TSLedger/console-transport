# console-transport

Console-based Transport for Ledger Logging Framework. Provides a human-readable output via printf.

Designed for development, troubleshooting, or cli usage.

### Usage

```ts
import { Ledger } from 'jsr:@ledger/ledger';

const ledger = new Ledger()
  // ...
  .addTransportWorker('jsr:@ledger/console-transport, {});

ledger.info('Hello, world.', { how: "are you?" });
// [2024-01-01 08:00:00.000] INFO: Hello, world. [{ how: "are you?" }]
```

### Attributions

- Deno/JSR @std https://jsr.io/@std
- string.ify https://www.npmjs.com/package/string.ify
