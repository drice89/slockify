class Membership < ApplicationRecord
  validates :member_id, :conversation_id, presence: true
  validates :member_id, uniqueness: { scope: :conversation_id}

  belongs_to :member,
    foreign_key: :member_id,
    class_name: "User"
    
  belongs_to :conversation
end
