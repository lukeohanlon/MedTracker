class OpenFdaService
    require 'net/http'
    require 'json'
  
    BASE_URL = 'https://api.fda.gov/drug/event.json'.freeze
  
    def self.get_drug_recalls(drug_name)
      url = "#{BASE_URL}?search=patient.drug.openfda.brand_name:#{drug_name}&count=patient.reaction.reactionmeddrapt.exact"
      response = Net::HTTP.get(URI(url))
      JSON.parse(response)
    end
  end
  