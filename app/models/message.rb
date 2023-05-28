class Message < ApplicationRecord
  belongs_to :user
  belongs_to :channel
  has_one_attached :image
end