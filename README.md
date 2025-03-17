<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

<div align="center">

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>
<br />

<div align="center">

[![Vite][Vite]][vite-url]
[![React][React.js]][react-url]
[![Typescript][Typescript]][typescript-url]
[![Google Cloud][Google Cloud]][google-cloud-url]
  
</div>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Rondleysg/route-finder">
    <img src="public/android-chrome-512x512.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Route Finder</h3>

  <p align="center">
    An interactive application to visualize and compare graph routing algorithms.
    <br />
    <a href="https://github.com/Rondleysg/route-finder"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://routes-finder.vercel.app/">View Demo</a>
    &middot;
    <a href="https://github.com/Rondleysg/route-finder/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/Rondleysg/route-finder/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Demo Screen Shot][demo-screenshot]](https://routes-finder.vercel.app/)

Route-Finder is an interactive web application for visualizing and comparing graph-based routing algorithms. Users can add real-world waypoints on the map and analyze how different algorithms (A* and Nearest Neighbor) compute the optimal path.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
This project was developed with the following main technologies:

* [![Vite][Vite]][vite-url]
* [![React][React.js]][react-url]
* [![Typescript][Typescript]][typescript-url]
* [![Google Cloud][Google Cloud]][google-cloud-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

To run the project, you need to have installed:
* Node.js
* NPM or Yarn

### Installation

_Instructions to install dependencies and start the project._

1. Get a free Google Maps API Key at [https://developers.google.com/maps](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=pt-br)
2. Clone the repo

   ```sh
   git clone https://github.com/Rondleysg/route-finder.git
   ```

3. Navigate to the project folder

   ```sh
   cd route-finder
   ```

4. Install dependencies

   ```sh
   yarn
   ```

5. Configure environment variables by adding `.env.local` file to the project root

   ```env
   VITE_GOOGLE_MAPS_API_KEY=ENTER YOUR API KEY HERE
   VITE_RENDER_MAP=true
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

_Instructions to run the project locally and use it._

1. Run the project locally

   ```sh
   yarn dev
   ```
  
2. Access the application in your browser (normally at the address below)

    ```sh
    http://localhost:5173/
    ```

3. If you prefer, you can load a predefined route by clicking the `Load` button, or manually add the route's starting point and its waypoints.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Features

* [x] Ability to change route visualization between **A*** and **Nearest Neighbor** algorithms.
* [x] **Visualize the computed route** with clear path highlighting.
* [x] View the total distance (in meters) of the route.
* [x] Export the generated route to **Google Maps** for navigation.
* [x] Add an address (waypoint) to the route.
* [x] Add an address (waypoint) by clicking directly on the map.
* [x] View list of addresses added to route.
* [x] Remove an address (waypoint) from the route.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/new-feature`)
3. Commit your Changes (`git commit -m 'feature: new feature'`)
4. Push to the Branch (`git push origin feature/new-feature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/Rondleysg/route-finder/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Rondleysg/route-finder" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Rondley Gregório - [@rondleyg](https://www.instagram.com/rondleyg/?hl=pt-br) - rondleyemail@gmail.com

Project Link: [https://github.com/Rondleysg/route-finder](https://github.com/Rondleysg/route-finder)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[forks-shield]: https://img.shields.io/github/forks/Rondleysg/route-finder.svg?style=for-the-badge
[forks-url]: https://github.com/Rondleysg/route-finder/network/members
[stars-shield]: https://img.shields.io/github/stars/Rondleysg/route-finder.svg?style=for-the-badge
[stars-url]: https://github.com/Rondleysg/route-finder/stargazers
[issues-shield]: https://img.shields.io/github/issues/Rondleysg/route-finder.svg?style=for-the-badge
[issues-url]: https://github.com/Rondleysg/route-finder/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/rondleysg/

[demo-screenshot]: https://github.com/user-attachments/assets/cc795a9e-b3ff-413e-866f-8164077719b2 

[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vite.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[Typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[Google Cloud]: https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white
[google-cloud-url]: https://cloud.google.com/