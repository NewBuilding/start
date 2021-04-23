import { Plugin } from 'prosemirror-state';
import { NodeInterface } from '../../interface/NodeInterface';
import { NodeSpec, Command, StyleObject } from '../../type';
import { objToStyleString, styleStringToObj } from 'start-editor-utils';

export const FLEX_BOX_NODE_NAME = 'flexBox';

export interface FlexBoxCommand<T = boolean> {}

export class FlexBoxNode extends NodeInterface<FlexBoxCommand<Command>> {
  get name(): string {
    return FLEX_BOX_NODE_NAME;
  }

  nodeSpec(defaultStyle: StyleObject = {}): NodeSpec {
    return {
      content: 'flexItem+',
      group: 'block',
      attrs: {
        style: {
          default: defaultStyle,
        },
      },
      parseDOM: [
        {
          tag: '.start-editor-flex_box',
          getAttrs(dom) {
            const element = dom as HTMLElement;
            const style = styleStringToObj(element.style.cssText, defaultStyle);
            return { style };
          },
        },
        {
          tag: 'div,section',
          getAttrs(dom) {
            const element = dom as HTMLElement;
            if (element.style.display !== 'flex') return false;
            const style = styleStringToObj(element.style.cssText, defaultStyle);
            return { style };
          },
        },
      ],
      toDOM: (node) => {
        return [
          'div',
          {
            style: objToStyleString({ ...node.attrs.style, display: 'flex' }),
            class: 'start-editor-node start-editor-flex_box',
          },
          0,
        ];
      },
    };
  }

  commands(): FlexBoxCommand<Command> {
    return {};
  }
  plugins(): Plugin<any, any>[] {
    return [];
  }
}
