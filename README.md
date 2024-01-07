<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/stivaugoin/bidou">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="public/logo-black.png">
      <img src="public/logo-white.png" alt="Logo" width="600" height="100">
    </picture>
  </a>
  
  <br />
  <br />
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Bidou is a simple web app to manage family expenses and how much money each member deposits into the joint account.

<img width="1440" alt="CleanShot 2022-11-18 at 11 33 23@2x" src="https://user-images.githubusercontent.com/1130466/202754997-55d12692-f5e3-462e-9565-1aaf2b7e7cfb.png">

### Built With

[![Typescript][typescript]][typescript-url]
[![Next][next.js]][next-url]
[![React][react]][react-url]
[![MongoDB][mongodb]][mongodb-url]
[![Prisma][prisma]][prisma-url]
[![Mantine][mantine]][mantine-url]

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- pnpm
- A MongoDB database - You can use Atlas MongoDB

### Installation

1. Install NPM packages
   ```sh
   pnpm install
   ```
2. Create a `.env` based on `.env.example` and add your config

   ```js
   // Your database connection (need to include database name)
   const DATABASE_URL = "";

   // Password used to enter in the app. There is no user account, only a password.
   const PASSWORD = "";
   ```

<!-- USAGE EXAMPLES -->

## Usage

### Start application

```
pnpm dev
```

### Deploy on Vercel

> **Warning**: You need to setup your environment before!

Do not deploy `main` branch directly. Use the latest version with a tag instead, see [Releases](https://github.com/stivaugoin/bidou/releases).

```
vercel deploy --prod
```

<!-- LICENSE -->

## License

[MIT licensed](LICENSE)

<!-- Stack -->

[typescript]: https://img.shields.io/badge/Typescript-20232A?style=for-the-badge&logo=typescript
[typescript-url]: https://www.typescriptlang.org/
[next.js]: https://img.shields.io/badge/next.js-20232A?style=for-the-badge&logo=nextdotjs
[next-url]: https://nextjs.org/
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react
[react-url]: https://reactjs.org/
[mongodb]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb
[mongodb-url]: https://mongodb.com/
[prisma]: https://img.shields.io/badge/Prisma-20232A?style=for-the-badge&logo=prisma
[prisma-url]: https://prisma.io/
[mantine]: https://img.shields.io/badge/Mantine-20232A?style=for-the-badge&logo=mantine
[mantine-url]: https://mantine.dev/
