# web_scrapper
Tech Stack:
Backend: Nodejs, expressJS,
FrontEnd: AngularJs
DB: Redis

* run npm i (in terminal)
* Run App.js (to start server)
* Open http://localhost:3008/ in the browser

# DB
    # REDIS

API's:
1. http://localhost:3008/scrap?url=https://nodejs.org/api/http.html (it will fetch the data from the URL which a user will provide in the input box)
2. http://localhost:3008/scrap POST (it will save the earlier fetched data into DB)
3. http://localhost:3008/db GET (it will fetch the data from DB)

Note:
* When you will click a url, you may not able to open new link in new tab, because your popup may blocked, so allow all popup for this app

