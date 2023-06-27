# Gym Bunny

Gym Bunny is a ruby on Rails/Rect web application that lets users browse workout routines which include sets of exercises that they can perform at the gym. Users can select a workout routine and begin a workout from it, record their results for each exercise, and add it to their workout history shown in their profile. 

## Installation

No API key required. 

* Fork and clone the Github [repository](https://github.com/pnw-henry/gym-bunny) into a local machine.
* Navigate to the directory created by using Finder (Mac), Explorer (Windows) or a command line interface:
	On Mac, open the terminal app, cd into the gym-bunny directory, type bundle install to install the require dependecies. Then type rails s to start the development server. Finally, navigate to the client directory and type npm start to start the react frontend. 
	

## Usage

Gym Bunny is divided into four main sections: Home, Workout Routines, All Exercises, and Profile.

The home page lists random workout routines if the user doesn't have any favorite routines. If favorites exists, those will be displayed instead. The home page also lists the latest three workouts the user has perfomed. 

Workout Routines has all the routines currently available. Users can click on one, see the relevant exercises pertaining to that routine, and begin a workout from it. Users can also search and favorite routines in this section. Once a workout has been started, users can enter the sets, reps, and weight (if needed) for each exercise. They can also enter the duration, calories burned, and notes for their workout.

All Exercises lists all exercises available regardless of routine. Users can read exercise details and select any number of them for easier information gathering. 

Profile has information about the user, such as name and photo. It also lists all the workouts, giving the user the ability to edit the notes for them.

## Roadmap

* Implement the functionality to create custom routines from available exercises.
* Add ability to define the sets and reps for each exercise in a routine before the workout begins.
* Add more routines and exercises.
* Implement ability to sort workouts by date in the user's profile.

## Contributing

Pulls requests are welcome.

## License

GPL-3.0
