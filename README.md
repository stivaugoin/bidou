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
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/stivaugoin/bidou">
    <img src="public/logo-white.png" alt="Logo" width="600" height="100">
  </a>
  
  <br />
  <br />

  <p align="center">
    Manage your family budget
    <br />
    <br />
    <a href="https://github.com/stivaugoin/bidou">View Demo (not yet available)</a>
    ·
    <a href="https://github.com/stivaugoin/bidou/issues">Report Bug</a>
    ·
    <a href="https://github.com/stivaugoin/bidou/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

Bidou is a simple webapp to manage your family expenses and how much money each members deposit into the joint account.

<img width="1440" alt="CleanShot 2022-11-18 at 11 33 23@2x" src="https://user-images.githubusercontent.com/1130466/202754997-55d12692-f5e3-462e-9565-1aaf2b7e7cfb.png">



### Built With

This section should list any major frameworks/libraries used to built Bidou.

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
  ```sh
  npm install -g pnpm
  ```
* MongoDB - You can use Atlas MongoDB

### Installation

2. Clone the repo
   ```sh
   git clone https://github.com/stivaugoin/bidou.git
   ```
3. Install NPM packages
   ```sh
   pnpm install
   ```
4. Create a `.env` based on `.env.example` and add your config
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

See the [open issues](https://github.com/stivaugoin/bidou/issues) for a full list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License.



<!-- CONTACT -->
## Contact

Steve Bourgoin - stiv.aw@gmail.com

Project Link: [https://github.com/stivaugoin/bidou](https://github.com/stivaugoin/bidou)



<!-- MARKDOWN LINKS -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/stivaugoin/bidou.svg?style=for-the-badge
[contributors-url]: https://github.com/stivaugoin/bidou/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/stivaugoin/bidou.svg?style=for-the-badge
[forks-url]: https://github.com/stivaugoin/bidou/network/members
[stars-shield]: https://img.shields.io/github/stars/stivaugoin/bidou.svg?style=for-the-badge
[stars-url]: https://github.com/stivaugoin/bidou/stargazers
[issues-shield]: https://img.shields.io/github/issues/stivaugoin/bidou.svg?style=for-the-badge
[issues-url]: https://github.com/stivaugoin/bidou/issues
[license-shield]: https://img.shields.io/github/license/stivaugoin/bidou.svg?style=for-the-badge
[license-url]: https://github.com/stivaugoin/bidou/blob/main/LICENSE

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
