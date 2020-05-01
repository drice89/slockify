class AddIndexToMemberships < ActiveRecord::Migration[5.2]
  def change
    add_index :memberships, [:member_id, :conversation_id], unique: true
  end
end
