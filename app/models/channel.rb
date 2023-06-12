class Channel < ApplicationRecord
  has_many :messages, dependent: :destroy
  belongs_to :user
  has_one_attached :image
  
  validates :name, presence: true, uniqueness: true
  validates :invitekey, uniqueness: true, allow_nil: true

  before_validation :set_invitekey, if: -> { private? && invitekey.to_s.empty? }

  has_many :members, dependent: :destroy
  has_many :users, through: :members
  has_many :messages, dependent: :destroy
  private

  def set_invitekey
    self.invitekey = "#" + SecureRandom.hex(9)
  end
end
