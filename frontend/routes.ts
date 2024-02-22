/**
 * Public routes
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Redirect logged in users to dashboard
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * Prefix for API Authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
