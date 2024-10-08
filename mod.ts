import type { LedgerTransportOptions, TransportHandleMessage } from './deps.ts';
import { LedgerTransport } from './deps.ts';
import { format } from './deps.ts';
import { colors } from './deps.ts';

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
