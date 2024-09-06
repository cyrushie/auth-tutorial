/**
 * An array of routes that are accessible to the public
 * these doesn't require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/verify-email"];

/**
 * An array of routes that are used for authenticatiom
 * these routes will rediract users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
    "/auth/code",
];

/**
 * The prefix for authentication
 * this route prefix is used for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * default redirect after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
