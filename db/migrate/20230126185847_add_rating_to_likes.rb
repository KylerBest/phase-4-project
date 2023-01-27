class AddRatingToLikes < ActiveRecord::Migration[7.0]
  def change
    add_column :likes, :rating, :integer
  end
end
