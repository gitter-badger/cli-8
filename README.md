# UniteJS CLI
Command line interface to the UniteJS JavaScript framework management tool.

This will generate a scaffold app with the options you specify.

# Install

Unite is best installed as a global package

    npm install -g unitejs-cli / yarn global add unitejs-cli

# Usage

    unite "command" [args0] [args1] ... [argsn]

## Command help

Display the help on the command line.

## Command init

If there is already a unite.json in the outputDirectory then all of the arguments will be read from the file and are optional. You only need specify the ones that you want to change.

| Argument            | Value                                        | Used For                                         |
|---------------------|----------------------------------------------|--------------------------------------------------|
| packageName         | plain text, package.json name rules apply    | Name to be used for your package                 |
| title               | plain text                                   | Used on the web index page                       |
| license             | plain text                                   | See [SPDX](https://spdx.org/licenses/) for options|
| sourceLanguage      | JavaScript/TypeScript                        | The language you want to code in                 |
| moduleType          | AMD/CommonJS/SystemJS                        | The module type you want to use                  |
| bundler             | Browserify/RequireJS/SystemJSBuilder/Webpack | The bundler you want to use                      |
| linter              | ESLint/TSLint/None                           | The linter                                       |
|                     |                                              |   None - means no linting                        |
| unitTestRunner      | Karma/None                                   | The unit test runner                             |
|                     |                                              |   None - means no unit testing                   |
| unitTestFramework   | Jasmine/Mocha-Chai                           | The unit test framework to use                   |
| e2eTestRunner       | Protractor/WebdriverIO/None                  | The e2e test runner                              |
| e2eTestFramework    | Jasmine/Mocha-Chai                           | The e2e test framework to use                    |
| cssPre              | Css/Less/Sass/Stylus                         | The css preprocessor to use                      |
| cssPost             | PostCss/None                                 | The css postprocessor to use                     |
|                     |                                              |   None - means no css post processor             |
| appFramework        | Aurelia/PlainApp/React                       | The application framework to use                 |
| packageManager      | Npm/Yarn                                     | The package manager to use                       |
|                     |                                              |   optional - defaults to Npm if not already set  |
| outputDirectory     | 'path'                                       | The location that you want the project generated |
|                     |                                              |   optional - defaults to current directory       |

# Example

    unite init --packageName=test-project --title="Test TypeScript Jasmine RequireJS" --license=MIT --sourceLanguage=TypeScript --moduleType=AMD --bundler=RequireJS --unitTestRunner=Karma --unitTestFramework=Jasmine --e2eTestRunner=Protractor --e2eTestFramework=Jasmine --linter=TSLint --cssPre=Sass -cssPost=PostCss --appFramework=PlainApp --packageManager=Yarn --outputDirectory=/unite/test-project

    unite init --packageName=test-project --title="Test JavaScript Mocha Chai SystemJS" --license=Apache-2.0 --sourceLanguage=JavaScript --moduleType=SystemJS --bundler=SystemJSBuilder --unitTestRunner=Karma --unitTestFramework=Mocha-Chai --e2eTestRunner=None --linter=ESLint --cssPre=Css -cssPost=None --appFramework=Aurelia --packageManager=Npm --outputDirectory=/unite/test-project

## Command buildConfiguration

By default you are created dev and prod configurations with sensible defaults. You can add or remove configurations with this command.

The configuration sections created in unite.json have a variables property which you can modify manually to add your own values that will be include in the build. The values are then available in the window.unite.config namespace at runtime. As this is just JSON your value can be any data that can be JSON serialized.

# Example

unite.json

	"buildConfigurations": {
		"myconfiguration": {
			...
			"variables": {
                        "value1": 12345,
                        "someFlag: true
                   }
		}
	}

at runtime

    console.log(window.unite.config["value1"]);
    console.log(window.unite.config["someFlag"]);

### operation add

This will also update any existing configurations.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | add                                       |                                                  |
| configurationName   | plain text                                | Name of the configuration to modify              |
| bundle              |                                           | Should the final output be bundled               |
|                     |                                           |   optional - defaults to off                     |
| minify              |                                           | Should the final output be minified              |
|                     |                                           |   optional - defaults to off                     |
| sourcemaps          |                                           | Should the final output include sourcemaps       |
|                     |                                           |   optional - defaults to on                      |
| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite buildConfiguration --operation=add --configurationName=dev --sourcemaps

    unite buildConfiguration --operation=add --configurationName=prod --bundle --minify

    unite buildConfiguration --operation=add --configurationName=prod-debug --bundle --minify --sourcemaps


### operation remove

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| configurationName   | plain text                                | Name of the configuration to modify              |
| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite buildConfiguration --operation=remove --configurationName=prod-debug


## Command clientPackage

Perform operations to add or remove client packages. These operations will perform the npm/yarn package operations as well as updating all the neccesary configuration files.

### operation add

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | add                                       |                                                  |
| packageName         | plain text                                | Name of the package to add                       |
| version             | 1.23.4                                    | Fixed version to install                         |
|                     |                                           |   optional - defaults to latest version          |
| preload             |                                           | Should the package be preloaded at app startup   |
|                     |                                           |   optional - defaults to not preload             |
| includeMode         | app/test/both                             | When should the package be loaded                |
|                     |                                           |   optional - defaults to both                    |
| main                | 'path'                                    | The path to the main js file in the package      |
|                     |                                           |   optional - defaults to looking it up           |
| mainMinified        | 'path'                                    | The path to the minified main js file            |
|                     |                                           |   optional - defaults to using main              |
| isPackage           |                                           | This be included as a package in module loaders  |
|                     |                                           |   optional - defaults to not package             |
| packageManager      | npm/yarn                                  | The package manager to use for the add           |
|                     |                                           |   optional - defaults to npm if not already set  |
| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite clientPackage --operation=add --packageName=moment

    unite clientPackage --operation=add --packageName=moment --version=2.0.0 --preload

    unite clientPackage --operation=add --packageName=sinon --includeMode=test

### operation remove

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| packageName         | plain text                                | Name of the package to remove                    |
| packageManager      | npm/yarn                                  | The package manager to use for the remove        |
|                     |                                           |   optional - defaults to npm if not already set  |
| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite clientPackage --operation=remove --packageName=moment

## global arguments

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| logLevel            | 0/1                                       | The level of logging to generate                 |
|                     |                                           |   0 = no logging                                 |
|                     |                                           |   1 = logging                                    |
| logFile             | 'filename'                                | The log file to store the logging in             |
|                     |                                           |   optional - default to unite.log                |

# Scaffold App

The following pre-requisities are needed

    npm -g install gulp [or] yarn global add gulp

Once the above are installed you can install the npm packages for the scaffold app with

    npm install [or] yarn install

The following gulp commands are then available for the scaffold app.

* build
* unit
* e2e-install
* e2e
* serve
* theme-build

### build
This will transpile and build the app.

You can specify a buildConfiguration with the following syntax:

    gulp build --buildConfiguration=prod

### unit
This will run unit tests for the app and generate unit and coverage reports in the reports folder.

### e2e-install
This will install all the necessary components required for the e2e tests, it need only be run once.

### e2e
This will run e2e tests for the app and generate reports in the reports folder.

### serve
This will serve the app for you to view in a browser.

### theme-build
You will probably need to run this task at least once to generate the necessary favicon images and meta tags.

During the skeleton generation 3 files will have been created, if you change any of them then you should run the task again.

* assetsSource/theme/logo-tile.svg
* assetsSource/theme/logo-transparent.svg
* assetsSource/theme/unite-theme.json

The logo-tile.svg image should have a design that works well on a tile, e.g. a white icon with transparent background (the background color can be specified as part of the unite-theme.json configuration).

The logo-transparent.svg image should be a normal colored icon also on a transparent background, mostly used for the .ico image.

The fields in the unite-theme.json should be self explanatory in terms of what they generate in the index.html page. The themeHeaders will get overwritten when you run theme-build again so any custom headers you want should go in the customHeaders property. The backgroundColor is used for tile backgrounds and the themeColor is used to color the safari pinned icon mask.

    {
        "metaDescription": "Test CSS",
        "metaKeywords": [
            "Test",
            "CSS"
        ],
        "metaAuthor": "Unite JS",
        "customHeaders": [
            "<meta property=\"twitter:site\" content=\"@unitejs\">"
        ],
        "themeHeaders": [
            ... Generated by task
        ],
        "backgroundColor": "#339933",
        "themeColor": "#339933"
    }

Of course you don't need to run the theme-build task you could instead generate your own icons and headers using a site such as [RealFaviconGenerator](https://realfavicongenerator.net/) and copy the headers in to the customHeaders property and the icons wherever you like in your site. All credit goes to RealFaviconGenerator for the inspiration of the minimal set of resources need to satisfy modern browsers.

## Modifications To Generated Files
If you modify any of the files generated by UniteJS then you should remove the *Generated by UniteJS* comment at the bottom of the file. If you then call any of the UniteJS operations again your changes will be retained. Any files which are generated but can not contain comments because of their format (e.g. .json files) will where possible be combined with any changes you have made.