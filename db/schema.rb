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

ActiveRecord::Schema[7.0].define(version: 2020_06_19_194209) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conversations", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "owner_id", null: false
    t.boolean "is_private?"
    t.string "playlist_url"
    t.boolean "restricted_playlist?"
    t.string "convo_type", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["name"], name: "index_conversations_on_name", unique: true
    t.index ["owner_id"], name: "index_conversations_on_owner_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "member_id", null: false
    t.integer "conversation_id", null: false
    t.boolean "is_admin?"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["conversation_id"], name: "index_memberships_on_conversation_id"
    t.index ["member_id", "conversation_id"], name: "index_memberships_on_member_id_and_conversation_id", unique: true
    t.index ["member_id"], name: "index_memberships_on_member_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "body", null: false
    t.integer "author_id", null: false
    t.integer "recipient_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["recipient_id"], name: "index_messages_on_recipient_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "email", null: false
    t.string "display_name"
    t.string "full_name", null: false
    t.string "title"
    t.text "description"
    t.string "status"
    t.string "avatar_url"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "spotify_user_info"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
