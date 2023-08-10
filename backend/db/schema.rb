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

ActiveRecord::Schema[7.0].define(version: 2023_08_10_023855) do
  create_table "medications", force: :cascade do |t|
    t.string "generic_name"
    t.text "dosage_text"
    t.text "directions"
    t.string "dosage_form"
    t.string "active_substance"
    t.string "route"
    t.string "dosage_amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "purpose"
  end

  create_table "reminders", force: :cascade do |t|
    t.integer "medication_id", null: false
    t.date "reminder_date"
    t.time "reminder_time"
    t.string "dose"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medication_id"], name: "index_reminders_on_medication_id"
  end

  add_foreign_key "reminders", "medications"
end
