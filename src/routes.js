

// Material Dashboard 2 PRO React layouts
import React, { lazy, Suspense } from "react";


// import Analytics from "pages/dashboards/Fynax/analytics";
// import Sales from "pages/dashboards/Fynax/sales";
import ProfileOverview from "pages/profile/profile-overview";
import Settings from "pages/account/settings";
import Logout from "pages/authentication/log-out";
import ListDashboard from "pages/ListDashboards";
// import DashboardSettings from "pages/dashboards/Fynax/settings";
// Material Dashboard 2 PRO React components
import MDAvatar from "ResuseableComponents/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/neutral-profile-pic.jpg";

// const Analytics = company_name === "Fynax" ? lazy(() =>
//   import('pages/dashboards/Fynax/analytics')) : null;
let Analytics;
if (window.localStorage.getItem("COMPANY_NAME") === 'Fynax') {
  Analytics = lazy(()=>import('pages/dashboards/Fynax/analytics'));
} else if (window.localStorage.getItem("COMPANY_NAME") === 'Accurox') {
  Analytics = lazy(()=> import('pages/dashboards/Accurox/analytics'));
} else if (window.localStorage.getItem("COMPANY_NAME") === 'Transform London'){
  Analytics = lazy(()=>import('pages/dashboards/TransformLondon/analytics'));
}
let Sales;
if (window.localStorage.getItem("COMPANY_NAME") === 'Fynax') {
  Sales = lazy(()=>import('pages/dashboards/Fynax/sales'));
} else if (window.localStorage.getItem("COMPANY_NAME") === 'Accurox') {
  Sales = lazy(()=> import('pages/dashboards/Accurox/sales'));
} else if (window.localStorage.getItem("COMPANY_NAME") === 'Transform London'){
  Sales = lazy(()=>import('pages/dashboards/TransformLondon/sales'));
}

const DynamicRoutes = [

  {
    type: "collapse",
    name: "Profile",
    key: "user",
    icon: <MDAvatar src={profilePicture} alt="Guest" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "my-profile",
        route: "/profile/profile-overview",
        component: <ProfileOverview />,
        Auth: true,
        isPublic: false,
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/account/settings",
        component: <Settings />,
        Auth: true,
        isPublic: false,
      },
      {
        name: "Logout",
        key: "logout",
        route: "/auth/logout",
        component: <Logout />,
        Auth: false,
        isPublic: false,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Your Dashboards",
        key: "yourDashboards",
        route: "/dashboards",
        component: <ListDashboard />,
        Auth: true,
        isPublic: false,
      },
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
        component:
        <Suspense fallback={<div>Loading... </div>}>
          <Analytics />
          </Suspense>,
        Auth: true,
        isPublic: true,
      },
      {
        name: "Sales",
        key: "sales",
        route: "/dashboards/sales",
        component:
        <Suspense fallback={<div>Loading... </div>}>
          <Sales />
          </Suspense>,
        Auth: true,
        isPublic: true,
      },
      // {
      //   name: "Dashboard Settings",
      //   key: "settings",
      //   route: "/dashboards/settings",
      //   component: <DashboardSettings />,
      //   Auth: true,
      //   isPublic: true,
      // },
    ],
  },
];

const nonAuthRoots = [
  '/auth/signin',
  '/auth/logout',
  '/auth/signup',
]

export {
  DynamicRoutes,
  nonAuthRoots
};
