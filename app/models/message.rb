class Message < ApplicationRecord
  validates :body, :author_id, :recipient_id, presence:true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: "User"

    belongs_to :recipient,
      foreign_key: :recipient_id,
      class_name: "Conversation"

end
