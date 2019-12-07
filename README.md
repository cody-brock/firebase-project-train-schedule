# Train Schedule

This Train Schedule project takes in the user's input and displays the information in a table.

## Link to Deployed Version in GitHub Pages

https://cody-brock.github.io/firebase-project-train-schedule/

## Overview

The project uses Firebase to store the data on the trains that have been added, and allows the new trains to populate dynamically.  It also uses moment.js to calculate the next arrival times and the minutes away.

## Instructions

There are two main sections - the "Current Train Schedule" and "Add Train."

In "Add Train," this is where the user can submit new trains to display.  After adding a "Train Name," "Destination," "First Train Time," and "Frequency," you click "Submit" to have it show above. 

Above in "Current Train Schedule," all the train that have been submitted are displayed.  

## 

The "Next Arrival" and "Minutes Away" are both calculated using the train time and frequency.

There is some validation involved requiring the "First Train Time" to be a valid military time.