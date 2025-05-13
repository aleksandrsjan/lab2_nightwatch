const path = require('path');

module.exports = {
    src_folders: ['tests'],
    page_objects_path: 'pageObjects',
    webdriver: {
        start_process: true,
        port: 4444
    },

    test_settings: {
        default: {
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: [
                      "incognito",
                    ],
                },
            },
            webdriver: { server_path: require('chromedriver').path },
            test_workers: {
                enabled: true,
                workers: 'auto'
            }
        },

        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: ['--incognito']
                }
            },
            webdriver: { server_path: require('chromedriver').path }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox'
            },
            webdriver: {
                server_path: path.resolve(
                    __dirname,
                    'node_modules',
                    'geckodriver',
                    'bin',
                    'geckodriver.js'
                )
            }
        }
    }
};
