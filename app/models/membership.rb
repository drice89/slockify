class Membership < ApplicationRecord
  validates :member_id, :conversation_id, presence: true

  belongs_to :member,
    foreign_key: :member_id,
    class_name: "User"
    
  belongs_to :conversation
end
