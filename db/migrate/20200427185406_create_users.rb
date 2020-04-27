class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :email, null:false, unique:true
      t.string :display_name
      t.string :full_name, null:false
      t.string :title
      t.text :description
      t.string :status
      t.string :avatar_url
      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
