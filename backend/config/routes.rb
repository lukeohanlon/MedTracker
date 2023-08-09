

Rails.application.routes.draw do
  namespace :api do
    get 'open_fda/drug_recalls'
  end
  resources :medications, only: [:index, :new, :create, :show, :edit, :update, :destroy]
  resources :drugs, only: [:index]       # Add other actions if needed
end

