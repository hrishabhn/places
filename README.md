# Travel Guide

A React application that displays a list of places I've saved during my travels. Access the app [here](https://places-hn.vercel.app/). This is the second version of the app, which was originally built with Streamlit found [here](https://github.com/hrishabhn/pdai/tree/main/places). A list of changes from the first version can be found [here](#changes-from-v1).

## Overview

This Travel Guide app provides a way to browse and filter travel destinations with the following features:

- View places in a list, map, or table format
- Filter places by `city`, `type`, `tags`, or top-rated status
- View statistics about places by `city`, `type`, and `tags`
- Display images, descriptions, and Google Maps links for each location
- Get AI recommendations for new places to visit

## Requirements

- Node.js
- NPM
- React
- Next.js

## Usage

To run the Travel Guide application, clone the repository and run the following command:

```sh
npm run dev
```

## Views

- **List**: List view of places
- **Map**: Map view of places
- **Table**: Table view of places
- **Stats**: Statistical visualisations of places data
- **Concierge**: AI concierge for travel recommendations

## Project Structure

All application code is located in the `src` folder

- [`app`](app): Contains the main application code
- [`model`](model): Contains the models for interacting with external APIs
- [`lib`](lib): Contains utility functions and helpers
- [`components`](components): Contains reusable components for the application

## Data

The application fetches data from a Notion database using the Notion API. It then preprocesses the data for display in the application.

## AI Recommendations

The AI recommendations feature uses the OpenAI SDK with structured outputs to generate new places to visit based on the user's preferences. The workflow is:

1. User enters their OpenAI API Key
2. They select a data inclusion option:
    - No existing data (fresh recommendations)
    - All saved places (complete taste analysis)
    - Top-rated places only (filtered taste analysis)
3. They select the OpenAI model to use
    - `gpt-4o-mini` - smaller, cheaper model
    - `gpt-4o` - larger, more powerful model
4. They provide inputs for:
    - City they want to explore
    - Type of place they're looking for
    - Additional preference information
5. When submitted:
    - If including existing data, the app first queries OpenAI to synthesize the user's taste profile from their saved places
    - The app then queries OpenAI with a structured output format to generate a recommendation including name, description, tags, and more
    - Results are displayed in a consistent format matching the rest of the application

The recommendation system uses `zod` schema to ensure type safety and proper data validation throughout the process.

## Changes From V1

- Rebuilt with React and Next.js for better performance and flexibility
- Improved UI/UX with a more modern design
- Added a map view for better visualization of places
- Use OpenAI search API for AI recommendations to provide more accurate results
