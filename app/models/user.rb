class User < ApplicationRecord
  belongs_to :vote, class_name: "Candidate", optional: true
  validates :email, presence: true, uniqueness: true 
end
