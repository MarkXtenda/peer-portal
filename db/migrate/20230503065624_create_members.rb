class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.belongs_to :channel
      t.belongs_to :user
    end
  end
end

