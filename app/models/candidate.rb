class Candidate < ApplicationRecord
  has_many :voters, class_name: 'User', foreign_key: 'vote_id'
end
