class AddReminderFieldsAndRecurringIntervalToMedications < ActiveRecord::Migration[7.0]
  def change
    add_column :medications, :reminder_date, :date
    add_column :medications, :reminder_time, :time
    add_column :medications, :dose, :string
    add_column :medications, :recurring_interval, :integer
  end
end
