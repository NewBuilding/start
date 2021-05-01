import { Plugin } from 'prosemirror-state';
import { Editor } from '../Editor';

export abstract class PluginInterface<T = Record<string, any>> {
  abstract id: string;
  editor!: Editor;

  protected options: T;

  constructor(options: Partial<T> = {}) {
    this.options = {
      ...this.defaultOptions,
      ...options,
    };
  }

  get defaultOptions(): T {
    return {} as T;
  }
  abstract get plugins(): Plugin[];

  mounted() {}

  destroy() {}
}
