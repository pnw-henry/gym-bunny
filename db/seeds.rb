puts "Seeding data..."

# Create Users
henry = User.create!(name: "Henry", email: "henrye@gmail.com", email_confirmation: "henrye@gmail.com", username: "bimet", password_digest: BCrypt::Password.create("bunnymaster"))
will = User.create!(name: "Will", email: "willpe@outlook.com", email_confirmation: "willpe@outlook.com", username: "willpe", password_digest: BCrypt::Password.create("hotaf"))

# Create Routines
chest = Routine.create!(name: "Chest Routine", description: "Workout your chest and strengthen your core with these upper body exercises!", muscle_group: "Chest", is_public: true, owner: "Gym Bunny Staff")
back = Routine.create!(name: "Back Routine", description: "Tone your back and build muscle with these hand picked back exercises!", muscle_group: "Back", is_public: true, owner: "Gym Bunny Staff")
legs = Routine.create!(name: "Leg Routine", description: "Strengthen your legs and grow that booty!", muscle_group: "Legs", is_public: true, owner: "Gym Bunny Staff")
arms = Routine.create!(name: "Arm Routine", description: "Get those glamour muscles looking great with these arm exercises!", muscle_group: "Arms", is_public: true, owner: "Gym Bunny Staff")
shoulders = Routine.create!(name: "Shoulder Routine", description: "Make your shoulders into a boulder field with these carefully curated exercises!", muscle_group: "Shoulders", is_public: true, owner: "Gym Bunny Staff")
core = Routine.create!(name: "Core Routine", description: "Strengthen your core, feel more flexible and balanced with these core exercises!", muscle_group: "Core", is_public: true, owner: "Gym Bunny Staff")

# Create Exercises
bench_press = Exercise.create!(name: "Bench Press", description: "The bench press is an upper-body strength-training exercise that consists of pressing a weight upwards from a supine position. The exercise works the pectoralis major as well as the supporting chest, arm, and shoulder muscles such as the anterior deltoids, serratus anterior, coracobrachialis, scapulae fixers, trapezii, and the triceps.", muscle_target: "Chest")
incline_bench_press = Exercise.create!(name: "Incline Bench Press", description: "The incline bench press is a variation of the traditional bench press in which the bench is positioned at about a 45-degree angle. The resulting inclined position targets your upper chest and the frontside of your shoulders more than the standard bench press.", muscle_target: "Chest")
dumbell_flye = Exercise.create!(name: "Dumbell Flye", description: "The dumbbell fly is a strength training exercise that is used to develop the pectoralis major muscle. It is performed by holding dumbbells in both hands and lying on a bench or other flat surface, with the arms extended and palms facing inward.", muscle_target: "Chest")
push_up = Exercise.create!(name: "Pushup", description: "A push-up is a common calisthenics exercise beginning from the prone position. By raising and lowering the body using the arms, push-ups exercise the pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis and the midsection as a whole.", muscle_target: "Chest")
pull_down = Exercise.create!(name: "Pull Down", description: "The pulldown exercise is a strength training exercise designed to develop the latissimus dorsi muscle. It performs the functions of downward rotation and depression of the scapulae combined with adduction and extension of the shoulder joint.", muscle_target: "Back")
seated_cable_rows = Exercise.create!(name: "Seated Cable Rows", description: "The seated cable row is a strength training exercise. It is one of the few exercises that targets the back muscles while seated. The movement resembles a rowing motion.", muscle_target: "Back")
deadlift = Exercise.create!(name: "Deadlift", description: "The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, then lowered to the ground. It is one of the three powerlifting exercises, along with the squat and bench press.", muscle_target: "Back")
pull_up = Exercise.create!(name: "Pull Up", description: "A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands and pulls up.", muscle_target: "Back")
squat = Exercise.create!(name: "Squat", description: "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent of a squat, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.", muscle_target: "Legs")
leg_press = Exercise.create!(name: "Leg Press", description: "The leg press is a weight training exercise in which the individual pushes a weight or resistance away from them using their legs. The term leg press also refers to the apparatus used to perform this exercise.", muscle_target: "Legs")
leg_extension = Exercise.create!(name: "Leg Extension", description: "The leg extension is a resistance weight training exercise that targets the quadriceps muscle in the legs. The exercise is done using a machine called the Leg Extension Machine.", muscle_target: "Legs")
leg_curl = Exercise.create!(name: "Leg Curl", description: "The leg curl, also known as the hamstring curl, is an isolation exercise that targets the hamstring muscles. The exercise involves flexing the lower leg against resistance towards the buttocks.", muscle_target: "Legs")
curl = Exercise.create!(name: " Bicep Curl", description: "A biceps curl is a strength training exercise that uses dumbbells, barbells, resistance bands, or other equipment to target the muscles of the upper arm. The muscle in the upper arm that is worked during a biceps curl is the biceps brachii.", muscle_target: "Arms")
tricep_extension = Exercise.create!(name: "Tricep Extension", description: "The triceps extension is a strength training exercise used for strengthening the triceps muscles in the back of the upper arm. This exercise is performed by pressing a weight away from the body, usually with the hands towards the face.", muscle_target: "Arms")
hammer_curl = Exercise.create!(name: "Hammer Curl", description: "The hammer curl is a variation of the biceps curl where the palms of the hands are facing each other. This exercise is performed with dumbbells, making it an isolation exercise.", muscle_target: "Arms")
shoulder_flye = Exercise.create!(name: "Shoulder Flye", description: "The shoulder fly or lateral raise is a strength training exercise. A type of shoulder isolation exercise, it works the deltoid muscles in the shoulder.", muscle_target: "Shoulders")
shoulder_press = Exercise.create!(name: "Shoulder Press", description: "The shoulder press is a weight training exercise in which a weight is pressed from the shoulders until it is locked out overhead.", muscle_target: "Shoulders")
plank = Exercise.create!(name: "Plank", description: "The plank is an isometric core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.", muscle_target: "Core")

# Create ExerciseSets
incline_bench_press_set = ExerciseSet.create!(exercise_id: incline_bench_press.id, routine_id: chest.id, reps: 10, set_number: 3)
dumbell_flye_set = ExerciseSet.create!(exercise_id: dumbell_flye.id, routine_id: chest.id, reps: 10, set_number: 3)
pull_down_set = ExerciseSet.create!(exercise_id: pull_down.id, routine_id: back.id, reps: 10, set_number: 3)
seated_cable_rows_set = ExerciseSet.create!(exercise_id: seated_cable_rows.id, routine_id: back.id, reps: 10, set_number: 3)
deadlift_set = ExerciseSet.create!(exercise_id: deadlift.id, routine_id: back.id, reps: 10, set_number: 3)
leg_press_set = ExerciseSet.create!(exercise_id: leg_press.id, routine_id: legs.id, reps: 10, set_number: 3)
leg_extension_set = ExerciseSet.create!(exercise_id: leg_extension.id, routine_id: legs.id, reps: 10, set_number: 3)
leg_curl_set = ExerciseSet.create!(exercise_id: leg_curl.id, routine_id: legs.id, reps: 10, set_number: 3)
trip_extension_set = ExerciseSet.create!(exercise_id: tricep_extension.id, routine_id: arms.id, reps: 10, set_number: 3)
hammer_curl_set = ExerciseSet.create!(exercise_id: hammer_curl.id, routine_id: arms.id, reps: 10, set_number: 3)
should_flye_set = ExerciseSet.create!(exercise_id: shoulder_flye.id, routine_id: shoulders.id, reps: 10, set_number: 3)
pushup_set = ExerciseSet.create!(exercise_id: push_up.id, routine_id: chest.id, reps: 10, set_number: 3)
bench_press_set = ExerciseSet.create!(exercise_id: bench_press.id, routine_id: chest.id, reps: 10, set_number: 3)
pullup_set = ExerciseSet.create!(exercise_id: pull_up.id, routine_id: back.id, reps: 10, set_number: 3)
squat_set = ExerciseSet.create!(exercise_id: squat.id, routine_id: legs.id, reps: 10, set_number: 3)
curl_set = ExerciseSet.create!(exercise_id: curl.id, routine_id: arms.id, reps: 10, set_number: 3)
shoulder_press_set = ExerciseSet.create!(exercise_id: shoulder_press.id, routine_id: shoulders.id, reps: 10, set_number: 3)
plank_set = ExerciseSet.create!(exercise_id: plank.id, routine_id: core.id, reps: 10, set_number: 3)

# Create Workouts
chest_workout = Workout.create!(date: "2020-03-01", time: 30, calories_burned: 300, user_id: henry.id, routine_id: chest.id)
back_workout = Workout.create!(date: "2020-03-02", time: 30, calories_burned: 300, user_id: henry.id, routine_id: back.id)
legs_workout = Workout.create!(date: "2020-03-03", time: 60, calories_burned: 550, user_id: will.id, routine_id: legs.id)




