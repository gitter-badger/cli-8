"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main entry point.
 */
const engine_1 = require("unitejs-core/dist/engine/engine");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
const commandLineParser_1 = require("./commandLineParser");
const display_1 = require("./display");
const fileSystem_1 = require("./fileSystem");
const logger_1 = require("./logger");
class CLI {
    run(process) {
        return __awaiter(this, void 0, void 0, function* () {
            let logger;
            let ret;
            try {
                const commandLineParser = new commandLineParser_1.CommandLineParser();
                commandLineParser.parse(process.argv);
                logger = new logger_1.Logger(commandLineParser.getNumberArgument(commandLineArgConstants_1.CommandLineArgConstants.LOG_LEVEL), commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.LOG_FILE), CLI.DEFAULT_LOG);
                logger.info("Session Started");
                const display = new display_1.Display(process, commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.NO_COLOR));
                ret = yield this.handleCommand(logger, display, commandLineParser);
                logger.info("Session Ended", { returnCode: ret });
            }
            catch (err) {
                ret = 1;
                // tslint:disable-next-line:no-console
                console.log("An unhandled error occurred: ", err);
                if (logger !== undefined) {
                    logger.error("Unhandled Exception", err);
                    logger.info("Session Ended", { returnCode: ret });
                }
            }
            return ret;
        });
    }
    createEngine(logger, display, commandLineParser) {
        const fileSystem = new fileSystem_1.FileSystem();
        return new engine_1.Engine(logger, display, fileSystem);
    }
    handleCommand(logger, display, commandLineParser) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = 0;
            this.displayBanner(logger, display, commandLineParser.getCommand() !== commandLineCommandConstants_1.CommandLineCommandConstants.VERSION);
            const command = commandLineParser.getCommand();
            const args = commandLineParser.getArguments([commandLineArgConstants_1.CommandLineArgConstants.NO_COLOR,
                commandLineArgConstants_1.CommandLineArgConstants.LOG_FILE,
                commandLineArgConstants_1.CommandLineArgConstants.LOG_LEVEL]);
            logger.info("Command Line", { command, args });
            switch (command) {
                case commandLineCommandConstants_1.CommandLineCommandConstants.VERSION: {
                    /* Nothing else to display */
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.HELP: {
                    this.displayHelp(display);
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.INIT: {
                    display.info("command: " + command);
                    const packageName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_NAME);
                    const title = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.TITLE);
                    const license = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.LICENSE);
                    const sourceLanguage = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_LANGUAGE);
                    const moduleType = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.MODULE_TYPE);
                    const bundler = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.BUNDLER);
                    const unitTestRunner = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.UNIT_TEST_RUNNER);
                    const unitTestFramework = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.UNIT_TEST_FRAMEWORK);
                    const e2eTestRunner = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.E2E_TEST_RUNNER);
                    const e2eTestFramework = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.E2E_TEST_FRAMEWORK);
                    const linter = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.LINTER);
                    const packageManager = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_MANAGER);
                    const cssPreProcessor = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.CSS_PRE_PROCESSOR);
                    const cssPostProcessor = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.CSS_POST_PROCESSOR);
                    const appFramework = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.APP_FRAMEWORK);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = this.createEngine(logger, display, commandLineParser);
                    if (engine) {
                        ret = yield engine.init(packageName, title, license, sourceLanguage, moduleType, bundler, unitTestRunner, unitTestFramework, e2eTestRunner, e2eTestFramework, linter, cssPreProcessor, cssPostProcessor, packageManager, appFramework, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.CLIENT_PACKAGE: {
                    display.info("command: " + command);
                    const operation = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OPERATION);
                    const packageName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_NAME);
                    const version = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.VERSION);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const packageManager = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_MANAGER);
                    const preload = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.PRELOAD);
                    const includeMode = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.INCLUDE_MODE);
                    const isPackage = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.IS_PACKAGE);
                    const main = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.MAIN);
                    const mainMinified = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.MAIN_MINIFIED);
                    const engine = this.createEngine(logger, display, commandLineParser);
                    if (engine) {
                        ret = yield engine.clientPackage(operation, packageName, version, preload, includeMode, main, mainMinified, isPackage, "", packageManager, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.BUILD_CONFIGURATION: {
                    display.info("command: " + command);
                    const operation = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OPERATION);
                    const configurationName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.CONFIGURATION_NAME);
                    const bundle = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.BUNDLE);
                    const minify = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.MINIFY);
                    const sourceMaps = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_MAPS);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = this.createEngine(logger, display, commandLineParser);
                    if (engine) {
                        ret = yield engine.buildConfiguration(operation, configurationName, bundle, minify, sourceMaps, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                default: {
                    if (command === undefined) {
                        display.error("Error: No command specified");
                    }
                    else {
                        display.error("Error: Unknown command - " + command);
                    }
                    display.info("Command line format: <command> [--arg1] [--arg2] ... [--argn]");
                    break;
                }
            }
            return ret;
        });
    }
    displayBanner(logger, display, includeTitle) {
        const packageJson = require("../package.json");
        if (includeTitle) {
            display.banner(CLI.APP_NAME + " CLI");
        }
        display.banner(packageJson && packageJson.version ? "v" + packageJson.version : " Unknown Version");
        logger.info(CLI.APP_NAME, { version: packageJson.version });
        if (includeTitle) {
            display.banner("");
        }
    }
    displayHelp(display) {
        display.diagnostics("Commands");
        display.info("  help, init, clientPackage, buildConfiguration");
        display.info("");
        display.diagnostics("init");
        display.info("");
        this.markdownTableToCli(display, "| packageName         | plain text, package.json name rules apply    | Name to be used for your package                 |");
        this.markdownTableToCli(display, "| title               | plain text                                   | Used on the web index page                       |");
        this.markdownTableToCli(display, "| license             | plain text                                   | See [SPDX](https://spdx.org/licenses/) for options|");
        this.markdownTableToCli(display, "| sourceLanguage      | JavaScript/TypeScript                        | The language you want to code in                 |");
        this.markdownTableToCli(display, "| moduleType          | AMD/CommonJS/SystemJS                        | The module type you want to use                  |");
        this.markdownTableToCli(display, "| bundler             | Browserify/RequireJS/SystemJSBuilder/Webpack | The bundler you want to use                      |");
        this.markdownTableToCli(display, "| linter              | ESLint/TSLint/None                           | The linter                                       |");
        this.markdownTableToCli(display, "|                     |                                              |   None - means no linting                        |");
        this.markdownTableToCli(display, "| unitTestRunner      | Karma/None                                   | The unit test runner                             |");
        this.markdownTableToCli(display, "|                     |                                              |   None - means no unit testing                   |");
        this.markdownTableToCli(display, "| unitTestFramework   | Jasmine/Mocha-Chai                           | The unit test framework to use                   |");
        this.markdownTableToCli(display, "| e2eTestRunner       | Protractor/WebdriverIO/None                  | The e2e test runner                              |");
        this.markdownTableToCli(display, "| e2eTestFramework    | Jasmine/Mocha-Chai                           | The e2e test framework to use                    |");
        this.markdownTableToCli(display, "| cssPre              | Css/Less/Sass/Stylus                         | The css preprocessor to use                      |");
        this.markdownTableToCli(display, "| cssPost             | PostCss/None                                 | The css postprocessor to use                     |");
        this.markdownTableToCli(display, "|                     |                                              |   None - means no css post processor             |");
        this.markdownTableToCli(display, "| appFramework        | Aurelia/PlainApp/React                       | The application framework to use                 |");
        this.markdownTableToCli(display, "| packageManager      | Npm/Yarn                                     | The package manager to use                       |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                       | The location that you want the project generated |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("buildConfiguration --operation=add");
        display.info("");
        this.markdownTableToCli(display, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(display, "| bundle              |                                           | Should the final output be bundled               |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to off                     |");
        this.markdownTableToCli(display, "| minify              |                                           | Should the final output be minified              |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to off                     |");
        this.markdownTableToCli(display, "| sourcemaps          |                                           | Should the final output include sourcemaps       |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to on                      |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("buildConfiguration --operation=remove");
        display.info("");
        this.markdownTableToCli(display, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("clientPackage --operation=add");
        display.info("");
        this.markdownTableToCli(display, "| packageName         | plain text                                | Name of the package to add                       |");
        this.markdownTableToCli(display, "| version             | 1.23.4                                    | Fixed version to install                         |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to latest version          |");
        this.markdownTableToCli(display, "| preload             |                                           | Should the package be preloaded at app startup   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to not preload             |");
        this.markdownTableToCli(display, "| includeMode         | app/test/both                             | When should the package be loaded                |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to both                    |");
        this.markdownTableToCli(display, "| main                | 'path'                                    | The path to the main js file in the package      |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to looking it up           |");
        this.markdownTableToCli(display, "| mainMinified        | 'path'                                    | The path to the minified main js file            |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to using main              |");
        this.markdownTableToCli(display, "| isPackage           |                                           | This be included as a package in module loaders  |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to not package             |");
        this.markdownTableToCli(display, "| packageManager      | npm/yarn                                  | The package manager to use for the add           |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("clientPackage --operation=remove");
        display.info("");
        this.markdownTableToCli(display, "| packageName         | plain text                                | Name of the package to remove                    |");
        this.markdownTableToCli(display, "| packageManager      | npm/yarn                                  | The package manager to use for the remove        |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("Examples");
        display.info("");
        display.info("  unite init --packageName=test-project --title=\"Test TypeScript Jasmine RequireJS\"");
        display.info("   --license=MIT --sourceLanguage=TypeScript --moduleType=AMD --bundler=RequireJS --unitTestRunner=Karma");
        display.info("   --unitTestFramework=Jasmine --e2eTestRunner=Protractor --e2eTestFramework=Jasmine --linter=TSLint");
        display.info("   --cssPre=Sass -cssPost=PostCss --appFramework=PlainApp --packageManager=Yarn --outputDirectory=/unite/test-project");
        display.info("");
        display.info("  unite init --packageName=test-project --title=\"Test JavaScript Mocha Chai SystemJS\"");
        display.info("    --license=Apache-2.0 --sourceLanguage=JavaScript --moduleType=SystemJS --bundler=SystemJSBuilder --unitTestRunner=Karma");
        display.info("    --unitTestFramework=Mocha-Chai --e2eTestRunner=None --linter=ESLint --cssPre=Css -cssPost=None");
        display.info("    --appFramework=Aurelia --packageManager=Npm --outputDirectory=/unite/test-project");
        display.info("");
        display.info("  unite buildConfiguration --operation=add --configurationName=dev --sourcemaps");
        display.info("  unite buildConfiguration --operation=add --configurationName=prod --bundle --minify");
        display.info("  unite buildConfiguration --operation=add --configurationName=prod-debug --bundle --minify --sourcemaps");
        display.info("");
        display.info("  unite buildConfiguration --operation=remove --configurationName=prod-debug");
        display.info("");
        display.info("  unite clientPackage --operation=add --packageName=moment");
        display.info("  unite clientPackage --operation=add --packageName=moment --version=2.0.0 --preload");
        display.info("  unite clientPackage --operation=add --packageName=sinon --includeMode=test");
        display.info("");
        display.info("  unite clientPackage --operation=remove --packageName=moment");
        display.info("");
        display.diagnostics("More Information");
        display.info("");
        display.info("  See https://github.com/unitejs/cli#readme for further details.");
        return 0;
    }
    markdownTableToCli(display, row) {
        if (row.length > 2) {
            row = row.substring(0, row.length - 1).trim().replace(/\|/g, "");
            if (row[2] === " ") {
                display.info("   " + row.substring(1));
            }
            else {
                display.info(" --" + row.substring(1));
            }
        }
    }
}
CLI.APP_NAME = "UniteJS";
CLI.DEFAULT_LOG = "unite.log";
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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TyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDM0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzNKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMzSixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDM0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzNKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMzSixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDM0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzNKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMzSixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDM0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzNKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMzSixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDM0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzNKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMzSixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLHdIQUF3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RyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7O0FBcFNjLFlBQVEsR0FBVyxTQUFTLENBQUM7QUFDN0IsZUFBVyxHQUFXLFdBQVcsQ0FBQztBQUZyRCxrQkFzU0MiLCJmaWxlIjoidW5pdGVqcy1jbGkuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjIn0=
