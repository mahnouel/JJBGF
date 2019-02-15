exports.extendMarkdown = md => {
  md.block.ruler.after('blockquote', 'quote-figure', (state, startLine, endLine, silent) => {
    const QUOTE_TAG = 'quote-figure';
    let open = false;
    let openTokenIndex = undefined;
    let author = undefined;
    state.tokens.map((t, i) => {
      if (t.type === 'blockquote_open') {
        t.tag = QUOTE_TAG;
        openTokenIndex = i;
        open = true;
      }
      if (open && t.type === 'inline') {
        if (t.content.includes('-- ')) {
          author = t.content.split('-- ')[1];
          t.content = t.content.replace(`-- ${author}`, '');
        }
        t.content = t.content.trim();
      }
      if (t.type === 'blockquote_close') {
        t.tag = QUOTE_TAG;
        if (author) {
          state.tokens[openTokenIndex].attrSet('author', author);
        }
        openTokenIndex = undefined;
        open = false;
      }

      return t;
    });
  });

  const modifyRenderer = md => {
    const openTags = [];

    function injectRenderer(md, rendererName, fn) {
      const oldRenderer =
        md.renderer.rules[rendererName] ||
        function(tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options);
        };
      md.renderer.rules[rendererName] = function(tokens, idx, options, env, self) {
        const result = fn(tokens, idx, options, env, self);
        return result ? result : oldRenderer(tokens, idx, options, env, self);
      };
    }

    function linkOpen(tokens, idx, options, env, self) {
      const token = tokens[idx];
      const href = token.attrs[0][1];
      const content = tokens[idx + 1].content;
      if (content.includes('--sign-up')) {
        openTags.push('sign-up');
        return `<sign-up href="${href}">`;
      }
    }
    function linkClose(tokens, idx, options, env, self) {
      const content = tokens[idx - 1].content;
      if (content.includes('--sign-up')) {
        const i = openTags.indexOf('sign-up');
        openTags.splice(i, 1);
        return '</sign-up>';
      }
    }
    function cleanText(args, text, requiredTag) {
      if (openTags.includes(requiredTag)) {
        const tokens = args[0];
        const idx = args[1];
        let content = tokens[idx].content;

        if (content.includes(text)) {
          content = content.replace(text, '');
        }
        content = content.trim();
        console.log(content);

        return content;
      }
    }
    injectRenderer(md, 'link_open', linkOpen);
    injectRenderer(md, 'text', (...args) => cleanText(args, '--sign-up', 'sign-up'));
    injectRenderer(md, 'link_close', linkClose);
  };

  modifyRenderer(md);

  // use more markdown-it plugins!
  md.use(require('markdown-it-footnote'));
  md.use(require('markdown-it-mark'));
  md.use(require('markdown-it-container'), 'header', {
    validate: function(params) {
      return params.trim().includes('header');
    },

    render: function(tokens, idx) {
      const first_line = tokens[idx].info.split('header').length > 1;
      if (tokens[idx].nesting === 1 && first_line) {
        const data = JSON.parse(tokens[idx].info.split('header')[1].trim());
        return `<page-header date="${data.date}" theme="${data.theme}">\n`;
      } else {
        return '</page-header>\n';
      }
    },
  });
  md.use(require('markdown-it-container'), 'adress', {
    validate: function(params) {
      return params.trim().includes('adress');
    },

    render: function(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return `<address>\n`;
      } else {
        return '</address>\n';
      }
    },
  });
};
