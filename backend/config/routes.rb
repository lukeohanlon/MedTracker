Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do
      resources :medications
    end
  end
end
