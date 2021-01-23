# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_23_042642) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "number"
    t.bigint "segment_id", null: false
    t.string "zip_code"
    t.index ["segment_id"], name: "index_addresses_on_segment_id"
  end

  create_table "segments", force: :cascade do |t|
    t.integer "lowest_num_on_segment"
    t.integer "highest_num_on_segment"
    t.bigint "street_id", null: false
    t.bigint "zone_id", null: false
    t.index ["street_id"], name: "index_segments_on_street_id"
    t.index ["zone_id"], name: "index_segments_on_zone_id"
  end

  create_table "streets", force: :cascade do |t|
    t.text "name"
    t.text "notes"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "zones", force: :cascade do |t|
    t.integer "number", null: false
    t.integer "pickup_day_of_week"
    t.string "pickup_week"
    t.string "city"
    t.string "state"
  end

end
