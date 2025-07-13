FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'password123' }
    password_confirmation { 'password123' }
    first_name { 'Test' }
    last_name { 'User' }
    locale { :en }
  end
end
