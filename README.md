# Satellite Launch Simulation

This is a numerical simulation made with [`JavaScript`](https://developer.mozilla.org/docs/Web/JavaScript) and [`jQuery`](https://jquery.com/)(**no other libraries**), which allows you to simulate how an artificial satellite travels around the planet after the launch depending on parameters you set.

## Run the Project

1. Clone the repo in your local machine and open `index.html` in your browser with local server environment.\
   (ex. Open it with `Live Server` of `VS code`)

2. Once it opens in your browser, input launch velocity and altitude on the left side bar.\
   Simulation will start as soon as you click `Launch` button and you can observe how the satellite behaves.\
   Simulation will stop either when the satellite gets out of the screen or hits the planet, or when you click `Abort` button.

3. You can also select other planets/starts from many selections by clicking the arrow on the top.\
   The satellite will behave differently depending on the parameters and planet/star you set.

## Project Description

This simulator is built based on the formula for gravity shown below.
<img src='./assets/formula.png'>
