# UniteJS CLI
Command line interface to the UniteJS JavaScript framework management tool.

This will generate a scaffold app with the options you specify.

# Install

Unite is best installed as a global package

    npm install -g unitejs-cli / yarn global add unitejs-cli

# Usage

    unite "command" [args0] [args1] ... [argsn]
    where command is one of 
    * help
    * version
    * configure
    * clientPackage
    * buildConfiguration
    * platform

## Command help

Display the help on the command line.

## Command version

Display the version of the app on the command line.

## Command configure

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

    unite configure --packageName=test-project --title="Test TypeScript Jasmine RequireJS" --license=MIT --sourceLanguage=TypeScript --moduleType=AMD --bundler=RequireJS --unitTestRunner=Karma --unitTestFramework=Jasmine --e2eTestRunner=Protractor --e2eTestFramework=Jasmine --linter=TSLint --cssPre=Sass -cssPost=PostCss --appFramework=PlainApp --packageManager=Yarn --outputDirectory=/unite/test-project

    unite configure --packageName=test-project --title="Test JavaScript Mocha Chai SystemJS" --license=Apache-2.0 --sourceLanguage=JavaScript --moduleType=SystemJS --bundler=SystemJSBuilder --unitTestRunner=Karma --unitTestFramework=Mocha-Chai --e2eTestRunner=None --linter=ESLint --cssPre=Css -cssPost=None --appFramework=Aurelia --packageManager=Npm --outputDirectory=/unite/test-project

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
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
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
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
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
| isPackage           |                                           | This is included as a package in module loaders  |
|                     |                                           |   optional - defaults to not package             |
| assets              | comma separated globs                     | These files are packed in platform builds        |
|                     |                                           |   optional - defaults to empty                   |
| packageManager      | npm/yarn                                  | The package manager to use for the add           |
|                     |                                           |   optional - defaults to npm if not already set  |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite clientPackage --operation=add --packageName=moment

    unite clientPackage --operation=add --packageName=moment --version=2.0.0 --preload

    unite clientPackage --operation=add --packageName=sinon --includeMode=test

    unite clientPackage --operation=add --packageName=font-awesome --assets=css/**/*,fonts/**/*

### operation remove

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| packageName         | plain text                                | Name of the package to remove                    |
| packageManager      | npm/yarn                                  | The package manager to use for the remove        |
|                     |                                           |   optional - defaults to npm if not already set  |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite clientPackage --operation=remove --packageName=moment

## Command platform

Perform operations to add or remove platforms. This provides tasks that allow you to wrap your web application for different platforms.

One you have added a platform there can manually edit your unite.json to specify other options for the platform packaging, see the [Platforms](./docs/generated-app.md#platforms) section.

### operation add

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | add                                       |                                                  |
| platformName        | Web/Electron                              | Name of the platform to add                      |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite platform --operation=add --platformName=Web

### operation remove

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| platformName        | Web/Electron                              | Name of the platform to remove                   |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite platform --operation=remove --platformName=Electron

## global arguments

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| noColor             |                                           | If this is used no color will appear in output   |
|                     |                                           |   optional - defaults to on                      |
| logFile             | 'filename'                                | The log file to store the logging in             |
|                     |                                           |   optional - default to no file logging          |

# Generated App

For more information on the generated app see [Generated App](./docs/generated-app.md) 

