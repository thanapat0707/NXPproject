const { bootstrap } = require( './nest-server/nest-dist/main');

const { BrowserWindow, app } = require( 'electron' );
const url = require( 'url' );

let mainWindow;
let NestServer;

function createWindow() {
    mainWindow = new BrowserWindow( {
        show: true,
        x: 0,
        y: 0,
        width: 800,
        height: 600
    } );
    mainWindow.loadURL(
        url.format( {
            hostname: 'localhost',
            port: 3000,
            protocol: 'http:',
            slashes: true,
        } )
    );

    mainWindow.on( 'closed', () => {

        mainWindow = null;
    } );
}

app.on( 'ready', () => {
    NestServer = bootstrap;
    createWindow();
} );

app.on( 'window-all-closed', () => {
    if ( process.platform !== 'darwin' ) {
        app.quit();
    }
} );

app.on( 'activate', () => {
    if ( mainWindow === null ) {
        createWindow();
    }
} );
