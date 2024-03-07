BM25 VS TFIDF Search Vue.js App

Introduction

- The SPA Vue.js App is a front-end application that allows users to add text collections and a query to search within the text collection. The backend searches the query using BM25 and TFIDF and gives response respectively with scores to comapare the two algortihms.

Prerequisites:

- Before running the Vue.js app, ensure you have the following prerequisites installed:

- Node.js
- Vue CLI
- Access to the running Material Search API (provided by the Laravel project)

Installation

Clone the repository to your local machine:

- Install the project dependencies using Node Package Manager (NPM):

- VUE_APP_API_BASE_URL in the .env file to the URL of your Material Search API.

- env: 
VUE_APP_API_BASE_URL=http://localhost:8000/api

Running the Development Server
To run the Vue.js app locally in development mode, execute the following command:

npm run serve

The app will be accessible at http://localhost:8081. You can access the BM25 vs TFIDF app through your web browser.

References
- [Vue.js](https://vuejs.org/)
- [Vue CLI](https://vuejs.org/)
- [Vue paper dashboard](https://www.creative-tim.com/product/vue-paper-dashboard)
- [Material Project](https://next-gen.materialsproject.org/materials)
