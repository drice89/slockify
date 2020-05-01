class Conversation < ApplicationRecord
  validates :name, :owner_id, :convo_type, presence: true
  validates :name, uniqueness: true
  validates :convo_type, inclusion: { in: %w(direct group channel)}

  has_many :messages,
    foreign_key: :recipient_id

  has_many :memberships

  has_many :members,
    through: :memberships

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: "User"
  
end
