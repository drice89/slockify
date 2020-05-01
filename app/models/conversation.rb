class Conversation < ApplicationRecord
  validates :name, :owner_id, :convo_type, presence: true
  validates :name, uniqueness: true
  validates :convo_type, inclusion: { in: %w(direct group channel)}

  has_many :messages

  has_many :memberships

  has_many :users,
    through: :memberships

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: "User"
  
end
