class Channel < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :invitekey, uniqueness: true, allow_nil: true

  before_validation :set_invitekey, if: -> { private? && invitekey.blank? }

  has_many :messages
  private

  def set_invitekey
    self.invitekey = SecureRandom.hex(10)
  end
end
