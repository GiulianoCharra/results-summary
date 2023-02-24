"use strict";

let http = new XMLHttpRequest();
http.open("get", "../data.json", true);
http.send();
http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    let categories = JSON.parse(this.responseText);
    let output = "";
    let score_sum = 0;
    let score = 0;
    for (let cat of categories) {
      score_sum += cat.score;
      output += `
        <div id="${cat.category.toLocaleLowerCase()}" class="category-result">
            <div class="category-container">
                <img src=".${cat.icon}"></img>
            <p class="category__name">${cat.category}</p>
            <p class="score"><span class="score__value">${cat.score}</span> / 100</p>
            </div>
        </div>
         `;
    }
    score = Math.floor(score_sum / categories.length);
    let html_score = `<span>${score}</span>
    <p>of 100</p>`;
    document.querySelector(".score").innerHTML = html_score;
    document.querySelector(".categories-results").innerHTML = output;
  }
};
