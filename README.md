
# YARD SERVICE

Yard Service is a responsive web application to help residents understand the collection service provided by the city, adjusting for seasons and holidays.  Yard Service simplifies the combination of maps and calendars provided previously.

[Run the deployed application](https://yard-service.herokuapp.com/)

## Example Addresses for Demo Scenarios
- "Abbott" - A simple lookup
- "Grove" - There are 3 streets with Grove in the name
- "Trapelo" - A long road that goes through multiple zones

# ![city-calendar](app/assets/images/calendar.png)
# ![city-map](app/assets/images/map.png)

## Entity Relationship Diagram
# ![entity-relationship-diagram](app/assets/images/ER-Diagram-Yard-Waste-Day.png)

## Developer
- Jeff Korenstein

## Built with
- [Ruby on Rails](https://guides.rubyonrails.org/v5.2/)
- [React.js](https://reactjs.org/docs/getting-started.html)
- [PostgreSQL](https://www.postgresql.org/docs/13/index.html)
- [Foundation](https://get.foundation/)

## Run Locally
The setup steps expect the following tools/versions:
- Ruby 2.7.1
- Rails 5.2.3
- PostgreSQL 13

###### Clone the Repo
```
git clone 
```

###### Install Dependencies
```
yarn install 
bundle install 
```

###### Create and seed the database
```
bundle exec rake db: migrate
bundle exec rake db: seed
```

###### Run the test suite
```
bundle exec rspec
```
###### Start the Rails server and webpack-dev-server
```
bundle exec rails s
yarn run start
```

###### The application can be accessed locally at <http://localhost:3000>
