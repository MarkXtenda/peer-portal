class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :name
      t.text :description
      t.boolean :private
      t.string :invitekey
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :channels, :name
    add_index :channels, :invitekey
  end
end
