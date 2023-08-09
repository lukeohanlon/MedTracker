class CreateMedications < ActiveRecord::Migration[7.0]
  def change
    create_table :medications do |t|
      t.string :name
      t.string :dosage
      t.string :schedule

      t.timestamps
    end
  end
end
