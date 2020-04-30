class Message < ApplicationRecord
  validates :body, :author_id, :recipient_id, presence:true

  belongs_to :users,
    foreign_key: :author_id

end
