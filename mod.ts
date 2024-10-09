import type { LedgerTransportOptions, TransportHandleMessage } from './deps.ts';
import { LedgerTransport, Level, printf } from './deps.ts';
import { format } from './deps.ts';
import { colors } from './deps.ts';
import { serialize } from './util/stringify.ts';

export class Transport extends LedgerTransport {
  public constructor(options: LedgerTransportOptions) {
    super(options);
    if (this.options.colorize === undefined) this.options.colorize = true;
  }

  public override async consume(payload: TransportHandleMessage): Promise<void> {
    // printf
    let print = '%s %s: %s';

    // Timestamp
    const timestamp = `${colors.gray('[')}${colors.white(format(payload.date, 'yyyy-MM-dd HH:mm:ss.SSS'))}${colors.gray(']')}`;

    // Level
    let level = Level[payload.level];
    switch (payload.level) {
      case Level.TRACE: {
        level = `${colors.brightCyan(level)}`;
        break;
      }
      case Level.INFO: {
        level = `${colors.brightBlue(level)}`;
        break;
      }
      case Level.WARN: {
        level = `${colors.brightYellow(level)}`;
        break;
      }
      case Level.SEVERE: {
        level = `${colors.brightRed(level)}`;
        break;
      }
    }

    // Message
    const message = colors.cyan(payload.message);

    // Arguments
    const args = serialize(payload.args);
    console.info('a', args);
    if (args.trim() !== '[]') {
      print = print + ' %s';
      printf(`${print}\n`, timestamp, level, message, args);
    } else {
      printf(`${print}\n`, timestamp, level, message);
    }
  }
}
