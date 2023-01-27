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

Bidou is a simple webapp to manage your family expenses and how much money each members deposit into the joint account.

<img width="1440" alt="CleanShot 2022-11-18 at 11 33 23@2x" src="https://user-images.githubusercontent.com/1130466/202754997-55d12692-f5e3-462e-9565-1aaf2b7e7cfb.png">



### Built With

[![Typescript][Typescript]][Typescript-url]
[![Next][Next.js]][Next-url]
[![React][React]][React-url]
[![MongoDB][MongoDB]][MongoDB-url]
[![Prisma][Prisma]][Prisma-url]
[![Mantine][Mantine]][Mantine-url]



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* pnpm
* A MongoDB database - You can use Atlas MongoDB

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

_You need to setup your environment before_

Do not deploy `main` branch. Use latest version with tag instead.

```
vercel deploy --prod
```



<!-- ROADMAP -->
## Roadmap

- [x] Rewrite application with NextJS and Mantine
- [ ] Add filters on list
- [ ] Add reports
- [ ] Responsive (mobile is not yet well supported)
- [ ] Remove Mantine and use a custom UI

<!-- LICENSE -->
## License

MIT

<!-- Stack -->
[Typescript]: https://img.shields.io/badge/Typescript-20232A?style=for-the-badge&logo=typescript
[Typescript-url]: https://www.typescriptlang.org/
[Next.js]: https://img.shields.io/badge/next.js-20232A?style=for-the-badge&logo=nextdotjs
[Next-url]: https://nextjs.org/
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react
[React-url]: https://reactjs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb
[MongoDB-url]: https://mongodb.com/
[Prisma]: https://img.shields.io/badge/Prisma-20232A?style=for-the-badge&logo=prisma
[Prisma-url]: https://prisma.io/
[Mantine]: https://img.shields.io/badge/Mantine-20232A?style=for-the-badge&logo=mantine
[Mantine-url]: https://mantine.dev/
