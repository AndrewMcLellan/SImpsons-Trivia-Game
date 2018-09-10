class Character < ApplicationRecord
  validates :full_name, presence: true
end
