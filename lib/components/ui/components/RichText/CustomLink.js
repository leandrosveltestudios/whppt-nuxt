import { Link } from 'tiptap-extensions';

export default class CustomLink extends Link {
  get defaultOptions() {
    return {
      openOnClick: false,
    };
  }

  get schema() {
    return {
      attrs: {
        href: {
          default: null,
        },
        target: {
          default: null,
        },
        type: {
          default: 'page',
        },
        onclick: {
          default: null,
        },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: dom => ({
            href: dom.getAttribute('href'),
            type: dom.getAttribute('target') === '_blank' ? 'external' : 'page',
          }),
        },
      ],

      toDOM: node => {
        return [
          'a',
          {
            href: node.attrs.href,
            target: node.attrs.type === 'external' ? '_blank' : '',
            // https://support.google.com/tagmanager/answer/7182738?hl=en
            onclick: `$whppt.tracking.linkClicked(this)`,
            rel: 'noopener noreferrer nofollow',
          },
          0,
        ];
      },
    };
  }
}
