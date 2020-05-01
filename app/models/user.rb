class User < ApplicationRecord
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :email, :session_token, uniqueness: true
  validates :email, :full_name, :session_token, :password_digest, presence: true
  validates :password, length: { minimum: 8 }, allow_nil: true

  attr_reader :password
  before_validation :ensure_session_token!

  has_many :messages,
    foreign_key: :author_id

  has_many :memberships,
    foreign_key: :member_id

  has_many :conversations,
    through: :memberships,
    source: :conversation

   def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token!
    self.session_token ||= generate_session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end

end

