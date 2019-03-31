# Arrivals

A demo Oracle APEX application that consumes data from the Schipol airport flight API and displays the arriving flights.

## Prerequisites

-   Node.js >= 10
-   npm >= 5
-   apex-nitro installed globally (npm i -g apex-nitro)
-   Oracle DB with APEX, either on a VM (rg https://www.oracle.com/technetwork/developer-tools/apex/learnmore/apex-hols-2578401.html) or in a Docker container

## Import the APEX application

Import the APEX application export located in the "export" directory into your APEX environment.

## Configure project

Define your APEX Nitro settings for your project, particularly the location and settings of your APEX environment for live reloading and file publishing. See https://github.com/OraOpenSource/apex-nitro for all details regardging the
configuration of APEX Nitro.

```bash
npm run configure
```

## Launch project in development mode

```bash
npm run launch
```

This is equivalent to running "apex-nitro launch arrivals".

## Publish files to APEX

```bash
npm run publish
```

This is equivalent to running "apex-nitro launch arrivals".

## Issues

This project is intended for demo applications such as for talks or workshops. If you encounter a problem create an issue or feel fre to open a pull request if you know the fix.

## License

MIT

## Author

Daniel Frech
