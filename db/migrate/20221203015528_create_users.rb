class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :profile_picture_url
      t.string :gender
      t.string :bio
      t.string :location

      t.timestamps
    end
  end
end
