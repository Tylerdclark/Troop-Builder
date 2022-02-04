# Troop-Builder

[![Node.js CI](https://github.com/Tylerdclark/Troop-Builder/actions/workflows/node.js.yml/badge.svg)](https://github.com/Tylerdclark/Troop-Builder/actions/workflows/node.js.yml)

## Introduction

Troop-Builder is an API for requesting a random breakdown of troops depending on a total and number of types of troops given. For example, you could call the API with the following parameters: count=3, total=160 and the API would return a string of the form: ```[62,20,78]```

Troop builder is a NodeJS application that uses the Netlify serverless functions to host the API and it can be accessed at the following URL :

<https://troop-builder.netlify.app/.netlify/functions/troops?count=3&total=160>

please note the query parameters at end of the URL are required.

## Installation

To install Troop-Builder locally, first clone this repository to your machine.

    git clone https://github.com/Tylerdclark/Troop-Builder.git

Then install the dependencies:

    cd Troop-Builder
    npm install

To test the API locally, run the following command:

    npm run test

To run the API on a local machine, run the following command:

    npm run dev

Or, if you wish to deploy the API to Netlify [after creating an account](https://app.netlify.com/signup), login:

    netlify login

 and run the following command:

    npm run deploy

## Usage

The easiest way to try the API is to use the already deployed URL

    curl https://troop-builder.netlify.app/.netlify/functions/troops?count=3&total=160

Depending on whether the API is running locally or deployed to Netlify, the URL for the API will be different. Regardless, the URL will be:

(base URL)/.netlify/functions/troops?count=*COUNT*&total=*TOTAL*

where *COUNT* and *TOTAL* are the number of troops requested and the total number of troops available respectively. Keep in mind that the API will return an error if the total number of troops is less than the count of troops requested. Additionally, both *COUNT* and *TOTAL* must be integers and non-zero to avoid an error being thrown.

The output of the API is a string of the form: ```[62,20,78]``` which can be parsed depending on the language of the consuming application.

## Lessons Learned / Design Decisions

My first design decision was to use an API to produce the random breakdown of troops. I did it this way because I wanted it to be publicly accessible and free of installation (if desired). I opted to use the Netlify serverless functions to host because it is a free service and it is easy to deploy something like this which does not need 100% uptime on a server. I also chose to use NodeJS because it is a quick and easy way to get going (and one of only three options for Netlify functions).

When it came to designing the Random Troop Generator, A main consideration was to make it possible to extend the number of type of troops to be passed in. I chose to use an array of integers to represent the number of troops of each type. This allowed for the flexibility to add more types of troops in the future. To create the random troop breakdown, I first filled the array with n random numbers ranging from  0 to 1. I then divided by the sum of all the numbers and multiplied by the total number of troops requested. I then rounded the result to the nearest integer. Before returning the array, some helper functions were created to check if the total was being met and fix if it was not.

I went with jest, a hugely popular JavaScript testing framework, because it is easy to use and it is easy to write tests. I used it to write tests for the API. I also used it to write tests for the helper functions. By using coverage, I was able to ensure 100% testing of the code.

Overall a fun challenge!