# Full Stack Developer Challenge

## Running the project:

1. Clone the project
2. Have a MySQL/MariaDB database running on 3306 (can be changed in *ormconfig.json*, along with username/password for the DB connection)
3. Create a database named `paypay_test` (```CREATE DATABASE `paypay_test`;```)
4. Run `npm i` on both the `api` and `front` project folders
5. Run `npm run watch` in the `api` folder. The DB schema should be synced automatically.
6. Run `npm start` in the `front` folder

## Features:

### API
* TypeORM and routing-controllers keep the API relatively sane
* Given the limited requirements, application has a small footprint overall

### Front-end
* React, Typescript
* Minimal dependencies

### Admin view
* Add/~~remove~~/~~update~~/view employees
* Add/update/~~view~~ performance reviews
* Assign employees to participate in another employee's performance review

### ~~Employee view~~
* ~~List of performance reviews requiring feedback~~
* Submit feedback

### Others
* Responsive, CSS-only mobile nav

## Shortcomings:
Due to time constraints, I didn't manage to implement everything I was planning on. Those include:
* Authentication
* Permissions based on roles (so that admins have full access and regular users can only see reviews assigned to them)
* A few of the features (removing/updating employees; the employee view as mentioned above)
* Lacking an aesthetically pleasing presentation (implementing designs is easy; coming up with a good looking application certainly isn't 😅). The application looks very barebones. I'd was like to add some FontAwesome icons and have some CSS animations to liven it up.
* Adding `react-router` - went with a much simpler state-based solution to save some time
* Componentization and reusability could be much improved. Lots of stuff is repeated everywhere
* Tests
* Used `create-react-app` for the front-end. I'm not a big fan (it has a *lot* of stuff packed in that might not be necessary for the project) but it saved a lot of time.
