class ChangeColumnNullCoversations < ActiveRecord::Migration[5.2]
  def change
    change_column_null :conversations, :is_private?, true
  end
end
