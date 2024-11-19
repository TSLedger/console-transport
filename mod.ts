import type { PageHandler, PageMessageContext } from './deps.ts';
import { format, Level, printf } from './deps.ts';
import { colors } from './deps.ts';
import { serialize } from './util/stringify.ts';

export class Page implements PageHandler {
  // deno-lint-ignore require-await
  public async receive({ context }: PageMessageContext): Promise<void> {
    // printf
    let print = '%s %s: %s';

    // Timestamp
    const timestamp = `${colors.gray('[')}${colors.white(format(context.date, 'yyyy-MM-dd HH:mm:ss.SSS'))}${colors.gray(']')}`;

    // Level
    let level = Level[context.level];
    switch (context.level) {
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
    const message = colors.cyan(context.message);

    // Arguments
    const args = serialize(context.args);
    if (args.trim() !== '[]') {
      print = print + ' %s';
      printf(`${print}\n`, timestamp, level, message, args);
    } else {
      printf(`${print}\n`, timestamp, level, message);
    }
  }
}
