# ACM UTD Backend Dev Challenge B - RSVP API

## Setup a Google Cloud Project to use Google Calendar API

-   Go to `https://console.developers.google.com/`
-   Create a New Project
-   Click the Hamburger on the top left corner and choose <i>API & Services</i>
-   Choose <i>Enable APIs and Services</i>
-   Choose <i>Google Calendar API</i>
-   Click Enable
-   Go back to <i>API & Services</i>
-   Choose <i>OAuth consent screen</i>
-   Choose <i>External</i> and click <i>Create</i>
-   Fill out the required information
-   On Step 2 (Scopes), click <i> Add or Remove Scopes </i> and choose the following:
    -   /auth/calendar
    -   /auth/calendar.events
-   Skip Step 3 and click Back to Dashboard on step 4
-   Click <i>Publish App</i> and confirm
-   Go to <i>Credentials</i> (on the left navbar), choose Create Credentials and choose OAuth client ID
-   Choose Web Application for Application type
-   Under the section <i>Authorized JavaScript origins</i>, click Add URI and add the following URI: `http://localhost:3000`
-   Under the section <i>Authorized redirect URIs</i>, click Add URI and add the following URI: `http://localhost:3000/auth/redirect`
-   Click Create
-   Upon being provided a client ID and a client secret, replace the `YOUR_GOOGLE_CLIENT_ID` and `YOUR_GOOGLE_CLIENT_SECRET` in the `docker-compose.yml` file with the provided client ID and client secret

## Setup to run project

-   Make sure that NodeJS, NPM, and Docker is installed on host machine
-   Make sure to replace `YOUR_JWT_SECERT` in `docker-compose.yml` file with your own JWT secret key
-   Run `npm install` to install all dependencies
-   Run `docker-compose up --build` run start the project
-   The API will be accessible at `http://localhost:3000`

## How to use this application

-   Make sure that the project is set up as stated in above section
-   Go to browser and go to `http://localhost:3000/signin`, which will redirect to Google consent landing page
-   Upon providing consent, the API will return an object with the `api_key` property, which will be used to authorize user
-   Before the `api_key` expires, make a request to any other route (listed below), upon successful, a token will be generated and stored inside the cookies for 3 minutes
-   In case `api_key` expires, redo step 2 and 3
-   Upon sucessfully executed step 4, one can make as much requests as needed before the cookie expires.
-   In the case of the cookies being expired, redo step 2 and 3

## API routes

-   `GET /signin`
    -   Redirect user to Google authorization page, from which they will receive a code which will be used as their API key
-   `POST /create-event`
    -   Allows authorized user to create a new event
    -   Created event will be stored on API database and on user's Google Calendar (depends on api_key)
    -   Interface of request body:
        -   api_key: A required string that is used to generate token for use with Google Calendar
        -   event_name: A required string that is used to determine the name of the event
        -   start_date: A required string determining the start date of the event, must be written in the following format: `YYYY-MM-DD HH:MM AM/PM`
        -   end_date: A required string determining the end date of the event, must be written in the following format: `YYYY-MM-DD HH:MM AM/PM`
-   `POST /rsvp-event`
    -   Allows authorizied user to rsvp to an event
    -   Upon successful, rsvp'ed event will be added into API database and user's Google Calendar (depends on api_key)
    -   Interface of request body:
        -   api_key: A required string that is used to generate token for use with Google Calendar
        -   event_id: ID of a created event, which will be returned upon successful creation of event
        -   attendee_name: Name of the attendee who RSVP'ed to the event
-   `POST /get-participants`
    -   Allows authorized user to retrieve a list of all participants sorted by name of a certain event
    -   Interface of the request body:
        -   api_key: A required string that is used to generate token for use with Google Calendar
        -   event_id: ID of a created event, which will be returned upon successful creation of event
