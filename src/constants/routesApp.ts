const routesApp = {
  home: "/",
  dashboard: "/dashboard",
  signUpClient: "/sign-up/client",
  signUpFreelancer: "/sign-up/freelancer",
  signIn: "/sign-in",
  verify: "/verify",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  create: "/dashboard/projects/create",
  projects: "/dashboard/projects",
  list: "/dashboard/projects/list",
  feedback: "/dashboard/projects/feedback",
  chat: "/dashboard/chat",
  profile: "/dashboard/profile",
  points: "/dashboard/points"
};

const accessPathsWithRoles = {
  "/dashboard": ["ADMIN", "FREELANCER", "CLIENT"]
};

export { routesApp, accessPathsWithRoles };
