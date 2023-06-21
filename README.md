# Not so simple content editable

I wanted to use a contenteditable that I could alter it's content on each edit to make a rich editor.
It isn't so simple as to just use `el.innerHTML` because that updates the whole DOM tree and breaks the editing experience (cursor placement, selections etc...)

So I hacked up a solution involving importing React and the `react-contenteditable` which implements a VDOM-based way of setting the html and removes common contenteditable nuisances. The rest is just glue to make it work without using React or any specific framework.




# Install:
Just download the bundle.js. Rename it to something that makes sense for you.

## Usage example:
This will make your content bigger when your content ends with "big"
```
<body>
  <div
    <h1>Hello</h1>
    <div id="richEditor"></div>
    <script src="bundle.js"></script>
    <script>
      window.onload = function() {
            setupRichEdit("richEditor","Hello buddies",(str,cb) => {
              if(str.endsWith("big")) {
                cb(`<h1>${str}</h1>`)
              }
              else {
                cb(`<h2>${str}</h2>`)
              }
            })
        }
    </script>
</script>
</body>
```

Info: Particularly tailored to my use case I strip all tags before sending to the function. But that is easily tweaked to whatever you want to do.


## Build it yourself:

It's all bundled up by `browserify` (https://browserify.org/) so it removes all the node-isms:
```
npm install -g browserify
browserify contenteditable.js -o bundle.js
```

`try.html` is a page where you can see it working.
