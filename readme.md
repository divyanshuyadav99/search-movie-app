# Movie Search App

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Credits](#credits)
- [License](#license)

## Introduction
The Movie Search App allows users to search for movies, view detailed information about them, and save their favorite movies for easy access. The app uses the OMDb API to fetch movie data and Bootstrap for styling.

## Features
- **Search Movies:** Users can search for movies by typing in the search box. Search results are displayed in real-time.
- **View Movie Details:** Clicking on a movie in the search results opens a detailed view with more information about the movie.
- **Add to Favorites:** Users can add movies to their favorite list by clicking the "Add to Favourites" button.
- **View Favorites:** Users can view a list of their favorite movies and remove movies from the list.
- **Persistent Favorites:** The list of favorite movies is stored in `localStorage` and persists across browser sessions.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- [Bootstrap 5.3.3](https://getbootstrap.com/)
- [OMDb API](http://www.omdbapi.com/)

## Setup and Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/movie-search-app.git
    cd movie-search-app
    ```

2. Open `index.html` in your preferred web browser.

## Usage
1. **Search for Movies:**
   - Type the name of the movie you want to search for in the search input box on the home page.
   - Search results will be displayed as you type.

2. **View Movie Details:**
   - Click the "View Details" button on any movie in the search results to view more information about the movie.

3. **Add to Favorites:**
   - Click the "Add to Favourites" button on any movie in the search results to add it to your favorite movies list.

4. **View Favorites:**
   - Click the "My Favourite Movies" link in the footer to view your list of favorite movies.
   - You can remove a movie from your favorites by clicking the "Remove from Favourites" button.

## Project Structure
```plaintext
movie-search-app/
├── index.html
├── favourites.html
├── movie.html
├── style.css
├── index.js
└── README.md
