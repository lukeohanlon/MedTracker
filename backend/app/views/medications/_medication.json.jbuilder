json.extract! medication, :id, :name, :dosage, :schedule, :created_at, :updated_at
json.url medication_url(medication, format: :json)
