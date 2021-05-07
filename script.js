const MCUAPIURL =
  "https://api.themoviedb.org/4/list/7094442?api_key=404e20cb3319c57b15dac6ff2ebc6d32";

const MCUTVAPIURL =
  "https://api.themoviedb.org/4/list/7094519?api_key=404e20cb3319c57b15dac6ff2ebc6d32";

const IMGPATH = "https://image.tmdb.org/t/p/w500";

async function getMCU() {
  var currpage;
  var maxpages = 10;
  for (currpage = 1; currpage <= maxpages; currpage += 1) {
    const resp = await fetch(MCUAPIURL + "&page=" + currpage);
    const respDATA = await resp.json();

    //console.log(respDATA);

    respDATA.results.forEach((item) => {
      const div = document.createElement("div");
      //const poster = document.createElement("img");
      var src = IMGPATH + item.poster_path;
      var name;
      var rDate;
      if (item.media_type == "movie") {
        name = item.original_title;
        rDate = item.release_date;
      } else {
        name = item.name;
        rDate = item.first_air_date;
      }
      var desc = item.overview;
      var background = IMGPATH + item.backdrop_path;
      //console.log(background);

      div.innerHTML = `
        <div class="movie_card" id="bright">
        <div class="info_section">
          <div class="movie_header">
            <img class="locandina" src="${src}" loading="lazy"/>
            <h1>${name}</h1>
            <h4>${rDate}</h4>
          </div>
          <div class="movie_desc">
            <p class="text">
              ${desc}
            </p>
          </div>
        </div>
        <div class="blur_back bright_back">
        <img src="${background}" loading="lazy"/>
        </div>
      </div>
        `;

      var divcon = document.getElementById("MCUcon");
      divcon.appendChild(div);
    });
  }
  //return respDATA;
}

async function getMCUTV() {
  var currpage;
  var maxpages = 10;
  for (currpage = 1; currpage <= maxpages; currpage += 1) {
    const resp = await fetch(MCUTVAPIURL + "&page=" + currpage);
    const respDATA = await resp.json();

    //console.log(respDATA);

    respDATA.results.forEach((item) => {
      const div = document.createElement("div");
      //const poster = document.createElement("img");
      var src = IMGPATH + item.poster_path;
      var name = item.name;
      var rDate = item.first_air_date;
      var desc = item.overview;
      var background = IMGPATH + item.backdrop_path;
      //console.log(background);

      div.innerHTML = `
        <div class="movie_card" id="">
        <div class="info_section">
          <div class="movie_header">
            <img class="locandina" src="${src}" loading="lazy"/>
            <h1>${name}</h1>
            <h4>${rDate}</h4>
          </div>
          <div class="movie_desc">
            <p class="text">
              ${desc}
            </p>
          </div>
        </div>
        <div class="blur_back">
        <img src="${background}" loading="lazy"/>
        </div>
      </div>
        `;

      var divcon = document.getElementById("MCUTVcon");
      divcon.appendChild(div);
    });
  }
}

const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 0;

remoteConfig.defaultConfig = {
  welcome_messsage: "Enjoy.",
};



var remoteConf = document.getElementById("remotecon");

remoteConfig
  .fetchAndActivate()
  .then(() => {
    // ...
    const val = remoteConfig.getValue("welcome_messsage");
    remoteConf.innerHTML = `${val._value}`;
  })
  .catch((err) => {
    // ...
  });

getMCU();
getMCUTV();
