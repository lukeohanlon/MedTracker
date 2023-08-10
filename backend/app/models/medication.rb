class Medication < ApplicationRecord
    # Associations
    # belongs_to :user
    has_many :reminders
  
    # Validations
    validates :generic_name, presence: true
    validates :dosage_text, presence: true
    # ... other validations ...
  
    # Custom methods or business logic can also be defined here
    attribute :reminder_date, :string
    attribute :reminder_time, :string
    attribute :dose, :string
    attribute :recurring_interval, :string
    
    # accepts_nested_attributes_for :reminders
  end
  