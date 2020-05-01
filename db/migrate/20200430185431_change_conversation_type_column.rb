class ChangeConversationTypeColumn < ActiveRecord::Migration[5.2]
  def self.up
    rename_column :conversations, :type, :convo_type
  end
end
