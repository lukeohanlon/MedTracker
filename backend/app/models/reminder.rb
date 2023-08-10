# class RemindersController < ApplicationController
#   def index
#     reminders = Reminder.all
#     render json: reminders
#   end

#   def create
#     reminder = Reminder.new(reminder_params)
#     if reminder.save
#       render json: reminder, status: :created
#     else
#       render json: { error: reminder.errors.full_messages }, status: :unprocessable_entity
#     end
#   end

#   def destroy
#     reminder = Reminder.find(params[:id])
#     reminder.destroy
#     head :no_content
#   end

#   private

#   def reminder_params
#     params.require(:reminder).permit(:medication_id, :reminder_date, :reminder_time, :dose)
#   end
# end
