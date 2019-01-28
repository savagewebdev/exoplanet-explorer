/*
Instructions:
(1) Get the planet data and add the search header.
(2) Create the first thumbnail with createPlanetThumb(data)
(3) Handle errors!
  (a) Pass 'unknown' to the search header.
  (b) console.log the error.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  /**
   * Helper function to create a planet thumbnail.
   * @param  {Object} data - The raw data describing the planet.
   */
  function createPlanetThumb(data) {
    var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    home.appendChild(pT);
  }

  /**
   * XHR wrapped in a promise
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    
    getJSON('https://github.com/savagewebdev/exoplanet-explorer/blob/xhr-start/app/data/earth-like-results.json');
    .then(function(response) { // Following the JSON response promise ...
      addSearchHeader(response.query); // Familiar portion. Adding of the search header. 
      return getJSON(response.results[0]); // Returns the second getJSON. Gets the url of the first planet.
      )}
    .catch(function() { // First catch is in case there is an error with the search results.
      throw error('Search Request Error');
      })
    .then(createPlanetThumb); // By returning the second getJSON, it gets passed to this .then().
    
    .catch(function(e) { // Second catch is in case there is anything else that goes wrong.
      addSearchHeader('Unknown');
      console.log(e);
    });
  });
})(document);
