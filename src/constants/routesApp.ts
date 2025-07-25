const routesApp = {
  home: "/",
  dashboard: "/dashboard",
  signUpClient: "/sign-up/client",
  signUpFreelancer: "/sign-up/freelancer",
  signIn: "/sign-in",
  verify: "/verify",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  videoList: "/dashboard/videos",
  videoProjects: "/dashboard/videos/projects",
  videoUploads: "/dashboard/videos/uploads",
  chat: "/dashboard/chat",
  profile: "/dashboard/profile",
  points: "/dashboard/points"
};

const accessPathsWithRoles = {
  "/dashboard": ["ADMIN", "FREELANCER", "CLIENT"],
  "/dashboard/videos": ["FREELANCER"],
  "/dashboard/videos/:id": ["FREELANCER", "CLIENT"],
  "/dashboard/videos/projects": ["CLIENT"],
  "/dashboard/videos/projects/:id": ["CLIENT"],
  "/dashboard/videos/uploads": ["CLIENT"],
  "/dashboard/points": ["ADMIN"]
};

export { routesApp, accessPathsWithRoles };
