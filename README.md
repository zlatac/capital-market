# Capital Markets

This app lets you explore an ETF product by uploading a CSV file.
You can use the ETF1.csv or ETF2.csv in the data directory to use the app.

[Live Demo](https://cmarket.herokuapp.com/) app.

## Install

Download the project and Run `npm install`.

## Run

Run `npm start` to launch app.

## Asumptions
- Only CSV files can be uploaded and must have name,weight columns.
- The data in price.csv is not in any order and must be sorted properly by date.
- Uploaded file isn't stored on the server for any specific purpose.
- App should be optimized for mobile use.
- Latest Data uploaded persists in the browser even after app is closed.

## Challenges
- I tried adding a zoom functionality to the chart but i would need more time to understand the 3rd party zoom plugin for Chart.js.
- In the mean time the charts go full screen when clicked on.
- With more time unit testing would be included.

## Technologies Used
- Node.js (Backend)[package.json has the backend dependencies]
- Angular 1.x (Frontend)
- Chart.js(charts)
- MaterializeCSS (style framework)
