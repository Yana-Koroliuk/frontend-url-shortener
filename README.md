# frontend-url-shortener

## Relevance
This **Link Shortener** web application addresses the need for sharing and managing long URLs in a concise, user-friendly manner. Whether you’re posting on social media, sending links via email, or embedding them in a newsletter, shortened links help maintain a neat look, improve readability, and provide essential statistics on link clicks. This system is useful for individuals, small businesses, and larger organizations looking to track and manage their URLs more effectively.

## Concept
The **Link Shortener** provides an end-to-end solution for creating, managing, and analyzing short links. It streamlines the process from user registration to link analytics:

- **User registration & authentication**: users can create personal accounts, log in securely, and manage their short URLs.
- **Generating short links**: submit any valid URL to receive a shorter, easy-to-share link.
- **Redirect tracking & analytics**: the system logs each redirect event; this data is then displayed on detailed charts (grouped by minutes, hours, or days).
- **Pagination & search**: users can view all their created URLs in a paginated table, search them, and quickly find what they need.
- **Error handling**: the application gracefully deals with errors (e.g., 401 Unauthorized, 404 Not Found, or unexpected runtime issues) and informs the user about what went wrong.

Through this platform, users or organizations can track how often their links are visited and gain valuable insights about user engagement.

## Program
Below is a detailed breakdown of the main features:

1. **Sign up**
    - Allows new users to register with a chosen username, password, and (optionally) a full name.
    - Enforces basic password validation (e.g., minimum length).

2. **Login**
    - Users can log in with their username and password to access personalized features.
    - The system returns an access token which is stored in the browser’s localStorage for subsequent authenticated requests.

3. **User home (Profile)**
    - Once authenticated, users see a welcome message and basic profile info from the `/api/me` endpoint.
    - Includes a **Logout** button to end the session.

4. **My URLs page**
    - Displays a paginated list of all short URLs created by the logged-in user.
    - Each entry shows the original (long) URL, the short URL, the creation date, and the redirect count.
    - Users can also navigate to a detail view (Url Details Page) to see analytics for each link.

5. **Create short URL**
    - Users can enter a **long URL** to be shortened (with client-side validation ensuring it starts with `http://` or `https://`).
    - The system generates a short link, which can then be copied to the clipboard.

6. **URL detail page**
    - Shows the **long URL**, the short URL, creation timestamp, and a redirect count.
    - Displays **three charts** (using `react-chartjs-2`) illustrating how many times the short link was visited over minutes, hours, and days.
    - Great for understanding traffic patterns and timing.

7. **Error handling**
    - **401 (Unauthorized)**: If a user tries to access protected endpoints without a valid token, they’re redirected to the login page or shown an Unauthorized page.
    - **404 (Not Found)**: If the requested route doesn’t exist, the user sees a custom 404 page.

### Roles and permissions
- **Regular user**: Can register, log in, create short URLs, view and manage their own links, and see charts with redirect analytics.

## Built with

### Front-end
- React
- React Router
- Axios
- Tailwind CSS 
- JavaScript/JSX

## Help
Ask questions at [Yana Koroliuk](https://t.me/Koroliuk_Yana) and post issues on GitHub.

## License
Don't forget about licence. This program is GPL General Public licensed.

