class AddVoteToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :vote, foreign_key: { to_table: :candidates } 
  end
end
