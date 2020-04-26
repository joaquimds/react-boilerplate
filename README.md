# React Boilerplate

## Installation

1. `npm install`
1. `cp .env.development.example .env.development`
1. `cp .env.production.example .env.production`

### Development

1. `npm start`
1. Visit `localhost:8080` in your browser

Changes to source files should automatically reload your browser (excluding `.env` changes).

### Build

1. `npm run build`
1. Serve the `dist` folder using your favourite webserver<br>(e.g. `cd dist; php -S localhost:8080`)

Changes to source files will need a full rebuild.

## Tools

### NPM

This is the project management tool for javascript projects. It manages dependencies, defines project entry points,
and holds configuration information.

Project entry points are defined in the `scripts` section of `package.json`. The command-line programs they call
are found in `node_modules/.bin`, once you have run `npm install`. You can also call globally installed programs
(but I try to not install any npm package globally).

For example, `npm start` runs:
 
    cross-env NODE_ENV=development webpack-dev-server
    
This uses `cross-env` to set an important environment variable, then starts the webpack development server.

### Webpack

This is the main tool for front-end development. You can think of it as translating all your source files into browser-safe 
javascript, and then stitching them together into one large file.

Webpack begins by processing the `entry` file (which is specified in `webpack.config.js`). This process has two components:

1. Loading other source files
1. Translating advanced javascript into browser-safe javascript

As the `entry` file is processed, whenever webpack finds the keywords `import` or `require`, it:

1. Pauses the translation of the current file
1. Loads the contents of the target file
1. Translates the target file into browser-safe javascript
1. Replaces the `import` or `require` statement in the `entry` file with the translated target content
1. Resumes translation of the `entry` file

This is a recursive process - the `entry` file is at the top of a large tree of source files, all of which are
loaded through the `import` and `require` keywords.

It's kind of like flattening a tree and joining the result, but with translation of every node.

This translation has been extended to handle files that aren't javascript, for example `.css`, `.svg` and `.md` 
files.

Translation is provided by webpack **loaders**. For example, `.js` files are loaded using `babel-loader`. Babel is
a tool for translating advanced javascript into browser-safe javascript. It also handles translating React style `jsx`
files into standard javascript files. For example:

    const heading = <h1>Heading</h1>
    
Is translated through babel into:

    var heading = React.createElement("h1",null,"Heading")
    
Similarly, `scss` files are also translated into javascript. These files are first compiled into plain `css`, and
then converted into a short javascript script that will load the css onto the page.

For example, this `scss`:

    $red: #f00;
    .h1 { color: $red }
    
Is converted into this `css`:
 
    .h1 { color: #f00 }
    
And then into this javascript:

    const style = document.createElement('style')
    style.textContent = '.h1 { color: #f00 }'
    document.head.appendChild(style)

You can see the loaders defined in the `module.rules` section of `webpack.config.js`.

### Babel

As mentioned above, this converts advanced javascript or jsx into browser-safe javascript. The config is in `.babelrc`.

Plugins are applied in reverse order (so `react` is applied before `env`).

`@babel/preset-env` automatically detects which translations and polyfills are required based on which browsers are being
targeted. These browsers are defined in `package.json`, under `browserslist`.

## Environments

In industry, a single `.env` file is used in development, and environment variables are loaded from the CI pipeline
when the app is built for production. However, in this case, I have provided a `.env.development` and a `.env.production`
file. The `development` file is used when running `npm start`, and the `production` file is 
used when running `npm run build`.

By convention, only `REACT_APP_` environment variables are loaded into the client side output file. This is to prevent
the accidental inclusion of secret varialbes (e.g. `DB_PASSWORD`).

I have implemented this
manually in `webpack.config.js`, but the `create-react-app` tool does the same thing.

Note: actual environment variables will always take precedence over values specified in `.env` files.

You should be able to see this difference when running `npm start` vs `npm run build`.

## Linting

Linting is provided by `eslint`. There are `scss` linters but I don't bother with them. You can see the linting rules in
`.eslintrc`. Configs that come later in the `extends` array take precedence, and the `rules` property takes ultimate
 precedence.

`env` defines which global variables and functions are available.

`eslint` is used for code cleanliness, not formatting. However, I have used the `prettier` plugin to integrate a code
formatting tool called `prettier`. You can see the formatting settings in `.prettierrc`.
