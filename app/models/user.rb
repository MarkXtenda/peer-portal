class User < ApplicationRecord
    has_secure_password
      
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence: true, confirmation: true, length: { minimum: 8 }
end
  