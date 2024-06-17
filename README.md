# dashboarding-front
This repositry is front end in React for dashboard-api (Backend)


# Some Coding Practices to Follow
Please try to ensure these standards whenever you are coding in Python.

- Module and file names should follow [snake casing](https://en.wikipedia.org/wiki/Snake_case).
- All variable and function names should also follow snake casing.
- Class names should follow [Pascal case](https://www.theserverside.com/definition/Pascal-case).
- Global variables or constants should be in all caps.

IMPORTANT: Please be vary of accidently pushing any credentials/secrets in the repo.


# Deployment
We are currenlty not using any deployment but will be deployed using github actions. 

1) Do a fresh build of the frontend by running 
   ```
   npm install
   npm run build
   ```
   inside the 'frontend' folder.
   Test Then


2) To deploy the app to App Engine, just push to master

3) If you see any permission errors, contact the project lead.

# Local Development Setup

1) Run Following Commands:
   ```
   npm install
   npm run start
   ```
2) Happy Hacking



# TEMPLATE USED DOCUMENTATION


During the development of this dashboard, we have used many existing resources from awesome developers. We want to thank them for providing their tools open source:

- [MUI](https://mui.com/) - The React UI library for faster and easier web development.
- [React Table](https://react-table.tanstack.com/) - Lightweight and extensible data tables for React.
- [React Flatpickr](https://github.com/haoxins/react-flatpickr) - Useful library used to select date.
- [React ChartJS 2](http://reactchartjs.github.io/react-chartjs-2/#/) - Simple yet flexible React charting for designers & developers.
- [Full Calendar](https://fullcalendar.io/) - Full-sized drag & drop event calendar.
- [Dropzone](https://www.dropzonejs.com/) - An open source library that provides drag & drop file uploads with image previews.
- [React Kanban](https://github.com/asseinfo/react-kanban) - Kanban/Trello board lib for React.
- [React Images Viewer](https://guonanci.github.io/react-images-viewer/) - A simple, responsive images viewer component for ReactJS.
- [React Quill](https://github.com/zenoamaro/react-quill) - A free, open source WYSIWYG editor built for the modern web.
- [Formik](https://formik.org/) - Formik is the world's most popular open source form library for React and React Native.
- [ChromaJS](https://gka.github.io/chroma.js/) - A small-ish zero-dependency JavaScript library for all kinds of color conversions and color scales.
- [UUID](https://github.com/uuidjs/uuid) - JavaScript library for generating random id numbers.
- [HTML React Parser](https://github.com/remarkablemark/html-react-parser) - A utility for converting HTML strings into React components.

Let us know your thoughts below. And good luck with development!

## Table of Contents

- [Versions](#versions)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [File Structure](#file-structure)

## Terminal Commands

1. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
2. Navigate to the root ./ directory of the product and run `yarn install` or `npm install` to install our local dependencies.

## Documentation

The documentation for the Transaction Categorization Dashboard is hosted at our [website](#?ref=readme-mdpr).

### What's included

Within the download you'll find the following directories and files:

```
Transaction Categorization-dashboard-2-pro-react
    ├── public
    │   ├── apple-icon.png
    │   ├── favicon.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── assets
    │   │   ├── images
    │   │   ├── theme
    │   │   │   ├── base
    │   │   │   ├── components
    │   │   │   ├── functions
    │   │   │   ├── index.js
    │   │   │   └── theme-rtl.js
    │   │   └── theme-dark
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   ├── components
    │   │   ├── MDAlert
    │   │   ├── MDAvatar
    │   │   ├── MDBadge
    │   │   ├── MDBadgeDot
    │   │   ├── MDBox
    │   │   ├── MDButton
    │   │   ├── MDDatePicker
    │   │   ├── MDDropzone
    │   │   ├── MDEditor
    │   │   ├── MDInput
    │   │   ├── MDPagination
    │   │   ├── MDProgress
    │   │   ├── MDSnackbar
    │   │   ├── MDSocialButton
    │   │   └── MDTypography
    │   ├── context
    │   ├── examples
    │   │   ├── Breadcrumbs
    │   │   ├── Calendar
    │   │   ├── Cards
    │   │   ├── Charts
    │   │   ├── Configurator
    │   │   ├── Footer
    │   │   ├── Items
    │   │   ├── LayoutContainers
    │   │   ├── Lists
    │   │   ├── Navbars
    │   │   ├── Sidenav
    │   │   ├── Tables
    │   │   └── Timeline
    │   ├── layouts
    │   │   ├── applications
    │   │   │    ├── calendar
    │   │   │    ├── data-tables
    │   │   │    ├── kanban
    │   │   │    └── wizard
    │   │   ├── authentication
    │   │   │    ├── components
    │   │   │    ├── reset-password
    │   │   │    ├── sign-in
    │   │   │    └── sign-up
    │   │   ├── dashboards
    │   │   │    ├── analytics
    │   │   │    └── sales
    │   │   ├── ecommerce
    │   │   │    ├── orders
    │   │   │    └── products
    │   │   └── pages
    │   │        ├── account
    │   │        ├── charts
    │   │        ├── notifications
    │   │        ├── pricing-page
    │   │        ├── profile
    │   │        ├── projects
    │   │        ├── rtl
    │   │        ├── users
    │   │        └── widgets
    │   ├── App.js
    │   ├── index.js
    │   ├── page.routes.js
    │   └── routes.js
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── package.json
    └── README.md
```

