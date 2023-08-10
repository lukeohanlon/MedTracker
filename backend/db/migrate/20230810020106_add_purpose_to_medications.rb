class AddPurposeToMedications < ActiveRecord::Migration[7.0]
  def change
    add_column :medications, :purpose, :string
  end
end
