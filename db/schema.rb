# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_26_235812) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "exercise_sets", force: :cascade do |t|
    t.integer "set_number"
    t.integer "reps"
    t.integer "routine_id"
    t.integer "exercise_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "exercises", force: :cascade do |t|
    t.string "name"
    t.string "muscle_target"
    t.string "description"
    t.string "photo_file_name"
    t.binary "photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "favorites", force: :cascade do |t|
    t.integer "user_id"
    t.integer "routine_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "routines", force: :cascade do |t|
    t.string "name"
    t.string "muscle_group"
    t.string "description"
    t.boolean "is_public"
    t.string "owner"
    t.string "photo_file_name"
    t.binary "photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sweats", force: :cascade do |t|
    t.integer "weight"
    t.integer "reps"
    t.integer "sets"
    t.integer "routine_id"
    t.integer "user_id"
    t.integer "exercise_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "email_confirmation"
    t.string "photo_file_name"
    t.binary "profile_photo"
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "workouts", force: :cascade do |t|
    t.date "date"
    t.integer "duration"
    t.integer "calories_burned"
    t.integer "user_id"
    t.integer "routine_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
