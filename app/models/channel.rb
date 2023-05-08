class Channel < ApplicationRecord
  has_many :messages, dependent: :destroy
  belongs_to :user

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :invitekey, uniqueness: true, allow_nil: true

  before_validation :set_invitekey, if: -> { private? && invitekey.blank? }

  has_many :members
  has_many :users, through: :members
  has_many :messages
  private

  def set_invitekey
    self.invitekey = "#" + SecureRandom.hex(9)
  end
end