import { InternalStateProvider } from '../internal/internal';

export class DUCStateProvider extends InternalStateProvider {
  constructor(chain: string = 'DUC') {
    super(chain);
  }
}
