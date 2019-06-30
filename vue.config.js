const config = {
    productionSourceMap: true,
    pages: {
        index: {
            entry: 'src/tool.js',
            template: 'public/tool.html',
        },
        setting: {
            entry: 'src/setting.js',
            template: 'public/setting.html',
        }
    },
    chainWebpack: config => {
        config.plugin('define').tap(args => {
            args[0]['process.ctool'] = JSON.stringify({
                version: process.env.npm_package_version,
                updateTime: Date.parse((new Date()).toString())/1000,
            });
            return args
        })
    },
};
module.exports = config;
