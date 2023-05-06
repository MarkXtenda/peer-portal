class AddCreatorToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :creator, :string, null: false
  end
end
