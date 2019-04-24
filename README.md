# departures-demo

A demo Oracle APEX application for my talk on async-await, that consumes data from the Schipol airport flight API and displays departing flights. You have two possibilities for using this demo app:

-   using an embedded local Express.js web server
-   using an APEX server with the included APEX demo application

## Installation

Before you start, ensure that you have Node.js (>= 10) and npm (>=5) installed. You can check this with the following commands:

```bash
node -v
```

```bash
npm -v
```

Next navigate to a folder of your choice and download this project, as well asl the demo flight api for being able to connect to connect to the REST web service:

```bash
git clone https://github.com/dfrechdev/departures-demo.git
```

```bash
git clone https://github.com/dfrechdev/flight-api-demo.git
```

### For use with APEX

If you want to use this demo project with APEX, you also need to have an APEX server accessible (if you need one check out https://www.oracle.com/technetwork/developer-tools/apex/learnmore/apex-hols-2578401.html). Once you have this, import the APEX application located in the "export" directory into your APEX environment.

Further, you need Apex-Nitro to connect to your application. If you do not have it installed yet, you can do so with the following command:

```bash
npm i -g apex-nitro
```

Once installed, create a project in APEX Nitro in "Advanced" mode called "departures-demo". Make sure that your source folder points to ./src/apex and provide the location and settings of your APEX environment for live reloading and file publishing. See https://github.com/OraOpenSource/apex-nitro for all details regarding the configuration of APEX Nitro.

```bash
npm run apex-config
```

## Starting the app

### Start with the embedded local web server

```bash
npm run local-start
```

This will start the Express.js webserver on http://localhost:3001/. You can change the port if you need to in ./src/local/server.js.

You can now change the source files located at ./src/local. Any change will trigger a restart of the webserver. You need to manually refresh the browser page however to see your changes.

### Start with the APEX application

```bash
npm run apex-start
```

This will launch Apex-Nitro with your configured project and will open the application in the browser.

You can now change the source files located at ./src/apex. Any change will trigger automatically sync with the opened application and will reload the browser window.

If you want to push changes in the ./src/apex folder to APEX permanently, you can do so by issuing the following command:

```bash
npm run apex-publish
```

## Issues

This project is intended for demo applications such as for talks or workshops. If you encounter a problem create an issue or feel free to open a pull request if you know the fix.

## License

MIT

## Author

Daniel Frech
