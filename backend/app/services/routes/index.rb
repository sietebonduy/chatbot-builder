# frozen_string_literal: true

class Routes::Index
  include KindOfService

  def initialize; end

  private

  def perform
    routes = Rails.application.routes.routes.map do |route|
      {
        path: route.path.spec.to_s.gsub(/\(.*\)/, ''),
        method: route.verb,
        controller: route.defaults[:controller],
        action: route.defaults[:action]
      }
    end

    success(routes)
  rescue => e
    error(e)
  end
end