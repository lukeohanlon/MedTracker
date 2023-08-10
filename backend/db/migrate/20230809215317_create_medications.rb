class CreateMedications < ActiveRecord::Migration[7.0]
  def change
    create_table :medications do |t|
      t.string :generic_name
      t.text :dosage_text
      t.text :directions
      t.string :dosage_form
      t.string :active_substance
      t.string :route
      t.string :dosage_amount

      t.timestamps
    end
  end
end
