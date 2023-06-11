class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :email_confirmation
      t.string :photo_file_name
      t.binary :profile_photo
      t.string :username
      t.string :password_digest

      t.timestamps
    end
  end
end
