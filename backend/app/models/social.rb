class Social < ApplicationRecord
  belongs_to :user, optional: true
end