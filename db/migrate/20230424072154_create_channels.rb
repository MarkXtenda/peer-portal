class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :name
      t.text :description
      t.boolean :private
      t.string :invitekey

      t.timestamps
    end
  end
end
