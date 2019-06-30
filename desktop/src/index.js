const {app, globalShortcut, Menu, Tray, BrowserWindow} = require('electron');

let main = {
    page: {index: null, setting: null},
    toggleIndexShortcut() {
        return 'Command+Option+D';
    },
    globalShortcut() {
        const ret = globalShortcut.register(this.toggleIndexShortcut(), () => {
            this.toggleIndex();
        });
        if (!ret) {
            console.log('registration globalShortcut failed')
        }
    },
    createIndexWindow() {
        this.page.index = new BrowserWindow({
            width: 800,
            height: 580,
            resizable: false,
            minimizable: false,
            maximizable: false,
            closable: false,
            alwaysOnTop: true,
            // frame: false,
            backgroundColor: 'alpha(opacity=0)',
        });
        // this.page.index.loadURL(`file://${__dirname}/../../dist/index.html`)
        this.page.index.loadURL('http://localhost:8081/#/tool/hash');
        this.page.index.on('blur', () => {
            console.log(111);
            // this.toggleIndexHide()
        });
        this.page.index.on('close', () => {
            this.page.index = null;
        })
    },
    createSettingWindow() {
    },
    tray() {
        // console.log(`${__dirname}/../public/img/icon128.png`);
        let tray = new Tray(`/Users/ctt/work/baiy/github/baiy/chrome-tool/public/img/icon128.png`);
        const contextMenu = Menu.buildFromTemplate([{
            label: '显示/隐藏',
            click(item, focusedWindow) {
                this.toggleIndex();
            },
        }, {
            label: '退出',
            click(item, focusedWindow) {
                app.quit()
            },
        }]);
        tray.setContextMenu(contextMenu)
    },
    toggleIndex() {
        if (this.page.index) {
            if (this.page.index.isVisible()) {
                this.toggleIndexShow()
            } else {
                this.toggleIndexHide()
            }
        }
    },
    toggleIndexShow() {
        this.page.index.restore();
        this.page.index.show();
        this.page.index.focus();
        // app.show();
    },
    toggleIndexHide() {
        this.page.index.hide();
        // app.hide();
    },
    init() {
        app.on('ready', () => {
            this.createIndexWindow();
            this.globalShortcut()
            this.tray()
        });
        app.on('will-quit', () => {
            globalShortcut.unregister(this.toggleIndexShortcut())
            globalShortcut.unregisterAll()
        })
    }
};
main.init();

