class CreateReminders < ActiveRecord::Migration[7.0]
  def change
    create_table :reminders do |t|
      t.references :medication, null: false, foreign_key: true
      t.date :reminder_date
      t.time :reminder_time
      t.string :dose

      t.timestamps
    end
  end
end
