class CreateConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations do |t|
      t.string :name, null: false
      t.text :description
      t.integer :owner_id, null: false
      t.boolean :is_private?, null: false
      t.string :playlist_url
      t.boolean :restricted_playlist?
      t.string :type, null: false
      t.timestamps
    end
    add_index :conversations, :owner_id
    add_index :conversations, :name, unique: true
  end
end


