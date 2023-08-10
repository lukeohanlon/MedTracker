class Medication < ApplicationRecord
    # Other model associations and validations
    
    # Include the new attributes in the list of permitted attributes
    def self.medication_params
      params.require(:medication).permit(
        :generic_name, :dosage_text, :directions, :dosage_form, 
        :active_substance, :route, :purpose, :dosage_amount,
        :reminder_date, :reminder_time, :dose
      )
    end
  end
  