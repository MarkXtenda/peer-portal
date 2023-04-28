class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :author, null: false, foreign_key: true
      t.references :channel, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
