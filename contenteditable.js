const React = require('react');
const {createRoot} = require('react-dom/client');
const ContentEditable = require('react-contenteditable');


// WARNING: Most of these comments are personal notes from me on how I'm trying to implement this to work with haskell and reflex-frp

// initialHtml: String
// rootElId: String
// editHandler : String (sanitized text) -> HTML string. Implemented by running "parser" and then parsedToHtml in haskell (maybe use blaze for it? idk) (look at: JsCallAsFunction)
function setupRichEdit(rootElId, initialHtml, editHandler) {
  // inspired from the example in: https://www.npmjs.com/package/react-contenteditable
  class MyComponent extends React.Component {
    constructor() {
      super()
      this.state = {html: initialHtml};
    };

    handleChange = evt => {
      // editHandler only uses a callback because of a specific haskell restriction. You can adapt this to not use callback if you want.
      editHandler(stripTags(evt.target.value), (result) => {
        this.setState({html: result})
      })
    };

    render() {
      const props = {
        html: this.state.html, // innerHTML of the editable div
        disabled:false,       // use true to disable editing
        onChange:this.handleChange, // handle innerHTML change
        //tagName:'article' // Use a custom HTML tag (uses a div by default)

      }
      return React.createElement(ContentEditable.default, props, null)
    };
  };

  createRoot(
    document.getElementById(rootElId)
  ).render(
    React.createElement(MyComponent, null, null),
  );
}

// export to outside of browserify!
window.setupRichEdit = setupRichEdit;

function stripTags(htmlString){
  const parseHTML= new DOMParser().parseFromString(htmlString, 'text/html');
  return parseHTML.body.textContent || '';
}
