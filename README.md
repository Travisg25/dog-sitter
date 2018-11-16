Dog Sitter is a web application that allows dog owners and dog sitters to come together. Dog owners can request a needed time for a doggy date, and any dog sitters can accept those needed dates. From the landing page create your personal profile to begin using the application.

## Instructions

After cloning into repo, cd to project root directory and create a .env file. This file requires a TURBO_APP_ID and SESSION_SECRET keys:

```
TURBO_ENV=dev
SESSION_SECRET=YOUR_SESSION_SECRET
TURBO_APP_ID=123abc
```

Then run npm install from the root directory:

```
$ npm install
```

To run dev server, install Turbo CLI globally:

```
$ sudo npm install turbo-cli -g
```

Then run devserver from project root directory:

```
$ turbo devserver
```

To build for production, run build:

```
$ npm run build
```

https://www.turbo360.co
