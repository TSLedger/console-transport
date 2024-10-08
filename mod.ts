import type { LedgerTransportOptions, TransportHandleMessage } from '../ledger/lib/interface/struct.ts';
import { LedgerTransport } from '../ledger/lib/transport.ts';
import { format } from '@std/datetime/format';
import * as colors from '@std/fmt/colors';

export class Transport extends LedgerTransport {
  public constructor(options: LedgerTransportOptions) {
    super(options);
    if (this.options.colorize === undefined) this.options.colorize = true;
  }

  public override async consume(payload: TransportHandleMessage): Promise<void> {
    const timestamp = `${colors.gray('[')}${colors.white(format(payload.date, 'yyyy-MM-dd HH:mm:ss.SSS'))}${colors.gray(']')}`;
    console.info(timestamp);
  }
}
